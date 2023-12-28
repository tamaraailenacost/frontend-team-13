from typing import List

from sqlalchemy import String, ForeignKey, Boolean
from sqlalchemy.orm import mapped_column, relationship, Mapped

from backend import db


class Cliente(db.Model):
    __tablename__ = "cliente"

    cliente_id: Mapped[int] = mapped_column(primary_key=True)
    usuario_id: Mapped[int] = mapped_column(
        ForeignKey("usuario.usuario_id"), nullable=False
    )
    nombre: Mapped[str] = mapped_column(String(255))
    telefono: Mapped[str] = mapped_column(String(45))
    url_imagen: Mapped[str] = mapped_column(String(255))
    activo: Mapped[bool] = mapped_column(Boolean, default=True)

    usuario: Mapped["Usuario"] = relationship(back_populates="cliente")
    reservas: Mapped[List["Reserva"]] = relationship(back_populates="cliente")

    def __repr__(self):
        return f"<Cliente {self.cliente_id}>"

    def to_dict(self):
        return {
            "cliente_id": self.cliente_id,
            "usuario": self.usuario.to_dict(),
            "nombre": self.nombre,
            "telefono": self.telefono,
            "url_imagen": self.url_imagen,
            "activo": self.activo,
        }

    def simple_to_dict(self):
        return {
            "cliente_id": self.cliente_id,
            "usuario_id": self.usuario_id,
            "nombre": self.nombre,
            "telefono": self.telefono,
            "url_imagen": self.url_imagen,
            "activo": self.activo,
        }
