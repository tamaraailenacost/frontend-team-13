import re

from werkzeug.security import generate_password_hash, check_password_hash


class PasswordService:
    @staticmethod
    def hash_password(password):
        """
        Genera un hash de la contraseña.
        """
        return generate_password_hash(password, method="sha256")

    @staticmethod
    def verify_password(hashed_password, password):
        """
        Verifica si la contraseña coincide con el hash almacenado.
        """
        return check_password_hash(hashed_password, password)

    @staticmethod
    def validar_formato_password(password):
        """
        Valida la contraseña para asegurarse de que tenga al menos 8 caracteres y contenga letras y números.
        :param password: Contraseña a validar.
        :return: True si la contraseña es válida, False de lo contrario.
        """
        if len(password) < 8:
            return False

        # Verificar si la contraseña contiene al menos una letra y un número
        if not (
            re.search("[a-zA-Z]", password) and re.search("[0-9]", password)
        ):
            return False

        return True
