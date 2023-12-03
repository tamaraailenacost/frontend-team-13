from flask import Blueprint

from app.controllers.reservaController import create_reserva, get_all_reservas, get_reserva, update_reserva, \
    delete_reserva

bp = Blueprint("reserva", __name__, url_prefix="/api/reservas")

bp.route("/", methods=["POST"])(create_reserva)
bp.route("/", methods=["GET"])(get_all_reservas)
bp.route("/<int:reserva_id>", methods=["GET"])(get_reserva)
bp.route("/<int:reserva_id>", methods=["PUT"])(update_reserva)
bp.route("/<int:reserva_id>", methods=["DELETE"])(delete_reserva)
