#!/bin/bash

echo "Starting Next.js application..."

# Add Node.js to PATH if available in common locations
export PATH="/home/runner/.nvm/versions/node/v20.10.0/bin:$PATH"
export PATH="/home/runner/.config/nvm/versions/node/v20.10.0/bin:$PATH"

# Find node binary if available
if [ -d "/nix/store" ]; then
  NODE_PATH=$(find /nix/store -name node -type f -executable | head -n 1 2>/dev/null)
  if [ -n "$NODE_PATH" ]; then
    NODE_DIR=$(dirname "$NODE_PATH")
    export PATH="$NODE_DIR:$PATH"
    echo "Found Node.js at $NODE_PATH"
  fi
fi

# Check if node_modules exists, if not try to install dependencies
if [ ! -d "node_modules" ] && command -v npm &> /dev/null; then
  echo "Installing dependencies..."
  npm install
fi

# Try multiple methods to start Next.js
echo "Starting Next.js on port 5000..."

# Method 1: Use npm if available
if command -v npm &> /dev/null; then
  echo "Using npm to start Next.js..."
  npm run dev
# Method 2: Use npx if available
elif command -v npx &> /dev/null; then
  echo "Using npx to start Next.js..."
  npx next dev -p 5000 -H 0.0.0.0
# Method 3: Use the Next.js binary directly from node_modules
elif [ -f "./node_modules/.bin/next" ]; then
  echo "Using Next.js binary from node_modules..."
  ./node_modules/.bin/next dev -p 5000 -H 0.0.0.0
# Method 4: Fall back to a simple Python HTTP server as a last resort
else
  echo "Could not find Next.js. Starting Python HTTP server as fallback..."
  # Create a simple HTML file
  mkdir -p public
  cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Oscar Predictions App</title>
    <style>
        body { font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .card { border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .error { color: red; }
    </style>
</head>
<body>
    <h1>Oscar Predictions App</h1>
    <div class="card">
        <h2>Environment Configuration Issue</h2>
        <p>The Next.js application is currently experiencing configuration issues.</p>
        <p class="error">Node.js runtime environment not properly configured.</p>
        <p>Please check the logs for more details.</p>
    </div>
</body>
</html>
EOF
  # Start Python HTTP server
  python3 -m http.server 5000 --bind 0.0.0.0 --directory public
fi