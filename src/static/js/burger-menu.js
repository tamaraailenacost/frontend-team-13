const burgerIcon = document.querySelector(".burger-icon");
const burgerMenu = document.querySelector(".burger-menu");

burgerIcon.addEventListener("click", () => {
  burgerMenu.classList.toggle("show");
});
