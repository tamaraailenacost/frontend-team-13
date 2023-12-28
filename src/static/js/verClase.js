// verClase.js

import { obtenerClasePorId } from "../../services/clasesService.js";
import { showToast } from "../../utils/toast.js";

const urlParams = new URLSearchParams(window.location.search);
const claseId = urlParams.get("idClase");

document.addEventListener("DOMContentLoaded", async () => cargarDatosClase());

async function cargarDatosClase() {
  try {
    const data = await obtenerClasePorId(claseId);

    if (data && data.clase) {
      const clase = data.clase;

      // Mostrar los detalles de la clase
      document.getElementById("preview-imagen").src = clase.url_imagen;
      document.getElementById("nombre").innerText = clase.nombre;
      document.getElementById("descripcion").innerText = clase.descripcion;
      document.getElementById("instructor-nombre").innerText = clase.instructor.nombre;
      document.getElementById("instructor-especialidad").innerText = clase.instructor.especialidad;
      document.getElementById("instructor-telefono").innerText = clase.instructor.telefono;
      document.getElementById("instructor-direccion").innerText = clase.instructor.direccion;

      // Mostrar el horario
      document.getElementById("dia_semana").innerText = clase.horario.dia_semana.nombre;
      document.getElementById("hora_inicio").innerText = clase.horario.hora_inicio;
      document.getElementById("hora_fin").innerText = clase.horario.hora_fin;

      document.getElementById("capacidad_maxima").innerText = clase.capacidad_maxima;
    } else {
      throw new Error("No se encontraron datos de la clase.");
    }
  } catch (error) {
    console.error("Error al cargar los detalles de la clase:", error);
    showToast(error.message, "error");
  }
}
