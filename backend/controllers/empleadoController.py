# backend/controllers/empleado_controller.py
from http import HTTPStatus

from flask import Blueprint, request

from backend.services.empleadoService import EmpleadoService

bp = Blueprint("empleado", __name__, url_prefix="/empleados")


def create_empleado():
    """
    Crea un empleado y lo guarda en la base de datos
    :return: el empleado creado
    """

    data = request.form
    nombre = data.get("nombre")
    dni = data.get("dni")
    fecha_nacimiento = data.get("fecha_nacimiento")
    email = data.get("email")
    telefono = data.get("telefono")
    direccion = data.get("direccion")
    especialidad = data.get("especialidad")

    # Obtener archivo de imagen
    imagen = request.files.get("imagen")

    if not nombre or not dni or not fecha_nacimiento:
        raise Exception("Faltan datos")

    empleado = EmpleadoService.create_empleado(
        nombre,
        dni,
        fecha_nacimiento,
        email,
        telefono,
        direccion,
        especialidad,
        imagen,
    )

    return (
        {"message": "Empleado creado exitosamente", "empleado": empleado}
    ), HTTPStatus.CREATED


def get_all_empleados():
    """
    Devuelve todos los empleados
    :return: lista de empleados
    """
    empleados = EmpleadoService.get_all_empleados()

    return {"empleados": empleados}


def get_empleado(empleado_id):
    """
    Busca un empleado por su id y lo devuelve
    :param empleado_id: id del empleado
    :return: el empleado encontrado
    """
    empleado = EmpleadoService.get_empleado_by_id(empleado_id)
    return {"empleado": empleado}


def update_empleado(empleado_id):
    """
    Busca un empleado por su id y lo actualiza con los nuevos datos y lo devuelve
    :param empleado_id: id del empleado
    :return: el empleado actualizado
    """
    data = request.form

    # Filtrar los campos no nulos
    campos_actualizar = {
        key: data[key] for key in data if data[key] is not None
    }

    # Obtener archivo de imagen
    imagen = request.files.get("imagen")

    empleado = EmpleadoService.update_empleado(
        empleado_id, imagen, **campos_actualizar
    )
    return {
        "message": "Empleado actualizado exitosamente",
        "empleado_actualizado": empleado,
    }


def delete_empleado(empleado_id):
    """
    Busca un empleado por su id, lo elimina y lo devuelve
    :param empleado_id: id del empleado
    :return: el empleado eliminado
    """
    EmpleadoService.delete_empleado(empleado_id)
    return {"message": "Empleado eliminado exitosamente"}


def get_clases_empleado(empleado_id):
    """
    Busca las clases de un empleado por su id y las devuelve
    :param empleado_id: id del empleado
    :return: las clases del empleado
    """
    clases = EmpleadoService.get_clases_empleado(empleado_id)
    return {"clases": clases}


def get_all_instructores():
    """
    Devuelve todos los instructores
    :return: lista de instructores
    """
    instructores = EmpleadoService.get_all_instructores()
    return {"instructores": instructores}
