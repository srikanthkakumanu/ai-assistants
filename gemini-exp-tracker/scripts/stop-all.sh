#!/bin/bash

# Make sure all scripts are executable
chmod +x scripts/database-stop.sh
chmod +x scripts/api-stop.sh
chmod +x scripts/web-stop.sh

# Run all stop scripts
scripts/database-stop.sh
scripts/api-stop.sh
scripts/web-stop.sh

echo "All services stopped."
