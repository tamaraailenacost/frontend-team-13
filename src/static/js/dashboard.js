import { buscarTodasLasClases, eliminarClase } from "../../services/clasesService.js";
import { buscarTodosLosInstructores, eliminarEmpleado } from "../../services/empleadoService.js";
import { formatoHora } from "../../utils/formatoHora.js";
import { showToast } from "../../utils/toast.js";

//---------------------------------------------
//-----------------Variables-----------------
//---------------------------------------------
const form = document.getElementById("formFiltrarClases");
const dia_semana = document.getElementById("dia-semana");
const instructor = document.getElementById("instructor");
let listado_clases = [];
let listado_instructores = [];

//---------------------------------------------
//-----------------Eventos-----------------
//---------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  buscarInstructores();
  buscarClases();
  setearTabOnClick();
});
form.addEventListener("submit", filtrarClases);

//---------------------------------------------
//-----------------Funciones-----------------
//---------------------------------------------
function setearTabOnClick() {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tab_previo = document.querySelector(".tab.active");
      tab_previo.classList.remove("active");

      tab.classList.add("active");
      const tabName = tab.getAttribute("data-tab-target");
      openTab(tabName);
    });
  });
}

function openTab(tabName) {
  // Ocultar todos los contenidos de pestañas y desactivar todas las pestañas
  const tabContent = document.querySelector(".tab-content.active");

  tabContent?.classList.remove("active");

  // Mostrar el contenido de la pestaña seleccionada y activar la pestaña
  const selectedTabContent = document.getElementById(tabName + "Tab");

  selectedTabContent.classList.add("active");
}

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

    // Guardar los instructores en la variable global
    listado_instructores = instructores;

    // Limpiar el select antes de agregar las nuevas opciones
    const selectInstructor = document.getElementById("instructor");
    selectInstructor.innerHTML = "";

    // Agregar la opción por defecto
    const optionDefault = document.createElement("option");
    optionDefault.value = "0";
    optionDefault.textContent = "Instructor";
    selectInstructor.appendChild(optionDefault);

    // Agregar opciones para cada instructor
    instructores.forEach((instructor) => {
      const option = document.createElement("option");
      option.value = instructor.empleado_id.toString(); // Asumimos que el ID es numérico
      option.textContent = instructor.nombre;
      selectInstructor.appendChild(option);
    });

    // Actualizar la tabla de instructores
    actualizarTablaInstructores(listado_instructores);
  } catch (error) {
    console.error("Error al buscar instructores:", error);
    showToast(error.message, "error");
  }
}

function actualizarTablaInstructores(instructores) {
  // Obtener la referencia a la tabla
  const tablaInstructores = document.getElementById("tabla-instructores");

  // Limpiar la tabla antes de agregar los nuevos instructores
  tablaInstructores.innerHTML = "";

  // Iterar sobre los instructores y agregarlos a la tabla
  for (const instructor of instructores) {
    // Agregar la nueva fila a la tabla sin afectar las filas existentes
    tablaInstructores.insertAdjacentHTML("beforeend", generarFilaTablaInstructor(instructor));

    // Asignar el id del instructor como atributo data-id-instructor al botón de ver
    tablaInstructores
      .querySelector(`.btn-ver[data-id-instructor="${instructor.empleado_id}"]`)
      .addEventListener("click", () => verEmpelado(instructor.empleado_id));

    // Asignar el id del instructor como atributo data-id-instructor al botón de editar
    tablaInstructores
      .querySelector(`.btn-editar[data-id-instructor="${instructor.empleado_id}"]`)
      .addEventListener("click", () => editarEmpelado(instructor.empleado_id));

    // Asignar el id del instructor como atributo data-id-instructor al botón de eliminar
    tablaInstructores
      .querySelector(`.btn-eliminar[data-id-instructor="${instructor.empleado_id}"]`)
      .addEventListener("click", () => eliminarInstructor(instructor.empleado_id));
  }
}

// Función para generar la fila de la tabla con referencias a los campos para instructores
function generarFilaTablaInstructor(instructor) {
  return `
    <tr>
      <td class="columna-instructor-foto"><img src="${
        instructor.url_imagen
      }" alt="Foto del instructor"></td>
      <td class="columna-instructor-nombre"><span class="campo-nombre">Nombre:</span> <p>${
        instructor.nombre
      }</p></td>
      <td class="columna-instructor-especialidad"><span class="campo-nombre">Especialidad:</span> <p>${
        instructor?.especialidad || "N/A"
      }</p></td>
      <td class="columna-instructor-email"><span class="campo-nombre">Email:</span> <p>${
        instructor.usuario.email
      }</p></td>
      <td class="columna-instructor-telefono"><span class="campo-nombre">Teléfono:</span> <p>${
        instructor.telefono
      }</p></td>
      <td>
        <span class="campo-nombre">Acciones:</span>
        <button class="btn-ver" data-id-instructor="${instructor.empleado_id}">
          <i class="fa-regular fa-eye"></i>
        </button>
        <button class="btn-editar" data-id-instructor="${instructor.empleado_id}">
          <i class="fa-regular fa-edit"></i>
        </button>
        <button class="btn-eliminar" data-id-instructor="${instructor.empleado_id}">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `;
}

