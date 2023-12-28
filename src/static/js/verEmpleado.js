// ver.js

import { obtenerEmpleadoPorId } from "../../services/empleadoService.js";
import { showToast } from "../../utils/toast.js";

const urlParams = new URLSearchParams(window.location.search);
const empleadoId = urlParams.get("idEmpleado");
document.addEventListener("DOMContentLoaded", async () => cargarDatosEmpleado());

async function cargarDatosEmpleado() {
  try {
    const data = await obtenerEmpleadoPorId(empleadoId);

    if (data) {
      const empleado = data.empleado;

      // Mostrar los detalles del empleado
      document.getElementById("nombre").innerText = empleado.nombre;
      document.getElementById("especialidad").innerText = empleado.especialidad;
      document.getElementById("email").innerText = empleado.usuario.email;
      document.getElementById("telefono").innerText = empleado.telefono;
      document.getElementById("direccion").innerText = empleado.direccion;
      document.getElementById("fecha_nacimiento").innerText = empleado.fecha_nacimiento;
      document.getElementById("fecha_alta").innerText = empleado.fecha_alta;
      document.getElementById("preview-imagen").src = empleado.url_imagen;
    } else {
      throw new Error("No se encontraron datos del empleado.");
    }
  } catch (error) {
    console.error("Error al cargar los detalles del empleado:", error);
    showToast(error.message, "error");
  }
}
