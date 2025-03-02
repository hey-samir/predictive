"""
Main entry point for the Oscar Predictor API server.
This module starts the FastAPI server with the application.
"""

import uvicorn
from server.api import app

# This function is used when the module is run directly
def start_server():
    """Start the uvicorn server."""
    uvicorn.run(
        "server.api:app",
        host="0.0.0.0",
        port=5001,
        reload=True
    )

# When imported as a module, provide the app directly
if __name__ == "__main__":
    start_server()