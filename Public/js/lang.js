// public/js/lang.js

// 1. Diccionario de traducciones global
const translations = {
  es: {
    pageTitle:       "Pagar carta personalizada",
    loadingTitle:    "Cargando…",
    loadingDesc:     "Por favor espera mientras cargamos los detalles de tu carta.",
    choosePlan:      "Elegí tu plan:",
    basicPlan:       "Plan Básico",
    intermediatePlan:"Plan Intermedio",
    completePlan:    "Plan Completo",
    // dinámicos por tipo de carta:
    title_amor:         "Carta de Amor",
    desc_amor:          "Expresá tus sentimientos con una carta romántica y personalizada.",
    title_perdon:       "Carta de Perdón",
    desc_perdon:        "Para pedir disculpas con sinceridad y empatía.",
    title_felicitacion: "Carta de Felicitación",
    desc_felicitacion:  "Perfecta para celebrar logros, cumpleaños o nacimientos.",
    title_agradecimiento:"Carta de Agradecimiento",
    desc_agradecimiento: "Muestra gratitud de forma única y emotiva.",
    title_laboral:      "Carta Laboral",
    desc_laboral:       "Resalta tus habilidades y motivación para un trabajo.",
    title_libro:        "Libro Personalizado",
    desc_libro:         "Un regalo literario hecho a medida y lleno de emoción."
  },
  en: {
    pageTitle:       "Pay for your letter",
    loadingTitle:    "Loading…",
    loadingDesc:     "Please wait while we load your letter details.",
    choosePlan:      "Choose your plan:",
    basicPlan:       "Basic Plan",
    intermediatePlan:"Intermediate Plan",
    completePlan:    "Complete Plan",
    // dinámicos por tipo de carta:
    title_amor:         "Love Letter",
    desc_amor:          "Express deep feelings with a romantic, personalized letter.",
    title_perdon:       "Apology Letter",
    desc_perdon:        "To sincerely apologize with empathy.",
    title_felicitacion: "Congratulation Letter",
    desc_felicitacion:  "Perfect for celebrations, birthdays or new beginnings.",
    title_agradecimiento:"Thank You Letter",
    desc_agradecimiento: "Show gratitude in a unique and heartfelt way.",
    title_laboral:      "Job Application Letter",
    desc_laboral:       "Highlight your skills and motivation for a job.",
    title_libro:        "Personalized Book",
    desc_libro:         "A tailor-made literary gift full of emotion."
  }
};

// 2. Aplica traducciones a todos los elementos marcados con data-i18n
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

// 3. Guarda la elección en sessionStorage y aplica la traducción
function setLanguage(lang) {
  sessionStorage.setItem('lang', lang);
  applyTranslations(lang);
}

// 4. Inicializa el overlay y la traducción al cargar la página
function initLanguage() {
  const overlay = document.getElementById('langOverlay');
  const lang    = sessionStorage.getItem('lang');
  if (!lang) {
    overlay.style.display = 'flex';
  } else {
    overlay.style.display = 'none';
    applyTranslations(lang);
  }
}

// Exportamos para usar en módulos si fuera necesario (opcional)
// export { initLanguage, setLanguage, applyTranslations };
