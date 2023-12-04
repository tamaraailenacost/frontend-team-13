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
  fetch(`https://giulianocharra.pythonanywhere.com/api/clases?dia_semana_id=${diaSeleccionado}`)
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

function reservarClase() {
  const claseSeleccionada = document.querySelector('input[name="clase"]:checked');

  if (claseSeleccionada) {
    const clase_id = claseSeleccionada.value;

    // Obtener el ID del cliente desde el localStorage
    const cliente_id = JSON.parse(localStorage.getItem("gymUserData")).cliente_id;

    if (cliente_id) {
      fetch("https://giulianocharra.pythonanywhere.com/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clase_id, cliente_id }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Manejar la respuesta del backend
          console.log("Respuesta del backend:", data);

          // Si la reserva fue exitosa, puedes mostrar un mensaje al usuario
          if (data.success) {
            showToast("Reserva exitosa", "success");
            let reserva = data.reserva;
            reservasCliente.push(reserva);
            actualizarTablaReservas();
          } else {
            showToast("Error al realizar la reserva", "error");
          }
        })
        .catch((error) => {
          console.error("Error al reservar la clase:", error);
          showToast("Error al realizar la reserva", "error");
        });
    } else {
      console.error("No se pudo obtener el ID del cliente desde el localStorage.");
    }
  } else {
    console.error("No se ha seleccionado ninguna clase para reservar.");
  }
}

// Función para obtener las reservas del cliente desde el backend
async function obtenerReservasCliente() {
  // obtener el id del cliente desde el local storage
  const clienteId = JSON.parse(localStorage.getItem("gymUserData")).cliente_id;

  // Realizar la solicitud Fetch al backend para obtener las reservas
  try {
    let req = await fetch(
      `https://giulianocharra.pythonanywhere.com/api/clientes/${clienteId}/reservas`
    );
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

  // Crear una fila de encabezado
  tablaReservas.innerHTML = `
    <tr>
      <th>Clase</th>
      <th>Dia Semana</th>
      <th>Hora Inicio</th>
      <th>Fecha Reserva</th>
      <th>Action</th>
    </tr>
  `;

  // Iterar sobre las reservas y agregarlas a la tabla
  for (const reserva of reservasCliente) {
    // Agregar una nueva fila con un template literal
    tablaReservas.innerHTML += `
      <tr>
        <td class="columna-clase-nombre">${reserva.clase.nombre}</td>
        <td class="columna-dia-semana">${reserva.clase.horario.dia_semana.nombre}</td>
        <td>${formatoHora(reserva.clase.horario.hora_inicio)}</td>
        <td>${reserva.fecha_reserva}</td>
        <td>
          <button class="btn-eliminar-reserva" onclick="eliminarReserva(${reserva})">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `;
  }
}

// Función para eliminar una reserva
function eliminarReserva(reserva) {
  // Realizar la solicitud Fetch para eliminar la reserva en el backend
  fetch(`https://giulianocharra.pythonanywhere.com/api/reservas/${reserva.reservaId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    // Puedes incluir un cuerpo si es necesario para tu backend
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error al eliminar reserva`);
        // throw new Error(`Error al eliminar reserva (${response.status}): ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      // Manejar la respuesta del backend si es necesario
      console.log("Reserva eliminada con éxito", data);
      reservasCliente = reservasCliente.filter(
        (reservaCliente) => reservaCliente.id !== reserva.id
      );

      // Actualizar la tabla después de eliminar la reserva
      actualizarTablaReservas();
      showToast("Reserva eliminada exitosamente.", "success");
    })
    .catch((error) => {
      console.error("Error al eliminar reserva:", error);
      showToast(error.message, "error");
      // Puedes manejar el error según tus necesidades
    });
}

function formatoHora(hora) {
  // Dar formato a la hora (asumiendo que siempre está en el formato HH:mm:ss)
  const [horaFormato12, minutos] = hora.split(":");
  const amPm = horaFormato12 >= 12 ? "p.m." : "a.m.";
  const hora12 = horaFormato12 % 12 || 12;

  return `${hora12}:${minutos} ${amPm}`;
}

function showToast(message, type) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  toastMessage.textContent = message;
  toast.classList.add("show", type);

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // Ocultar el toast después de 3 segundos
}
