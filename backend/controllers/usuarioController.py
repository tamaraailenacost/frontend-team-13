from http import HTTPStatus

from flask import Blueprint, request

from backend.services.usuarioService import UsuarioService

bp = Blueprint("usuario", __name__, url_prefix="/usuarios")


def create_usuario():
    """
    Crea un usuario
    :return: el usuario creado
    """
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return {
            "error": "Nombre, email y contrasenia son obligatorios"
        }, HTTPStatus.BAD_REQUEST

    usuario = UsuarioService.create_usuario(
        username,
        email,
        password,
    )

    return {
        "message": "Usuario creado exitosamente",
        "usuario": usuario,
    }, HTTPStatus.CREATED


def get_all_usuarios():
    """
    Obtiene todos los usuarios
    :return: lista de usuarios
    """
    usuarios = UsuarioService.get_all_usuarios()
    return {"usuarios": usuarios}


def get_usuario(usuario_id):
    """
    Obtiene un usuario por id
    :param usuario_id: id del usuario
    :return: el usuario
    """
    usuario = UsuarioService.get_usuario_by_id(usuario_id)
    return {"usuario": usuario}


def update_usuario(usuario_id):
    """
    Actualiza un usuario por id
    :param usuario_id: id del usuario
    :return: el usuario actualizado
    """
    data = request.json
    # Filtrar los campos no nulos
    campos_actualizar = {key: data[key] for key in data if data[key] is not None}

    usuario = UsuarioService.update_usuario(usuario_id, **campos_actualizar)
    return {
        "message": "Usuario actualizado exitosamente",
        "usuario_actualizado": usuario,
    }


def delete_usuario(usuario_id):
    """
    Elimina un usuario por id
    :param usuario_id: id del usuario
    :return: el usuario eliminado
    """
    UsuarioService.delete_usuario(usuario_id)
    return {"message": "Usuario eliminado exitosamente"}
