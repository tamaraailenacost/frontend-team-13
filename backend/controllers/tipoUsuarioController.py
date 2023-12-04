from http import HTTPStatus

from flask import Blueprint, request

from backend.services.tipoUsuarioService import TipoUsuarioService

bp = Blueprint("tipo_usuario", __name__, url_prefix="/tipo_usuarios")


def create_tipo_usuario():
    data = request.json
    nombre = data.get("nombre")

    if not nombre:
        return ({"error": "Nombre es obligatorio"}), HTTPStatus.BAD_REQUEST

    tipo_usuario = TipoUsuarioService.create_tipo_usuario(nombre)

    return (
        {"message": "Tipo de usuario creado exitosamente", "tipo_usuario": tipo_usuario}
    ), HTTPStatus.CREATED


def get_all_tipos_usuarios():
    """
    Obtiene todos los tipos de usuarios
    :return: lista de tipos de usuarios
    """
    tipos_usuarios = TipoUsuarioService.get_all_tipos_usuarios()
    return {"tipos_usuarios": tipos_usuarios}


def get_tipo_usuario(tipo_usuario_id):
    """
    Obtiene un tipo de usuario por id
    :param tipo_usuario_id: id del tipo de usuario
    :return: el tipo de usuario
    """
    tipo_usuario = TipoUsuarioService.get_tipo_usuario_by_id(tipo_usuario_id)
    return {"tipo_usuario": tipo_usuario}


def update_tipo_usuario(tipo_usuario_id):
    """
    Actualiza un tipo de usuario por id
    :param tipo_usuario_id: id del tipo de usuario
    :return:
    """
    data = request.json
    # Filtrar los campos no nulos
    campos_actualizar = {key: data[key] for key in data if data[key] is not None}

    tipo_usuario = TipoUsuarioService.update_tipo_usuario(
        tipo_usuario_id, **campos_actualizar
    )
    return {
        "message": "Tipo de usuario actualizado exitosamente",
        "tipo_usuario_actualizado": tipo_usuario,
    }


def delete_tipo_usuario(tipo_usuario_id):
    """
    Elimina un tipo de usuario por id
    :param tipo_usuario_id: id del tipo de usuario
    :return: el tipo de usuario eliminado
    """
    TipoUsuarioService.delete_tipo_usuario(tipo_usuario_id)
    return {"message": "Tipo de usuario eliminado exitosamente"}
