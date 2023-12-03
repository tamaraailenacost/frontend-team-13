from werkzeug.security import generate_password_hash, check_password_hash


class PasswordService:
    @staticmethod
    def hash_password(password):
        """
        Genera un hash de la contraseña.
        """
        return generate_password_hash(password, method='sha256')

    @staticmethod
    def verify_password(hashed_password, password):
        """
        Verifica si la contraseña coincide con el hash almacenado.
        """
        return check_password_hash(hashed_password, password)
