# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

import config
from app.errors import register_error_handlers
from app.routes import create_and_register_blueprints

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    app.config.from_object(config)
    app.json.sort_keys = False

    # Configurar extensiones
    db.init_app(app)

    # Configurar blueprints
    create_and_register_blueprints(app)

    # Configurar lógica de manejo de errores, autenticación, autorización, etc.
    register_error_handlers(app)
    return app
