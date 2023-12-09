import authService from "../../services/authService.js";
import { showToast } from "../../utils/toast.js";

//----------------------------------------------
// -------------- VARIABLES ------------------
//----------------------------------------------
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("signupFrm");

//----------------------------------------------
// -------------- EVENTOS ------------------
//----------------------------------------------
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);
form.addEventListener("submit", validateFormLogin);

//----------------------------------------------
// -------------- FUNCIONES ------------------
//----------------------------------------------

/**
 * Función que muestra un mensaje de alerta
 * @param {HTMLElement} element elemento HTML que tiene el mensaje de alerta
 * @param {string} message mensaje que se mostrará en la alerta
 */
function displayAlert(element, message) {
  const alertElement = element.nextElementSibling;
  if (!alertElement) {
    element.insertAdjacentHTML("afterend", `<div class='alert-validate'>${message}</div>`);
  } else {
    alertElement.textContent = message;
  }
}

/**
 * Función que remueve un mensaje de alerta
 * @param {HTMLElement} element elemento HTML que tiene el mensaje de alerta
 */
function removeAlert(element) {
  const alertElement = element.nextElementSibling;
  if (alertElement) {
    alertElement.remove();
  }
}

/**
 * Función que valida el email
 * @returns {boolean} true si el email es válido, false si no es válido
 */
function validateEmail() {
  const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!pattern.test(email.value)) {
    email.classList.add("input-alert");
    displayAlert(email, "El email no es válido");
    return false;
  } else {
    email.classList.remove("input-alert");
    removeAlert(email);
    return true;
  }
}

/**
 * Función que valida el password del usuario (debe tener al menos 8 caracteres entre números y letras)
 * @returns {boolean} true si el password es válido, false si no es válido
 */
function validatePassword() {
  const patternPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (password.value.length < 8 || !patternPassword.test(password.value)) {
    password.classList.add("input-alert");
    displayAlert(password, "Se requieren al menos 8 caracteres entre números y letras");
    return false;
  } else {
    password.classList.remove("input-alert");
    removeAlert(password);
    return true;
  }
}

/**
 * Función que valida el formulario de registro
 * @param {Event} event evento submit del formulario
 */
async function validateFormLogin(event) {
  event.preventDefault();

  if (email.value === "" || password.value === "") {
    validateEmail();
    validatePassword();
    return;
  }

  // Crear un objeto con la información del usuario
  const userData = {
    email: email.value,
    password: password.value,
  };

  try {
    // Utilizar el servicio de autenticación para iniciar sesión
    const response_data = await authService.iniciarSesion(userData);

    // Verificar si la solicitud fue exitosa
    if (!response_data.ok) {
      throw new Error(response_data.error || "No se pudo loguear el usuario");
    }

    // Guardar la información del usuario en el localStorage
    localStorage.setItem("gymUserData", JSON.stringify(response_data.usuario));

    // Mostrar el toast de éxito y luego de 2 segundos redirigir a la página de inicio
    showToast("Usuario logueado exitosamente", "success");

    setTimeout(() => {
      window.location.href = "../../index.html";
    }, 2000);
  } catch (error) {
    // Manejar errores de red u otros errores
    console.error(error, error.message);
    showToast(error.message, "error");
    document.getElementById("errorLogin").textContent = error.message;
    setTimeout(() => {
      document.getElementById("errorLogin").textContent = "";
    }, 3000);
  }
}
