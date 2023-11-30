import mysql.connector


class DBConnector:
    @staticmethod
    def get_connection():
        # Configura la conexión a tu base de datos MySQL
        db_config = {
            'host': 'localhost',
            'user': 'tu_usuario',
            'password': 'tu_contraseña',
            'database': 'tu_base_de_datos'
        }
        return mysql.connector.connect(**db_config)
