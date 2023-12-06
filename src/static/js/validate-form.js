import { showToast } from "../../utils/toast.js";

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password_1 = document.getElementById("password-1");

function displayAlert(element, message) {
  const alertElement = element.nextElementSibling;
  if (!alertElement) {
    element.insertAdjacentHTML("afterend", `<div class='alert-validate'>${message}</div>`);
  } else {
    alertElement.textContent = message;
  }
}

function removeAlert(element) {
  const alertElement = element.nextElementSibling;
  if (alertElement) {
    alertElement.remove();
  }
}

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

username.addEventListener("blur", validateUser);
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);
password_1.addEventListener("blur", validatePasswordMatch);

const form = document.getElementById("signupFrm");

form.addEventListener("submit", async function (event) {
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
    // Enviar la solicitud al backend usando fetch o la librería que prefieras
    const response = await fetch("https://giulianocharra.pythonanywhere.com/api/auth/registrar", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();

    // Verificar si la solicitud fue exitosa
    if (!response.ok) {
      throw new Error(responseData.error);
    }

    if (!responseData) {
      displayAlert(email, responseData.message || "Error en el registro");
      showToast("Error en el registro", "error");
    }

    // mostrar toast de éxito y redirigir al login
    showToast("Usuario registrado con éxito", "success");

    setTimeout(() => {
      window.location.href = "./login.html";
    }, 2000);
  } catch (error) {
    console.error("Error:", error.message);
    document.getElementById("errorRegistro").textContent = error;

    setTimeout(() => {
      document.getElementById("errorRegistro").textContent = "";
    }, 3000);

    showToast(error, "error");
  }
});
