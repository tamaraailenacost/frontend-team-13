from http import HTTPStatus

from flask import Blueprint, request

from backend.services.authService import AuthService

bp = Blueprint("auth", __name__, url_prefix="/auth")


def registrar_usuario():
    """
    Registra un usuario en la base de datos
    :return: Un diccionario con el mensaje de éxito y el usuario registrado
    """
    data = request.json
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if not username or not password or not email:
        return {
            "error": "Nombre de usuario, contraseña y correo electrónico son obligatorios"
        }, HTTPStatus.BAD_REQUEST

    usuario = AuthService.registrar_usuario(
        username,
        password,
        email,
    )
    return {
        "message": "Usuario registrado exitosamente",
        "usuario": usuario,
    }, HTTPStatus.CREATED


def login():
    """
    Inicia sesión en la aplicación
    :return: Un diccionario con el mensaje de éxito y el usuario que inició sesión
    """
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {
            "error": "Nombre de usuario y contraseña son obligatorios"
        }, HTTPStatus.BAD_REQUEST

    usuario = AuthService.login(email, password)
    return {
        "message": "Inicio de sesión exitoso",
        "usuario": usuario,
    }, HTTPStatus.OK


def eliminar_cuenta():
    """
    Elimina la cuenta de un usuario
    :return: Un diccionario con el mensaje de éxito
    """
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {
            "error": "Nombre de usuario y contraseña son obligatorios"
        }, HTTPStatus.BAD_REQUEST

    AuthService.eliminar_cuenta(email, password)
    return {"message": "Cuenta eliminada exitosamente"}, HTTPStatus.OK
