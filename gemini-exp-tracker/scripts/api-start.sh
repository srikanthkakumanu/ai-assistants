#!/bin/bash

# Default to foreground mode
DETACHED=false

# Check for --detached flag
if [ "$1" == "--detached" ]; then
  DETACHED=true
fi

# Build the API Docker image
docker build -t expense-tracker-api:latest ./api

# Apply API Kubernetes manifests
kubectl apply -f k8s/api/api-deployment.yaml
kubectl apply -f k8s/api/api-service.yaml

echo "API service started."

# If not detached, tail the logs
if [ "$DETACHED" = false ]; then
  echo "Tailing logs... (Press Ctrl+C to stop)"
  # Get the pod name
  API_POD=$(kubectl get pods -l app=expense-tracker-api -o jsonpath="{.items[0].metadata.name}")
  # Tail the logs, properly detached
  nohup kubectl logs -f $API_POD & disown
fi
