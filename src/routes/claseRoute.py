# app/routes/clase_routes.py


from flask import Blueprint

from src.controllers.claseController import create_clase, get_all_clases, get_clase, update_clase, delete_clase

bp = Blueprint("clase", __name__, url_prefix="/clases")

bp.route("/", methods=["POST"])(create_clase)
bp.route("/", methods=["GET"])(get_all_clases)
bp.route("/<int:clase_id>", methods=["GET"])(get_clase)
bp.route("/<int:clase_id>", methods=["PUT"])(update_clase)
bp.route("/<int:clase_id>", methods=["DELETE"])(delete_clase)
