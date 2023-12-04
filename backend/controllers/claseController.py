from http import HTTPStatus

from flask import Blueprint, request

from backend.services.claseService import ClaseService

bp = Blueprint("clase", __name__, url_prefix="/clases")


def create_clase():
    """
    Crea una clase y la guarda en la base de datos
    :return: la clase creada
    """
    data = request.json
    nombre = data.get("nombre")
    descripcion = data.get("descripcion")
    instructor = data.get("instructor")
    capacidad_maxima = data.get("capacidad_maxima")
    horario_id = data.get("horario_id")

    if not nombre or not horario_id:
        return ({"error": "Nombre y horario_id son obligatorios"}), 400

    clase = ClaseService.create_clase(
        nombre,
        descripcion,
        instructor,
        capacidad_maxima,
        horario_id,
    )

    return (
        {"message": "Clase creada exitosamente", "clase": clase}
    ), HTTPStatus.CREATED


def get_all_clases():
    """
    Devuelve todas las clases o las clases de un día de la semana si se proporciona el ID de día de la semana
    :arg dia_semana_id: ID de día de la semana
    :return: lista de clases
    """
    dia_semana_id = request.args.get("dia_semana_id")

    if dia_semana_id:
        # Aplicar lógica de filtrado por ID de día de la semana
        clases = ClaseService.get_clases_by_dia_semana_id(dia_semana_id)
    else:
        # Obtener todas las clases si no se proporcionan parámetros de consulta
        clases = ClaseService.get_all_clases()

    return {"clases": clases}


def get_clase(clase_id):
    """
    Busca una clase por su id y la devuelve
    :param clase_id: id de la clase
    :return: la clase encontrada
    """
    clase = ClaseService.get_clase_by_id(clase_id)
    return {"clase": clase}


def update_clase(clase_id):
    """
    Busca una clase por su id y la actualiza con los nuevos datos y la devuelve
    :param clase_id: id de la clase
    :return: la clase actualizada
    """
    data = request.json
    # Filtrar los campos no nulos
    campos_actualizar = {
        key: data[key] for key in data if data[key] is not None
    }

    clase = ClaseService.update_clase(clase_id, **campos_actualizar)
    return {
        "message": "Clase actualizada exitosamente",
        "clase_actualizada": clase,
    }


def delete_clase(clase_id):
    """
    Busca una clase por su id y la elimina
    :param clase_id: id de la clase
    :return: la clase eliminada
    """
    clase = ClaseService.delete_clase(clase_id)
    return {"message": "Clase eliminada exitosamente", "clase_eliminada": clase}
