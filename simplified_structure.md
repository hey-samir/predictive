# Simplified Structure Plan

## Current Issues
1. **Dual Frameworks**: Running both Next.js and Streamlit is redundant and causes maintenance overhead
2. **Duplicate Data Access**: Both Python and TypeScript access the same database
3. **Excessive Modularization**: Many small modules with overlapping responsibilities
4. **Deep Folder Nesting**: Makes navigation and understanding the codebase harder
5. **Multiple UI Implementations**: Similar UI components in both Next.js and Streamlit

## Simplification Strategy

### 1. Pick Single Frontend Framework
- **Decision**: Keep Next.js as the primary frontend
- **Reasoning**: Next.js provides better performance, SEO capabilities, and modern UI components
- **Action**: Migrate Streamlit visualizations to Next.js using Recharts/Tremor

### 2. Simplify Python Backend
- Reorganize from:
```
database/
  __init__.py
  db_init.py
  db_init_script.py
  db_setup.py
  operations.py
data_collection/
  __init__.py
  award_data.py
  betting_scraper.py
  mock_data.py
  scraper.py
data_processing/
  __init__.py
  data_processor.py
models/
  __init__.py
  predictor.py
visualization/
  __init__.py
  charts.py
utils/
  __init__.py
  constants.py
```

- To:
```
server/
  __init__.py
  database.py       # Combines db_setup.py and operations.py
  data.py           # Combines data_collection and data_processing
  predictor.py      # Moved from models/
  constants.py      # Moved from utils/
  init_db.py        # Combines db_init_script.py and db_init.py
```

### 3. Expose Python Functionality via FastAPI
- Create a simple FastAPI server that exposes the prediction functionality
- Replace direct Python-to-DB access with API calls from Next.js
- Allows both applications to be independently deployable

### 4. Cleanup and Consolidate Next.js
- Reorganize components into logical groups (UI, Charts, Layout)
- Consolidate duplicated functionality across components
- Standardize data types and interfaces
- Move visualization logic from Python to TypeScript

### 5. Streamline Database Access
- Use Prisma exclusively for TypeScript data access
- Simplify SQLAlchemy models in Python
- Standardize on common data formats between frontend and backend

## Benefits
1. **Reduced Complexity**: Single framework for UI, clear separation of concerns
2. **Improved Maintainability**: Fewer files, clear organization
3. **Better Performance**: Less redundant processing, fewer dependencies
4. **Simplified Deployment**: Clear separation between frontend and backend
5. **Enhanced Developer Experience**: Logical organization, easier to understand