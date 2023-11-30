from flask import Blueprint

from src.backend.controllers.calendarController import index, show_class, insert_clase_in_list, delete_clase_in_list

bp = Blueprint("calendar", __name__, url_prefix="/calendario")

bp.route("/")(index)
bp.route("/<date>")(show_class)
bp.route("/<claseId>")(insert_clase_in_list)
bp.route("/api/<claseId>", methods=["DELETE"])(delete_clase_in_list)
