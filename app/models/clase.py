from typing import List

from sqlalchemy import Text, String, Integer, ForeignKey
from sqlalchemy.orm import mapped_column, relationship, Mapped

from app import db
from app.models.horario import Horario


class Clase(db.Model):
    __tablename__ = 'clase'

    clase_id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(255), nullable=False)
    descripcion: Mapped[str] = mapped_column(Text)
    instructor: Mapped[str] = mapped_column(String(255))
    capacidad_maxima: Mapped[int] = mapped_column(Integer)
    horario_id: Mapped[int] = mapped_column(ForeignKey('horario.horario_id'))

    horario: Mapped[Horario] = relationship(back_populates="clases")
    reservas: Mapped[List["Reserva"]] = relationship(back_populates="clase")

    def __repr__(self):
        return f'<Clase {self.clase_id}>'

    def to_dict(self):
        return {
            "clase_id": self.clase_id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "instructor": self.instructor,
            "capacidad_maxima": self.capacidad_maxima,
            "horario": self.horario.to_dict()
        }

    def to_dict_simple(self):
        return {
            "clase_id": self.clase_id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "instructor": self.instructor,
            "capacidad_maxima": self.capacidad_maxima,
            "horario_id": self.horario_id
        }
