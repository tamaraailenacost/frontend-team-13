import { fetchData } from "./apiService";

const prefix = "auth";

export async function registrarUsuario(datos) {
  try {
    const data = await fetchData(`${prefix}/registro`, "POST", datos);
    return data;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
}

export async function iniciarSesion(datos) {
  try {
    const data = await fetchData(`${prefix}/login`, "POST", datos);
    return data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
}

export async function eliminarCuenta() {
  try {
    const data = await fetchData(`${prefix}/eliminarCuenta`, "DELETE");
    return data;
  } catch (error) {
    console.error("Error al eliminar la cuenta:", error);
    throw error;
  }
}
