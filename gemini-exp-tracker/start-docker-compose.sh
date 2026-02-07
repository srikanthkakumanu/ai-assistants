#!/bin/bash

echo "Starting Expense Tracker with Docker Compose..."

# Navigate to the project root directory
SCRIPT_DIR=$(dirname "$0")
cd "$SCRIPT_DIR" || exit

# Build and start the Docker containers
docker-compose up --build

echo "Docker Compose setup initiated. Check logs for service status."
echo "Frontend should be available at http://localhost:80"
echo "API should be available at http://localhost:3000"
