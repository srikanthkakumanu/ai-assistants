# Expense Tracker Application

A clean, minimal Expense Tracker application with a full REST API, a Next.js frontend, PostgreSQL database, and Dockerized deployment using Docker Compose and Kubernetes.

## Features

*   **Full REST API with CRUD operations** for expenses (Create, Read, Update, Delete).
*   **Expense fields**: id, title, description, amount, category (e.g., Food/Travel/Utilities/Others), spent on date, created_at, updated_at.
*   **PostgreSQL** for data storage.
*   **Frontend** for managing expenses (listing, adding, editing, deleting, filtering, sorting).
*   **Containerized** application stack using Docker.
*   **Persistent** PostgreSQL data using Docker volumes.
*   **Orchestrated with Kubernetes** for production-like deployment simulation.

## Technologies Used

### Backend (API)

*   **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
*   **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
*   **Sequelize & Sequelize-TypeScript**: A promise-based Node.js ORM for PostgreSQL with TypeScript decorators.
*   **Zod**: TypeScript-first schema declaration and validation library for API request validation.
*   **CORS**: Node.js CORS middleware for Express.js.

### Frontend (Web)

*   **Next.js 16**: React framework for production.
*   **React**: JavaScript library for building user interfaces.
*   **React Native Web**: For building universal components that run on web and potentially native.
*   **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
*   **TailwindCSS**: A utility-first CSS framework for rapidly building custom designs.
*   **React Query (@tanstack/react-query)**: Powerful asynchronous state management for React.
*   **React Hook Form**: Flexible and extensible forms with validation.
*   **Zod**: For form schema validation in conjunction with React Hook Form.
*   **react-native-reanimated**: For UI animations.
*   **Axios**: Promise-based HTTP client for the browser and Node.js.
*   **date-fns**: For date manipulation and formatting.
*   **react-native-picker-select**: For dropdown/picker components.

### Database

*   **PostgreSQL**: Powerful, open source object-relational database system.

### Deployment & Orchestration

*   **Docker**: Containerization platform.
*   **Docker Compose**: Tool for defining and running multi-container Docker applications for local development.
*   **Kubernetes**: Container orchestration system for production deployment.

## Monorepo Structure

The project is organized as a monorepo:

```
expense-tracker/
├── api/             # Express.js REST API codebase
├── web/             # Next.js frontend codebase
├── database/        # Database initialization scripts/migrations
├── k8s/             # Kubernetes manifests
├── docker-compose.yml
├── README.md
└── TESTING.md       # Detailed Kubernetes deployment and testing instructions
```

## Getting Started

You can run this application using either Docker Compose for local development or deploy it to a local Kubernetes cluster.

### Prerequisites

