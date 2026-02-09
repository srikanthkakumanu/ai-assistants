# Expense Tracker Application

A clean, minimal Expense Tracker application with a full REST API, a Next.js frontend, MongoDB database, and Dockerized deployment using Kubernetes.

## Features

- **Full REST API with CRUD operations** for expenses (Create, Read, Update, Delete).
- **Expense fields**: `id` (UUID), `title`, `description`, `amount`, `category` (e.g., Food/Travel/Utilities/Others), `spentOnDate`, `createdAt`, `updatedAt`.
- **MongoDB** for data storage.
- **Frontend** for managing expenses (listing, adding, editing, deleting, filtering, sorting).
- **Containerized** application stack using Docker.
- **Orchestrated with Kubernetes** for production-like deployment simulation.

## Technologies Used

### Backend (API)

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript (used during development, compiled to CommonJS for deployment and testing).
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **Swagger/OpenAPI**: For API documentation and testing.
- **CORS**: Node.js CORS middleware for Express.js.
- **Jest & Supertest**: For comprehensive unit and integration testing.

### Frontend (Web)

- **React 18+**: JavaScript library for building user interfaces.
- **Next.js 15**: React framework for production.
- **TypeScript**: Typed superset of JavaScript.
- **Tailwind CSS**: A utility-first CSS framework.
- **Radix UI**: Unstyled, accessible UI components.
- **React Query**: Powerful asynchronous state management.
- **ESLint + Prettier**: For code quality and formatting.
- **Jest + React Testing Library**: For unit and integration testing.
- **Playwright**: For end-to-end testing.

### Database

- **MongoDB**: NoSQL database for flexible data storage.
- **Mongo Express**: Web-based MongoDB admin interface.

### Deployment & Orchestration

- **Docker**: Containerization platform.
- **Kubernetes**: Container orchestration system.

## Monorepo Structure

The project is organized as a monorepo:

```
expense-tracker/
├── api/             # Express.js REST API codebase
├── web/             # Next.js frontend codebase
├── database/        # Database initialization scripts/migrations
├── k8s/             # Kubernetes manifests
├── .gitignore
├── GEMINI.md        # Detailed development log and changes
└── README.md
```

## Getting Started

This application is designed to be run within a Kubernetes cluster.

### Prerequisites

- **Git**: For cloning the repository.
- **Node.js & npm**: (or Yarn/Bun) for building Docker images locally.
- **Docker Desktop**: Ensures Docker daemon is running and Kubernetes is enabled.
- **kubectl**: Kubernetes command-line tool.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/srikanthkakumanu/ai-assistants/gemini-exp-tracker.git
    cd gemini-exp-tracker
    ```

### Deployment to Kubernetes

Please refer to `scripts/` directory for the shell scripts to run the application locally and in Kubernetes.

**General Steps:**

1.  **Build Docker Images**: Build `expense-tracker-api:latest` and later `expense-tracker-web:latest` images locally using `docker build`.
2.  **Apply Kubernetes Manifests**: Use `kubectl apply -f k8s/` to deploy the database, API, and web services in Kubernetes and note that you should use appropriate directory in `k8s/` for each service.
3.  **Access Services**: Access Mongo Express UI and the API via their respective NodePort services.

## API Endpoints

The backend API provides the following CRUD operations for expenses:

- `POST /expenses`
  - **Description**: Creates a new expense.
  - **Body**:
    ```json
    {
      "title": "Monthly Rent",
      "description": "Apartment rent for February",
      "amount": 1200.0,
      "category": "Utilities",
      "spentOnDate": "2026-02-01"
    }
    ```
- `GET /expenses`
  - **Description**: Retrieves a list of all expenses, with optional filtering and sorting.
  - **Query Params (Optional)**:
    - `category`: Filter by expense category (e.g., `?category=Food`).
    - `sortBy`: Field to sort by (`amount`, `spentOnDate`, `createdAt`, `updatedAt`).
    - `sortOrder`: Sort order (`asc` or `desc`, default `asc`).
  - **Example**: `GET /expenses?category=Food&sortBy=amount&sortOrder=desc`
- `GET /expenses/{id}`
  - **Description**: Retrieves a single expense by its UUID `id`.
  - **Example**: `GET /expenses/bf7aeeae-890f-4b16-8823-2c935d43b709`
- `PUT /expenses/{id}`
  - **Description**: Updates an existing expense by its UUID `id`. Partial updates are allowed.
  - **Body**:
    ```json
    {
      "amount": 1250.0,
      "description": "Updated rent details"
    }
    ```
- `DELETE /expenses/{id}`
  - **Description**: Deletes an expense by its UUID `id`.

### Expense Model Fields

- `id`: UUID (Primary Key, auto-generated)
- `title`: String (required)
- `description`: String (optional)
- `amount`: Number (required)
- `category`: Enum ("Food", "Travel", "Utilities", "Others") (required)
- `spentOnDate`: Date (required)
- `createdAt`: Timestamp (automatically generated)
- `updatedAt`: Timestamp (automatically updated)

## Accessing Services

- **Web Frontend**: `http://localhost:30002`
- **Mongo Express UI**: `http://localhost:30000` (Login: admin/password)
- **API Service**: `http://localhost:30001` (Swagger UI: `http://localhost:30001/api-docs`)

## Troubleshooting / Common Issues

- **Kubernetes Pods not starting (`ErrImagePull`)**: Ensure the Docker image is built locally and `imagePullPolicy: Never` is set in the Kubernetes deployment manifest for local development. Trigger a `kubectl rollout restart deployment/<deployment-name>` after rebuilding images.
- **MongoDB/API connection refused**: Check pod logs for connection errors (`kubectl logs <pod-name>`). Ensure Kubernetes services are correctly defined and running.
- **CORS errors (from Frontend/Swagger UI)**: Ensure the API's `cors` middleware is configured to allow requests from the frontend's origin. The Swagger `servers` URL should match where your API is externally accessible.
- **`SyntaxError: Cannot use import statement outside a module` (during testing)**: This project uses CommonJS for the API. Ensure your `package.json` has `"type": "commonjs"` and `jest.config.js` is configured for CommonJS.

## Further Development / Next Steps

- **Frontend Implementation**: Develop the web UI using Next.js, React, Tailwind CSS, Radix UI, React Query, etc.
- **Authentication/Authorization**: Implement user authentication.
- **User Interface Enhancements**: Improve UI/UX, add more sophisticated filtering/sorting options, pagination, and data visualization.
- **Testing**: Add Playwright for end-to-end testing for the frontend.
- **Environment Management**: Implement robust environment variable management (e.g., Kubernetes Secrets).
