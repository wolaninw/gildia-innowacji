/* Gildia Innowacji – Google Analytics 4 + Consent Mode v2 + baner zgody cookies
   Dołączany w <head> każdej publicznej podstrony:
   <script src="assets/analytics.js"></script>  (w /pages: ../assets/analytics.js) */
(function () {
  var GA_ID = 'G-2R2R6GHZ2E';

  function readConsent() {
    var m = document.cookie.match(/(?:^|;\s*)cookieconsent_status=([^;]+)/);
    return m ? m[1] : null; // 'allow' | 'deny' | null
  }

  // 1. Consent Mode v2 – domyślnie brak zgody (zanim wczyta się tag Google)
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: readConsent() === 'allow' ? 'granted' : 'denied',
    wait_for_update: 500
  });

  // 2. Google tag (gtag.js)
  gtag('js', new Date());
  gtag('config', GA_ID);
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  function setAnalytics(status) {
    gtag('consent', 'update', { analytics_storage: status === 'allow' ? 'granted' : 'denied' });
  }

  // 3. Baner zgody (cookieconsent – wczytywany, jeśli strona go jeszcze nie ma)
  function initBanner() {
    window.cookieconsent.initialise({
      type: 'opt-in',
      revokable: true,
      palette: {
        popup: { background: '#2e282a', text: '#f5f0ea' },
        button: { background: '#F47C28', text: '#ffffff' },
        highlight: { background: '#F7C146', text: '#1e1a1c' }
      },
      theme: 'edgeless',
      position: 'bottom-right',
      content: {
        message: 'Używamy plików cookies Google Analytics, aby wiedzieć, ile osób odwiedza stronę i co je interesuje. Pliki analityczne zapiszemy tylko za Twoją zgodą.',
        allow: 'Akceptuję',
        deny: 'Odrzuć',
        link: 'Polityka cookies',
        href: '/#cookies',
        policy: 'Ustawienia cookies'
      },
      onInitialise: function (status) { setAnalytics(status); },
      onStatusChange: function (status) { setAnalytics(status); },
      onRevokeChoice: function () { setAnalytics('deny'); }
    });
  }

  function loadBanner() {
    if (window.cookieconsent && window.cookieconsent.initialise) return initBanner();
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css';
    document.head.appendChild(css);
    var js = document.createElement('script');
    js.src = 'https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js';
    js.onload = initBanner;
    document.head.appendChild(js);
  }

  // baner pokazujemy od razu po wczytaniu HTML (nie czekamy na obrazki i filmy)
  if (document.readyState !== 'loading') loadBanner();
  else document.addEventListener('DOMContentLoaded', loadBanner);
})();
