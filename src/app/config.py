# Instalar con pip install mysql-connector-python
import mysql.connector

#--------------------------------------------------------------------
db = mysql.connector.connect(
    host="localhost",
    user="",
    password="",
    database="gym"
)

Cursor = db.cursor()

