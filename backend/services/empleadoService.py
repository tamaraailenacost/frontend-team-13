# backend/services/empleado_service.py
from sqlalchemy import select

from backend import db
from backend.errors.exceptions import (
    EmpleadosEmptyError,
    EmpleadoNotFoundError,
    ClasesEmptyError,
)
from backend.models.empleado import Empleado
from backend.models.usuario import Usuario
from backend.utils.firestoreService import subir_archivo


class EmpleadoService:
    @staticmethod
    def create_empleado(
        nombre,
        dni,
        fecha_nacimiento,
        email,
        telefono,
        direccion,
        especialidad,
        imagen,
    ):
        """
        Crea un empleado y un usuario asociado, y los guarda en la base de datos
        :param nombre: nombre del empleado
        :param dni: dni del empleado
        :param fecha_nacimiento: fecha de nacimiento del empleado
        :param email: email del empleado
        :param telefono: telefono del empleado
        :param direccion: direccion del empleado
        :param especialidad: especialidad del empleado
        :param imagen: imagen del empleado
        :return: el empleado creado
        """

        # Crear el usuario asociado al empleado
        tipo_usuario_id = 2  # Tipo de usuario igual a 2 por defecto (Empleado)

        nuevo_usuario = Usuario(
            username=dni,
            email=email,
            password=dni,
            tipo_usuario_id=tipo_usuario_id,
        )

        # Crear el empleado asociado al usuario
        nuevo_empleado = Empleado(
            nombre=nombre,
            dni=dni,
            fecha_nacimiento=fecha_nacimiento,
            telefono=telefono,
            direccion=direccion,
            especialidad=especialidad,
        )
        nuevo_empleado.usuario = nuevo_usuario

        # guardar la imagen del empleado en firebase
        url_imagen = subir_archivo("usuarios", imagen)
        nuevo_empleado.url_imagen = url_imagen

        db.session.add(nuevo_usuario)
        db.session.add(nuevo_empleado)
        db.session.commit()

        return nuevo_empleado.to_dict()

    @staticmethod
    def get_empleado_by_id(empleado_id):
        """
        Busca un empleado por su id y lo devuelve
        :param empleado_id: id del empleado
        :return: el empleado encontrado
        """
        empleado = Empleado.query.get(empleado_id)
        if empleado is None or not empleado.activo:
            raise EmpleadoNotFoundError()
        return empleado.to_dict()

    @staticmethod
    def get_all_empleados():
        """
        Devuelve todos los empleados
        :return: lista de empleados
        """
        empleados = Empleado.query.all()

        if not empleados or len(empleados) == 0:
            raise EmpleadosEmptyError()

        empleados = [empleado.to_dict() for empleado in empleados]

        return empleados

    @staticmethod
    def update_empleado(empleado_id, imagen, **kwargs):
        """
        Busca un empleado por su id y lo actualiza con los nuevos datos y lo devuelve
        :param empleado_id: id del empleado
        :param imagen: nueva imagen del empleado
        :param kwargs: nuevos datos del empleado
        :return: el empleado actualizado
        """

        empleado = Empleado.query.get(empleado_id)

        if empleado is None:
            raise EmpleadoNotFoundError()

        # Verificar si hay una nueva imagen
        if imagen:
            url_imagen = subir_archivo("usuarios", imagen)
            empleado.url_imagen = url_imagen

        for key, value in kwargs.items():
            setattr(empleado, key, value)

        db.session.commit()
        return empleado.to_dict()

    @staticmethod
    def delete_empleado(empleado_id):
        """
        Busca un empleado por su id, lo elimina y lo devuelve
        :param empleado_id: id del empleado
        :return: el empleado eliminado
        """

        empleado = Empleado.query.get(empleado_id)
        if empleado is None:
            raise EmpleadoNotFoundError()
        empleado.activo = False  # Cambia el estado a inactivo
        db.session.commit()

    @staticmethod
    def get_empleados_by_especialidad(especialidad):
        """
        Devuelve todos los empleados de una especialidad
        :param especialidad: especialidad de los empleados
        :return: lista de empleados
        """
        empleados = Empleado.query.filter_by(especialidad=especialidad).all()

        if not empleados or len(empleados) == 0:
            raise EmpleadosEmptyError()

        empleados = [empleado.to_dict() for empleado in empleados]

        return empleados

    @staticmethod
    def get_clases_empleado(empleado_id):
        """
        Busca las clases de un empleado por su id y las devuelve
        :param empleado_id: id del empleado
        :return: las clases del empleado
        """
        empleado = Empleado.query.get(empleado_id)
        if empleado is None:
            raise EmpleadoNotFoundError()

        clases = empleado.clases

        if not clases or len(clases) == 0:
            raise ClasesEmptyError()

        clases = [clase.to_dict() for clase in clases]

        return clases

    @staticmethod
    def get_all_instructores():
        """
        Devuelve todos los instructores
        :return: lista de instructores
        """
        stmt = (
            select(Empleado).join(Usuario).where(Usuario.tipo_usuario_id == 2)
        )

        instructores = db.session.execute(stmt).scalars().all()

        if not instructores or len(instructores) == 0:
            raise EmpleadosEmptyError()

        instructores = [instructor.to_dict() for instructor in instructores]

        return instructores
