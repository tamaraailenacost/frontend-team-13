# En tu archivo backend/errors/exceptions.py


class CuentaExistenteError(Exception):
    """Excepción lanzada cuando se intenta registrar una cuenta existente."""

    def __init__(self, message="Cuenta existente."):
        self.message = message
        super().__init__(self.message)


class ClaseNotFoundError(Exception):
    """Excepción lanzada cuando se proporciona una Clase inválida."""

    def __init__(self, message="Clase no encontrada."):
        self.message = message
        super().__init__(self.message)


class ClasesEmptyError(Exception):
    """Excepción lanzada cuando no hay Clases disponibles."""

    def __init__(self, message="No hay clases disponibles."):
        self.message = message
        super().__init__(self.message)


class HorariosEmptyError(Exception):
    """Excepción lanzada cuando no hay Horarios disponibles."""

    def __init__(self, message="No hay horarios disponibles."):
        self.message = message
        super().__init__(self.message)


class HorarioNotFoundError(Exception):
    """Excepción lanzada cuando se proporciona un Horario inválido."""

    def __init__(self, message="Horario no encontrado."):
        self.message = message
        super().__init__(self.message)


class DiaSemanaNotFoundError(Exception):
    """Excepción lanzada cuando se proporciona un DiaSemana inválido."""

    def __init__(self, message="DiaSemana no encontrado."):
        self.message = message
        super().__init__(self.message)


class ClienteNotFoundError(Exception):
    """Excepción lanzada cuando se proporciona un Cliente inválido."""

    def __init__(self, message="Cliente no encontrado."):
        self.message = message
        super().__init__(self.message)


class ClientesEmptyError(Exception):
    """Excepción lanzada cuando no hay Clientes disponibles."""

    def __init__(self, message="No hay clientes disponibles."):
        self.message = message
        super().__init__(self.message)


class UsuarioNotFoundError(Exception):
    """Excepción lanzada cuando se proporciona un Usuario inválido."""

    def __init__(self, message="Usuario no encontrado."):
        self.message = message
        super().__init__(self.message)


class UsuariosEmptyError(Exception):
    """Excepción lanzada cuando no hay Usuarios disponibles."""

    def __init__(self, message="No hay usuarios disponibles."):
        self.message = message
        super().__init__(self.message)


class TipoUsuarioNotFoundError(Exception):
    """Excepción lanzada cuando se proporciona un Tipo de Usuario inválido."""

    def __init__(self, message="Tipo de usuario no encontrado."):
        self.message = message
        super().__init__(self.message)


class TiposUsuariosEmptyError(Exception):
    """Excepción lanzada cuando no hay Tipos de Usuarios disponibles."""

    def __init__(self, message="No hay tipos de usuarios disponibles."):
        self.message = message
        super().__init__(self.message)


class ReservasEmptyError(Exception):
    """Excepción lanzada cuando no hay Reservas disponibles."""

    def __init__(self, message="No hay reservas disponibles."):
        self.message = message
        super().__init__(self.message)


class ReservaNotFoundError(Exception):
    """Excepción lanzada cuando se proporciona una Reserva inválida."""

    def __init__(self, message="Reserva no encontrada."):
        self.message = message
        super().__init__(self.message)


class ReservaAlreadyExistsError(Exception):
    """Excepción lanzada cuando se intenta registrar una reserva existente."""

    def __init__(self, message="Reserva existente."):
        self.message = message
        super().__init__(self.message)
