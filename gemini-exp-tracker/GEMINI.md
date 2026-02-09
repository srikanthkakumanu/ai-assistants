## **Prompt for Gemini Code Assist**

### Overview

Your primary goal is to act as a world-class software engineering assistant to build a complete, containerized Expense Tracker application based on the instructions below. My objective is to run the application locally and Docker and Kubernetes is already installed in my local host with Docker Desktop. Apply all best practice patterns when containerizing and orchestrating the application.

### Initial Setup

- Create a detailed development plan.
- Create a monorepo structure: `api/`, `web/`, `database/`, `k8s/`, `scripts/`.
- Create a .gitignore file and update it.
- Keep the Kubernetes manifests in `k8s/` directory.
  - /k8s/database for the database and mongoexpress deployment.
  - /k8s/api for the api deployment.
  - /k8s/web for the web deployment.
- Create shell scripts in `scripts/` directory to run the application locally and in Kubernetes.
  - It should have separate start and stop scripts with detached mode as an option per module for database, api, and web.
  - One shell script to start and stop all the instances i.e. database, api, and web with detached mode as an option.
  - Test the scripts and ensure they are working as expected.
- Update the README.md file about the application, its features, and its architecture.

### Database Setup

- Keep all database related files such as database scripts/migrations in `database/` directory.
- Create a MongoDB database for expenses:
  - **Expense Data Model**: Each expense must include:
    - `id` (UUID, Primary Key)
    - `title` (String)
    - `description` (String)
    - `amount` (Decimal/Number)
    - `category` (Enum: "Food", "Travel", "Utilities", "Others")
    - `spentOnDate` (Date)
    - `createdAt` (Timestamp, auto-generated)
    - `updatedAt` (Timestamp, auto-updated)
- Containerize the MongoDB instance using Docker and orchestrate it with Kubernetes. Open the necessary ports to allow communication for an API to connect to the database.
- Install a MongoDB Express web GUI client to interact with the expense database.
  - It should be containerized and orchestrate it with Kubernetes.
  - Create all the configurations to connect with MongoDB instance. Ensure it is accessible from the browser.
  - Test the connectivity between the MongoDB instance and the web GUI client.

### API Setup

- In `api/` directory, Create a full-blown REST API that performs CRUD for expenses (`/expenses`) using Express.js and TypeScript and use all the advanced best practices.
- The `GET /expenses` endpoint must support filtering by `category` and sorting.
- Containerize the API service using Docker and orchestrate it with Kubernetes.
  - Create Kubernetes (k8s) manifest files in `k8s/api/` directory to define and deploy the `api` service.
  - Ensure API service can communicate with above created MongoDB instance within the Kubernetes cluster.
  - Create all the necessary configurations to connect api service and instance with MongoDB instance.
  - Test the connectivity between the API service and the MongoDB instance.
- Document the API endpoints using Swagger/OpenAPI. API should be testable from swagger UI endpoint.
- Write all unit test cases and integration test cases for the API service.
- Write all the sample API endpoint calls with HTTPie/Curl/Postman and save them in README.md.

### Frontend Setup

- In `web/` directory, develop a professional full-blown web UI frontend application with modern and trendy UI components.
  - Tech Stack: React 18+, Next.js 15, TypeScript, Tailwind CSS, Radix UI, React Query, ESLint + Prettier, Jest + React Testing Library, Playwright and with all the advanced best practices.
- Containerize the frontend service using Docker and orchestrate it with Kubernetes.
  - Create Kubernetes (k8s) manifest files in `k8s/web/` directory to define and deploy the `web` service.
  - Create all the necessary configurations to connect web UI frontend service with above created api instance within the Kubernetes cluster. Ensure it is accessible from the browser.
  - Test the connectivity between the web UI frontend service and the api instance.
- Write all the unit test cases and integration test cases for the frontend service.
