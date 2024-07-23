#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Print commands and their arguments as they are executed
set -x

# Activate virtual environment
source ./venv/bin/activate

# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Run the build command
npm run build
