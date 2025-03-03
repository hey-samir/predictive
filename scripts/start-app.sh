#!/bin/bash

echo "Setting up Next.js environment..."

# Source the Replit environment
. /home/runner/.bashrc
. /home/runner/.profile

# Set Node.js options
export NODE_OPTIONS="--max-old-space-size=2048"

# Log the environment
echo "Node version:"
node -v || echo "Node not found in path"

echo "NPM version:"
npm -v || echo "NPM not found in path"

# Check for node_modules
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install || echo "Failed to install dependencies"
fi

echo "Starting Next.js application on port 5000..."
npm run dev || echo "Failed to start Next.js application"