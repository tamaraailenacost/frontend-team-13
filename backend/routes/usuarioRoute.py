from flask import Blueprint

from backend.controllers.usuarioController import create_usuario, get_all_usuarios, get_usuario, update_usuario, \
    delete_usuario

bp = Blueprint("usuario", __name__, url_prefix="/api/usuarios")

bp.route("/", methods=["POST"])(create_usuario)
bp.route("/", methods=["GET"])(get_all_usuarios)
bp.route("/<int:usuario_id>", methods=["GET"])(get_usuario)
bp.route("/<int:usuario_id>", methods=["PUT"])(update_usuario)
bp.route("/<int:usuario_id>", methods=["DELETE"])(delete_usuario)
