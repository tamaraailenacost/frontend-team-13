document.addEventListener("DOMContentLoaded", function () {
  const userData = localStorage.getItem("gymUserData");
  const reservarButton = document.getElementById("reservar-btn");
  const loginButton = document.getElementById("login-btn");
  const logoutButton = document.getElementById("logout-btn");
  const registerButton = document.getElementById("register-btn");

  if (userData) {
    // Usuario logueado

    reservarButton.style.display = "flex"; // Mostrar botón de reservar
    loginButton.style.display = "none"; // Ocultar botones de login y registro
    logoutButton.style.display = "flex"; // Mostrar botón de logout
    registerButton.style.display = "none"; // Ocultar botón de registro
  }
});
function toggleLoginRegister() {
  const loginButtons = document.querySelector(".login-buttons");
  loginButtons.style.display =
    loginButtons.style.display === "none" || loginButtons.style.display === "" ? "flex" : "none";
}

function logout() {
  // Eliminar el usuario del localStorage
  localStorage.removeItem("gymUserData");

  // Redirigir a la página de inicio (o a donde prefieras)
  window.location.href = "../../../index.html";
}
