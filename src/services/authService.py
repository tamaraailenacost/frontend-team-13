import mysql
from flask import session
from werkzeug.security import generate_password_hash, check_password_hash

from src.database import DBConnector


class AuthService:
    @staticmethod
    def register(nombre, email, password):
        try:
            connection = DBConnector.get_connection()
            cursor = connection.cursor()

            # Hash de la contraseña antes de almacenarla
            hashed_password = generate_password_hash(password, method='sha256')

            # Ejemplo: Insertar nuevo usuario en la base de datos
            insert_query = "INSERT INTO usuarios (nombre, email,password, tipo_usuario_id) VALUES (%s, %s, %s ,%s)"
            cursor.execute(insert_query, (nombre, email, hashed_password, 3))

            connection.commit()
            cursor.close()

            return {"message": f"Usuario registrado exitosamente"}
        except mysql.connector.Error as err:
            return {"error": f"Error al registrar usuario: {err}"}
        finally:
            if connection.is_connected():
                connection.close()

    @staticmethod
    def login(email, password):
        try:
            connection = DBConnector.get_connection()
            cursor = connection.cursor(dictionary=True)

            # Ejemplo: Consultar usuario desde la base de datos
            select_query = "SELECT * FROM usuarios WHERE email = %s"
            cursor.execute(select_query, (email,))
            stored_user = cursor.fetchone()

            # Verificar si el usuario existe y la contraseña coincide
            if stored_user and check_password_hash(stored_user['password'], password):
                session['email'] = email  # Almacenar el usuario en la sesión
                return {"message": "Inicio de sesión exitoso"}

            return {"error": "Credenciales incorrectas"}
        except mysql.connector.Error as err:
            return {"error": f"Error al iniciar sesión: {err}"}
        finally:
            cursor.close()
            if connection.is_connected():
                connection.close()

    @staticmethod
    def logout():
        try:
            # Aquí puedes realizar cualquier lógica necesaria para cerrar la sesión.
            # Por ejemplo, limpiar la sesión actual.
            session.pop('usuario', None)
            return {"message": "Cierre de sesión exitoso"}
        except Exception as e:
            return {"error": f"Error al cerrar sesión: {e}"}
