// Website analytics only (the every15min app itself still collects nothing).
// Google Analytics 4 runs without cookies: client storage is off, and Google
// signals and ad personalization are disabled.
(() => {
  const GA_ID = "G-QJ12DGWV31";
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    client_storage: "none",
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(tag);
})();
