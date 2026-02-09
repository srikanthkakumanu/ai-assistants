#!/bin/bash

# Default to foreground mode
DETACHED=false

# Check for --detached flag
if [ "$1" == "--detached" ]; then
  DETACHED=true
fi

# Apply MongoDB and Mongo Express Kubernetes manifests
kubectl apply -f k8s/database/mongodb-secret.yaml
kubectl apply -f k8s/database/mongodb-pvc.yaml
kubectl apply -f k8s/database/mongodb-deployment.yaml
kubectl apply -f k8s/database/mongodb-service.yaml
kubectl apply -f k8s/database/mongo-express-deployment.yaml # Updated to use ME_CONFIG_MONGODB_URL
kubectl apply -f k8s/database/mongo-express-service.yaml

echo "Database and Mongo Express started."

# If not detached, tail the logs
if [ "$DETACHED" = false ]; then
  echo "Tailing logs... (Press Ctrl+C to stop)"
  # Get the pod names
  MONGO_POD=$(kubectl get pods -l app=mongodb -o jsonpath="{.items[0].metadata.name}")
  MONGO_EXPRESS_POD=$(kubectl get pods -l app=mongo-express -o jsonpath="{.items[0].metadata.name}")
  # Tail the logs of both pods, properly detached
  nohup kubectl logs -f $MONGO_POD & disown
  nohup kubectl logs -f $MONGO_EXPRESS_POD & disown
fi
