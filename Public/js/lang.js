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

  if (!lang) {
    // no hay idioma → mostramos overlay
    overlay.style.display = 'flex';
  } else {
    // ya existe idioma → ocultamos overlay y aplicamos traducción
    overlay.style.display = 'none';
    applyTranslations(lang);
  }
}

function setLanguage(lang) {
  sessionStorage.setItem('lang', lang);
  applyTranslations(lang);
  document.getElementById('langOverlay').style.display = 'none';
}


// Exponer en window
window.initLanguage   = initLanguage;
window.setLanguage    = setLanguage;
window.applyTranslations = applyTranslations;
