# Instalar con pip install mysql-connector-python
import mysql.connector

#--------------------------------------------------------------------
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Trebol4318",
    database="gym"
)

Cursor = db.cursor()

