#!/bin/bash

# Delete API Kubernetes manifests
kubectl delete -f k8s/api/api-deployment.yaml --ignore-not-found
kubectl delete -f k8s/api/api-service.yaml --ignore-not-found

echo "API service stopped."
