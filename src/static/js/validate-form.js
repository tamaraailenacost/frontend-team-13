import { registrarUsuario } from "../../services/authService.js";
import { showToast } from "../../utils/toast.js";

// ----------------------------------------------
// -------------- VARIABLES ------------------
// ----------------------------------------------
const form = document.getElementById("signupFrm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password_1 = document.getElementById("password-1");

// ----------------------------------------------
// -------------- EVENTOS ------------------
// ----------------------------------------------
form.addEventListener("submit", validateForm);
username.addEventListener("blur", validateUser);
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);
password_1.addEventListener("blur", validatePasswordMatch);

// ----------------------------------------------
// -------------- FUNCIONES ------------------
// ----------------------------------------------

/**
 * Función que muestra un mensaje de alerta
 * @param {HTMLElement} element elemento HTML que tiene el mensaje de alerta
 * @param {string} message mensaje que se mostrará en la alerta
 * @returns {void}
 *
 * @example
 * username = document.getElementById("username");
 * displayAlert(username, "Este campo es obligatorio");
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
 * Función que remueve un mensaje de alerta si existe
 * @param {HTMLElement} element elemento HTML que tiene el mensaje de alerta
 * @returns {void}
 * @example
 * username = document.getElementById("username");
 * removeAlert(username);
 */
function removeAlert(element) {
  const alertElement = element.nextElementSibling;
  if (alertElement) {
    alertElement.remove();
  }
}

/**
 * Función que valida el email del usuario utilizando una expresión regular
 * @returns {boolean} true si el usuario es válido, false si no es válido
 */

function validateUser() {
  if (username.value.length < 3) {
    username.classList.add("input-alert");
    displayAlert(username, "Este campo es obligatorio");
    return false;
  } else {
    username.classList.remove("input-alert");
    removeAlert(username);
    return true;
  }
}

/**
 * Función que valida el email del usuario utilizando una expresión regular
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
 * Función que valida el password del usuario utilizando una expresión regular
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
 * Función que valida que los passwords sean iguales
 * @returns {boolean} true si los passwords son iguales, false si no lo son
 */
function validatePasswordMatch() {
  if (password.value !== password_1.value) {
    password.classList.add("input-alert");
    password_1.classList.add("input-alert");
    displayAlert(password_1, "Ambos passwords deben ser iguales");
    return false;
  } else {
    password.classList.remove("input-alert");
    password_1.classList.remove("input-alert");
    removeAlert(password_1);
    return true;
  }
}

/**
 * Función que valida el formulario de registro y envía la información al servicio de autenticación para registrar al usuario
 * @param {Event} event evento submit del formulario
 */
async function validateForm(event) {
  event.preventDefault();
  if (!validateEmail() || !validateUser() || !validatePasswordMatch() || !validatePasswordMatch()) {
    console.log("Formulario inválido");
  }
  // Crear un objeto con la información del usuario
  const userData = {
    username: username.value,
    password: password.value,
    email: email.value,
  };

  try {
    // Utilizar el servicio de autenticación para registrar al usuario
    const response_data = await registrarUsuario(userData);

    // Verificar si la solicitud fue exitosa
    if (!response_data) {
      throw new Error(response_data.error);
    }

    // Mostrar toast de éxito y redirigir al login
    showToast("Usuario registrado con éxito", "success");

    setTimeout(() => {
      window.location.href = "./login.html";
    }, 2000);
  } catch (error) {
    // Manejar errores de red u otros errores
    console.error("Error:", error.message);
    showToast(error.message || "Error en el registro", "error");
  }
}
