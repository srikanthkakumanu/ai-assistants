### **Prompt for Gemini Code Assist**

**Objective:**
Your primary goal is to act as a world-class software engineering assistant to build a complete, containerized Expense Tracker application based on the specifications below. You will start by creating a detailed development plan, and upon confirmation, you will generate all the necessary code, configuration files, and documentation.

**Application Overview:**
The application is a minimal and clean Expense Tracker. It will consist of a React-based web frontend, a Node.js REST API backend, and a PostgreSQL database. The entire stack must be containerized using Docker and orchestrated with Kubernetes.

**Core Features (User Stories):**
The end-user must be able to:

- **Manage Expenses**: Create, read, update, and delete expenses.
- **View Expenses**: See a list of all their expenses.
- **Filter Expenses**: Filter the expense list by `category`.
- **Sort Expenses**: Sort the expense list by `amount` and `spentOnDate`.
- **Analyze Spending**: View the total amount spent for each expense category.

**Technical Specifications:**

1.  **Monorepo Structure:**
    - `api/`: For the backend codebase.
    - `web/`: For the frontend codebase.
    - `database/`: For database scripts/migrations.
    - `k8s/`: For Kubernetes manifests.

2.  **Backend (REST API):**
    - **Framework**: Express.js with TypeScript.
    - **Database Integration**: Use PostgreSQL with a modern, promise-based ORM like Sequelize.
    - **Expense Data Model**: Each expense must include:
      - `id` (UUID, Primary Key)
      - `title` (String)
      - `description` (String)
      - `amount` (Decimal/Number)
      - `category` (Enum: "Food", "Travel", "Utilities", "Others")
      - `spentOnDate` (Date)
      - `createdAt` (Timestamp, auto-generated)
      - `updatedAt` (Timestamp, auto-updated)
    - **API Endpoints**: Implement full CRUD RESTful endpoints for expenses (`/expenses`). The `GET /expenses` endpoint must support filtering by `category` and sorting.

3.  **Frontend (Web Application):**
    - **Framework**: Next.js 15+ with React Native Web.
    - **Language**: TypeScript.
    - **Styling**: TailwindCSS.
    - **State Management**: Use `@tanstack/react-query` (React Query) for managing server state.
    - **Animations**: Integrate `Reanimated 3` for UI animations.

4.  **Containerization & Deployment:**
    - **Containerization**: Create `Dockerfile`s for both the `api` and `web` services.
    - **Database**: Run PostgreSQL in a container with persistent data using a volume.
    - **Orchestration**: Create Kubernetes (k8s) manifest files to define and deploy the `api`, `web`, and `db` services. Ensure services can communicate with each other within the Kubernetes cluster.

**Step-by-Step Execution Plan:**

1.  **Acknowledge Existing Code**: Before starting, analyze the existing files in the directory. Your goal is to enhance and align the current codebase with any missing requirements (like Kubernetes), not to start from scratch if a foundation already exists.
2.  **Create a Development Plan**: First, generate a comprehensive, step-by-step plan to build and deploy this application. Save this plan to a file named `gemini-exp-tracker-plan.md`. Wait for my confirmation before proceeding with coding.
3.  **Implement Backend**: Develop the Express.js REST API with all specified endpoints and database integration.
4.  **Implement Frontend**: Develop the Next.js frontend application, including all UI components for managing and viewing expenses.
5.  **Containerize Services**: Write the `Dockerfile` for the `api` and `web` services.
6.  **Orchestrate with Kubernetes**: Write the necessary Kubernetes manifest files (Deployments, Services, PersistentVolume, PersistentVolumeClaim, etc.) to run the entire application stack.
7.  **Test the Deployment**: Provide instructions to deploy the application to a local Kubernetes cluster (e.g., via Docker Desktop) and test its full functionality. This includes verifying that the frontend can communicate with the API, and the API can connect to the database.
8.  **Document the Project**: Finally, update the `README.md` file with a complete guide covering:
    - Project overview and features.
    - Technology stack.
    - Detailed setup instructions for running the application using Kubernetes.
    - API endpoint documentation.
    - Troubleshooting common issues.
