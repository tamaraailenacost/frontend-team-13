# app/services/clase_service.py
from app import db
from app.errors.exceptions import ClasesEmptyError, ClaseNotFoundError
from app.models.clase import Clase


class ClaseService:
    @staticmethod
    def create_clase(nombre, descripcion, instructor, capacidad_maxima, horario_id):
        clase = Clase(nombre=nombre, descripcion=descripcion, instructor=instructor,
                      capacidad_maxima=capacidad_maxima, horario_id=horario_id)
        db.session.add(clase)
        db.session.commit()
        return clase.to_dict()

    @staticmethod
    def get_clase_by_id(clase_id):
        clase = Clase.query.get(clase_id)
        if clase is None:
            raise ClaseNotFoundError()
        return clase.to_dict()

    @staticmethod
    def get_all_clases():
        clases = Clase.query.all()

        if not clases or len(clases) == 0:
            raise ClasesEmptyError()

        clases = [clase.to_dict() for clase in clases]

        return clases

    @staticmethod
    def update_clase(clase_id, **kwargs):
        clase = Clase.query.get(clase_id)
        if clase is None:
            raise ClaseNotFoundError()
        for key, value in kwargs.items():
            setattr(clase, key, value)
        db.session.commit()
        return clase.to_dict()

    @staticmethod
    def delete_clase(clase_id):
        clase = ClaseService.get_clase_by_id(clase_id)
        if clase:
            db.session.delete(clase)
            db.session.commit()

        return clase.to_dict()