*   **Git**: For cloning the repository.
*   **Node.js & npm**: (or Yarn/Bun) for building Docker images locally.
*   **Docker Desktop**: Ensures Docker daemon is running for Docker Compose and Kubernetes (if using Docker Desktop's K8s).
*   **kubectl**: Kubernetes command-line tool (required for Kubernetes deployment).
*   **Minikube or Docker Desktop (with Kubernetes enabled)**: For running a local Kubernetes cluster.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/expense-tracker.git
    cd expense-tracker
    ```
2.  **Install dependencies for `api` and `web` (optional, for local development outside Docker):**
    ```bash
    cd api && npm install && cd ..
    cd web && npm install && cd ..
    ```

### Running with Docker Compose (Local Development)

This method is recommended for quick local setup and development.

1.  **Build and start the Docker containers:**
    Navigate to the root directory of the project and run:
    ```bash
    docker-compose up --build
    ```
    This command will:
    *   Build the `api` and `web` Docker images based on their respective `Dockerfile`s.
    *   Create and start the `db` (PostgreSQL), `api` (Express.js), and `web` (Next.js) containers.
    *   Set up a persistent volume for PostgreSQL data (`db_data`).
    *   Ensure the `api` service waits until the `db` service is healthy before attempting to connect.

2.  **Monitor the logs:**
    You will see logs from all three services (`db`, `api`, `web`) in your terminal. Look for messages indicating that the `api` server is running on port 3000 and the `web` server is ready.

    Example successful log messages:
    ```
    api-1   | Database connection has been established successfully.
    api-1   | All models were synchronized successfully.
    api-1   | Server running on http://localhost:3000
    web-1   | ✓ Ready in ...ms
    ```

### Accessing the Application (Docker Compose)

*   **Frontend**: Open your web browser and navigate to `http://localhost:80`. You should see the Expense Tracker application.
*   **API**: The API will be accessible on `http://localhost:3000`. You can test endpoints using tools like Postman, Insomnia, or `curl`.

### Deploying to Kubernetes (Production-like Environment)

For detailed instructions on how to build Docker images, deploy to a local Kubernetes cluster, and verify the deployment, please refer to the `TESTING.md` file in the project root.

A brief overview of the steps:

1.  **Build Docker Images**: Build `expense-tracker-api` and `expense-tracker-web` images locally using `docker build`.
2.  **Apply Kubernetes Manifests**: Use `kubectl apply -f k8s/` to deploy the database, API, and web services.
3.  **Access Web Application**: Access the web application via `http://localhost:30080` (or the `NodePort` assigned by your cluster).

## API Endpoints

The backend API provides the following CRUD and utility operations for expenses:

*   `POST /expenses`
    *   **Description**: Creates a new expense.
    *   **Body**:
        ```json
        {
          "title": "Monthly Rent",
          "description": "Apartment rent for February",
          "amount": 1200.00,
          "category": "Utilities",
          "spentOnDate": "2026-02-01"
        }
        ```
*   `GET /expenses`
    *   **Description**: Retrieves a list of all expenses, with optional filtering and sorting.
    *   **Query Params (Optional)**:
        *   `category`: Filter by expense category (e.g., `?category=Food`).
        *   `sortBy`: Field to sort by (`amount` or `spentOnDate`).
        *   `order`: Sort order (`ASC` or `DESC`).
    *   **Example**: `GET /expenses?category=Food&sortBy=amount&order=DESC`
*   `GET /expenses/summary`
    *   **Description**: Retrieves a summary of total spending per category.
    *   **Example Response**:
        ```json
        [
          { "category": "Food", "totalSpent": "500.25" },
          { "category": "Travel", "totalSpent": "150.00" }
        ]
        ```
*   `GET /expenses/:id`
    *   **Description**: Retrieves a single expense by its ID.
    *   **Example**: `GET /expenses/a1b2c3d4-e5f6-7890-1234-567890abcdef`
*   `PUT /expenses/:id`
    *   **Description**: Updates an existing expense by its ID. Partial updates are allowed.
    *   **Body**:
        ```json
        {
          "amount": 1250.00
        }
        ```
*   `DELETE /expenses/:id`
    *   **Description**: Deletes an expense by its ID.

### Expense Model Fields

*   `id`: UUID (Primary Key)
*   `title`: String (required)
*   `description`: String (optional)
*   `amount`: Decimal/Number (required, positive)
*   `category`: Enum ("Food", "Travel", "Utilities", "Others") (required)
*   `spentOnDate`: Date (stored as `DATE` in DB, expected as `YYYY-MM-DD` string in API)
*   `createdAt`: Timestamp (automatically generated)
*   `updatedAt`: Timestamp (automatically updated)

## Frontend Usage

The frontend provides an intuitive interface to manage your expenses:

*   **Add Expense**: Use the "Add Expense" button to open a form for creating new expense entries.
*   **Edit Expense**: Click the "Edit" button next to any expense in the list to populate the form for updating that expense.
*   **Delete Expense**: Click the "Delete" button next to any expense to remove it from the list.
*   **Filter**: Use the "Filter by Category" dropdown to filter expenses.
*   **Sort**: Use the "Sort by" dropdowns to sort expenses by amount or spent date.
*   **Category Spending Summary**: A section displays the total amount spent for each category.

## Troubleshooting / Common Issues

*   **`ConnectionRefusedError` for database**: Ensure your Docker containers/Kubernetes pods are running and the `db` service/pod is healthy. Check logs for the database container (`docker-compose logs db` or `kubectl logs <postgres-pod-name>`).
*   **CORS errors**: For Docker Compose, ensure the `CORS_ORIGIN` environment variable in `docker-compose.yml` for the `api` service matches the frontend's origin (`http://localhost`). For Kubernetes, ensure `CORS_ORIGIN` in `api-deployment.yaml` is correctly configured to allow requests from the web service (e.g., `http://web-service:80`).
*   **Frontend blank / API calls failing**: Check your browser's developer console for network errors or JavaScript errors. Verify `NEXT_PUBLIC_API_URL` environment variable is correctly set in `docker-compose.yml` (for Docker Compose) or `web-deployment.yaml` (for Kubernetes) to point to the correct API URL (e.g., `http://api:3000`).
*   **Build errors**: If you encounter build errors, especially with TypeScript, ensure all dependencies are correctly installed and that there are no lingering pathing issues. Rebuilding images (`docker-compose up --build` or `docker build` for Kubernetes) can sometimes help resolve caching issues.
*   **Kubernetes Pods not starting**: Use `kubectl describe pod <pod-name>` and `kubectl logs <pod-name>` to get detailed information about why a pod might not be starting or running correctly.

## Further Development / Next Steps

*   **Authentication/Authorization**: Implement user authentication (e.g., JWT) and restrict access to expenses based on user roles.
*   **User Interface Enhancements**: Improve the UI/UX, add more sophisticated filtering/sorting options, pagination, and data visualization.
*   **Mobile Application**: Explore further integration with React Native for a dedicated mobile application.
*   **Testing**: Add comprehensive unit, integration, and end-to-end tests for both frontend and backend.
*   **Environment Management**: Implement robust environment variable management (e.g., Kubernetes Secrets) for production deployments.

