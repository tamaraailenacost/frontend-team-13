document.addEventListener("DOMContentLoaded", function () {
  const userData = localStorage.getItem("gymUserData");
  const reservarButton = document.getElementById("reservar-btn");
  const loginButton = document.getElementById("login-btn");
  const logoutButton = document.getElementById("logout-btn");
  const registerButton = document.getElementById("register-btn");

  const boton_reservar = document.querySelector(".btnReservas");
  const boton_registrar = document.querySelector(".btnRegistrar");
  const boton_login = document.querySelector(".btnLogin");
  const boton_logout = document.querySelector(".btnLogout");

  if (userData) {
    // Usuario logueado

    reservarButton.style.display = "flex"; // Mostrar botón de reservar
    loginButton.style.display = "none"; // Ocultar botones de login y registro
    logoutButton.style.display = "flex"; // Mostrar botón de logout
    registerButton.style.display = "none"; // Ocultar botón de registro

    boton_reservar.style.display = "block"; // Mostrar botón de reservar
    boton_login.style.display = "none"; // Ocultar botones de login y registro
    boton_logout.style.display = "block"; // Mostrar botón de logout
    boton_registrar.style.display = "none"; // Ocultar botón de registro
  }
});
function toggleLoginRegister() {
  const loginButtons = document.querySelector(".login-buttons");
  loginButtons.classList.toggle("show");
}

function logout() {
  // Eliminar el usuario del localStorage
  localStorage.removeItem("gymUserData");

  // Redirigir a la página de inicio (o a donde prefieras)
  window.location.href = "../../../index.html";
}
