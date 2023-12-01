from flask import render_template, request
from datetime import datetime
from config import Cursor

# metodo que recibe una fecha y retorna las clases disponibles para ese dia de la semana
def obtener_id_dia_semana(nombre_dia):
    try:
        sql = "SELECT dia_semana_id FROM dia_semana WHERE nombre LIKE %s"
        Cursor.execute(sql, (nombre_dia,))
        id_dia_semana = Cursor.fetchone()
        return id_dia_semana[0] if id_dia_semana else None
    except Exception as e:
        print(e)
        return None


def obtener_clases_para_dia(id_dia_semana):
    try:
        if id_dia_semana:
            sql = "SELECT clase.nombre, horario.hora_inicio FROM clase JOIN horario ON horario.horario_id = clase.horario_id WHERE horario.dia_semana_id = %s"
            Cursor.execute(sql, (id_dia_semana,))
            clases = Cursor.fetchall()
            return clases
        else:
            return None
    except Exception as e:
        print(e)
        return None
