from sqlalchemy import String
from sqlalchemy.orm import declarative_base, mapped_column, Mapped, relationship, DeclarativeBase
from app import db


class DiaSemana(db.Model):
    __tablename__ = 'dia_semana'

    dia_semana_id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(45), nullable=False)

    horarios: Mapped[list] = relationship('Horario', back_populates='dia_semana')

    def __repr__(self):
        return f'<DiaSemana {self.dia_semana_id}>'

    def __str__(self):
        return f'<DiaSemana {self.dia_semana_id}>'

    def to_dict(self):
        return {
            "dia_semana_id": self.dia_semana_id,
            "nombre": self.nombre,
        }
