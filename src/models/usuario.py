class Usuario:
    def __init__(self, usuario_id, nombre, email, tipo_usuario):
        self.usuario_id = usuario_id
        self.nombre = nombre
        self.email = email
        self.tipo_usuario = tipo_usuario

    def to_dict(self):
        return {
            "usuario_id": self.usuario_id,
            "nombre": self.nombre,
            "email": self.email,
            "tipo_usuario": self.tipo_usuario.to_dict()
        }
