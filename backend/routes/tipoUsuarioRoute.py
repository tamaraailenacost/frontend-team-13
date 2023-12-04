from flask import Blueprint

from backend.controllers.tipoUsuarioController import (
    create_tipo_usuario,
    get_all_tipos_usuarios,
    get_tipo_usuario,
    update_tipo_usuario,
    delete_tipo_usuario,
)

bp = Blueprint("tipo_usuario", __name__, url_prefix="/api/tipo_usuarios")

bp.route("/", methods=["POST"])(create_tipo_usuario)
bp.route("/", methods=["GET"])(get_all_tipos_usuarios)
bp.route("/<int:tipo_usuario_id>", methods=["GET"])(get_tipo_usuario)
bp.route("/<int:tipo_usuario_id>", methods=["PUT"])(update_tipo_usuario)
bp.route("/<int:tipo_usuario_id>", methods=["DELETE"])(delete_tipo_usuario)
