from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import mapped_column, relationship, Mapped

from app import db
from app.models.tipoUsuario import TipoUsuario


class Usuario(db.Model):
    __tablename__ = 'usuario'

    usuario_id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    tipo_usuario_id: Mapped[int] = mapped_column(ForeignKey('tipo_usuario.tipo_usuario_id'), nullable=False, default=3)

    tipo_usuario: Mapped[TipoUsuario] = relationship(back_populates="usuarios", lazy="subquery")

    cliente: Mapped["Cliente"] = relationship(back_populates="usuario")

    def __repr__(self):
        return f'<Usuario {self.usuario_id}>'

    def to_dict(self):
        return {
            "usuario_id": self.usuario_id,
            "nombre": self.username,
            "email": self.email,
            "tipo_usuario": self.tipo_usuario.to_dict()
        }
