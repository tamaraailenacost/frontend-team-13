#--------------------------------------------------------------------
# Instalar con pip install Flask
from flask import Flask, request, jsonify
from flask import request

# Instalar con pip install flask-cors
from flask_cors import CORS

# Instalar con pip install mysql-connector-python
import mysql.connector

# Si es necesario, pip install Werkzeug
from werkzeug.utils import secure_filename

# No es necesario instalar, es parte del sistema standard de Python
import os
import time
#--------------------------------------------------------------------
app = Flask(__name__)
CORS(app)  # Esto habilitará CORS para todas las rutas

#--------------------------------------------------------------------
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Trebol4318",
    database="gym"
)

Cursor = db.cursor()

#     # Creamos un cursor para ejecutar consultas
#     self.cursor = self.conn.cursor()
#     print("Conexión a la base de datos exitosa.")
# except mysql.connector.Error as err:
#     # Si hay un error, imprimimos un mensaje de error y almacenamos el error
#     print(f"Error al conectar a la base de datos: {err}")
#     # Puedes agregar aquí cualquier lógica adicional para manejar el error, como lanzar una excepción, mostrar un mensaje de error o registrar el error en un archivo de registro.
#     # Resto de la clase...

#         # Una vez que la base de datos está establecida, creamos la tabla si no existe
#         self.cursor.execute('''CREATE TABLE IF NOT EXISTS productos (
#             codigo INT AUTO_INCREMENT,
#             descripcion VARCHAR(255) NOT NULL,
#             cantidad INT NOT NULL,
#             precio DECIMAL(10, 2) NOT NULL,
#             imagen_url VARCHAR(255),
#             proveedor INT)''')
#         self.conn.commit()

#         # Cerrar el cursor inicial y abrir uno nuevo con el parámetro dictionary=True
#         self.cursor.close()
#         self.cursor = self.conn.cursor(dictionary=True)
        
#     #----------------------------------------------------------------
#     def agregar_producto(self, codigo, descripcion, cantidad, precio, imagen, proveedor):
#         # Verificamos si ya existe un producto con el mismo código
#         self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
#         producto_existe = self.cursor.fetchone()
#         if producto_existe:
#             return False

#         sql = "INSERT INTO productos (codigo, descripcion, cantidad, precio, imagen_url, proveedor) VALUES (%s, %s, %s, %s, %s, %s)"
#         valores = (codigo, descripcion, cantidad, precio, imagen, proveedor)

#         self.cursor.execute(sql, valores)        
#         self.conn.commit()
#         return True

#     #----------------------------------------------------------------
#     def consultar_producto(self, codigo):
#         # Consultamos un producto a partir de su código
#         self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
#         return self.cursor.fetchone()

#     #----------------------------------------------------------------
#     def modificar_producto(self, codigo, nueva_descripcion, nueva_cantidad, nuevo_precio, nueva_imagen, nuevo_proveedor):
#         sql = "UPDATE productos SET descripcion = %s, cantidad = %s, precio = %s, imagen_url = %s, proveedor = %s WHERE codigo = %s"
#         valores = (nueva_descripcion, nueva_cantidad, nuevo_precio, nueva_imagen, nuevo_proveedor, codigo)
#         self.cursor.execute(sql, valores)
#         self.conn.commit()
#         return self.cursor.rowcount > 0

#     #----------------------------------------------------------------
#     def listar_productos(self):
#         self.cursor.execute("SELECT * FROM productos")
#         productos = self.cursor.fetchall()
#         return productos

#     #----------------------------------------------------------------
#     def eliminar_producto(self, codigo):
#         # Eliminamos un producto de la tabla a partir de su código
#         self.cursor.execute(f"DELETE FROM productos WHERE codigo = {codigo}")
#         self.conn.commit()
#         return self.cursor.rowcount > 0

