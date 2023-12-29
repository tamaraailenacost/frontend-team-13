# Backend del Trabajo Práctico Final - Gimnasio

Este repositorio contiene el backend desarrollado para el Trabajo Práctico Final del curso de Full Stack Python, como
parte del programa Codo a Codo.

## Tecnologías Utilizadas

- Flask
- MySQL
- Firestore Storage

## Despliegue

El backend se ha desplegado en Python Anywhere y utiliza una base de datos MySQL para el almacenamiento de datos.

Para probar los endpoints del backend, puedes
utilizar [Postman](https://www.postman.com/bold-comet-59247/workspace/codo-a-codo-gym/collection/29892749-27ffe1b8-f00f-45f0-ab91-93749706ba5a?action=share&creator=29892749).

Además, puedes interactuar con el frontend en el siguiente
enlace: [Gym Frontend](https://giulianocharra.github.io/gym-frontend/). La API backend está disponible
en [Gym Backend API](https://giulianocharra.pythonanywhere.com/api).

## Estructura del Proyecto

- `app.py`: Archivo principal que inicializa la aplicación Flask.
- `backend/`: Carpeta que contiene módulos y recursos específicos del backend.
    - `utils/`: Herramientas y utilidades compartidas.
    - `services/`: Lógica de negocios y servicios.
    - `routes/`: Definición de rutas y controladores.
    - `models/`: Definición de modelos de datos.
    - `errors/`: Manejo de errores y excepciones.
    - `controllers/`: Controladores de la aplicación.
    - `__init__.py`: Archivo que indica que la carpeta es un paquete de Python.
- `.env`: Archivo de configuración con variables de entorno.
- `.gitignore`: Archivo que especifica los archivos y carpetas que Git debe ignorar.
- `apiKey.json`: **(No está en el repositorio)** Archivo que contiene las credenciales de la API (ten cuidado de no
  subir
  esto a tu repositorio
  público).
- `config.py`: Archivo de configuración para la aplicación.
- `info.txt`: **(No está en el repositorio)** Archivo de información adicional.
- `Pipfile` y `Pipfile.lock`: Archivos que especifican las dependencias del proyecto.
- `README.md`: Documentación principal del proyecto.
- `requirements.txt`: Archivo que lista las dependencias del proyecto en un formato compatible con `pip`.

### Configuración

El archivo `.env` se utiliza para la configuración de variables de entorno, incluyendo credenciales y configuración
específica. A continuación, se muestra un ejemplo de contenido para el archivo `.env`:

```plaintext
SECRET_KEY="soy la clave secreta"

MYSQL_DATABASE_HOST=localhost
MYSQL_DATABASE_PORT=3306
MYSQL_DATABASE_USER=root
MYSQL_DATABASE_PASSWORD=1234
MYSQL_DATABASE_DB=gym
```

Ten en cuenta que estos valores son ficticios y debes reemplazarlos con tus propias configuraciones.

Además, para obtener el archivo **apikey.json** necesario para la autenticación con Firebase, sigue estos pasos:

1. Accede a la consola de Firebase.
2. Navega a tu proyecto.
3. En la sección "Configuración del proyecto", selecciona "Cuentas de servicio".
4. Haz clic en "Generar nueva clave privada". Esto descargará un archivo JSON, que deberías renombrar a **apikey.json**.

Asegúrate de no incluir el archivo **apikey.json** en tu repositorio público para proteger las credenciales de tu
proyecto Firebase.

**Recuerda siempre mantener seguros tus archivos de configuración y nunca los compartas públicamente si contienen
información sensible.**

## Instalación

1. Clona el repositorio: `git clone https://github.com/GiulianoCharra/gym-backend.git`
2. Crea un entorno virtual: `python -m venv venv`
3. Activa el entorno virtual: `source venv/bin/activate` (Linux) o `venv\Scripts\activate` (Windows)
4. Instala las dependencias: `pip install -r requirements.txt`

## Endpoints

### Autenticación

- **Registrar Usuario**: `POST /api/auth/registrar`
- **Iniciar Sesión**: `POST /api/auth/login`
- **Eliminar Cuenta**: `DELETE /api/auth/borrar`

### Clases

- **Operaciones Básicas**: `POST, GET, PUT, DELETE /api/clases/`
- **Obtener por ID**: `GET /api/clases/<clase_id>`

### Clientes

- **Operaciones Básicas**: `POST, GET, PUT, DELETE /api/clientes/`
- **Obtener por ID**: `GET /api/clientes/<cliente_id>`
- **Reservas de Cliente**: `GET /api/clientes/<cliente_id>/reservas`

### Empleados

- **Operaciones Básicas**: `POST, GET, PUT, DELETE /api/empleados/`
- **Obtener por ID**: `GET /api/empleados/<empleado_id>`
- **Clases de Empleado**: `GET /api/empleados/<empleado_id>/clases`
- **Todos los Instructores**: `GET /api/empleados/instructores`

### Horarios

- **Operaciones Básicas**: `POST, GET, PUT, DELETE /api/horarios/`
- **Obtener por ID**: `GET /api/horarios/<horario_id>`

### Reservas

- **Operaciones Básicas**: `POST, GET, PUT, DELETE /api/reservas/`
- **Obtener por ID**: `GET /api/reservas/<reserva_id>`

### Tipos de Usuario

- **Operaciones Básicas**: `POST, GET, PUT, DELETE /api/tipo_usuarios/`
- **Obtener por ID**: `GET /api/tipo_usuarios/<tipo_usuario_id>`

### Usuarios

- **Operaciones Básicas**: `POST, GET, PUT, DELETE /api/usuarios/`
- **Obtener por ID**: `GET /api/usuarios/<usuario_id>`

## Uso

Ejecuta la aplicación con: `python app.py`

## Contribuciones

¡Contribuciones son bienvenidas! Si encuentras problemas o mejoras, abre un problema o envía una solicitud de
extracción.

## Agradecimientos

Agradecemos a todos los participantes del curso Codo a Codo y a quienes colaboraron en este proyecto.

¡Gracias por tu interés y colaboración!
