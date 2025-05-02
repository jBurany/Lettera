// public/js/lang.js

// 1. Diccionario de traducciones
const translations = {
  es: {
    pageTitle:       "Elegí tu carta perfecta",
    title_amor:      "Carta de Amor",
    desc_amor:       "Expresá sentimientos profundos a esa persona especial. Ideal para declaraciones, aniversarios o reconciliaciones.",
    title_perdon:    "Carta de Perdón",
    desc_perdon:     "Para pedir disculpas con sinceridad, mostrar arrepentimiento y abrir la puerta al diálogo emocional.",
    title_laboral:   "Carta de Presentación Laboral",
    desc_laboral:    "Redactada para destacar tus habilidades, experiencia y motivación para postularte a un trabajo."
    
    // pago.html
    pageTitlePago:   "Pagar carta personalizada",
    loadingTitle:    "Cargando…",
    loadingDesc:     "Por favor espera mientras cargamos los detalles de tu carta.",
    choosePlan:      "Elegí tu plan:",
    basicPlan:       "Plan Básico",
    intermediatePlan:"Plan Intermedio",
    completePlan:    "Plan Completo",
    payWithMP:       "Pagar con MercadoPago 💳",

  // formulario.html
    formTitle:       "Formulario: Carta",
    label_destinatario: "¿A quién va dirigida la carta?",
    label_mensaje:      "¿Qué querés transmitir?",
    label_estilo:       "Estilo deseado (romántico, formal, divertido, etc.)",
    label_entrega:      "¿Cómo querés recibir la carta?",
    opt_pdf:            "Descargar PDF",
    opt_email:          "Recibir por correo electrónico",
    opt_regalo:         "Enviar como regalo",
    opt_ambas:          "Ambas",
    label_emailRegalo:  "Email destinatario",
    label_firmaTipo:    "Firma anónima o con nombre",
    opt_anonima:        "Anónima",
    opt_conNombre:      "Con nombre",
    label_firmaPersonalizada: "Firma personalizada (opcional)",
    btn_generar:        "Generar carta",
    tuCarta:            "Tu Carta Generada",
    btn_descargar:      "Descargar PDF"
    
    // …añade más claves según necesites…
  },
  en: {
    pageTitle:       "Choose your perfect letter",
    title_amor:      "Love Letter",
    desc_amor:       "Express deep feelings to that special someone. Ideal for declarations, anniversaries or reconciliations.",
    title_perdon:    "Apology Letter",
    desc_perdon:     "To sincerely apologize, show remorse and open the door to emotional dialogue.",
    title_laboral:   "Job Application Letter",
    desc_laboral:    "Crafted to highlight your skills, experience, and motivation to apply for a job."
   
    // pago.html
    pageTitlePago:   "Pay for your letter",
    loadingTitle:    "Loading…",
    loadingDesc:     "Please wait while we load your letter details.",
    choosePlan:      "Choose your plan:",
    basicPlan:       "Basic Plan",
    intermediatePlan:"Intermediate Plan",
    completePlan:    "Complete Plan",
    payWithMP:       "Pay with MercadoPago 💳",

    // formulario.html
    formTitle:       "Form: Letter",
    label_destinatario: "Who is the letter addressed to?",
    label_mensaje:      "What do you want to convey?",
    label_estilo:       "Desired style (romantic, formal, fun, etc.)",
    label_entrega:      "How would you like to receive the letter?",
    opt_pdf:            "Download PDF",
    opt_email:          "Receive by email",
    opt_regalo:         "Send as gift",
    opt_ambas:          "Both",
    label_emailRegalo:  "Recipient email",
    label_firmaTipo:    "Anonymous or named signature",
    opt_anonima:        "Anonymous",
    opt_conNombre:      "With name",
    label_firmaPersonalizada: "Custom signature (optional)",
    btn_generar:        "Generate letter",
    tuCarta:            "Your Generated Letter",
    btn_descargar:      "Download PDF"
      
    // …añade más claves traducidas…
  }
};

// 2. Aplica traducciones a todos los elementos con [data-i18n]
function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  if (translations[lang]?.pageTitle) {
    document.title = translations[lang].pageTitle;
  }
}

// 3. Guarda el idioma y destruye el overlay
function setLanguage(lang) {
  sessionStorage.setItem('lang', lang);
  applyTranslations(lang);
  const overlay = document.getElementById('langOverlay');
  if (overlay) overlay.remove();  // lo quitamos del DOM
}

// 4. Inicializa el overlay y la traducción al cargar
function initLanguage() {
  const overlay = document.getElementById('langOverlay');
  const lang    = sessionStorage.getItem('lang');

  if (!overlay) return; 
  if (!lang) {
    // mostramos overlay y conectamos botones
    overlay.style.display = 'flex';
    // manejadores de click *después* de que exista el DOM
    document.getElementById('btnEs').addEventListener('click', () => setLanguage('es'));
    document.getElementById('btnEn').addEventListener('click', () => setLanguage('en'));
  } else {
    // idioma ya elegido: destruyo overlay y aplico
    overlay.remove();
    applyTranslations(lang);
  }
}


// Exponer en window
window.initLanguage   = initLanguage;
window.setLanguage    = setLanguage;
window.applyTranslations = applyTranslations;