#     #----------------------------------------------------------------
#     def mostrar_producto(self, codigo):
#         # Mostramos los datos de un producto a partir de su código
#         producto = self.consultar_producto(codigo)
#         if producto:
#             print("-" * 40)
#             print(f"Código.....: {producto['codigo']}")
#             print(f"Descripción: {producto['descripcion']}")
#             print(f"Cantidad...: {producto['cantidad']}")
#             print(f"Precio.....: {producto['precio']}")
#             print(f"Imagen.....: {producto['imagen_url']}")
#             print(f"Proveedor..: {producto['proveedor']}")
#             print("-" * 40)
#         else:
#             print("Producto no encontrado.")


# #--------------------------------------------------------------------
# # Cuerpo del programa
# #--------------------------------------------------------------------
# # Crear una instancia de la clase Catalogo
# catalogo = Catalogo(host='localhost', user='root', password='', database='miapp')

# # Carpeta para guardar las imagenes.
# ruta_destino = './static/imagenes/'
# #--------------------------------------------------------------------
# @app.route("/productos", methods=["GET"])
# def listar_productos():
#     productos = catalogo.listar_productos()
#     return jsonify(productos)

# #--------------------------------------------------------------------
# @app.route("/productos/<int:codigo>", methods=["GET"])
# def mostrar_producto(codigo):
#     producto = catalogo.consultar_producto(codigo)
#     if producto:
#         return jsonify(producto)
#     else:
#         return "Producto no encontrado", 404

# #--------------------------------------------------------------------

# @app.route("/productos", methods=["POST"])
# def agregar_producto():
#     codigo = request.form['codigo']
#     descripcion = request.form['descripcion']
#     cantidad = request.form['cantidad']
#     precio = request.form['precio']
#     proveedor = request.form['proveedor']  
#     imagen = request.files['imagen']
#     nombre_imagen = secure_filename(imagen.filename)
#     print("*"*20)
#     print(nombre_imagen)
#     print("*"*20)
#     nombre_base, extension = os.path.splitext(nombre_imagen)
#     nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
#     imagen.save(os.path.join(ruta_destino, nombre_imagen))

#     if catalogo.agregar_producto(codigo, descripcion, cantidad, precio, nombre_imagen, proveedor):
#         return jsonify({"mensaje": "Producto agregado"}), 201
#     else:
#         return jsonify({"mensaje": "Producto ya existe"}), 400

# #--------------------------------------------------------------------

# @app.route("/productos/<int:codigo>", methods=["PUT"])
# def modificar_producto(codigo):
#     # Procesamiento de la imagen
#     imagen = request.files['imagen']
#     nombre_imagen = secure_filename(imagen.filename)
#     print("*"*20)
#     print(nombre_imagen)
#     print("*"*20)
#     nombre_base, extension = os.path.splitext(nombre_imagen)
#     nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
#     imagen.save(os.path.join(ruta_destino, nombre_imagen))

#     # Datos del producto
#     data = request.form
#     nueva_descripcion = data.get("descripcion")
#     nueva_cantidad = data.get("cantidad")
#     nuevo_precio = data.get("precio")
#     nuevo_proveedor = data.get("proveedor")

#     # Actualización del producto
#     if catalogo.modificar_producto(codigo, nueva_descripcion, nueva_cantidad, nuevo_precio, nombre_imagen, nuevo_proveedor):
#         return jsonify({"mensaje": "Producto modificado"}), 200
#     else:
#         return jsonify({"mensaje": "Producto no encontrado"}), 404


# #--------------------------------------------------------------------

# @app.route("/productos/<int:codigo>", methods=["DELETE"])
# def eliminar_producto(codigo):
#     # Primero, obtén la información del producto para encontrar la imagen
#     producto = catalogo.consultar_producto(codigo)
#     if producto:
#         # Eliminar la imagen asociada si existe
#         ruta_imagen = os.path.join(ruta_destino, producto['imagen_url'])
#         if os.path.exists(ruta_imagen):
#             os.remove(ruta_imagen)

#         # Luego, elimina el producto del catálogo
#         if catalogo.eliminar_producto(codigo):
#             return jsonify({"mensaje": "Producto eliminado"}), 200
#         else:
#             return jsonify({"mensaje": "Error al eliminar el producto"}), 500
#     else:
#         return jsonify({"mensaje": "Producto no encontrado"}), 404
# #--------------------------------------------------------------------
# if __name__ == "__main__":
#     app.run(debug=True)