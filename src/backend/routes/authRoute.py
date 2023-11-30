from flask import Blueprint

from src.backend.controllers.authController import login, logout, register

bp = Blueprint("auth", __name__, url_prefix="/auth")

bp.route("/login", methods=["GET", "POST"])(login)
bp.route("/logout")(logout)
bp.route("/register", methods=["GET", "POST"])(register)
