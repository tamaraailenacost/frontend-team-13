import { fetchData } from "./apiService.js";

const prefix = "clientes/";

export async function crearCliente(datos) {
  /**
   * Crea un nuevo cliente
   * @param {Object} datos - Los datos del cliente
   * @returns {Promise<Object>} - Los datos del cliente creado
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(prefix, "POST", datos);
    return data;
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    throw error;
  }
}

export async function obtenerClientes() {
  /**
   * Obtiene los datos de todos los clientes
   * @returns {Promise<Array>} - Un array de clientes
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(prefix);
    return data.clientes;
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    throw error;
  }
}

export async function obtenerCliente(clienteId) {
  /**
   * Obtiene los datos de un cliente
   * @param {number} clienteId - El id del cliente
   * @returns {Promise<Object>} - Los datos del cliente
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(`${prefix}${clienteId}`);
    return data.cliente;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    throw error;
  }
}

export async function actualizarCliente(clienteId, nuevosDatos) {
  /**
   * Actualiza los datos de un cliente
   * @param {number} clienteId - El id del cliente
   * @param {Object} nuevosDatos - Los nuevos datos del cliente
   * @returns {Promise<Object>} - Los datos del cliente actualizado
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(`${prefix}${clienteId}`, "PUT", nuevosDatos);
    return data;
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    throw error;
  }
}

export async function obtenerReservasCliente(clienteId) {
  /**
   * Obtiene las reservas de un cliente
   * @param {number} clienteId - El id del cliente
   * @returns {Promise<Array>} - Un array de reservas
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(`${prefix}${clienteId}/reservas`);
    return data.reservas;
  } catch (error) {
    console.error("Error al obtener las reservas del cliente:", error);
    throw error;
  }
}

export default {
  crearCliente,
  obtenerClientes,
  obtenerCliente,
  actualizarCliente,
  obtenerReservasCliente,
};
