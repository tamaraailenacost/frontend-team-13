# backend/routers/empleado_router.py
from flask import Blueprint

from backend.controllers.empleadoController import (
    create_empleado,
    get_all_empleados,
    get_empleado,
    update_empleado,
    delete_empleado,
    get_clases_empleado,
    get_all_instructores,
)

bp = Blueprint("empleado", __name__, url_prefix="/api/empleados")

bp.route("/", methods=["POST"])(create_empleado)
bp.route("/", methods=["GET"])(get_all_empleados)
bp.route("/<int:empleado_id>", methods=["GET"])(get_empleado)
bp.route("/<int:empleado_id>", methods=["PUT"])(update_empleado)
bp.route("/<int:empleado_id>", methods=["DELETE"])(delete_empleado)
bp.route("/<int:empleado_id>/clases", methods=["GET"])(get_clases_empleado)
bp.route("/instructores", methods=["GET"])(get_all_instructores)
