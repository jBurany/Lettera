// public/js/lang.js

// 1. Diccionario de traducciones
const translations = {
  es: {
    // index.html
    pageTitle:       "Elegí tu carta perfecta",
    title_amor:      "Carta de Amor",
    desc_amor:       "Expresá sentimientos profundos a esa persona especial. Ideal para declaraciones, aniversarios o reconciliaciones.",
    title_perdon:    "Carta de Perdón",
    desc_perdon:     "Para pedir disculpas con sinceridad, mostrar arrepentimiento y abrir la puerta al diálogo emocional.",
    title_laboral:   "Carta de Presentación Laboral",
    desc_laboral:    "Redactada para destacar tus habilidades, experiencia y motivación para postularte a un trabajo.",
    // pago.html
    pageTitlePago:   "Pagar carta personalizada",
    loadingTitle:    "Cargando…",
    loadingDesc:     "Por favor espera mientras cargamos los detalles de tu carta.",
    choosePlan:      "Elegí tu plan:",
    basicPlan:       "Plan Básico",
    intermediatePlan:"Plan Intermedio",
    completePlan:    "Plan Completo"
    // (añade aquí claves de formulario.html si las marcaste con data-i18n)
  },
  en: {
    pageTitle:       "Choose your perfect letter",
    title_amor:      "Love Letter",
    desc_amor:       "Express deep feelings to that special someone. Ideal for declarations, anniversaries or reconciliations.",
    title_perdon:    "Apology Letter",
    desc_perdon:     "To sincerely apologize, show remorse and open the door to emotional dialogue.",
    title_laboral:   "Job Application Letter",
    desc_laboral:    "Crafted to highlight your skills, experience, and motivation to apply for a job.",
    pageTitlePago:   "Pay for your letter",
    loadingTitle:    "Loading…",
    loadingDesc:     "Please wait while we load your letter details.",
    choosePlan:      "Choose your plan:",
    basicPlan:       "Basic Plan",
    intermediatePlan:"Intermediate Plan",
    completePlan:    "Complete Plan"
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
  // Ajusta <title> para la página de pago
  const pageTitleKey = document.title.includes("Pagar") ? 'pageTitlePago' : 'pageTitle';
  if (translations[lang] && translations[lang][pageTitleKey]) {
    document.title = translations[lang][pageTitleKey];
  }
}

// 3. Guarda el idioma y oculta el overlay de inmediato
function setLanguage(lang) {
  sessionStorage.setItem('lang', lang);
  applyTranslations(lang);
  const overlay = document.getElementById('langOverlay');
  if (overlay) overlay.style.display = 'none';
}

// 4. Inicializa el overlay y la traducción al cargar
function initLanguage() {
  const overlay = document.getElementById('langOverlay');
  const lang    = sessionStorage.getItem('lang');
  if (!lang) {
    // No hay idioma en sesión → mostramos overlay
    if (overlay) overlay.style.display = 'flex';
  } else {
    // Idioma ya seleccionado → ocultamos overlay y aplicamos
    if (overlay) overlay.style.display = 'none';
    applyTranslations(lang);
  }
}

// Exponer funciones globalmente
window.initLanguage = initLanguage;
window.setLanguage   = setLanguage;
window.applyTranslations = applyTranslations;
