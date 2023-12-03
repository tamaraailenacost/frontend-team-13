from flask import Blueprint

from app.controllers.authController import registrar_usuario, login, eliminar_cuenta

bp = Blueprint("auth", __name__, url_prefix="/api/auth")

bp.route("/registrar", methods=["POST"])(registrar_usuario)
bp.route("/login", methods=["POST"])(login)
bp.route("/borrar", methods=["DELETE"])(eliminar_cuenta)
