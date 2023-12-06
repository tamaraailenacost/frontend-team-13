import { buscarTodasLasClases } from "../../services/clasesService.js";
import { formatoHora } from "../../utils/formatoHora.js";

document.addEventListener("DOMContentLoaded", () => {
  // Llamada inicial para cargar los datos al cargar la página
  obtenerClases();
});

async function obtenerClases() {
  try {
    // Realizar la solicitud al backend para obtener las clases
    const data = await buscarTodasLasClases();

    // Verificar si la respuesta contiene datos
    if (!data) {
      console.error("No se encontraron datos de clases.");
    }
    llenarTabla(data.clases);
  } catch (error) {
    console.error("Error al obtener las clases:", error);
  }
}

const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

function llenarTabla(clases) {
  // Obtener la referencia a la tabla
  const cuerpoTabla = document.getElementById("contenedor-horarios");

  // Limpiar el cuerpo de la tabla antes de agregar las nuevas filas
  cuerpoTabla.innerHTML = "";

  // Iterar sobre las clases y agregarlas a la tabla
  for (const clase of clases) {
    const nuevaFila = document.createElement("tr");

    // Iterar sobre los días de la semana y agregar las celdas
    for (let i = 1; i <= 7; i++) {
      const celda = document.createElement("td");
      // Verificar si la clase tiene horario para ese día
      const horarioParaDia = clase.horario.dia_semana.dia_semana_id === i;
      if (horarioParaDia) {
        celda.innerHTML = `
            <strong>${clase.nombre}</strong>
            <span> ${formatoHora(clase.horario.hora_inicio)}</span>
            <span>${formatoHora(clase.horario.hora_fin)}</span>
            `;
      }

      nuevaFila.appendChild(celda);
    }

    // Agregar la fila al cuerpo de la tabla
    cuerpoTabla.appendChild(nuevaFila);
  }
}
