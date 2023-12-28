import { crearClase } from "../../services/clasesService.js";
import { buscarTodosLosInstructores } from "../../services/empleadoService.js";
import { buscarTodosLosHorarios, registrarHorario } from "../../services/horarioService.js";
import { showToast } from "../../utils/toast.js";

let listado_horarios = [];
const imagenInput = document.getElementById("imagen");
const previewImagen = document.getElementById("preview-imagen");
const form_registrar_clase = document.getElementById("form-registrar-clase");
form_registrar_clase.addEventListener("submit", async (event) => {
  registrarNuevaClase(event);
});

document.addEventListener("DOMContentLoaded", () => {
  buscarInstructores();
  cargarHorarios();
});

async function buscarInstructores() {
  try {
    const data = await buscarTodosLosInstructores();

    if (!data || !data.instructores) {
      throw new Error("No se encontraron instructores.");
    }

    const instructores = data.instructores;

    if (instructores.length === 0) {
      throw new Error("No se encontraron instructores.");
    }

    // Limpiar el select antes de agregar las nuevas opciones
    const selectInstructor = document.getElementById("instructor_id");
    selectInstructor.innerHTML = "";

    // Agregar la opción por defecto
    const optionDefault = document.createElement("option");
    optionDefault.value = "0";
    optionDefault.textContent = "Selecciona un instructor";
    selectInstructor.appendChild(optionDefault);

    // Agregar opciones para cada instructor
    instructores.forEach((instructor) => {
      const option = document.createElement("option");
      option.value = instructor.empleado_id.toString(); // Asumimos que el ID es numérico
      option.textContent = instructor.nombre;
      selectInstructor.appendChild(option);
    });
  } catch (error) {
    console.error("Error al buscar instructores:", error);
    showToast(error.message, "error");
  }
}

async function cargarHorarios() {
  try {
    const data = await buscarTodosLosHorarios();

    if (!data || !data.horarios) {
      throw new Error("No se encontraron horarios.");
    }

    const horarios = data.horarios;

    if (horarios.length === 0) {
      throw new Error("No se encontraron horarios.");
    }

    listado_horarios = horarios;

    // Actualizar el desplegable de horarios
    actualizarDesplegableHorarios(listado_horarios);
  } catch (error) {
    console.error("Error al buscar horarios:", error);
    showToast(error.message, "error");
  }
}

function actualizarDesplegableHorarios(horarios) {
  // Limpiar el select antes de agregar las nuevas opciones
  const selectHorario = document.getElementById("horario_id");
  selectHorario.innerHTML = "";

  // Agregar la opción por defecto
  const optionDefault = document.createElement("option");
  optionDefault.value = "0";
  optionDefault.textContent = "Selecciona un horario";
  selectHorario.appendChild(optionDefault);

  // Agregar opciones para cada horario
  horarios.forEach((horario) => {
    const option = document.createElement("option");
    option.value = horario.horario_id.toString(); // Asumimos que el ID es numérico
    option.textContent = `${horario.dia_semana.nombre} - ${horario.hora_inicio} a ${horario.hora_fin}`;
    selectHorario.appendChild(option);
  });
}

// modal.js
const btn_registrar_horario = document.getElementById("btn-registrar-horario");
btn_registrar_horario.addEventListener("click", () => {
  mostrarModal();
});
let diaSemanaInput;
let horaInicioInput;
let horaFinInput;
let btnOpenModal;
let btnRegistrarHorario;
let btnCerrarModal;
let spanCerrarModal;

// Función para inicializar el modal

diaSemanaInput = document.getElementById("dia-semana");
horaInicioInput = document.getElementById("hora-inicio");
horaFinInput = document.getElementById("hora-fin");

btnOpenModal = document.getElementById("btn-modal-horario");
btnOpenModal.addEventListener("click", () => {
  mostrarModal();
});

btnRegistrarHorario = document.getElementById("btn-registrar-horario");
btnRegistrarHorario.addEventListener("click", () => {
  registrarNuevoHorario();
});
btnCerrarModal = document.getElementById("btn-cancelar-horario");
btnCerrarModal.addEventListener("click", () => {
  cerrarModal();
});

spanCerrarModal = document.getElementById("close-horario");
spanCerrarModal.addEventListener("click", () => {
  cerrarModal();
});

// Función para mostrar el modal
function mostrarModal() {
  document.getElementById("modal-horario").style.display = "block";
}

// Función para cerrar el modal
function cerrarModal() {
  document.getElementById("modal-horario").style.display = "none";
}

async function registrarNuevoHorario() {
  const diaSemana = diaSemanaInput.value;
  const horaInicio = horaInicioInput.value;
  const horaFin = horaFinInput.value;

  if (!diaSemana || !horaInicio || !horaFin) {
    showToast("Por favor, ingresa todos los datos.", "error");
    return;
  }
  let data_body = {
    dia_semana_id: diaSemana,
    hora_inicio: horaInicio,
    hora_fin: horaFin,
  };

  try {
    // Realizar la solicitud para registrar el horario usando el servicio
    const data = await registrarHorario(data_body);

    if (!data || !data.horario) {
      throw new Error("No se recibió el horario registrado.");
    }

    listado_horarios.push(data.horario);

    // Mostrar el mensaje y actualizar el desplegable de horarios
    showToast("Horario registrado", "success");

    // Actualizar el desplegable de horarios
    actualizarDesplegableHorarios(listado_horarios);
  } catch (error) {
    console.error("Error al registrar el horario:", error.message);
    showToast("Error al registrar el horario", "error");
  }

  // Cerrar el modal después de registrar
  cerrarModal();
}

function validarFormulario() {
  const instructor = document.getElementById("instructor").value;
  const horario = document.getElementById("horario_id").value;

  if (instructor === "0") {
    showToast("Por favor, selecciona un instructor.", "error");
    return false;
  }

  if (horario === "0") {
    showToast("Por favor, selecciona un horario.", "error");
    return false;
  }

  return true;
}

async function registrarNuevaClase(e) {
  e.preventDefault();

  const formData = new FormData(form_registrar_clase);

  try {
    const data = await crearClase(formData);

    if (!data || !data.clase) {
      showToast("No se recibió la clase registrada.", "error");
      return;
    }

    showToast("Clase registrada", "success");
    form_registrar_clase.reset();
    setTimeout(() => {
      window.location.href = "./dashboard.html";
    }, 3000);
  } catch (error) {
    console.error("Error al registrar la clase:", error.message);
    showToast("Error al registrar la clase", "error");
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
