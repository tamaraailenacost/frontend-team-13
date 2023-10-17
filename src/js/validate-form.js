const user = document.getElementById('user');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_1 = document.getElementById('password-1');

function displayAlert(element, message) {
    const alertElement = element.nextElementSibling;
    if (!alertElement) {
        element.insertAdjacentHTML('afterend', `<div class='alert-validate'>${message}</div>`);
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
        user.classList.add('input-alert');
        displayAlert(user, 'Este campo es obligatorio');
        return false;
    } else {
        user.classList.remove('input-alert');
        removeAlert(user);
        return true;
    }
}

function validateEmail() {
    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!pattern.test(email.value)) {
        email.classList.add('input-alert');
        displayAlert(email, 'El email no es válido');
        return false;
    } else {
        email.classList.remove('input-alert');
        removeAlert(email);
        return true;
    }
}

function validatePassword() {
    const patternPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (password.value.length < 8 || !patternPassword.test(password.value)) {
        password.classList.add('input-alert');
        displayAlert(password, 'Se requieren al menos 8 caracteres entre números y letras');
        return false;
    } else {
        password.classList.remove('input-alert');
        removeAlert(password);
        return true;
    }
}

function validatePasswordMatch() {
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
}

user.addEventListener('blur', validateUser);
email.addEventListener('blur', validateEmail);
password.addEventListener('blur', validatePassword);
password_1.addEventListener('blur', validatePasswordMatch);

const form = document.getElementById('signupFrm');

form.addEventListener('submit', function (event) {


    if (user.value === '' || email.value === '' || password.value === '' || password_1.value === '') {
        event.preventDefault();

        validateEmail();
        validatePassword();
        validatePasswordMatch();
        validateUser();   
    }
});


