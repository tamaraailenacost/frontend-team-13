# En tu archivo backend/errors/__init__.py
from http import HTTPStatus

from flask import jsonify

from .exceptions import (
    ClaseNotFoundError,
    ClasesEmptyError,
    TipoUsuarioNotFoundError,
    TiposUsuariosEmptyError,
    HorariosEmptyError,
    HorarioNotFoundError,
    UsuarioNotFoundError,
    UsuariosEmptyError,
    ReservasEmptyError,
    ReservaNotFoundError,
    ClienteNotFoundError,
    ClientesEmptyError,
    DiaSemanaNotFoundError,
    CuentaExistenteError,
)


def create_error_handler(error_class, http_status):
    """
    Crea un manejador de errores para una clase de error y un código de estado HTTP específicos.
    :param error_class: Clase de error
    :param http_status: Código de estado HTTP
    :return: Manejador de errores
    """

    def error_handler(error):
        return jsonify({"error": str(error)}), http_status

    return error_handler


def register_error_handlers(app):
    """
    Registra manejadores de errores para la aplicación Flask.
    :param app: Aplicación Flask
    """

    @app.errorhandler(500)
    def internal_error(error):
        """
        Manejador de errores para errores internos del servidor.
        :param error: Error interno del servidor
        :return: Respuesta JSON con el error y el código de estado HTTP
        """
        return jsonify({"error": str(error)}), HTTPStatus.INTERNAL_SERVER_ERROR

    @app.errorhandler(404)
    def not_found_error(error):
        """
        Manejador de errores para errores de recurso no encontrado.
        :param error: Error de recurso no encontrado
        :return: Respuesta JSON con el error y el código de estado HTTP
        """
        return jsonify({"error": str(error)}), HTTPStatus.NOT_FOUND

    # Manejadores de errores personalizados

    # Crear manejadores de errores usando la función genérica

    error_handlers = [
        (CuentaExistenteError, HTTPStatus.BAD_REQUEST),
        (ClaseNotFoundError, HTTPStatus.NOT_FOUND),
        (ClasesEmptyError, HTTPStatus.NO_CONTENT),
        (HorariosEmptyError, HTTPStatus.NO_CONTENT),
        (HorarioNotFoundError, HTTPStatus.NOT_FOUND),
        (DiaSemanaNotFoundError, HTTPStatus.NOT_FOUND),
        (ClienteNotFoundError, HTTPStatus.NOT_FOUND),
        (ClientesEmptyError, HTTPStatus.NO_CONTENT),
        (TipoUsuarioNotFoundError, HTTPStatus.NOT_FOUND),
        (UsuarioNotFoundError, HTTPStatus.NOT_FOUND),
        (UsuariosEmptyError, HTTPStatus.NO_CONTENT),
        (TiposUsuariosEmptyError, HTTPStatus.NO_CONTENT),
        (ReservasEmptyError, HTTPStatus.NO_CONTENT),
        (ReservaNotFoundError, HTTPStatus.NOT_FOUND),
    ]

    for error_class, http_status in error_handlers:
        app.errorhandler(error_class)(create_error_handler(error_class, http_status))
