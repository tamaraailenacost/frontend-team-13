def create_and_register_blueprints(app):
    from . import authRoute
    from . import clienteRoute
    from . import usuarioRoute
    from . import tipoUsuarioRoute
    from . import claseRoute
    from . import horarioRoute
    from . import reservaRoute
    from . import empleadoRoute

    blue_prints = [
        authRoute.bp,
        clienteRoute.bp,
        tipoUsuarioRoute.bp,
        usuarioRoute.bp,
        claseRoute.bp,
        horarioRoute.bp,
        reservaRoute.bp,
        empleadoRoute.bp,
    ]

    for bp in blue_prints:
        app.register_blueprint(bp)
