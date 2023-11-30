import os

from dotenv import load_dotenv

# Load the .env file
load_dotenv()

# Get the environment variables
DB_HOST = os.getenv("localhost")
DB_NAME = os.getenv("gym")
DB_USER = os.getenv("root")
DB_PASS = os.getenv("1234")

SECRET_KEY = os.getenv("SECRET_KEY")
