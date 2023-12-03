from backend import db
from backend.errors.exceptions import UsuarioNotFoundError, UsuariosEmptyError
from backend.models.usuario import Usuario


class UsuarioService:
    @staticmethod
    def create_usuario(username, email, password):
        """
        Crea un usuario y luego crea un cliente al que le asigna el id del usuario creado y lo devuelve
        :param username: username del usuario
        :param email: email del usuario
        :param password: contraseña del usuario
        :return: el usuario creado
        """
        usuario = Usuario(username=username, email=email, password=password)
        db.session.add(usuario)
        db.session.commit()

        return usuario.to_dict()

    @staticmethod
    def get_usuario_by_id(usuario_id):
        """
        Busca un usuario por id y lo devuelve
        :param usuario_id: id del usuario
        :return: el usuario con el id especificado
        """
        usuario = Usuario.query.get(usuario_id)
        if usuario is None:
            raise UsuarioNotFoundError()
        return usuario.to_dict()

    @staticmethod
    def get_all_usuarios():
        """
        Devuelve todos los usuarios de la base de datos
        :return: lista de usuarios
        """
        usuarios = Usuario.query.all()

        if not usuarios or len(usuarios) == 0:
            raise UsuariosEmptyError()

        usuarios = [usuario.to_dict() for usuario in usuarios]

        return usuarios

    @staticmethod
    def update_usuario(usuario_id, **kwargs):
        """
        Busca un usuario por id, lo actualiza y lo devuelve actualizado
        :param usuario_id:
        :param kwargs:
        :return:
        """
        usuario = Usuario.query.get(usuario_id)
        if usuario is None:
            raise UsuarioNotFoundError()
        for key, value in kwargs.items():
            setattr(usuario, key, value)
        db.session.commit()
        return usuario.to_dict()

    @staticmethod
    def delete_usuario(usuario_id):
        """
        Busca un usuario por id, lo elimina y lo devuelve
        :param usuario_id:
        :return:
        """
        # usuario = delete(Usuario).where(Usuario.usuario_id == usuario_id)
        usuario = Usuario.query.get(usuario_id)
        if usuario is None:
            raise UsuarioNotFoundError()
        db.session.delete(usuario)
        db.session.commit()
