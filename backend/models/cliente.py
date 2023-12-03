from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship

from backend import db
from backend.models.usuario import Usuario


class Cliente(db.Model):
    __tablename__ = 'cliente'

    cliente_id: Mapped[int] = mapped_column(primary_key=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey('usuario.usuario_id'), nullable=False)
    nombre: Mapped[str] = mapped_column(String(255))
    telefono: Mapped[str] = mapped_column(String(45))

    usuario: Mapped[Usuario] = relationship(back_populates="cliente")
    reservas: Mapped["Reserva"] = relationship(back_populates="cliente")

    def __repr__(self):
        return f'<Cliente {self.cliente_id}>'

    def to_dict(self):
        return {
            "cliente_id": self.cliente_id,
            "usuario": self.usuario.to_dict(),
            "nombre": self.nombre,
            "telefono": self.telefono,
        }

    def simple_to_dict(self):
        return {
            "cliente_id": self.cliente_id,
            "usuario_id": self.usuario_id,
            "nombre": self.nombre,
            "telefono": self.telefono,
        }
