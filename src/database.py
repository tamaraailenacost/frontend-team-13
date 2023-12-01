import mysql.connector

from src import config


class DBConnector:
    @staticmethod
    def get_connection():
        # Configura la conexión a tu base de datos MySQL
        db_config = {
            "host": config.DB_HOST,
            "user": config.DB_USER,
            "password": config.DB_PASSWORD,
            "database": config.DB_NAME,
            "port": config.DB_PORT,
        }
        return mysql.connector.connect(**db_config)
