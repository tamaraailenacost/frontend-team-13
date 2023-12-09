// Seleccionar elementos del DOM
const burgerIcon = document.querySelector(".burger-icon");
const burgerMenu = document.querySelector(".burger-menu");
const btnSubMenuInicio = document.getElementById("btnSubMenuInicio");
const subMenuInicio = document.getElementById("subMenuInicio");

// Evento de clic para el icono de la hamburguesa
burgerIcon.addEventListener("click", toggleBurgerMenu);

// Evento de clic para el botón del submenú de inicio
btnSubMenuInicio.addEventListener("click", toggleSubMenuInicio);

// Función para manejar la visibilidad del menú burger
function toggleBurgerMenu() {
  burgerMenu.classList.toggle("show");
}

// Función para manejar la visibilidad del submenú de inicio
function toggleSubMenuInicio() {
  btnSubMenuInicio.classList.toggle("rotate");
  subMenuInicio.classList.toggle("show");
}
