from http import HTTPStatus

from flask import request

from backend.services.reservaService import ReservaService


def create_reserva():
    """
    Crea una reserva
    :return: la reserva creada
    """
    data = request.json
    cliente_id = data.get("cliente_id")
    clase_id = data.get("clase_id")

    if not cliente_id or not clase_id:
        return {
            "error": "Cliente_id y clase_id son obligatorios"
        }, HTTPStatus.BAD_REQUEST

    reserva = ReservaService.create_reserva(cliente_id, clase_id)

    return {
        "message": "Reserva creada exitosamente",
        "reserva": reserva,
    }, HTTPStatus.CREATED


def get_all_reservas():
    """
    Obtiene todas las reservas
    :return: las reservas
    """
    reservas = ReservaService.get_all_reservas()
    return {"reservas": reservas}


def get_reserva(reserva_id):
    """
    Obtiene una reserva por id
    :param reserva_id: id de la reserva
    :return: la reserva
    """
    reserva = ReservaService.get_reserva_by_id(reserva_id)
    return {"reserva": reserva}


def update_reserva(reserva_id):
    """
    Actualiza una reserva por id
    :param reserva_id: id de la reserva
    :return: la reserva actualizada
    """
    data = request.json
    campos_actualizar = {key: data[key] for key in data if data[key] is not None}

    reserva = ReservaService.update_reserva(reserva_id, **campos_actualizar)
    return {
        "message": "Reserva actualizada exitosamente",
        "reserva_actualizada": reserva,
    }


def delete_reserva(reserva_id):
    """
    Elimina una reserva por id
    :param reserva_id: id de la reserva
    :return: la reserva eliminada
    """
    ReservaService.delete_reserva(reserva_id)
    return {"message": "Reserva eliminada exitosamente"}
