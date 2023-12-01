# calendarController.py

from flask import render_template

from src.services.calendarioService import show_class_per_date


def calendario():
    return render_template("calendario.html")


# metodo que recibe una fecha y retorna las clases disponibles para ese dia de la semana
def show_class(date):
    return show_class_per_date(date)


# # metodo que recibe la clase id seleccionada y la agrega en la lista de clases
def insert_clase_in_list(date):
    # return render_template("calendario.html", items)
    return render_template("calendario.html")


# # metodo que recibe la clase id y la elimina de la lista
def delete_clase_in_list(date):
    # return render_template("calendario.html", items)
    return render_template("calendario.html")
