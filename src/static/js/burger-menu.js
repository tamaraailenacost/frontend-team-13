const burgerIcon = document.querySelector(".burger-icon");
const burgerMenu = document.querySelector(".burger-menu");

burgerIcon.addEventListener("click", () => {
  burgerMenu.classList.toggle("show");
});




const btnSubMenuInicio = document.getElementById("btnSubMenuInicio");
const subMenuInicio = document.getElementById("subMenuInicio");

btnSubMenuInicio.addEventListener("click", () => {
  btnSubMenuInicio.classList.toggle("rotate");
  subMenuInicio.classList.toggle("show");
});
