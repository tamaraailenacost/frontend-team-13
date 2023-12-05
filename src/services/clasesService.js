import { fetchData } from "./apiService";

const prefix = "clases";

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
    const data = await fetchData(`${prefix}/${claseId}`, "DELETE");
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
    const data = await fetchData(`${prefix}/${claseId}`, "PUT", nuevosDatos);
    return data;
  } catch (error) {
    console.error("Error al actualizar la clase:", error);
    throw error;
  }
}
