/**
 * FPLUS — Google Translate language switcher (EN / Arabic)
 * Uses Google's free website translate widget — no hardcoded copy.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'fplus-lang';
  const GT_SCRIPT = 'https://translate.google.com/translate_a/element.js?cb=fplusGoogleTranslateInit';

  window.fplusGoogleTranslateInit = function () {
    if (!window.google || !window.google.translate) return;
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,ar',
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      },
      'google_translate_element'
    );
    window.dispatchEvent(new Event('fplus:gtready'));
  };

  function getStoredLang() {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'ar' || q === 'en') return q;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ar' || saved === 'en') return saved;
    } catch (e) {}
    const match = document.cookie.match(/googtrans=([^;]+)/);
    if (match && match[1].indexOf('/ar') !== -1) return 'ar';
    return 'en';
  }

  function setGoogTransCookie(lang) {
    const host = window.location.hostname;
    const domain = host && !host.startsWith('localhost') ? ';domain=' + host : '';
    if (lang === 'ar') {
      document.cookie = 'googtrans=/en/ar;path=/' + domain;
    } else {
      document.cookie =
        'googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/' + domain;
      document.cookie =
        'googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    setGoogTransCookie(lang);
    const url = new URL(window.location.href);
    if (lang === 'ar') {
      url.searchParams.set('lang', 'ar');
    } else {
      url.searchParams.delete('lang');
    }
    window.history.replaceState({}, '', url);
  }

  function getGtSelect() {
    return document.querySelector('select.goog-te-combo');
  }

  function setGtLang(lang) {
    const code = lang === 'ar' ? 'ar' : '';
    let attempts = 0;
    const max = 40;

    function trySet() {
      const select = getGtSelect();
      if (select) {
        if (select.value !== code) {
          select.value = code;
          select.dispatchEvent(new Event('change'));
        }
        updateUi(lang);
        return true;
      }
      if (++attempts < max) {
        setTimeout(trySet, 150);
      }
      return false;
    }

    trySet();
  }

  function resetTranslateLayout() {
    document.documentElement.style.setProperty('top', '0', 'important');
    document.body.style.setProperty('top', '0', 'important');
    document.body.style.setProperty('margin-top', '0', 'important');
    document.body.style.setProperty('padding-top', '0', 'important');
    document.querySelectorAll('iframe.goog-te-banner-frame, .skiptranslate').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
      el.style.setProperty('height', '0', 'important');
    });
  }

  function updateUi(lang) {
    const isAr = lang === 'ar';
    document.documentElement.lang = isAr ? 'ar' : 'en';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-ar', isAr);
    document.body.classList.toggle('lang-en', !isAr);

    document.querySelectorAll('.lang-switch-btn').forEach((btn) => {
      const active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    resetTranslateLayout();
  }

  function injectGtContainer() {
    if (document.getElementById('google_translate_element')) return;
    const el = document.createElement('div');
    el.id = 'google_translate_element';
    el.setAttribute('aria-hidden', 'true');
    document.body.appendChild(el);
  }

  function injectLangSwitcher() {
    const nav = document.querySelector('nav');
    if (!nav || nav.querySelector('.lang-switch')) return;

    const group = document.createElement('div');
    group.className = 'lang-switch';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', 'Language');
    group.innerHTML =
      '<button type="button" class="lang-switch-btn active" data-lang="en" aria-pressed="true">EN</button>' +
      '<button type="button" class="lang-switch-btn" data-lang="ar" aria-pressed="false" lang="ar">عربي</button>';

    const cta = nav.querySelector('.nav-cta');
    if (cta) {
      nav.insertBefore(group, cta);
    } else {
      nav.appendChild(group);
    }

    group.querySelectorAll('.lang-switch-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        saveLang(lang);
        setGtLang(lang);
      });
    });
  }

  function loadGtScript() {
    if (document.querySelector('script[src*="translate.google.com"]')) return;
    const s = document.createElement('script');
    s.src = GT_SCRIPT;
    s.async = true;
    document.head.appendChild(s);
  }

  function init() {
    const lang = getStoredLang();
    if (lang === 'ar') setGoogTransCookie('ar');

    injectGtContainer();
    injectLangSwitcher();
    loadGtScript();

    updateUi(lang);

    window.addEventListener('fplus:gtready', () => {
      setGtLang(lang);
      resetTranslateLayout();
    }, { once: true });

    const observer = new MutationObserver(resetTranslateLayout);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  }

  window.FPLUS_I18N = {
    setLanguage: setGtLang,
    getLang: getStoredLang
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
