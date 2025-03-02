# Implementation Plan for Structure Simplification

## Step 1: Create Simplified Python Backend (1-2 days)

### Create new server directory
```bash
mkdir -p server
```

### Consolidate Database Functionality
1. Create `server/database.py` by merging:
   - `database/db_setup.py` (DB models)
   - `database/operations.py` (DB operations)

   Key changes:
   - Keep all SQLAlchemy models (Nomination, AwardWin, etc.)
   - Maintain all query functions but simplify parameter handling
   - Remove duplicate code and standardize error handling

2. Create `server/init_db.py` by merging:
   - `database/db_init.py`
   - `database/db_init_script.py`

   Key changes:
   - Create a single entry point for DB initialization
   - Add command-line options (e.g., `--reset` to drop tables)
   - Improve error handling for more robust initialization

### Consolidate Data Processing
3. Create `server/data.py` by merging:
   - `data_collection/scraper.py`
   - `data_collection/award_data.py`
   - `data_collection/betting_scraper.py`
   - `data_collection/mock_data.py`
   - `data_processing/data_processor.py`

   Key changes:
   - Organize by data domain (historical, nominees, awards, betting)
   - Convert class methods to static functions where appropriate
   - Standardize return formats for better API integration

### Migrate Prediction Model
4. Copy `models/predictor.py` to `server/predictor.py` with updates:
   - Simplify constructor and initialization
   - Improve error handling and logging
   - Add async support for API integration

### Create Utility Modules
5. Copy `utils/constants.py` to `server/constants.py`
6. Create `server/api.py` for FastAPI integration

## Step 2: Create FastAPI Backend (1 day)

### Set up FastAPI Application
1. Create `server/api.py`:
   ```python
   from fastapi import FastAPI, HTTPException
   from pydantic import BaseModel
   import uvicorn
   from typing import Dict, List, Optional
   
   # Import consolidated modules
   from server.database import get_nominations, get_model_weights
   from server.predictor import OscarPredictor
   from server.data import get_current_nominees, get_awards_data
   
   app = FastAPI(title="Oscar Predictor API")
   
   # API endpoints for nominees, predictions, etc.
   @app.get("/api/nominees")
   async def get_nominees(year: Optional[int] = None, category: Optional[str] = None):
       try:
           # Implementation
       except Exception as e:
           raise HTTPException(status_code=500, detail=str(e))

   # Other endpoints...
   ```

2. Create `server/main.py` entry point:
   ```python
   import uvicorn
   
   if __name__ == "__main__":
       uvicorn.run("server.api:app", host="0.0.0.0", port=5001, reload=True)
   ```

## Step 3: Update Next.js to use API (1-2 days)

### Update API Client
1. Modify `src/lib/api.ts` to use FastAPI endpoints instead of direct DB queries:
   ```typescript
   export async function getNominees(year: number = CURRENT_OSCAR_YEAR): Promise<Record<string, NomineeData[]>> {
     const response = await fetch(`/api/nominees?year=${year}`);
     if (!response.ok) {
       throw new Error('Failed to fetch nominees');
     }
     return response.json();
   }
   
   // Other API functions...
   ```

2. Create API route proxies in Next.js:
   - Update `/src/app/api/nominees/route.ts` to proxy to FastAPI
   - Update other API routes similarly

### Update Frontend Components
3. Review and update React components to use consistent data formats
4. Migrate visualization code from Python to TypeScript using Recharts/Tremor

## Step 4: Create Build and Run Configuration (0.5 day)

1. Update `package.json` scripts:
   ```json
   "scripts": {
     "dev": "next dev -p 5000",
     "server": "python -m server.main",
     "init-db": "python -m server.init_db",
     "start": "concurrently \"npm run dev\" \"npm run server\""
   }
   ```

2. Create simplified startup script:
   ```bash
   #!/bin/bash
   # Setup and run application
   
   # Initialize database if needed
   python -m server.init_db
   
   # Start server and frontend
   npm run start
   ```

## Step 5: Clean Up (0.5 day)

1. Create documentation for the new structure
2. Remove old directories after migration is verified:
   ```bash
   rm -rf database/ data_collection/ data_processing/ models/ utils/
   rm main.py  # Streamlit version
   ```

3. Update `.gitignore` and other configuration files

## Timeline and Dependencies

1. Backend Consolidation (Days 1-2)
2. FastAPI Implementation (Day 3)
3. Next.js Updates (Days 4-5)
4. Configuration and Cleanup (Day 6)

Total estimated time: 6 days

## Testing Strategy

1. Create unit tests for consolidation modules
2. Implement API endpoint tests
3. Compare outputs between old and new implementations
4. Perform end-to-end testing of the complete application