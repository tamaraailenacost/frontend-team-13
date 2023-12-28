import { actualizarClase, obtenerClasePorId } from "../../services/clasesService.js";
import { buscarTodosLosInstructores } from "../../services/empleadoService.js";
import { buscarTodosLosHorarios, registrarHorario } from "../../services/horarioService.js";
import { showToast } from "../../utils/toast.js";

// Elementos del DOM
const formEditarClase = document.getElementById("form-editar-clase");
const imagenInput = document.getElementById("imagen");
const previewImagen = document.getElementById("preview-imagen");
const nombreInput = document.getElementById("nombre");
const descripcionInput = document.getElementById("descripcion");
const selectInstructor = document.getElementById("instructor_id");
const capacidadMaximaInput = document.getElementById("capacidad_maxima");
const selectHorario = document.getElementById("horario_id");

// Datos
let clase = null;
let listadoHorarios = [];

// Obtener parámetro de la URL
const urlParams = new URLSearchParams(window.location.search);
const claseId = urlParams.get("idClase");

document.addEventListener("DOMContentLoaded", async () => {
  await cargarInstructores();
  await cargarHorarios();
  await cargarClase();
});

// Funciones
async function cargarInstructores() {
  try {
    const data = await buscarTodosLosInstructores();

    if (!data || !data.instructores || data.instructores.length === 0) {
      throw new Error("No se encontraron instructores.");
    }

    // Limpiar el select antes de agregar las nuevas opciones
    selectInstructor.innerHTML = createOption("Selecciona un instructor", "0");

    // Agregar opciones para cada instructor
    data.instructores.forEach((instructor) => {
      selectInstructor.appendChild(createOption(instructor.nombre, instructor.empleado_id));
    });
  } catch (error) {
    handleError("Error al buscar instructores:", error);
  }
}

async function cargarHorarios() {
  try {
    const data = await buscarTodosLosHorarios();

    if (!data || !data.horarios || data.horarios.length === 0) {
      throw new Error("No se encontraron horarios.");
    }

    listadoHorarios = data.horarios;

    // Actualizar el desplegable de horarios
    actualizarDesplegableHorarios();
  } catch (error) {
    handleError("Error al buscar horarios:", error);
  }
}

async function cargarClase() {
  try {
    const data = await obtenerClasePorId(claseId);
    if (!data) {
      throw new Error("No se encontraron datos del empleado.");
    }

    clase = data.clase;

    // Llenar los campos del formulario con la información de la clase
    previewImagen.src = clase.url_imagen;
    nombreInput.value = clase.nombre;
    descripcionInput.value = clase.descripcion;
    selectInstructor.value = clase.instructor.empleado_id;
    capacidadMaximaInput.value = clase.capacidad_maxima;
    selectHorario.value = clase.horario.horario_id;

    formEditarClase.addEventListener("submit", async (e) => await editarDatosClase(e));
  } catch (error) {
    handleError("Error al cargar la clase:", error);
  }
}

function actualizarDesplegableHorarios() {
  // Limpiar el select antes de agregar las nuevas opciones
  selectHorario.innerHTML = createOption("Selecciona un horario", "0");

  // Agregar opciones para cada horario
  listadoHorarios.forEach((horario) => {
    const optionText = `${horario.dia_semana.nombre} - ${horario.hora_inicio} a ${horario.hora_fin}`;
    selectHorario.appendChild(createOption(optionText, horario.horario_id));
  });
}

function createOption(text, value) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  return option;
}

function handleError(message, error) {
  console.error(message, error);
  showToast(message, "error");
}

// Función para inicializar el modal

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

async function editarDatosClase(e) {
  e.preventDefault();

  try {
    const formData = new FormData(formEditarClase);
    for (const v of formData.values()) {
      console.log(v);
    }

    const data = await actualizarClase(claseId, formData);

    if (!data || !data.clase_actualizada) {
      throw new Error("Error al guardar los cambios");
    }

    clase = data.clase_actualizada;
    formEditarClase.reset();
    showToast("Cambios guardados", "success");
    setTimeout(() => {
      window.location.href = "./dashboard.html";
    }, 3000);
  } catch (error) {
    handleError("Error al guardar los cambios", error);
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
