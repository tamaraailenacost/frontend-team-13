from app import db
from app.errors.exceptions import HorariosEmptyError, HorarioNotFoundError
from app.models.horario import Horario


class HorarioService:
    @staticmethod
    def create_horario(dia_semana_id, hora_inicio, hora_fin):
        """
        Crea un nuevo horario y lo guarda en la base de datos
        :param dia_semana_id: id del dia de la semana
        :param hora_inicio: hora de inicio
        :param hora_fin: hora de fin
        :return: horario creado
        """
        horario = Horario(dia_semana_id=dia_semana_id, hora_inicio=hora_inicio, hora_fin=hora_fin)
        db.session.add(horario)
        db.session.commit()
        return horario.to_dict()

    @staticmethod
    def get_horario_by_id(horario_id):
        """
        Busca un horario por su id y lo devuelve
        :param horario_id: id del horario
        :return: horario encontrado
        """
        horario = Horario.query.get(horario_id)
        if horario is None:
            raise HorarioNotFoundError()
        return horario.to_dict()

    @staticmethod
    def get_all_horarios():
        """
        Devuelve todos los horarios
        :return: lista de horarios
        """
        horarios = Horario.query.all()

        if not horarios or len(horarios) == 0:
            raise HorariosEmptyError()

        horarios = [horario.to_dict() for horario in horarios]

        return horarios

    @staticmethod
    def update_horario(horario_id, **kwargs):
        """
        Actualiza un horario y lo devuelve
        :param horario_id: id del horario
        :param kwargs: campos a actualizar
        :return: horario actualizado
        """
        horario = Horario.query.get(horario_id)
        if horario is None:
            raise HorarioNotFoundError()
        for key, value in kwargs.items():
            setattr(horario, key, value)
        db.session.commit()
        return horario.to_dict()

    @staticmethod
    def delete_horario(horario_id):
        """
        Busca un horario por su id, lo elimina y lo devuelve
        :param horario_id: id del horario
        :return: horario eliminado
        """
        horario = HorarioService.get_horario_by_id(horario_id)
        if horario:
            db.session.delete(horario)
            db.session.commit()
