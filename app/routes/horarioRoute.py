from flask import Blueprint

from app.controllers.horarioController import create_horario, get_all_horarios, get_horario, update_horario, \
    delete_horario

bp = Blueprint("horario", __name__, url_prefix="/api/horarios")

bp.route("/", methods=["POST"])(create_horario)
bp.route("/", methods=["GET"])(get_all_horarios)
bp.route("/<int:horario_id>", methods=["GET"])(get_horario)
bp.route("/<int:horario_id>", methods=["PUT"])(update_horario)
bp.route("/<int:horario_id>", methods=["DELETE"])(delete_horario)
