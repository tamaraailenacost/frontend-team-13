from typing import List

from sqlalchemy import String
from sqlalchemy.orm import mapped_column, Mapped, relationship

from backend import db


class TipoUsuario(db.Model):
    __tablename__ = 'tipo_usuario'

    tipo_usuario_id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(80), nullable=False)

    usuarios: Mapped[List["Usuario"]] = relationship(back_populates='tipo_usuario')

    def __repr__(self):
        return f'<TipoUsuario {self.tipo_usuario_id}>'

    def to_dict(self):
        return {
            "tipo_usuario_id": self.tipo_usuario_id,
            "nombre": self.nombre
        }
