from typing import List

from sqlalchemy import String, ForeignKey, Date, Boolean
from sqlalchemy.orm import mapped_column, Mapped, relationship

from backend import db


class Empleado(db.Model):
    __tablename__ = "empleado"

    empleado_id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(255), nullable=False)
    dni: Mapped[str] = mapped_column(String(45), nullable=False)
    fecha_nacimiento: Mapped[Date] = mapped_column(Date)
    telefono: Mapped[str] = mapped_column(String(45))
    direccion: Mapped[str] = mapped_column(String(255))
    especialidad: Mapped[str] = mapped_column(String(255))
    url_imagen: Mapped[str] = mapped_column(String(255))
    fecha_alta: Mapped[Date] = mapped_column(Date, default=db.func.now())
    usuario_id: Mapped[int] = mapped_column(
        ForeignKey("usuario.usuario_id"), nullable=False
    )
    activo: Mapped[bool] = mapped_column(Boolean, default=True)

    usuario: Mapped["Usuario"] = relationship(back_populates="empleado")
    clases: Mapped[List["Clase"]] = relationship(
        back_populates="instructor", lazy="subquery"
    )

    def __repr__(self):
        return f"<Empleado {self.empleado_id}>"

    def to_dict(self):
        return {
            "empleado_id": self.empleado_id,
            "url_imagen": self.url_imagen,
            "nombre": self.nombre,
            "dni": self.dni,
            "fecha_nacimiento": str(self.fecha_nacimiento),
            "telefono": self.telefono,
            "direccion": self.direccion,
            "especialidad": self.especialidad,
            "fecha_alta": str(self.fecha_alta),
            "usuario": self.usuario.to_dict(),
            "activo": self.activo,
        }

    def simple_to_dict(self):
        return {
            "empleado_id": self.empleado_id,
            "usuario_id": self.usuario_id,
            "nombre": self.nombre,
            "especialidad": self.especialidad,
            "telefono": self.telefono,
            "direccion": self.direccion,
            "url_imagen": self.url_imagen,
            "fecha_nacimiento": str(self.fecha_nacimiento),
            "fecha_alta": str(self.fecha_alta),
            "activo": self.activo,
        }
