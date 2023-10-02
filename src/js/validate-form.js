const form = document.querySelectorAll('#signupFrm');

form.addEventListener('submit', validateForm())
form.addEventListener()


function validateForm(Event){
    const nombreInput = document.querySelectorAll('usuario');
    const emailInput = document.querySelectorAll('password');

    if (nombreInput.value === '') {
        alert('Por favor, ingresa tu nombre.');
        event.preventDefault(); // Evitar el envío del formulario
    }

    if (!isValidEmail(emailInput.value)) {
        alert('Por favor, ingresa una dirección de correo electrónico válida.');
        event.preventDefault(); // Evitar el envío del formulario
    }
}

function isValidEmail(email) {
    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return pattern.test(email);
}
