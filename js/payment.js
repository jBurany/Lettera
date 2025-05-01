// public/js/payment.js

// 1. Simula el pago redirigiendo al formulario con paid=true
function simulatePayment(plan) {
  const tipoCarta = new URLSearchParams(window.location.search).get("tipoCarta") || "amor";
  window.location.href = `/formulario.html?tipoCarta=${tipoCarta}&plan=${plan}&paid=true`;
}

// 2. Asocia los botones de plan a la función de simulación
function initPaymentButtons() {
  const btns = {
    basico:     document.getElementById('planBasico'),
    intermedio: document.getElementById('planIntermedio'),
    completo:   document.getElementById('planCompleto')
  };
  Object.entries(btns).forEach(([plan, btn]) => {
    if (btn) btn.addEventListener('click', () => simulatePayment(plan));
  });
}

// Exportamos para uso con módulos (opcional)
// export { initPaymentButtons, simulatePayment };
