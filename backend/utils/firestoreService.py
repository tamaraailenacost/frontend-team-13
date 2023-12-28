# class to manage firestore storage
import os
from datetime import datetime

import firebase_admin
from firebase_admin import credentials, storage

api_key_path = os.path.abspath("apiKey.json")
cred = credentials.Certificate(api_key_path)
firabase = firebase_admin.initialize_app(
    cred, {"storageBucket": "gym-cia.appspot.com"}
)

bucket = storage.bucket()


def subir_archivo_nombre(folder, filename, source_file_name):
    """
    Upload a file to the firebase storage
    :param folder: the folder where the file will be uploaded
    :param filename: the name of the file to upload
    :param source_file_name: the path of the file to upload
    :return: the url of the uploaded file

    @example
    url = upload_file("images", "my_image.jpg", "./images/my_image.jpg")
    """
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
    unique_filename = f"{timestamp}_{filename}"
    file_path = f"{folder}/{unique_filename}"

    blob = bucket.blob(file_path)
    blob.upload_from_filename(source_file_name)
    blob.make_public()

    return blob.public_url


def subir_archivo(folder, filename, file):
    """
    Upload a file to the firebase storage
    :param filename: the name that will have the file
    :param folder: the folder where the file will be uploaded
    :param file: the file to upload
    :return: the url of the uploaded file

    @example
    url = upload_file("images", my_image)
    """
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
    _, extension = os.path.splitext(file.filename)
    unique_filename = f"{timestamp}_{filename}{extension}"
    file_path = f"{folder}/{unique_filename}"

    blob = bucket.blob(file_path)
    blob.content_type = file.content_type
    blob.upload_from_file(file)
    blob.make_public()

    return blob.public_url


def delete_file(filename):
    """
    Delete a file from the firebase storage
    :param filename: the name of the file to delete
    """
    blob = bucket.blob(filename)
    blob.delete()


# funcion para obtener al url de todas las imagenes de una carpeta con su token de acceso
def get_all_images(folder):
    """
    Get all the images from a folder in the firebase storage
    :param folder: the folder where the images are located
    :return: a list with all the urls of the images

    @example
    urls = get_all_images("images")
    """
    blobs = bucket.list_blobs(prefix=folder)

    return [blob.public_url for blob in blobs]


def upload_images_from_folder(folder):
    """
    Uploads all the images from a folder to the firebase storage
    :param folder: the folder where the images are located
    :return: a list with all the urls of the images

    @example
    urls = upload_images_from_folder("images")
    """
    folder_path = f"./{folder}"  # Cambia esto según la ubicación real de tu carpeta de imágenes
    file_urls = []

    for filename in os.listdir(folder_path):
        file_path = folder_path + "/" + filename
        url = subir_archivo_nombre(folder, filename, file_path)
        file_urls.append(url)

    return file_urls
