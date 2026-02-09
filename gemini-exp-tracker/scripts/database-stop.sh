#!/bin/bash

# Delete MongoDB and Mongo Express Kubernetes manifests
kubectl delete -f k8s/database/mongodb-secret.yaml --ignore-not-found
kubectl delete -f k8s/database/mongodb-pvc.yaml --ignore-not-found
kubectl delete -f k8s/database/mongodb-deployment.yaml --ignore-not-found
kubectl delete -f k8s/database/mongodb-service.yaml --ignore-not-found
kubectl delete -f k8s/database/mongo-express-deployment.yaml --ignore-not-found
kubectl delete -f k8s/database/mongo-express-service.yaml --ignore-not-found

echo "Database and Mongo Express stopped."
