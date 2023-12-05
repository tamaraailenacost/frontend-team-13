import { formatoHora } from "../../utils/formatoHora.js";
import { showToast } from "../../utils/toast.js";

let reservasCliente = [];

document.addEventListener("DOMContentLoaded", function () {
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

function buscarClases() {
  const diaSeleccionado = document.getElementById("dia").value;

  // Realizar la solicitud Fetch al backend
  fetch(`https://giulianocharra.pythonanywhere.com/api/clases/?dia_semana_id=${diaSeleccionado}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
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
    })
    .catch((error) => {
      console.error("Error al buscar clases:", error);
    });
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
    let dataBody = { clase_id: claseId, cliente_id: clienteId };

    const response = await fetch("https://giulianocharra.pythonanywhere.com/api/reservas/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBody),
    });

    if (!response.ok) {
      console.error("Error en la solicitud HTTP:", response.status, response.statusText);
      let data = await response.json();
      showToast(`Error: ${data.error}`, "error");
      return;
    }

    const data = await response.json();
    console.log("Respuesta del backend:", data);

    showToast("Reserva realizada", "success");
    let reserva = data.reserva;
    reservasCliente.push(reserva);
    actualizarTablaReservas();
  } catch (error) {
    console.error("Error:", error.message);
    showToast("Error al realizar la reserva", "error");
  }
}

// Función para obtener las reservas del cliente desde el backend
async function obtenerReservasCliente() {
  // obtener el id del cliente desde el local storage
  const clienteId = JSON.parse(localStorage.getItem("gymUserData")).cliente_id;

  // Realizar la solicitud Fetch al backend para obtener las reservas
  try {
    let req = await fetch(`https://giulianocharra.pythonanywhere.com/api/clientes/${clienteId}/reservas`);
    let json = await req.json();

    // Asignar las reservas obtenidas a la variable reservasCliente
    reservasCliente = json.reservas;

    // Después de obtener las reservas, actualizar la tabla
    actualizarTablaReservas();
  } catch (error) {
    console.error("Error al obtener las reservas del cliente:", error);
  }
}

// Función para actualizar la tabla de reservas
function actualizarTablaReservas() {
  // Obtener la referencia a la tabla
  const tablaReservas = document.getElementById("mis-reservas");

  // Limpiar la tabla antes de agregar las nuevas reservas
  tablaReservas.innerHTML = "";

  // Iterar sobre las reservas y agregarlas a la tabla
  for (const reserva of reservasCliente) {
    // Agregar una nueva fila con un template literal
    const nuevaFila = `
      <tr>
        <td class="columna-clase-nombre">${reserva.clase.nombre}</td>
        <td class="columna-dia-semana">${reserva.clase.horario.dia_semana.nombre}</td>
        <td>${formatoHora(reserva.clase.horario.hora_inicio)}</td>
        <td>${reserva.clase.instructor}</td>
        <td>${reserva.fecha_reserva}</td>
        <td>
          <button class="btn-eliminar-reserva" data-id-reserva="${reserva.reserva_id}">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `;

    // Agregar la nueva fila a la tabla sin afectar las filas existentes
    tablaReservas.insertAdjacentHTML("beforeend", nuevaFila);

    // asignar el id de la reserva como atributo data-id-reserva al botón de eliminar
    const btnEliminar = document.querySelector(`[data-id-reserva="${reserva.reserva_id}"]`);
    btnEliminar.addEventListener("click", () => {
      eliminarReserva(reserva.reserva_id);
    });
  }
}

// Función para eliminar una reserva
async function eliminarReserva(reservaId) {
  try {
    // Realizar la solicitud Fetch para eliminar la reserva en el backend
    const response = await fetch(`https://giulianocharra.pythonanywhere.com/api/reservas/${reservaId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar reserva`);
    }

    const data = await response.json();

    // Manejar la respuesta del backend si es necesario
    console.log("Reserva eliminada con éxito", data);

    // Actualizar la lista de reservas después de eliminar la reserva
    reservasCliente = reservasCliente.filter((reserva) => reserva.reserva_id !== reservaId);

    // Actualizar la tabla después de eliminar la reserva
    actualizarTablaReservas();

    showToast("Reserva eliminada exitosamente.", "success");
  } catch (error) {
    console.error("Error al eliminar reserva:", error);
    showToast(error.message, "error");
    // Puedes manejar el error según tus necesidades
  }
}
