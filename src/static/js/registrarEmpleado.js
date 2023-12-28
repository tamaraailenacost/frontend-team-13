import { registrarEmpleado } from "../../services/empleadoService.js";
import { showToast } from "../../utils/toast.js";

const imagenInput = document.getElementById("imagen");
const previewImagen = document.getElementById("preview-imagen");

document.addEventListener("DOMContentLoaded", function () {
  const formRegistrarInstructor = document.getElementById("form-registrar-empleado");

  formRegistrarInstructor.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Crear un objeto FormData para enviar los datos, incluyendo la foto
    const formData = new FormData(formRegistrarInstructor);
    
    try {
      // Utilizar el servicio para registrar el instructor
      const data = await registrarEmpleado(formData);

      console.log(data);
      showToast("Instructor registrado", "success");
      formRegistrarInstructor.reset();

      // Retrasar la redirección a la página de dashboard por 3 segundos
      setTimeout(function () {
        window.location.href = "./dashboard.html"; // Ajusta la ruta según tu estructura de archivos
      }, 3000);
    } catch (error) {
      console.error("Error registrando el instructor:", error);
      showToast(error.message, "error");
    }
  });
});


imagenInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    previewImagen.src = reader.result;
  };
});