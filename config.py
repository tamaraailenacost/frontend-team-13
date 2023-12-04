import os
from urllib.parse import quote

from dotenv import load_dotenv

# Load the .env file
load_dotenv()

# Get the environment variables
MYSQL_DATABASE_HOST = os.getenv("MYSQL_DATABASE_HOST")
MYSQL_DATABASE_PORT = os.getenv("MYSQL_DATABASE_PORT")
MYSQL_DATABASE_USER = os.getenv("MYSQL_DATABASE_USER")
MYSQL_DATABASE_PASSWORD = os.getenv("MYSQL_DATABASE_PASSWORD")
MYSQL_DATABASE_DB = os.getenv("MYSQL_DATABASE_DB")

encoded_password = quote(
    MYSQL_DATABASE_PASSWORD
)  # Codifica la contraseña para que no haya problemas con caracteres especiales

# Set the Flask-SQLAlchemy config
SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{MYSQL_DATABASE_USER}:{encoded_password}@{MYSQL_DATABASE_HOST}:{MYSQL_DATABASE_PORT}/{MYSQL_DATABASE_DB}"
SQLALCHEMY_POOL_RECYCLE = 280  # Soluciona el error de MySQL Server has gone away
SQLALCHEMY_TRACK_MODIFICATIONS = False

SECRET_KEY = os.getenv("SECRET_KEY")
