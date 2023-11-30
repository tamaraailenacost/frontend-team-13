class TipoUsuario:
    def __init__(self, tipo_usuario_id, nombre):
        self.tipo_usuario_id = tipo_usuario_id
        self.nombre = nombre

    def to_dict(self):
        return {
            "tipo_usuario_id": self.tipo_usuario_id,
            "nombre": self.nombre
        }
