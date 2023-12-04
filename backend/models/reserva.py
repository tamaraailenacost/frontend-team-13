from datetime import datetime

from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import mapped_column, relationship, Mapped

from backend import db
from backend.models.clase import Clase
from backend.models.cliente import Cliente


class Reserva(db.Model):
    __tablename__ = "reserva"

    reserva_id: Mapped[int] = mapped_column(primary_key=True)
    cliente_id: Mapped[int] = mapped_column(ForeignKey("cliente.cliente_id"))
    clase_id: Mapped[int] = mapped_column(ForeignKey("clase.clase_id"))
    fecha_reserva: Mapped[DateTime] = mapped_column(
        DateTime, default=datetime.now(), nullable=False
    )

    cliente: Mapped[Cliente] = relationship(
        back_populates="reservas", lazy="subquery"
    )
    clase: Mapped[Clase] = relationship(
        back_populates="reservas", lazy="subquery"
    )

    def __repr__(self):
        return f"<Reserva {self.reserva_id}>"

    def to_dict(self):
        return {
            "reserva_id": self.reserva_id,
            "cliente": self.cliente.to_dict(),
            "clase": self.clase.to_dict(),
            "fecha_reserva": self.fecha_reserva.strftime("%Y-%m-%d %H:%M:%S"),
        }
