# --------------------------------------------------------------------
# Instalar con pip install Flask
from flask import Flask, send_from_directory

from routes import authRoute
from routes import calendarRoute
from src import config

# Si es necesario, pip install Werkzeug
# No es necesario instalar, es parte del sistema standard de Python
# Instalar con pip install flask-cors
# Importo submodulos para que podamos dividir el proyecto

app = Flask(__name__)

app.register_blueprint(calendarRoute.bp)
app.register_blueprint(authRoute.bp)


# ruta principal
@app.route('/', methods=['GET'])
def index():
    return send_from_directory("views", 'index.html')


@app.route('/clientes', methods=['GET'])
def clientes():
    return send_from_directory("views", 'clientes.html')


@app.route('/login', methods=['GET'])
def login():
    return send_from_directory("views", 'login.html')


@app.route('/registro', methods=['GET'])
def registro():
    return send_from_directory("views", 'registro.html')


@app.route('/calendario', methods=['GET'])
def calendario():
    return send_from_directory("views", 'calendario.html')


# route para cuando hay un error
@app.errorhandler(Exception)
def error(error):
    return send_from_directory("views", 'error.html')


if __name__ == '__main__':
    app.config.from_object(config)
    app.register_error_handler(Exception, error)
    app.run(debug=True)

# route para cuando se produce un error

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
