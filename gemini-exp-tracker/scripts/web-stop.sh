#!/bin/bash

# Delete Web Kubernetes manifests
kubectl delete -f k8s/web/web-deployment.yaml --ignore-not-found
kubectl delete -f k8s/web/web-service.yaml --ignore-not-found

echo "Web service stopped."
