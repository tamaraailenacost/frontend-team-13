import {showToast} from '../../utils/toast.js';

const email = document.getElementById("email");
const password = document.getElementById("password");

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
  if (user.value.length < 3) {
    user.classList.add("input-alert");
    displayAlert(user, "Este campo es obligatorio");
    return false;
  } else {
    user.classList.remove("input-alert");
    removeAlert(user);
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

/* function validatePasswordMatch() {
    if (password.value !== password_1.value) {
        password.classList.add('input-alert');
        password_1.classList.add('input-alert');
        displayAlert(password_1, 'Ambos passwords deben ser iguales');
        return false;
    } else {
        password.classList.remove('input-alert');
        password_1.classList.remove('input-alert');
        removeAlert(password_1);
        return true;
    }
} */

//user.addEventListener('blur', validateUser);
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);
//password_1.addEventListener('blur', validatePasswordMatch);

const form = document.getElementById("signupFrm");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (email.value === "" || password.value === "") {
    event.preventDefault();

    validateEmail();
    validatePassword();
  }

  // Crear un objeto con la información del usuario
  const userData = {
    email: email.value,
    password: password.value,
  };

  try {
    // Enviar la solicitud al backend usando fetch o la librería que prefieras
    const response = await fetch("https://giulianocharra.pythonanywhere.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // Verificar si la solicitud fue exitosa
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || "No se pudo crear el usuario");
    }
      // Parsear la respuesta del backend

      // Verificar si el login fue exitoso
      // Guardar la información del usuario en el localStorage
      localStorage.setItem("gymUserData", JSON.stringify(responseData.usuario));

      // Redirigir a la página de inicio o a donde desees
      window.location.href = "../../index.html";
  } catch (error) {
    // Manejar errores de red u otros errores
    console.error(error, error.message);
    showToast(error.message, "error");
    document.getElementById("errorLogin").textContent = error.message;
  }
});
