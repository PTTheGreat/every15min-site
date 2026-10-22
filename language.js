(() => {
  const root = document.documentElement;
  const buttons = [...document.querySelectorAll("[data-set-lang]")];
  // Pages with their own URL per language (/ and /en/) fix the language from
  // data-page and switch by navigating, so each URL always renders one
  // language for search engines. Other pages switch in place.
  const page = root.dataset.page;
  function setLanguage(value) {
    const lang = value === "en" ? "en" : "zh";
    root.dataset.active = lang;
    root.lang = lang === "zh" ? "zh-Hans" : "en";
    const title = document.querySelector("title");
    if (title?.dataset[`title${lang === "zh" ? "Zh" : "En"}`])
      document.title = title.dataset[`title${lang === "zh" ? "Zh" : "En"}`];
    buttons.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.setLang === lang),
      ),
    );
    try {
      localStorage.setItem("lang", lang);
    } catch {}
    document.dispatchEvent(new CustomEvent("languagechange", { detail: lang }));
  }
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      if (page && button.dataset.href && button.dataset.setLang !== page) {
        try {
          localStorage.setItem("lang", button.dataset.setLang);
        } catch {}
        location.href = button.dataset.href;
        return;
      }
      setLanguage(button.dataset.setLang);
    }),
  );
  if (page) {
    setLanguage(page);
    return;
  }
  let saved;
  try {
    saved = localStorage.getItem("lang");
  } catch {}
  setLanguage(
    ["zh", "en"].includes(saved)
      ? saved
      : (navigator.language || "").toLowerCase().startsWith("zh")
        ? "zh"
        : "en",
  );
})();
