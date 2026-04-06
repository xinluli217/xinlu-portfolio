// Bilingual language toggle — English / Chinese
(function () {
  const STORAGE_KEY = 'pm-course-lang';

  function setLang(lang) {
    document.documentElement.classList.remove('lang-en', 'lang-zh');
    document.documentElement.classList.add('lang-' + lang);
    localStorage.setItem(STORAGE_KEY, lang);
    var btn = document.getElementById('lang-toggle-btn');
    if (btn) btn.textContent = lang === 'zh' ? 'EN' : '中文';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var saved = localStorage.getItem(STORAGE_KEY) || 'en';
    setLang(saved);

    var btn = document.getElementById('lang-toggle-btn');
    if (btn) {
      btn.addEventListener('click', function () {
        var current = localStorage.getItem(STORAGE_KEY) || 'en';
        setLang(current === 'zh' ? 'en' : 'zh');
      });
    }
  });
})();
