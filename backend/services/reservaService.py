from backend import db
from backend.errors.exceptions import ReservasEmptyError, ReservaNotFoundError
from backend.models.reserva import Reserva


class ReservaService:
    @staticmethod
    def create_reserva(cliente_id, clase_id):
        """
        Crea una reserva y la guarda en la base de datos
        :param cliente_id: id del cliente
        :param clase_id: id de la clase
        :return: reserva creada
        """
        reserva = Reserva(cliente_id=cliente_id, clase_id=clase_id)
        db.session.add(reserva)
        db.session.commit()
        return reserva.to_dict()

    @staticmethod
    def get_reserva_by_id(reserva_id):
        """
        Busca una reserva por su id y la devuelve
        :param reserva_id: id de la reserva
        :return: reserva encontrada
        """
        reserva = Reserva.query.get(reserva_id)
        if reserva is None:
            raise ReservaNotFoundError()
        return reserva.to_dict()

    @staticmethod
    def get_all_reservas():
        """
        Devuelve todas las reservas
        :return: lista de reservas
        """
        reservas = Reserva.query.all()

        if not reservas or len(reservas) == 0:
            raise ReservasEmptyError()

        reservas = [reserva.to_dict() for reserva in reservas]

        return reservas

    @staticmethod
    def update_reserva(reserva_id, **kwargs):
        """
        Actualiza una reserva por su id y la devuelve
        :param reserva_id: id de la reserva
        :param kwargs: campos a actualizar
        :return: reserva actualizada
        """
        reserva = Reserva.query.get(reserva_id)
        if reserva is None:
            raise ReservaNotFoundError()
        for key, value in kwargs.items():
            setattr(reserva, key, value)
        db.session.commit()
        return reserva.to_dict()

    @staticmethod
    def delete_reserva(reserva_id):
        """
        Busca una reserva por su id y la elimina
        :param reserva_id: id de la reserva
        :return: reserva eliminada
        """
        reserva = ReservaService.get_reserva_by_id(reserva_id)
        if reserva:
            db.session.delete(reserva)
            db.session.commit()

        return reserva.to_dict()
