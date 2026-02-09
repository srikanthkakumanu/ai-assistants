#!/bin/bash

# Default to foreground mode
DETACHED=false

# Check for --detached flag
if [ "$1" == "--detached" ]; then
  DETACHED=true
fi

# Build the Web Docker image
docker build -t expense-tracker-web:latest ./web

# Apply Web Kubernetes manifests
kubectl apply -f k8s/web/web-deployment.yaml
kubectl apply -f k8s/web/web-service.yaml

echo "Web service started."

# If not detached, tail the logs
if [ "$DETACHED" = false ]; then
  echo "Tailing logs... (Press Ctrl+C to stop)"
  # Get the pod name
  WEB_POD=$(kubectl get pods -l app=expense-tracker-web -o jsonpath="{.items[0].metadata.name}")
  # Tail the logs, properly detached
  nohup kubectl logs -f $WEB_POD & disown
fi
