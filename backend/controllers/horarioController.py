from http import HTTPStatus

from flask import Blueprint, request

from backend.services.horarioService import HorarioService

bp = Blueprint("horario", __name__, url_prefix="/horarios")


def create_horario():
    """
    Crea un horario
    :return: el horario creado
    """
    data = request.json
    dia_semana_id = data.get("dia_semana_id")
    hora_inicio = data.get("hora_inicio")
    hora_fin = data.get("hora_fin")

    if not dia_semana_id or not hora_inicio or not hora_fin:
        return {
            "error": "Dia semana, hora inicio y hora fin son obligatorios"
        }, HTTPStatus.BAD_REQUEST

    horario = HorarioService.create_horario(dia_semana_id, hora_inicio, hora_fin)

    return {
        "message": "Horario creado exitosamente",
        "horario": horario,
    }, HTTPStatus.CREATED


def get_all_horarios():
    """
    Obtiene todos los horarios
    :return: los horarios
    """
    horarios = HorarioService.get_all_horarios()
    return {"horarios": horarios}


def get_horario(horario_id):
    """
    Obtiene un horario por id
    :param horario_id: id del horario
    :return: el horario
    """
    horario = HorarioService.get_horario_by_id(horario_id)
    return {"horario": horario}


def update_horario(horario_id):
    """
    Actualiza un horario por id
    :param horario_id: id del horario
    :return: el horario actualizado
    """
    data = request.json
    # Filtrar los campos no nulos
    campos_actualizar = {key: data[key] for key in data if data[key] is not None}

    horario = HorarioService.update_horario(horario_id, **campos_actualizar)
    return {
        "message": "Horario actualizado exitosamente",
        "horario_actualizado": horario,
    }


def delete_horario(horario_id):
    """
    Elimina un horario por id
    :param horario_id: id del horario
    :return: mensaje de exito
    """
    HorarioService.delete_horario(horario_id)
    return {"message": "Horario eliminado exitosamente"}
