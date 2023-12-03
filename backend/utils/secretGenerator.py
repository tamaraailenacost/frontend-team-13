import secrets

# Generar una cadena de bytes aleatoria (puede convertirse a una cadena de texto si es necesario)
secret_key_bytes = secrets.token_bytes(32)

# Convertir la cadena de bytes a una cadena de texto hexadecimal
secret_key = secret_key_bytes.hex()

# Imprimir la clave generada
print(secret_key)
