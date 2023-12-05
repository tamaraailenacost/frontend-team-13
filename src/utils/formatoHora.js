export function formatoHora(hora) {
  // Dar formato a la hora (asumiendo que siempre está en el formato HH:mm:ss)
  const [horaFormato12, minutos] = hora.split(":");
  const amPm = horaFormato12 >= 12 ? "p.m." : "a.m.";
  const hora12 = horaFormato12 % 12 || 12;

  return `${hora12}:${minutos} ${amPm}`;
}
