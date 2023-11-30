from http import HTTPStatus

from flask import Blueprint, request, jsonify

from app.services.claseService import ClaseService

bp = Blueprint("clase", __name__, url_prefix="/clases")


@bp.route("/", methods=["POST"])
def create_clase():
    data = request.json
    nombre = data.get("nombre")
    descripcion = data.get("descripcion")
    instructor = data.get("instructor")
    capacidad_maxima = data.get("capacidad_maxima")
    horario_id = data.get("horario_id")

    if not nombre or not horario_id:
        return ({"error": "Nombre y horario_id son obligatorios"}), 400

    clase = ClaseService.create_clase(nombre, descripcion, instructor, capacidad_maxima, horario_id)

    return ({"message": "Clase creada exitosamente", "clase": clase}), HTTPStatus.CREATED


@bp.route("/", methods=["GET"])
def get_all_clases():
    clases = ClaseService.get_all_clases()
    return {"clases": clases}


@bp.route("/<int:clase_id>", methods=["GET"])
def get_clase(clase_id):
    clase = ClaseService.get_clase_by_id(clase_id)
    return {"clase": clase}


@bp.route("/<int:clase_id>", methods=["PUT"])
def update_clase(clase_id):
    data = request.json
    # Filtrar los campos no nulos
    campos_actualizar = {key: data[key] for key in data if data[key] is not None}

    clase = ClaseService.update_clase(clase_id, **campos_actualizar)
    return {"message": "Clase actualizada exitosamente", "clase_actualizada": clase}


@bp.route("/<int:clase_id>", methods=["DELETE"])
def delete_clase(clase_id):
    clase = ClaseService.delete_clase(clase_id)
    return {"message": "Clase eliminada exitosamente"}
