export function showToast(message, tipo) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  toastMessage.textContent = message;
  toast.classList.add("show", tipo);

  setTimeout(() => {
    toast.classList.remove("show", tipo);
  }, 3000); // Ocultar el toast después de 3 segundos
}
