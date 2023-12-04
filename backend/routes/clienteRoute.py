from flask import Blueprint

from backend.controllers.clienteController import (
    create_cliente,
    get_all_clientes,
    get_cliente,
    update_cliente,
    delete_cliente,
    get_reservas_cliente,
)

bp = Blueprint("cliente", __name__, url_prefix="/api/clientes")

bp.route("/", methods=["POST"])(create_cliente)
bp.route("/", methods=["GET"])(get_all_clientes)
bp.route("/<int:cliente_id>", methods=["GET"])(get_cliente)
bp.route("/<int:cliente_id>", methods=["PUT"])(update_cliente)
bp.route("/<int:cliente_id>", methods=["DELETE"])(delete_cliente)
bp.route("/<int:cliente_id>/reservas", methods=["GET"])(get_reservas_cliente)
