// modelo de la clase

export class Clase {
  constructor(id, nombre, instructor, horario) {
    this.id = id;
    this.nombre = nombre;
    this.instructor = instructor;
    this.horario = horario;
  }
}

export class Horario {
  constructor(id, dia_semana, hora_inicio, hora_fin) {
    this.id = id;
    this.dia_semana = dia_semana;
    this.hora_inicio = hora_inicio;
    this.hora_fin = hora_fin;
  }
}

export class DiaSemana {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }
}

export class TipoUsuario {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }
}

export class Usuario {
  constructor(id, nombre, apellido, email, password, tipo_usuario) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password;
    this.tipo_usuario = tipo_usuario;
  }
}
export class Cliente {
  constructor(id, nombre, email, password, usuario) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.usuario = usuario;
  }
}

export class Reserva {
  constructor(id, fecha, clase, cliente) {
    this.id = id;
    this.fecha = fecha;
    this.clase = clase;
    this.cliente = cliente;
  }
}
