// reservaService.js
import { fetchData } from "./apiService";

const prefix = "reservas";

export async function reservarClase(claseId, clienteId) {
  /**
   * Reserva una clase para un cliente
   * @param {number} claseId - El id de la clase
   * @param {number} clienteId - El id del cliente
   * @returns {Promise<Object>} - Los datos de la reserva
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(prefix, "POST", { clase_id: claseId, cliente_id: clienteId });
    return data;
  } catch (error) {
    console.error(`Error al reservar la clase en ${prefix}:`, error);
    throw error;
  }
}

export async function eliminarReserva(reservaId) {
  /**
   * Elimina una reserva
   * @param {number} reservaId - El id de la reserva
   * @returns {Promise<Object>} - Los datos de la reserva eliminada
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(`${prefix}/${reservaId}`, "DELETE");
    return data;
  } catch (error) {
    console.error(`Error al eliminar reserva en ${prefix}:`, error);
    throw error;
  }
}
