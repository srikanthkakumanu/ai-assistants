# Testing the Expense Tracker Application on Kubernetes

This document provides instructions for deploying and testing the Expense Tracker application on a local Kubernetes cluster.

## Prerequisites

Before proceeding, ensure you have the following installed:

1.  **Docker Desktop (with Kubernetes enabled)** or **Minikube**: For running a local Kubernetes cluster.
    - **Docker Desktop**: Go to Docker Desktop preferences, enable Kubernetes, and ensure it's running.
    - **Minikube**: Follow the official Minikube installation guide: [https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)
2.  **kubectl**: The Kubernetes command-line tool.
    - Install `kubectl`: [https://kubernetes.io/docs/tasks/tools/install-kubectl/](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
3.  **Node.js and npm/yarn/bun**: To build the Docker images locally.

## Step-by-Step Deployment and Testing

### 1. Run the Deployment Script

The `deploy-k8s.sh` script automates the entire process, including building Docker images and applying the Kubernetes manifests in the correct order.

```bash
./deploy-k8s.sh
```

### 3. Verify Deployment Status

Check if all pods are running and services are created correctly.

```bash
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get pv
kubectl get pvc
```

You should see pods for `postgres`, `api`, and `web` in a `Running` or `ContainerCreating` status, and eventually `Running`. Services for `postgres-service`, `api-service`, and `web-service` should also be listed.

### 4. Access the Application

The web application is exposed via a `NodePort` service.

- **For Docker Desktop Kubernetes**:
  You can usually access the service at `http://localhost:<NodePort>`, where `<NodePort>` is typically `30080` (as defined in `k8s/web-service.yaml`).
  Open your browser to `http://localhost:30080`.

- **For Minikube**:
  To get the URL of the web service, run:
  ```bash
  minikube service web-service --url
  ```
  This command will output the URL. Open this URL in your browser.

### 5. Verify Application Functionality

Once the web application is accessible:

1.  **Create an Expense**:
    - Click the "Add Expense" button.
    - Fill in the details (Title, Description, Amount, Category, Spent On Date).
    - Click "Save Expense".
    - Verify the new expense appears in the list.

2.  **Edit an Expense**:
    - Click the "Edit" button on an existing expense card.
    - Modify some details.
    - Click "Save Expense".
    - Verify the expense details are updated in the list.

3.  **Delete an Expense**:
    - Click the "Delete" button on an existing expense card.
    - Confirm the deletion.
    - Verify the expense is removed from the list.

4.  **Filter Expenses by Category**:
    - Use the "Filter by Category" dropdown.
    - Select a category (e.g., "Food").
    - Verify only expenses from that category are shown.

5.  **Sort Expenses**:
    - Use the "Sort by" dropdowns to sort by "Amount" or "Date" in "Ascending" or "Descending" order.
    - Verify the list reorders correctly.

6.  **View Category Spending Summary**:
    - Observe the "Category Spending Summary" section, which should update dynamically as you add/edit/delete expenses.

### 6. Clean Up (Optional)

To remove all deployed Kubernetes resources:

```bash
kubectl delete -f k8s/db-persistent-volume.yaml
kubectl delete -f k8s/db-persistent-volume-claim.yaml
kubectl delete -f k8s/db-deployment.yaml
kubectl delete -f k8s/db-service.yaml
kubectl delete -f k8s/api-deployment.yaml
kubectl delete -f k8s/api-service.yaml
kubectl delete -f k8s/web-deployment.yaml
kubectl delete -f k8s/web-service.yaml
```

If you want to remove the Docker images:

```bash
docker rmi expense-tracker-api expense-tracker-web
```
