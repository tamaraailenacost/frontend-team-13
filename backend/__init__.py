# backend/__init__.py
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

import config
from backend.errors import register_error_handlers
from backend.routes import create_and_register_blueprints

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    # A cross-origin resource sharing (CORS) request was blocked because the response to the associated preflight
    # request failed, had an unsuccessful HTTP status code, and/or was a redirect.To fix this issue, ensure all CORS
    # preflight OPTIONS requests are answered with a successful HTTP status code (2xx) and do not redirect.
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    app.config.from_object(config)
    app.json.sort_keys = False

    # Configurar extensiones
    db.init_app(app)

    # Configurar blueprints
    create_and_register_blueprints(app)

    # Configurar lógica de manejo de errores, autenticación, autorización, etc.
    register_error_handlers(app)
    return app
