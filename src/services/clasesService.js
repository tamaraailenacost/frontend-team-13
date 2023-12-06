import { fetchData } from "./apiService.js";

const prefix = "clases/";

export async function crearClase(datos) {
  /**
   * Crea una nueva clase
   * @param {Object} datos - Los datos de la clase
   * @returns {Promise<Object>} - Los datos de la clase creada
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(prefix, "POST", datos);
    return data;
  } catch (error) {
    console.error("Error al crear la clase:", error);
    throw error;
  }
}

export async function eliminarClase(claseId) {
  /**
   * Elimina una clase
   * @param {number} claseId - El id de la clase
   * @returns {Promise<Object>} - Los datos de la clase eliminada
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(`${prefix}${claseId}`, "DELETE");
    return data;
  } catch (error) {
    console.error("Error al eliminar la clase:", error);
    throw error;
  }
}

export async function actualizarClase(claseId, nuevosDatos) {
  /**
   * Actualiza los datos de una clase
   * @param {number} claseId - El id de la clase
   * @param {Object} nuevosDatos - Los nuevos datos de la clase
   * @returns {Promise<Object>} - Los datos de la clase actualizada
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(`${prefix}${claseId}`, "PUT", nuevosDatos);
    return data;
  } catch (error) {
    console.error("Error al actualizar la clase:", error);
    throw error;
  }
}

export async function obtenerClasesPorDiaSemana(diaSemanaId) {
  /**
   * Obtiene las clases de un día de la semana
   * @param {number} diaSemanaId - El id del día de la semana
   * @returns {Promise<Object[]>} - Los datos de las clases
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(`${prefix}?dia_semana_id=${diaSemanaId}`);
    return data;
  } catch (error) {
    console.error("Error al obtener las clases:", error);
    throw error;
  }
}

export default {
  crearClase,
  eliminarClase,
  actualizarClase,
  obtenerClasesPorDiaSemana,
};
