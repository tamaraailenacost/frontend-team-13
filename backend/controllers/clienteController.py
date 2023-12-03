from http import HTTPStatus

from flask import Blueprint, request

from backend.services.clienteService import ClienteService

bp = Blueprint("cliente", __name__, url_prefix="/clientes")


def create_cliente():
    """
    Crea un cliente con los datos recibidos
    :return: el cliente creado
    """
    data = request.json
    usuario_id = data.get("usuario_id")
    nombre = data.get("nombre")
    telefono = data.get("telefono")

    if not usuario_id or not nombre:
        return {"error": "Usuario ID y nombre son obligatorios"}, HTTPStatus.BAD_REQUEST

    cliente = ClienteService.create_cliente(usuario_id, nombre, telefono)

    return {"message": "Cliente creado exitosamente", "cliente": cliente}, HTTPStatus.CREATED


def get_all_clientes():
    """
    Obtiene todos los clientes
    :return: los clientes
    """
    clientes = ClienteService.get_all_clientes()
    return {"clientes": clientes}


def get_cliente(cliente_id):
    """
    Obtiene un cliente por id
    :param cliente_id: id del cliente
    :return: el cliente
    """
    cliente = ClienteService.get_cliente_by_id(cliente_id)
    return {"cliente": cliente}


def update_cliente(cliente_id):
    """
    Actualiza un cliente por id
    :param cliente_id: id del cliente
    :return: el cliente actualizado
    """
    data = request.json
    campos_actualizar = {key: data[key] for key in data if data[key] is not None}

    cliente = ClienteService.update_cliente(cliente_id, **campos_actualizar)
    return {"message": "Cliente actualizado exitosamente", "cliente_actualizado": cliente}


def delete_cliente(cliente_id):
    """
    Elimina un cliente por id
    :param cliente_id: id del cliente
    :return: mensaje de exito
    """
    ClienteService.delete_cliente(cliente_id)
    return {"message": "Cliente eliminado exitosamente"}
