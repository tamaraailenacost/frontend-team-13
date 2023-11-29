from flask import render_template, request
from datetime import datetime

def show_class_per_date(date):
    # Obtén el parámetro 'fecha' de la URL
    date = request.args.get('date')

    try:
        fecha = datetime.strptime(date, '%Y-%m-%d')
        dia_semana = fecha.strftime('%A')
        # Renderiza la plantilla con el resultado
        print(dia_semana)

    except ValueError:
        # Si hay un error al analizar la fecha, muestra un mensaje de error
        return "Formato de fecha incorrecto. Utiliza el formato YYYY-MM-DD."