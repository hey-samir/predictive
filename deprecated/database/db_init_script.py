"""Script to initialize the database with tables and sample data."""

from database.db_setup import create_tables, get_session
from database.db_init import init_database

def main():
    """Initialize the database."""
    # Create tables
    create_tables()
    
    # Initialize with sample data
    init_database()
    
    print("Database initialization complete!")

if __name__ == "__main__":
    main()