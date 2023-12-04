# backend/services/clase_service.py
from sqlalchemy import select

from backend import db
from backend.errors.exceptions import ClasesEmptyError, ClaseNotFoundError
from backend.models.clase import Clase
from backend.models.horario import Horario


class ClaseService:
    @staticmethod
    def create_clase(
        nombre,
        descripcion,
        instructor,
        capacidad_maxima,
        horario_id,
    ):
        """
        Crea una clase y la guarda en la base de datos
        :param nombre: nombre de la clase
        :param descripcion: descripcion de la clase
        :param instructor: instructor de la clase
        :param capacidad_maxima: capacidad maxima de la clase
        :param horario_id: id del horario de la clase
        :return: la clase creada
        """

        clase = Clase(
            nombre=nombre,
            descripcion=descripcion,
            instructor=instructor,
            capacidad_maxima=capacidad_maxima,
            horario_id=horario_id,
        )
        db.session.add(clase)
        db.session.commit()
        return clase.to_dict()

    @staticmethod
    def get_clase_by_id(clase_id):
        """
        Busca una clase por su id y la devuelve
        :param clase_id: id de la clase
        :return: la clase encontrada
        """
        clase = Clase.query.get(clase_id)
        if clase is None:
            raise ClaseNotFoundError()
        return clase.to_dict()

    @staticmethod
    def get_all_clases():
        """
        Devuelve todas las clases
        :return: lista de clases
        """
        clases = Clase.query.all()

        if not clases or len(clases) == 0:
            raise ClasesEmptyError()

        clases = [clase.to_dict() for clase in clases]

        return clases

    @staticmethod
    def update_clase(clase_id, **kwargs):
        """
        Busca una clase por su id y la actualiza con los nuevos datos y la devuelve
        :param clase_id: id de la clase
        :param kwargs: nuevos datos de la clase
        :return: la clase actualizada
        """

        clase = Clase.query.get(clase_id)
        if clase is None:
            raise ClaseNotFoundError()
        for key, value in kwargs.items():
            setattr(clase, key, value)
        db.session.commit()
        return clase.to_dict()

    @staticmethod
    def delete_clase(clase_id):
        """
        Busca una clase por su id, la elimina y la devuelve
        :param clase_id: id de la clase
        :return: la clase eliminada
        """

        clase = ClaseService.get_clase_by_id(clase_id)
        if clase:
            db.session.delete(clase)
            db.session.commit()

        return clase.to_dict()

    @staticmethod
    def get_clases_by_dia_semana_id(dia_semana_id):
        """
        Devuelve todas las clases de un dia de la semana
        :param dia_semana_id: id del dia de la semana
        :return: lista de clases
        """

        # Version 1 filtrado de clases por dia de la semana

        # dia_semana = DiaSemana.query.get(dia_semana_id)
        # if dia_semana is None:
        #     raise DiaSemanaNotFoundError()
        #
        # horarios = dia_semana.horarios
        #
        # if not horarios or len(horarios) == 0:
        #     raise ClasesEmptyError()
        #
        # # recuperar las clases de los horarios y agregarlas a la lista de clases
        # for horario in horarios:
        #     clases.append(horario.clases)
        #
        # if not clases or len(clases) == 0:
        #     raise ClasesEmptyError()

        # Version 2 filtrado de clases por dia de la semana
        stmt = select(Clase).join(Horario).where(Horario.dia_semana_id == dia_semana_id)

        clases = db.session.execute(stmt).scalars().all()

        clases = [clase.to_dict() for clase in clases]

        return clases
