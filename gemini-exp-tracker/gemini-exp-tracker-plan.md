# Gemini Expense Tracker - Development Plan

This document outlines the comprehensive plan for developing and deploying the containerized Expense Tracker application. The application will feature a React-based web frontend, a Node.js REST API backend, and a PostgreSQL database, all orchestrated with Docker and Kubernetes.

## 1. Project Setup and Monorepo Structure

The project will adhere to a monorepo structure to organize the backend, frontend, database, and Kubernetes configurations.

- **`api/`**: Contains the Express.js backend with TypeScript.
- **`web/`**: Contains the Next.js 15+ frontend with React Native Web, TypeScript, TailwindCSS.
- **`database/`**: Contains SQL scripts for database schema and migrations.
- **`k8s/`**: Contains Kubernetes manifest files for deployment.

**Actionable Steps:**
- Verify the existing folder structure matches the desired monorepo layout. (Already done, `api/`, `web/`, `database/` already exist, `k8s/` needs to be created.)
- Create the `k8s/` directory.

## 2. Backend (REST API) Implementation

The backend will be an Express.js application written in TypeScript, providing a full REST API for expense management. PostgreSQL will be used as the database with Sequelize ORM.

### 2.1. Technology Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Sequelize (modern, promise-based)
- **Validation**: Joi (or similar for schema validation)
- **ID Generation**: UUID for primary keys

### 2.2. Expense Data Model

Each expense will have the following structure:

- `id`: UUID, Primary Key
- `title`: String
- `description`: String
- `amount`: Decimal/Number
- `category`: Enum ("Food", "Travel", "Utilities", "Others")
- `spentOnDate`: Date
- `createdAt`: Timestamp, auto-generated
- `updatedAt`: Timestamp, auto-updated

### 2.3. API Endpoints

Full CRUD operations for expenses (`/expenses`).

- **`POST /expenses`**: Create a new expense.
  - Request body: `title`, `description`, `amount`, `category`, `spentOnDate`.
  - Response: Created expense object.
- **`GET /expenses`**: Retrieve a list of expenses.
  - Query parameters:
    - `category`: Filter by expense category (e.g., `?category=Food`).
    - `sortBy`: Sort expenses by `amount` or `spentOnDate` (e.g., `?sortBy=amount&order=asc`).
  - Response: Array of expense objects.
- **`GET /expenses/:id`**: Retrieve a single expense by ID.
  - Response: Expense object.
- **`PUT /expenses/:id`**: Update an existing expense.
  - Request body: `title`, `description`, `amount`, `category`, `spentOnDate` (all optional, for partial updates).
  - Response: Updated expense object.
- **`DELETE /expenses/:id`**: Delete an expense by ID.
  - Response: Success message or status.

**Actionable Steps:**
- Configure `api/package.json` for Express.js, TypeScript, Sequelize, PostgreSQL driver, Joi, UUID.
- Define Sequelize models for `Expense` in `api/src/models/expense.model.ts`.
- Implement controllers (`api/src/controllers/expense.controller.ts`) for CRUD operations, including filtering and sorting logic.
- Implement routes (`api/src/routes/expense.routes.ts`) for each API endpoint.
- Implement request validation using Joi in `api/src/schemas/expense.schema.ts` and integrate it into middleware.
- Set up database connection in `api/src/config/database.ts`.
- Implement error handling middleware (`api/src/middlewares/errorHandler.ts`).

## 3. Frontend (Web Application) Implementation

The frontend will be a Next.js application using React Native Web, styled with TailwindCSS, and state managed with React Query.

### 3.1. Technology Stack

- **Framework**: Next.js 15+
- **UI**: React Native Web
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: `@tanstack/react-query` (React Query)
- **Animations**: `Reanimated 3`
- **Package Manager**: Bun (as specified in initial context, will configure in `web/package.json`)

### 3.2. Core Features (User Stories)

- **Manage Expenses**: Create, read, update, and delete expenses through a user-friendly interface.
- **View Expenses**: Display a list of all expenses.
- **Filter Expenses**: Allow filtering the expense list by `category`.
- **Sort Expenses**: Allow sorting the expense list by `amount` and `spentOnDate`.
- **Analyze Spending**: Display the total amount spent for each expense category.

**Actionable Steps:**
- Configure `web/package.json` for Next.js, React Native Web, TailwindCSS, React Query, Reanimated 3, and Bun.
- Develop UI components in `web/src/components/` for:
    - `ExpenseCard`: To display individual expense details.
    - `ExpenseForm`: For creating and updating expenses.
    - Filtering and sorting controls.
    - Category spending summary.
- Implement API communication in `web/src/lib/api.ts` using `fetch` or `axios` with React Query for data fetching and caching.
- Create pages in `web/src/app/` for:
    - `page.tsx`: Displaying the list of expenses, filtering, sorting, and summary.
    - A page/modal for creating/editing expenses.
- Integrate TailwindCSS for styling across the application.
- Integrate Reanimated 3 for UI animations as appropriate.
- Define expense types in `web/src/types/expense.ts` to match the backend model.

## 4. Containerization

Both the backend and frontend services will be containerized using Docker, and PostgreSQL will run in its own container with persistent data.

**Actionable Steps:**
- Create/update `api/Dockerfile` for the Node.js Express application.
- Create/update `web/Dockerfile` for the Next.js application.
- Define a `docker-compose.yml` to orchestrate the `api`, `web`, and `db` containers for local development.
- Configure PostgreSQL in `docker-compose.yml` to use a named volume for persistent data.

## 5. Kubernetes Orchestration

Kubernetes manifest files will be created to deploy the entire application stack.

### 5.1. Components

- **`db-persistent-volume.yaml`**: Defines a PersistentVolume (PV) for PostgreSQL data.
- **`db-persistent-volume-claim.yaml`**: Defines a PersistentVolumeClaim (PVC) to bind to the PV.
- **`db-deployment.yaml`**: Deploys the PostgreSQL database.
- **`db-service.yaml`**: Exposes the PostgreSQL database within the cluster.
- **`api-deployment.yaml`**: Deploys the backend API service.
- **`api-service.yaml`**: Exposes the API service within the cluster.
- **`web-deployment.yaml`**: Deploys the frontend web application.
- **`web-service.yaml`**: Exposes the web application within the cluster.

**Actionable Steps:**
- Create the `k8s/` directory.
- Develop Kubernetes YAML files for:
    - PersistentVolume and PersistentVolumeClaim for PostgreSQL.
    - Deployment and Service for PostgreSQL.
    - Deployment and Service for the API.
    - Deployment and Service for the Web application.
- Ensure proper environment variables and secrets management for database credentials and API URLs.

## 6. Testing the Deployment

Instructions will be provided to deploy the application to a local Kubernetes cluster (e.g., using Docker Desktop's Kubernetes or Minikube) and verify full functionality.

**Actionable Steps:**
- Provide clear instructions for setting up a local Kubernetes environment.
- Document the `kubectl apply -f k8s/` commands.
- Outline steps to verify that:
    - All pods are running correctly.
    - Frontend can communicate with the API.
    - API can connect to the database.
    - CRUD operations, filtering, and sorting work as expected.

## 7. Project Documentation

The `README.md` file will be updated with a comprehensive guide.

**Actionable Steps:**
- Update `README.md` with:
    - Project overview and features.
    - Technology stack.
    - Detailed setup instructions for running the application using Kubernetes.
    - API endpoint documentation (using a tool like Swagger/OpenAPI or manually).
    - Troubleshooting common issues.