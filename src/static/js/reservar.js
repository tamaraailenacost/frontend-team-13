document.addEventListener("DOMContentLoaded", function () {
  // Realizar búsqueda al cargar la página
  buscarClases();

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
    const claseId = claseSeleccionada.value;
    // Aquí puedes hacer la lógica para reservar la clase con el claseId
    console.log("Clase seleccionada para reservar:", claseId);
  } else {
    console.error("No se ha seleccionado ninguna clase para reservar.");
  }
}

function formatoHora(hora) {
  // Dar formato a la hora (asumiendo que siempre está en el formato HH:mm:ss)
  const [horaFormato12, minutos] = hora.split(":");
  const amPm = horaFormato12 >= 12 ? "p.m." : "a.m.";
  const hora12 = horaFormato12 % 12 || 12;

  return `${hora12}:${minutos} ${amPm}`;
}
