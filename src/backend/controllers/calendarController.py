# calendarController.py

from flask import render_template

from src.backend.views.calcularFecha import show_class_per_date


def index():
    return render_template("calendario.html")


def show_class(date):
    return show_class_per_date(date)


def insert_clase_in_list(date):
    return render_template("calendario.html", items)


def delete_clase_in_list(date):
    return render_template("calendario.html", items)
