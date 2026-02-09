#!/bin/bash

# Default to foreground mode
DETACHED_FLAG=""

# Check for --detached flag
if [ "$1" == "--detached" ]; then
  DETACHED_FLAG="--detached"
fi

# Make sure all scripts are executable
chmod +x scripts/database-start.sh
chmod +x scripts/api-start.sh
chmod +x scripts/web-start.sh

# Run all start scripts
scripts/database-start.sh $DETACHED_FLAG
scripts/api-start.sh $DETACHED_FLAG
scripts/web-start.sh $DETACHED_FLAG

echo "All services started."
