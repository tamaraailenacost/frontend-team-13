import clasesService from "../../services/clasesService.js";
import clienteService from "../../services/clienteService.js";
import reservasService from "../../services/reservasService.js";
import { formatoHora } from "../../utils/formatoHora.js";
import { showToast } from "../../utils/toast.js";

let reservasCliente = [];

document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("gymUserData")) {
    window.location.href = "./login.html";
  }
  // Realizar búsqueda al cargar la página
  buscarClases();
  obtenerReservasCliente();

  // Agregar evento para el formulario
  const form = document.querySelector(".form-filtrar-clases");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    buscarClases();
  });

  // Agregar evento para el formulario de reserva
  const formReserva = document.querySelector(".form-registrar-clase");
  formReserva.addEventListener("submit", function (event) {
    event.preventDefault();
    reservarClase();
  });
});

async function buscarClases() {
  const diaSeleccionado = document.getElementById("dia").value;

  try {
    // Obtener las clases usando el servicio
    const data = await clasesService.obtenerClasesPorDiaSemana(diaSeleccionado);

    // Limpiar el contenedor antes de agregar nuevas clases
    const clasesContainer = document.getElementById("clases-container");
    clasesContainer.innerHTML = "";

    // Agregar las clases al contenedor
    const fragment = document.createDocumentFragment();
    data.clases.forEach((clase) => {
      const claseOpcion = document.createElement("div");
      claseOpcion.className = "clase-opcion";
      const inputElement = document.createElement("input");
      inputElement.id = `clase-${clase.clase_id}`;
      inputElement.type = "radio";
      inputElement.name = "clase";
      inputElement.value = clase.clase_id;
      inputElement.required = true;
      inputElement.style.display = "none";

      const labelElement = document.createElement("label");
      labelElement.className = "nombre-clase";
      labelElement.htmlFor = `clase-${clase.clase_id}`;
      labelElement.textContent = `${clase.nombre} - ${formatoHora(clase.horario.hora_inicio)}`;

      // Agregar evento clic para mantener el estilo
      inputElement.addEventListener("change", () => {
        if (inputElement.checked) {
          document.querySelector(".nombre-clase.active")?.classList.remove("active");
          labelElement.classList.add("active");
        } else {
          labelElement.classList.remove("active");
        }
      });

      claseOpcion.appendChild(labelElement);
      claseOpcion.appendChild(inputElement);
      fragment.appendChild(claseOpcion);
    });

    clasesContainer.appendChild(fragment);
  } catch (error) {
    console.error("Error al buscar clases:", error);
  }
}

async function reservarClase() {
  const claseSeleccionada = document.querySelector('input[name="clase"]:checked');

  if (!claseSeleccionada) {
    console.error("No se ha seleccionado ninguna clase para reservar.");
    return;
  }

  try {
    const claseId = parseInt(claseSeleccionada.value);
    const clienteId = JSON.parse(localStorage.getItem("gymUserData")).cliente_id;

    if (!clienteId) {
      console.error("No se pudo obtener el ID del cliente desde el localStorage.");
      return;
    }

    // Reservar la clase usando el servicio
    const data = await reservasService.reservarClase(claseId, clienteId);

    // Mostrar el mensaje y actualizar la tabla de reservas
    showToast("Reserva realizada", "success");
    let reserva = data.reserva;
    reservasCliente.push(reserva);
    actualizarTablaReservas();
  } catch (error) {
    console.error("Error:", error.message);
    showToast("Error al realizar la reserva", "error");
  }
}

async function obtenerReservasCliente() {
  // obtener el id del cliente desde el local storage
  const clienteId = JSON.parse(localStorage.getItem("gymUserData")).cliente_id;

  try {
    // Obtener las reservas del cliente usando el servicio
    const reservas = await clienteService.obtenerReservasCliente(clienteId);

    if (!reservas) {
      throw new Error("No se encontraron reservas del cliente.");
    }

    if (reservas.length === 0) {
      throw new Error("El cliente no tiene reservas.");
    }

    reservasCliente = reservas;

    // Después de obtener las reservas, actualizar la tabla
    actualizarTablaReservas();
  } catch (error) {
    console.error("Error al obtener las reservas del cliente:", error);
    showToast(error.message, "error");
  }
}

function actualizarTablaReservas() {
  // Obtener la referencia a la tabla
  const tablaReservas = document.getElementById("mis-reservas");

  // Limpiar la tabla antes de agregar las nuevas reservas
  tablaReservas.innerHTML = "";

  // Iterar sobre las reservas y agregarlas a la tabla
  for (const reserva of reservasCliente) {
    // Agregar la nueva fila a la tabla sin afectar las filas existentes
    tablaReservas.insertAdjacentHTML("beforeend", generarFilaTabla(reserva));

    // asignar el id de la reserva como atributo data-id-reserva al botón de eliminar
    const btnEliminar = document.querySelector(`[data-id-reserva="${reserva.reserva_id}"]`);
    btnEliminar.addEventListener("click", () => {
      eliminarReserva(reserva.reserva_id);
    });
  }
}

// Función para generar la fila de la tabla con referencias a los campos
function generarFilaTabla(reserva) {
  return `
    <tr>
      <td class="columna-clase-nombre"><span class="campo-nombre">Clase:</span> <p>${
        reserva.clase.nombre
      }</p></td>
      <td class="columna-dia-semana"><span class="campo-nombre">Día Semana:</span> <p>${
        reserva.clase.horario.dia_semana.nombre
      }</p></td>
      <td><span class="campo-nombre">Hora Inicio:</span> <p>${formatoHora(
        reserva.clase.horario.hora_inicio
      )}</p></td>
      <td><span class="campo-nombre">Instructor:</span> <p>${reserva.clase.instructor.nombre}</p></td>
      <td><span class="campo-nombre">Fecha Reserva:</span> <p>${reserva.fecha_reserva}</p></td>
      <td>
        <span class="campo-nombre">Acciones:</span>
        <button class="btn-eliminar" data-id-reserva="${reserva.reserva_id}">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `;
}

async function eliminarReserva(reservaId) {
  try {
    // Eliminar la reserva usando el servicio
    await reservasService.eliminarReserva(reservaId);

    // Actualizar la lista de reservas después de eliminar la reserva
    reservasCliente = reservasCliente.filter((reserva) => reserva.reserva_id !== reservaId);

    // Actualizar la tabla después de eliminar la reserva
    actualizarTablaReservas();

    showToast("Reserva eliminada exitosamente.", "success");
  } catch (error) {
    console.error("Error al eliminar reserva:", error);
    showToast(error.message, "error");
    // Puedes manejar el error según tus necesidades
  } finally {
    showToast("Reserva eliminada exitosamente.", "success");
  }
}
