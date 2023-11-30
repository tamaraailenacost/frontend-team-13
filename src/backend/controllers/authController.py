from flask import request, redirect, url_for, render_template
from werkzeug.security import check_password_hash

from src.backend.services.authService import AuthService


def login():
    if request.method == "POST":
        email = request.form.get("username")
        password = request.form.get("password")

        user = AuthService.login(email, password)

        if user and check_password_hash(user.password, password):
            return redirect(url_for("flexbox"))

    return render_template(url_for("login"))


@login_required
def logout():
    AuthService.logout()
    return redirect(
        url_for("index"))  # Puedes cambiar "index" por la ruta a la que deseas redirigir después de cerrar sesión


def register():
    if request.method == "POST":
        nombre = request.form.get("nombre")
        email = request.form.get("username")
        password = request.form.get("password")

        user = AuthService.register(nombre, email, password)

        if user:
            return redirect(url_for("login"))

    return render_template("register.html")  # Puedes crear una plantilla HTML para la página de registro
