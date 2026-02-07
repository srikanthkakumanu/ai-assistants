#!/bin/bash

echo "Cleaning up Expense Tracker Kubernetes deployment..."

# Navigate to the project root directory
SCRIPT_DIR=$(dirname "$0")
cd "$SCRIPT_DIR" || exit

# Delete Kubernetes resources in reverse order of deployment
kubectl delete -f k8s/web-service.yaml || { echo "Failed to delete web-service.yaml"; }
kubectl delete -f k8s/web-deployment.yaml || { echo "Failed to delete web-deployment.yaml"; }
kubectl delete -f k8s/api-service.yaml || { echo "Failed to delete api-service.yaml"; }
kubectl delete -f k8s/api-deployment.yaml || { echo "Failed to delete api-deployment.yaml"; }
kubectl delete -f k8s/db-service.yaml || { echo "Failed to delete db-service.yaml"; }
kubectl delete -f k8s/db-deployment.yaml || { echo "Failed to delete db-deployment.yaml"; }
kubectl delete -f k8s/db-persistent-volume-claim.yaml || { echo "Failed to delete db-persistent-volume-claim.yaml"; }
kubectl delete -f k8s/db-persistent-volume.yaml || { echo "Failed to delete db-persistent-volume.yaml"; }

echo "Kubernetes resources deleted."
echo "You may also want to remove Docker images if they are no longer needed:"
echo "docker rmi expense-tracker-api expense-tracker-web"
