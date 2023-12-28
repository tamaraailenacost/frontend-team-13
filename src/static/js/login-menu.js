const volverBtn = document.getElementById("btn-volver");

document.addEventListener("DOMContentLoaded", function () {
  const userData = localStorage.getItem("gymUserData");
  const reservarButton = document.getElementById("reservar-btn");
  const loginButton = document.getElementById("login-btn");
  const logoutButton = document.getElementById("logout-btn");
  const registerButton = document.getElementById("register-btn");
  const dashboardButton = document.querySelector(".dashboard-btn");

  const boton_reservar = document.querySelector(".btnReservas");
  const boton_registrar = document.querySelector(".btnRegistrar");
  const boton_login = document.querySelector(".btnLogin");
  const boton_logout = document.querySelector(".btnLogout");
  const boton_dashboard = document.querySelector(".btnDashboard");

  const nombre_usuario = document.getElementById("nombreCliente");
  const user_icon = document.getElementById("user-icono");
  const user_imagen = document.getElementById("user-imagen");

  const tipo_usuario = JSON.parse(userData).usuario.tipo_usuario.tipo_usuario_id;

  if (userData) {
    nombre_usuario.textContent = JSON.parse(userData).nombre;
    let url_imagen = JSON.parse(userData).url_imagen;
    if (url_imagen != null) {
      user_imagen.src = url_imagen;
      user_icon.style.display = "none";
      user_imagen.style.display = "block";
    }

    loginButton.style.display = "none";
    boton_logout.style.display = "block";
    registerButton.style.display = "none";

    boton_login.style.display = "none";
    logoutButton.style.display = "flex"; // Mostrar botón de logout
    boton_registrar.style.display = "none";
  }

  // Mostrar botones específicos según el tipo de usuario
  switch (tipo_usuario) {
    case 3: // Tipo de usuario 3
      reservarButton.style.display = "flex";
      boton_reservar.style.display = "block";
      break;

    case 2: // Tipo de usuario 2
      break; // No hay cambios adicionales para este tipo de usuario

    case 1: // Tipo de usuario 1
      dashboardButton.style.display = "flex";
      boton_dashboard.style.display = "block";
      break;

    default:
      break;
  }
});

function toggleLoginRegister() {
  const loginButtons = document.querySelector(".login-menu");
  loginButtons.classList.toggle("show");
}

function logout() {
  // Eliminar el usuario del localStorage
  localStorage.removeItem("gymUserData");

  // Redirigir a la página de inicio (o a donde prefieras)
  window.location.href = "../../index.html";
}

if (volverBtn) {
  volverBtn.addEventListener("click", () => {
    window.history.back();
  });
}
