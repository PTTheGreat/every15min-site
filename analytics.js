// Website analytics only (the every15min app itself still collects nothing).
// Google Analytics 4 runs without cookies. GA4 has no setting that stops it
// writing its _ga cookies (client_storage: "none" is ignored), so writes to
// Google's analytics cookies are dropped here and every page view gets a
// random client id that is never stored. Google signals and ad
// personalization are off.
(() => {
  const GA_ID = "G-QJ12DGWV31";
  const GOOGLE_COOKIE = /^\s*(_ga|_gid|_gat|_gcl)/;
  const clientId = `${Math.floor(Math.random() * 2147483647)}.${Math.floor(Date.now() / 1000)}`;
  const native = Object.getOwnPropertyDescriptor(Document.prototype, "cookie");
  if (!native?.get || !native?.set) return;
  Object.defineProperty(document, "cookie", {
    configurable: true,
    get() {
      const own = native.get
        .call(document)
        .split(";")
        .filter((pair) => pair.trim() && !GOOGLE_COOKIE.test(pair));
      return [...own.map((pair) => pair.trim()), `_ga=GA1.1.${clientId}`].join("; ");
    },
    set(value) {
      if (!GOOGLE_COOKIE.test(value)) native.set.call(document, value);
    },
  });
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    client_id: clientId,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(tag);
})();
