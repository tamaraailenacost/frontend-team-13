# --------------------------------------------------------------------
# Instalar con pip install Flask
from flask import Flask, render_template

import config
from src.backend.routes import calendarRoute, authRoute
from src.backend.views.calcularFecha import show_class_per_date

# Si es necesario, pip install Werkzeug
# No es necesario instalar, es parte del sistema standard de Python
# Instalar con pip install flask-cors
# Importo submodulos para que podamos dividir el proyecto

app = Flask(__name__)
app.config.from_object(config)

app.register_blueprint(calendarRoute.bp)
app.register_blueprint(authRoute.bp)


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


# route para loguearse


if __name__ == '__main__':
    app.run(debug=True)

## algunos ejemplos de uso
# ----------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------

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
