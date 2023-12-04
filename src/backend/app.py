
#--------------------------------------------------------------------
# Instalar con pip install Flask
from flask import Flask, request, jsonify, render_template

# Si es necesario, pip install Werkzeug
from werkzeug.utils import secure_filename

# No es necesario instalar, es parte del sistema standard de Python
import os
import time
from datetime import datetime
import locale


# Instalar con pip install flask-cors
from flask_cors import CORS

# Importo submodulos para que podamos dividir el proyecto
from views.calcularFecha import obtener_clases_para_dia
from views.calcularFecha import obtener_id_dia_semana

app = Flask(__name__)

# modulo para mostrar las clases disponibles determinado dia de la semana
@app.route('/calendario', methods=['GET'])
def show_class_per_date():
    date = request.args.get('date')
    try:
        locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')
        fecha = datetime.strptime(date, '%Y-%m-%d')
        dia_semana = fecha.strftime('%A')

        id_dia_semana = obtener_id_dia_semana(dia_semana)
        clases_para_dia = obtener_clases_para_dia(id_dia_semana)

        if clases_para_dia is not None:
            return render_template("calendario.html", clases_para_dia_seleccionado=clases_para_dia, fecha=date)
        else:
            return "No se encontraron clases para el día seleccionado."
    except ValueError:
        return "Formato de fecha incorrecto. Utiliza el formato YYYY-MM-DD."


if __name__ == '__main__':
    app.run(debug=True)