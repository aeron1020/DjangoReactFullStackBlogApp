#!/bin/bash

set -e
set -x

echo "Navigating to the frontend directory..."
cd frontend

echo "Installing npm dependencies..."
npm install

echo "Running the build command..."
npm run build
