class Reserva:
    def __init__(self, reserva_id, cliente, clase, fecha_reserva):
        self.reserva_id = reserva_id
        self.cliente = cliente
        self.clase = clase
        self.fecha_reserva = fecha_reserva

    def to_dict(self):
        return {
            "reserva_id": self.reserva_id,
            "cliente": self.cliente.to_dict(),
            "clase": self.clase.to_dict(),
            "fecha_reserva": self.fecha_reserva.isoformat()
        }
