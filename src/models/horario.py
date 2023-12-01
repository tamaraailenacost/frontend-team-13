from sqlalchemy import ForeignKey, Time
from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy.orm.decl_api import DeclarativeMeta, declarative_base, DeclarativeBase
from app import db
from app.models.diaSemana import DiaSemana


class Horario(db.Model):
    __tablename__ = 'horario'

    horario_id: Mapped[int] = mapped_column(primary_key=True)
    dia_semana_id: Mapped[int] = mapped_column(ForeignKey('dia_semana.dia_semana_id'), nullable=False)
    hora_inicio: Mapped[Time] = mapped_column(Time, nullable=False)
    hora_fin: Mapped[Time] = mapped_column(Time, nullable=False)

    dia_semana: Mapped[DiaSemana] = relationship('DiaSemana', back_populates='horarios')
    clases: Mapped[list] = relationship('Clase', back_populates='horario')

    def __repr__(self):
        return f'<Horario {self.horario_id}>'

    def __str__(self):
        return f'<Horario {self.horario_id}>'

    def to_dict(self):
        return {
            "horario_id": self.horario_id,
            "dia_semana": self.dia_semana.to_dict(),
            "hora_inicio": self.hora_inicio.strftime("%H:%M:%S"),
            "hora_fin": self.hora_fin.strftime("%H:%M:%S"),
        }
