// empleadoService.js

import { fetchData } from "./apiService.js";

const prefix = "empleados/";

export async function registrarEmpleado(empleadoDatos) {
  /**
   * Registra un nuevo empleado
   * @param {Object} empleadoData - Los datos del nuevo empleado
   * @returns {Promise<Object>} - Los datos del empleado registrado
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(prefix, "POST", empleadoDatos, {});
    return data;
  } catch (error) {
    console.error(`Error al registrar empleado en ${prefix}:`, error);
    throw error;
  }
}

export async function obtenerEmpleados() {
  /**
   * Obtiene la lista de empleados
   * @returns {Promise<Array>} - La lista de empleados
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(prefix, "GET");
    return data;
  } catch (error) {
    console.error(`Error al obtener la lista de empleados en ${prefix}:`, error);
    throw error;
  }
}

export async function eliminarEmpleado(empleadoId) {
  /**
   * Elimina un empleado
   * @param {number} empleadoId - El id del empleado a eliminar
   * @returns {Promise<Object>} - Los datos del empleado eliminado
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(`${prefix}${empleadoId}`, "DELETE");
    return data;
  } catch (error) {
    console.error(`Error al eliminar empleado en ${prefix}:`, error);
    throw error;
  }
}

export async function buscarTodosLosInstructores() {
  /**
   * Obtiene la lista de todos los instructores
   * @returns {Promise<Array>} - La lista de instructores
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(`${prefix}instructores`, "GET");
    return data;
  } catch (error) {
    console.error(`Error al obtener la lista de instructores en ${prefix}:`, error);
    throw error;
  }
}

export async function obtenerEmpleadoPorId(empleadoId) {
  /**
   * Obtiene los datos de un empleado
   * @param {number} empleadoId - El id del empleado a obtener
   * @returns {Promise<Object>} - Los datos del empleado
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(`${prefix}${empleadoId}`, "GET");
    return data;
  } catch (error) {
    console.error(`Error al obtener empleado en ${prefix}:`, error);
    throw error;
  }
}

export async function actualizarEmpleado(empleadoId, empleadoDatos) {
  /**
   * Actualiza los datos de un empleado
   * @param {number} empleadoId - El id del empleado a actualizar
   * @param {Object} empleadoData - Los datos del empleado a actualizar
   * @returns {Promise<Object>} - Los datos del empleado actualizado
   * @throws {Error} - Si hay un error en la petición
   */
  try {
    const data = await fetchData(`${prefix}${empleadoId}`, "PUT", empleadoDatos, {});
    return data;
  } catch (error) {
    console.error(`Error al actualizar empleado en ${prefix}:`, error);
    throw error;
  }
}

export default {
  registrarEmpleado,
  obtenerEmpleados,
  eliminarEmpleado,
  buscarTodosLosInstructores,
};