async function buscarClases() {
  try {
    const data = await buscarTodasLasClases();

    if (!data || !data.clases) {
      throw new Error("No se encontraron clases.");
    }

    const clases = data.clases;

    if (clases.length === 0) {
      throw new Error("No se encontraron clases.");
    }

    // Guardar las clases en la variable global
    listado_clases = clases;

    // Actualizar la tabla de clases
    actualizarTablaClases(listado_clases);
  } catch (error) {
    console.error("Error al buscar clases:", error);
    showToast(error.message, "error");
  }
}

function actualizarTablaClases(clases) {
  // Obtener la referencia a la tabla
  const tablaClases = document.getElementById("tabla-clases");

  // Limpiar la tabla antes de agregar las nuevas clases
  tablaClases.innerHTML = "";

  // Iterar sobre las clases y agregarlas a la tabla
  for (const clase of clases) {
    // Agregar la nueva fila a la tabla sin afectar las filas existentes
    tablaClases.insertAdjacentHTML("beforeend", generarFilaTabla(clase));

    // Asignar el id de la clase como atributo data-id-clase al botón de ver
    tablaClases
      .querySelector(`.btn-ver[data-id-clase="${clase.clase_id}"]`)
      .addEventListener("click", () => {
        verClase(clase.clase_id);
      });

    // Asignar el id de la clase como atributo data-id-clase al botón de editar
    tablaClases
      .querySelector(`.btn-editar[data-id-clase="${clase.clase_id}"]`)
      .addEventListener("click", () => {
        editarClase(clase.clase_id);
      });

    // Asignar el id de la clase como atributo data-id-clase al botón de eliminar
    tablaClases
      .querySelector(`.btn-eliminar[data-id-clase="${clase.clase_id}"]`)
      .addEventListener("click", () => {
        borrarClase(clase.clase_id);
      });
  }
}

// Función para generar la fila de la tabla con referencias a los campos
function generarFilaTabla(clase) {
  return `
    <tr>
      <td class="columna-clase-nombre"><span class="campo-nombre">Clase:</span> <p>${clase.nombre}</p></td>
       <td><span class="campo-nombre">Instructor:</span> <p>${clase.instructor.nombre}</p></td>
      <td class="columna-dia-semana"><span class="campo-nombre">Día Semana:</span> <p>${clase.horario.dia_semana.nombre}</p>
     
      <td>
        <span class="campo-nombre">Acciones:</span>
        <button class="btn-ver" data-id-clase="${clase.clase_id}">
          <i class="fa-regular fa-eye"></i>
        </button>
        <button class="btn-editar" data-id-clase="${clase.clase_id}">
          <i class="fa-regular fa-edit"></i>
        </button>
        <button class="btn-eliminar" data-id-clase="${clase.clase_id}">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `;
}

function filtrarClases(e) {
  e.preventDefault();

  // Obtener el valor del input de búsqueda
  const diaSeleccionado = dia_semana.value;
  const instructorSeleccionado = instructor.value;

  // Filtrar las clases por dia de semana o instructor
  const clasesFiltradas = listado_clases.filter((clase) => {
    if (diaSeleccionado == 0 && instructorSeleccionado == 0) {
      return true;
    }

    if (diaSeleccionado == 0) {
      return clase.instructor.empleado_id == instructorSeleccionado;
    }

    if (instructorSeleccionado == 0) {
      return clase.horario.dia_semana.dia_semana_id == diaSeleccionado;
    }

    return (
      clase.horario.dia_semana.dia_semana_id == diaSeleccionado &&
      clase.instructor.empleado_id == instructorSeleccionado
    );
  });

  // Actualizar la tabla de clases
  actualizarTablaClases(clasesFiltradas);
}

async function borrarClase(claseId) {
  try {
    // Eliminar la clase usando el servicio
    await eliminarClase(claseId);

    // Actualizar la lista de clases después de eliminar la clase
    listado_clases = listado_clases.filter((clase) => clase.clase_id !== claseId);

    // Actualizar la tabla después de eliminar la clase
    actualizarTablaClases(listado_clases);

    showToast("Clase eliminada exitosamente.", "success");
  } catch (error) {
    console.error("Error al eliminar clase:", error);
    showToast(error.message, "error");
    // Puedes manejar el error según tus necesidades
  } finally {
    showToast("Clase eliminada exitosamente.", "success");
  }
}

async function eliminarInstructor(empleadoId) {
  try {
    // Eliminar la clase usando el servicio
    await eliminarEmpleado(empleadoId);

    // Actualizar la lista de clases después de eliminar la clase
    listado_instructores = listado_instructores.filter(
      (empleado) => empleado.empleado_id !== empleadoId
    );

    // Actualizar la tabla después de eliminar la clase
    actualizarTablaInstructores(listado_instructores);

    showToast("Empleado eliminada exitosamente.", "success");
  } catch (error) {
    console.error("Error al eliminar Empleado:", error);
    showToast(error.message, "error");
  } finally {
    showToast("Empleado eliminada exitosamente.", "success");
  }
}

// Función para ver los detalles de una clase
function verClase(claseId) {
  window.location.href = `./verClase.html?idClase=${claseId}`;
}
// Función para editar los detalles de una clase
function editarClase(claseId) {
  window.location.href = `./editarClase.html?idClase=${claseId}`;
}
// Función para ver los detalles de una clase
function verEmpelado(empeladoId) {
  window.location.href = `./verEmpleado.html?idEmpleado=${empeladoId}`;
}
// Función para editar los detalles de una clase
function editarEmpelado(empeladoId) {
  window.location.href = `./editarEmpleado.html?idEmpleado=${empeladoId}`;
}
