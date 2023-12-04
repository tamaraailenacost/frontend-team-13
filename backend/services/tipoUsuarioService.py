from backend import db
from backend.errors.exceptions import (
    TipoUsuarioNotFoundError,
    TiposUsuariosEmptyError,
)
from backend.models.tipoUsuario import TipoUsuario


class TipoUsuarioService:
    @staticmethod
    def create_tipo_usuario(nombre):
        """
        Crea un nuevo tipo de usuario y lo guarda en la base de datos
        :param nombre: nombre del tipo de usuario
        :return: el tipo de usuario creado
        """
        tipo_usuario = TipoUsuario(nombre=nombre)
        db.session.add(tipo_usuario)
        db.session.commit()
        return tipo_usuario.to_dict()

    @staticmethod
    def get_tipo_usuario_by_id(tipo_usuario_id):
        """
        Busca un tipo de usuario por su id y lo devuelve
        :param tipo_usuario_id: id del tipo de usuario
        :return: el tipo de usuario encontrado
        """

        tipo_usuario = TipoUsuario.query.get(tipo_usuario_id)
        if tipo_usuario is None:
            raise TipoUsuarioNotFoundError()
        return tipo_usuario.to_dict()

    @staticmethod
    def get_all_tipos_usuarios():
        """
        Busca todos los tipos de usuarios y los devuelve
        :return: lista de tipos de usuarios
        """
        tipos_usuarios = TipoUsuario.query.all()

        if not tipos_usuarios or len(tipos_usuarios) == 0:
            raise TiposUsuariosEmptyError()

        tipos_usuarios = [
            tipo_usuario.to_dict() for tipo_usuario in tipos_usuarios
        ]

        return tipos_usuarios

    @staticmethod
    def update_tipo_usuario(tipo_usuario_id, **kwargs):
        """
        Busca un tipo de usuario por su id, lo actualiza con los nuevos datos y lo devuelve
        :param tipo_usuario_id: id del tipo de usuario
        :param kwargs: datos a actualizar
        :return: el tipo de usuario actualizado
        """
        tipo_usuario = TipoUsuario.query.get(tipo_usuario_id)
        if tipo_usuario is None:
            raise TipoUsuarioNotFoundError()
        for key, value in kwargs.items():
            setattr(tipo_usuario, key, value)
        db.session.commit()
        return tipo_usuario.to_dict()

    @staticmethod
    def delete_tipo_usuario(tipo_usuario_id):
        """
        Busca un tipo de usuario por su id, lo elimina y devuelve el tipo de usuario eliminado
        :param tipo_usuario_id: id del tipo de usuario
        :return: el tipo de usuario eliminado
        """
        tipo_usuario = TipoUsuario.query.get(tipo_usuario_id)
        if tipo_usuario:
            db.session.delete(tipo_usuario)
            db.session.commit()
