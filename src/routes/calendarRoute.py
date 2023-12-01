from flask import Blueprint

from src.controllers.calendarController import calendario, show_class, insert_clase_in_list, delete_clase_in_list

bp = Blueprint("calendar", __name__, url_prefix="/calendario")

bp.route("/")(calendario)
bp.route("/<date>")(show_class)
bp.route("/<claseId>")(insert_clase_in_list)
bp.route("/api/<claseId>", methods=["DELETE"])(delete_clase_in_list)
