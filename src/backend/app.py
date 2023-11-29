
#--------------------------------------------------------------------
# Instalar con pip install Flask
from flask import Flask, request, jsonify, render_template

# Si es necesario, pip install Werkzeug
from werkzeug.utils import secure_filename

# No es necesario instalar, es parte del sistema standard de Python
import os
import time

# Instalar con pip install flask-cors
from flask_cors import CORS

# Importo submodulos para que podamos dividir el proyecto
from views import calcularFecha

app = Flask(__name__)

# ruta principal
@app.route('/calendario')
def index():
    return render_template("calendario.html")



# metodo que recibe una fecha y retorna las clases disponibles para ese dia de la semana
@app.route('/calendario/<date>', methods=['GET'])
def show_class(date):
    return show_class_per_date(date)


# # metodo que recibe la clase id seleccionada y la agrega en la lista de clases
@app.route('/calendario/<claseId>', methods=['GET'])
def insert_clase_in_list(date):
    return render_template("calendario.html", items)


# # metodo que recibe la clase id y la elimina de la lista
@app.route('/api/calendario/<claseId>', methods=["DELETE"])
def delete_clase_in_list(date):
    return render_template("calendario.html", items)


if __name__ == '__main__':
    app.run(debug=True)


## algunos ejemplos de uso
#----------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------

# # example of POST request
# @app.route('/post', methods=['POST'])
# def post_method():
# return 'You sent a POST request'


# #Ejemplo de uso de variables
# @app.route('/user/<username>')
# def show_user_profile(username):
# return f'User {username}'

# #JSON 
# @app.route("/users")
# def users_api():
#     users = get_all_users()
#     return [user.to_json() for user in users]

# Render contenido Supongamos que tienes una plantilla HTML con Jinja2 llamada `template.html`:
# <html>
# <head>
# <title>{{ title }}</title>
# </head>
# <body>
# <h1>{{ heading }}</h1>
# {% for item in items %}
# <li>{{ item }}</li>
# {% endfor %}
# </body>
# </html>

# Renderización de Plantillas en Flask
# Para renderizar esta plantilla en Flask, usarías una función como esta:
# from flask import render_template
# @app.route('/')
# def home():
# return render_template('template.html', title='Home Page',
#  heading='Welcome!', items=['Item 1', 'Item 2', 'Item 3'])