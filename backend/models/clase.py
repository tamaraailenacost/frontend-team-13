from typing import List

from sqlalchemy import Text, String, Integer, ForeignKey, Boolean
from sqlalchemy.orm import mapped_column, relationship, Mapped

from backend import db


class Clase(db.Model):
    __tablename__ = "clase"

    clase_id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(255), nullable=False)
    descripcion: Mapped[str] = mapped_column(Text)
    instructor_id: Mapped[int] = mapped_column(
        ForeignKey("empleado.empleado_id"),
    )
    capacidad_maxima: Mapped[int] = mapped_column(Integer)
    capacidad_actual: Mapped[int] = mapped_column(Integer, default=0)
    horario_id: Mapped[int] = mapped_column(ForeignKey("horario.horario_id"))
    url_imagen: Mapped[str] = mapped_column(String(255))
    activo: Mapped[bool] = mapped_column(Boolean, default=True)

    instructor: Mapped["Empleado"] = relationship(
        back_populates="clases",
        lazy="subquery",
        primaryjoin="Clase.instructor_id == Empleado.empleado_id",
    )

    horario: Mapped["Horario"] = relationship(
        back_populates="clases", lazy="subquery"
    )
    reservas: Mapped[List["Reserva"]] = relationship(
        back_populates="clase", lazy="subquery"
    )

    def __repr__(self):
        return f"<Clase {self.clase_id}>"

    def to_dict(self):
        return {
            "clase_id": self.clase_id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "instructor": self.instructor.to_dict(),
            "capacidad_maxima": self.capacidad_maxima,
            "capacidad_actual": self.capacidad_actual,
            "horario": self.horario.to_dict(),
            "url_imagen": self.url_imagen,
            "activo": self.activo,
        }

    def to_dict_simple(self):
        return {
            "clase_id": self.clase_id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "instructor_id": self.instructor_id,
            "capacidad_maxima": self.capacidad_maxima,
            "capacidad_actual": self.capacidad_actual,
            "horario_id": self.horario_id,
            "url_imagen": self.url_imagen,
            "activo": self.activo,
        }
