export const translations = {
  "en": {
    "welcome": "Welcome to Pharmaledger",
    "scan_explain": "Find the 2D code on your medicine to scan and view information",
    "scan_button": "Scan 2D Code",
    "app_name": "Pharmaledger",
    "cancel": "Cancel",
    "change_camera": "Change camera",
    "scan_again": "Scan Again",
    "error-title": "Not Recognized",
    "error-subtitle": "unverified product",
    "error-text": "<p><b>Unfortunately, we are unable to verify the authenticity of this product</b></p><p>Nisi quis tellus risus dui scelerisque et commodo, blandit.</p> <p><b>What does this mean?</b></p><p>Tortor adipiscing proin sit auctor nulla posuere ornare adipiscing at. Viverra dictum netus sollicitudin elit risus leo sapien.</p><p><b>What should you do next?</b></p><p>Sed et ac habitant id. Mattis hac nisi, pellentesque erat tempus integer erat. Vestibulum sapien justo cras turpis.</p>",
    "leaflet-expired-title": "This item is Expired",
    "leaflet-expired-message": "<b>In ut dignissim elit risus</b>. Nisi quis tellus risus dui scelerisque et commodo, blandit. Feugiat adipiscing posuere maecenas quis egestas odio et nunc. Tortor adipiscing proin sit auctor nulla posuere ornare adipiscing at. Viverra dictum netus sollicitudin elit risus leo sapien. Enim, volutpat sit magna quis sit vitae nunc dis laoreet. Dis pellentesque adipiscing sit pellentesque. Et id ut imperdiet pulvinar tincidunt eget nibh. Dis pellentesque adipiscing sit pellentesque. Et id ut imperdiet pulvinar tincidunt eget nibh.",
    "select_lang_title": "Leaflet unavailable",
    "select_lang_subtitle": "for your current language",
    "select_lang_text": "We are sorry but for your current language leaflet is unavailable. You can choose form the available language list. "
  },
  "de": {
    "header": "German header",
    "paragraf": "German paragraf"
  }
}

export function changeLanguage(newLang) {
  let languages = Object.keys(translations);
  if (languages.find(lang => lang === newLang)) {
    window.currentLanguage = newLang;
    translate();
  }
}

export function translate() {
  if (!window.currentLanguage) {
    window.currentLanguage = window.navigator.language.slice(0, 2);
  }
  let matches = document.querySelectorAll("[translate]");
  matches.forEach((item) => {
    item.innerHTML = translations[currentLanguage][item.getAttribute('translate')];
  });
}

