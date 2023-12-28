// horarioService.js

import { fetchData } from "./apiService.js";

const prefix = "horarios/";

export async function buscarTodosLosHorarios() {
  /**
   * Obtiene todos los horarios disponibles
   * @returns {Promise<Object>} - Los datos de los horarios
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(prefix, "GET");
    return data;
  } catch (error) {
    console.error(`Error al obtener todos los horarios en ${prefix}:`, error);
    throw error;
  }
}

export async function registrarHorario(nuevoHorario) {
  /**
   * Registra un nuevo horario
   * @param {Object} nuevoHorario - Los datos del nuevo horario a registrar
   * @returns {Promise<Object>} - Los datos del horario registrado
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(prefix, "POST", nuevoHorario);
    return data;
  } catch (error) {
    console.error(`Error al registrar un nuevo horario en ${prefix}:`, error);
    throw error;
  }
}

// Puedes agregar más funciones según sea necesario

export default {
  buscarTodosLosHorarios,
  registrarHorario,
  // Agrega más funciones según sea necesario
};
