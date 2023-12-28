// editar.js

import { actualizarEmpleado, obtenerEmpleadoPorId } from "../../services/empleadoService.js";
import { showToast } from "../../utils/toast.js";

let empleado = null;
const urlParams = new URLSearchParams(window.location.search);
const empleadoId = urlParams.get("idEmpleado");

const formEditarEmpleado = document.getElementById("form-editar-empleado");
const previewImagen = document.getElementById("preview-imagen");
const imagenInput = document.getElementById("imagen");
const nombreInput = document.getElementById("nombre");
const dniInput = document.getElementById("dni");
const fechaNacimientoInput = document.getElementById("fecha_nacimiento");
const emailInput = document.getElementById("email");
const telefonoInput = document.getElementById("telefono");
const direccionInput = document.getElementById("direccion");
const especialidadInput = document.getElementById("especialidad");
const guardarBtn = document.getElementById("btn-guardar");

document.addEventListener("DOMContentLoaded", async () => cargarDatosEmpleado());

async function cargarDatosEmpleado() {
  try {
    const data = await obtenerEmpleadoPorId(empleadoId);

    if (!data) {
      throw new Error("No se encontraron datos del empleado.");
    }

    empleado = data.empleado;

    // Mostrar los detalles del empleado
    nombreInput.value = empleado.nombre;
    dniInput.value = empleado.dni;
    especialidadInput.value = empleado.especialidad;
    emailInput.value = empleado.usuario.email;
    telefonoInput.value = empleado.telefono;
    direccionInput.value = empleado.direccion;
    fechaNacimientoInput.value = empleado.fecha_nacimiento;
    previewImagen.src = empleado.url_imagen;

    // Agregar evento de guardar
    formEditarEmpleado.addEventListener("submit", async (e) => await actualizarDatosEmpleado(e));
  } catch (error) {
    console.error("Error al cargar los detalles del empleado:", error);
    showToast(error.message, "error");
  }
}

imagenInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    previewImagen.src = reader.result;
  };
});

async function actualizarDatosEmpleado(e) {
  e.preventDefault();

  try {
    const formData = new FormData(formEditarEmpleado);
    for (const v of formData.values()) {
      console.log(v);
    }

    const data = await actualizarEmpleado(empleadoId, formData);

    if (!data || !data.empleado_actualizado) {
      showToast(data.message, "error");
      return;
    }

    empleado = data.empleado_actualizado;
    formEditarEmpleado.reset();
    showToast("Cambios guardados", "success");
    // Redirigir a la página de dashboard después de 3 segundos
    setTimeout(() => {
      window.location.href = "./dashboard.html";
    }, 3000);
  } catch (error) {
    console.error("Error al actualizar los datos del empleado:", error);
    showToast(error.message, "error");
  }
}
