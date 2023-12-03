from backend import db
from backend.errors.exceptions import ClienteNotFoundError, ClientesEmptyError
from backend.models.cliente import Cliente


class ClienteService:
    @staticmethod
    def create_cliente(usuario_id, nombre, telefono):
        """
        Crea un nuevo cliente y lo guarda en la base de datos
        :param usuario_id: id del usuario
        :param nombre: nombre del cliente
        :param telefono: telefono del cliente
        :return: cliente
        """
        cliente = Cliente(usuario_id=usuario_id, nombre=nombre, telefono=telefono)
        db.session.add(cliente)
        db.session.commit()
        return cliente.to_dict()

    @staticmethod
    def get_cliente_by_id(cliente_id):
        """
        Busca un cliente por su id y lo devuelve
        :param cliente_id: id del cliente
        :return: cliente
        """
        cliente = Cliente.query.get(cliente_id)
        if cliente is None:
            raise ClienteNotFoundError()
        return cliente.to_dict()

    @staticmethod
    def get_all_clientes():
        """
        Devuelve todos los clientes
        :return: clientes
        """
        clientes = Cliente.query.all()

        if not clientes or len(clientes) == 0:
            raise ClientesEmptyError()

        clientes = [cliente.to_dict() for cliente in clientes]

        return clientes

    @staticmethod
    def update_cliente(cliente_id, **kwargs):
        """
        Busca un cliente por su id y lo actualiza con los nuevos datos y lo devuelve
        :param cliente_id:
        :param kwargs:
        :return: cliente
        """
        cliente = Cliente.query.get(cliente_id)
        if cliente is None:
            raise ClienteNotFoundError()
        for key, value in kwargs.items():
            setattr(cliente, key, value)
        db.session.commit()
        return cliente.to_dict()

    @staticmethod
    def delete_cliente(cliente_id):
        """
        Busca un cliente por su id, lo elimina y devuelve el cliente eliminado
        :param cliente_id:
        """
        cliente = ClienteService.get_cliente_by_id(cliente_id)
        if not cliente:
            raise ClienteNotFoundError()
        db.session.delete(cliente)
        db.session.commit()
