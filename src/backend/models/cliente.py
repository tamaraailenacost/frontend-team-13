class Cliente:
    def __init__(self, cliente_id, nombre, email):
        self.cliente_id = cliente_id
        self.nombre = nombre
        self.email = email

    def to_dict(self):
        return {
            "cliente_id": self.cliente_id,
            "nombre": self.nombre,
            "email": self.email
        }
