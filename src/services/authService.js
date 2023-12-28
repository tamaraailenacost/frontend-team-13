import { fetchData } from "./apiService.js";

const prefix = "auth/";

/**
 * Función que registra un usuario en la base de datos
 * @param {Object} datos datos del usuario a registrar
 * @returns {Promise} promesa con la respuesta del servidor
 *
 * @example
 * const userData = {
 *  username: "user",
 *  email: "
 *  password: "12345678",
 * };
 * registrarUsuario(userData) // retorna una promesa
 * .then((response) => console.log(response))
 * .catch((error) => console.error(error));
 */
export async function registrarUsuario(datos) {
  try {
    const data = await fetchData(`${prefix}registrar`, "POST", datos);
    return data;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
}

/**
 * Función que inicia sesión en la aplicación
 * @param {Object} datos datos del usuario a registrar
 * @returns {Promise} promesa con la respuesta del servidor
 * @example
 * const userData = {
 *  email: "nombre@gmail.com",
 *  password: "12345678",
 * };
 * iniciarSesion(userData) // retorna una promesa
 * .then((response) => console.log(response))
 * .catch((error) => console.error(error));
 */
export async function iniciarSesion(datos) {
  try {
    const data = await fetchData(`${prefix}login`, "POST", datos);
    return data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
}

export default {
  registrarUsuario,
  iniciarSesion,
};
