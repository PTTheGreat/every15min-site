(() => {
  const root = document.documentElement;
  const buttons = [...document.querySelectorAll("[data-set-lang]")];
  function setLanguage(value) {
    const lang = value === "en" ? "en" : "zh";
    root.dataset.active = lang;
    root.lang = lang === "zh" ? "zh-Hans" : "en";
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
    button.addEventListener("click", () => setLanguage(button.dataset.setLang)),
  );
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
