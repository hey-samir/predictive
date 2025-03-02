"""
Main entry point for the Oscar Predictor API server.
This module starts the FastAPI server with the application.
"""

import uvicorn

if __name__ == "__main__":
    # Import the app here to avoid circular imports
    from server.api import app
    
    # Start the server
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=5001,
        reload=True
    )