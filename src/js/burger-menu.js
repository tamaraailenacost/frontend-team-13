console.log("hola mundo");

const burgerIcon = document.querySelector('.burger-icon');
const burgerMenu = document.querySelector('.burger-menu');



burgerIcon.addEventListener('click', () => {

    if( burgerMenu.style.display === "none" || burgerMenu.style.display === ""){

        burgerMenu.style.display = "block";

    }else{
        burgerMenu.style.display = "none";
    }
    


});
