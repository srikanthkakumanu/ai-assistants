#!/bin/bash

echo "Deploying Expense Tracker to Kubernetes..."

# Navigate to the project root directory
SCRIPT_DIR=$(dirname "$0")
cd "$SCRIPT_DIR" || exit

# --- 0. Configure Docker Environment (for local clusters like Minikube) ---
# This command points your local Docker CLI to the Docker daemon inside the Minikube node.
# This allows you to build images directly into the cluster, so Kubernetes can find them
# without needing a remote container registry, avoiding ImagePullBackOff errors.
echo "Configuring Docker environment to use Minikube's Docker daemon..."
if [[ "$(kubectl config current-context)" == "minikube" ]]; then
  eval $(minikube -p minikube docker-env) || {
    echo "Could not set up Minikube Docker environment. Please ensure Minikube is running."
    exit 1;
  }
else
  echo "Current Kubernetes context is not 'minikube'. Skipping minikube-docker-env setup."
  echo "Assuming Docker images are available to the cluster (e.g., when using Docker Desktop)."
fi

# Build API Image
echo "Building API image (expense-tracker-api)..."
docker build -t expense-tracker-api ./api || { echo "API image build failed."; exit 1; }

# Build Web Image
echo "Building Web image (expense-tracker-web)..."
docker build -t expense-tracker-web ./web || { echo "Web image build failed."; exit 1; }

echo "Docker images built successfully."

if [[ "$(kubectl config current-context)" == "minikube" ]]; then
  # --- 2. Prepare Host Path for Database (for Minikube) ---
  # The PersistentVolume for PostgreSQL uses a hostPath, which requires the specified
  # directory to exist on the Kubernetes node. This command connects to the Minikube
  # node via SSH and creates the directory, ensuring the volume can be mounted.
  echo "Preparing storage directory inside Minikube node..."
  minikube ssh -- "sudo mkdir -p /data/postgres-storage && sudo chmod -R 777 /data/postgres-storage" || {
    echo "Failed to create storage directory inside Minikube node."
    exit 1;
  }
fi

# --- 3. Deploy to Kubernetes ---
echo "Applying Kubernetes manifest files..."

# Apply database related manifests
kubectl apply -f k8s/db-configmap.yaml || { echo "Failed to apply db-configmap.yaml"; exit 1; }
kubectl apply -f k8s/db-secret.yaml || { echo "Failed to apply db-secret.yaml"; exit 1; }
kubectl apply -f k8s/db-persistent-volume.yaml || { echo "Failed to apply db-persistent-volume.yaml"; exit 1; }
kubectl apply -f k8s/db-persistent-volume-claim.yaml || { echo "Failed to apply db-persistent-volume-claim.yaml"; exit 1; }
kubectl apply -f k8s/db-deployment.yaml || { echo "Failed to apply db-deployment.yaml"; exit 1; }
kubectl apply -f k8s/db-service.yaml || { echo "Failed to apply db-service.yaml"; exit 1; }

# Apply API related manifests
kubectl apply -f k8s/api-configmap.yaml || { echo "Failed to apply api-configmap.yaml"; exit 1; }
kubectl apply -f k8s/api-deployment.yaml || { echo "Failed to apply api-deployment.yaml"; exit 1; }
kubectl apply -f k8s/api-service.yaml || { echo "Failed to apply api-service.yaml"; exit 1; }

# Apply Web related manifests
kubectl apply -f k8s/web-deployment.yaml || { echo "Failed to apply web-deployment.yaml"; exit 1; }
kubectl apply -f k8s/web-service.yaml || { echo "Failed to apply web-service.yaml"; exit 1; }

echo "Kubernetes manifests applied. Waiting for pods to be ready..."

# Optional: Wait for deployments to be ready (you might need to adjust timeout)
kubectl rollout status deployment/postgres-deployment --timeout=300s
kubectl rollout status deployment/api-deployment --timeout=300s
kubectl rollout status deployment/web-deployment --timeout=300s

echo "Deployment to Kubernetes complete."
echo "You can check the status of your pods and services with: kubectl get pods, kubectl get services"
echo "To access the web application, find the NodePort for 'web-service' (usually 30080) and navigate to http://localhost:<NodePort>"
