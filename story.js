const scenes = {
  zh: {
    capture: [
      "CAPTURE CELL",
      "一句话，让这一刻有了落脚处",
      "没有分类表单，也不用开启计时。输入刚刚发生的事，时间戳会替你完成剩下的工作。",
      "09:15",
    ],
    timeline: [
      "DAY TIMELINE",
      "许多个小格，慢慢拼出一天的样子",
      "记录会沿时间线自然排列，空档也诚实保留。不是考勤，只是看见自己的节奏。",
      "10:30",
    ],
    find: [
      "FIND IT AGAIN",
      "用标签，把过去的线索重新捡回来",
      "轻点标签或输入命令，就能从完整历史中找到那段工作、那次散步或某种心情。",
      "#find",
    ],
  },
  en: {
    capture: [
      "CAPTURE CELL",
      "One line gives this moment a place to land",
      "No category forms and no timer to start. Type what happened; the timestamp does the rest.",
      "09:15",
    ],
    timeline: [
      "DAY TIMELINE",
      "Tiny cells slowly reveal the shape of a day",
      "Entries settle into a natural timeline and gaps stay honest. It is not attendance—just rhythm.",
      "10:30",
    ],
    find: [
      "FIND IT AGAIN",
      "Tags let you pick up old threads",
      "Tap a tag or type a command to recover that project, walk or feeling from your complete history.",
      "#find",
    ],
  },
};
(() => {
  const tabs = [...document.querySelectorAll("[data-scene]")];
  const panel = document.getElementById("scene-panel");
  const isBee = document.body.classList.contains("bee-world");
  let selected = tabs[0].dataset.scene;
  const labels = {
    zh: {
      demo: "功能示意",
      morning: "早晨的小任务",
      done: "已记录",
      med: "用药打卡",
      later: "下次复诊的问题",
      day: "今天的记录",
      breathe: "慢慢呼吸",
      pace: "跟着自己的节奏，慢慢来。",
    },
    en: {
      demo: "Illustrative preview",
      morning: "A small morning task",
      done: "Recorded",
      med: "Medication log",
      later: "Questions for next visit",
      day: "Today’s notes",
      breathe: "Breathe",
      pace: "A quiet moment, at your own pace.",
    },
  };
  function preview(key, lang) {
    const l = labels[lang];
    if (isBee) {
      const rows =
        lang === "zh"
          ? {
              capture:
                '<p><time>09:15</time> 给窗边的植物浇水 #生活</p><p class="cursor">&gt; 刚刚发生了什么？ _</p>',
              timeline:
                "<p><time>09:15</time> 窗边的第一杯咖啡</p><p><time>10:30</time> 写完了一个小功能 #工作</p><p><time>12:00</time> 出门走走 #生活</p>",
              find: '<p class="cursor">&gt; #生活</p><p><time>09:15</time> 给窗边的植物浇水</p><p><time>12:00</time> 出门走走</p>',
            }
          : {
              capture:
                '<p><time>09:15</time> Watered the plants #life</p><p class="cursor">&gt; What just happened? _</p>',
              timeline:
                "<p><time>09:15</time> Coffee by the window</p><p><time>10:30</time> A tiny feature done #work</p><p><time>12:00</time> A walk outside #life</p>",
              find: '<p class="cursor">&gt; #life</p><p><time>09:15</time> Watered the plants</p><p><time>12:00</time> A walk outside</p>',
            };
      return `<div class="log-window"><div class="window-top"><i></i><i></i><i></i><span>every15min</span></div><div class="log-lines">${rows[key]}</div></div><small class="preview-caption">${l.demo}</small>`;
    }
    const views = {
      morning: `<strong>${l.morning}</strong><div class="care-row"><span class="care-check">✓</span><div>${l.med}<small>${l.done}</small></div></div>`,
      day: `<strong>${l.day}</strong><div class="care-row"><span class="care-check">＋</span>${l.later}</div>`,
      night: `<div class="breathe-circle">${l.breathe}</div><p>${l.pace}</p>`,
    };
    return `<div class="care-note">${views[key]}</div><small class="preview-caption">${l.demo}</small>`;
  }
  function show(key) {
    const lang = document.documentElement.dataset.active === "en" ? "en" : "zh";
    if (!scenes[lang][key]) return;
    selected = key;
    const data = scenes[lang][key];
    document.getElementById("sceneKicker").textContent =
      `${tabs.findIndex((tab) => tab.dataset.scene === key) + 1} / ${tabs.length}`;
    document.getElementById("sceneTitle").textContent = data[1];
    document.getElementById("sceneText").textContent = data[2];
    document.getElementById("sceneVisual").innerHTML = preview(key, lang);
    tabs.forEach((tab) => {
      const active = tab.dataset.scene === key;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active) panel.setAttribute("aria-labelledby", tab.id);
    });
  }
  tabs.forEach((tab, index) => {
    tab.id = `chapter-${tab.dataset.scene}`;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", "scene-panel");
    tab.addEventListener("click", () => show(tab.dataset.scene));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft")
        next = (index + tabs.length - 1) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      tabs[next].focus();
      show(tabs[next].dataset.scene);
    });
  });
  document.querySelectorAll("[data-scroll]").forEach((button) =>
    button.addEventListener("click", () => {
      document
        .querySelector(button.dataset.scroll)
        ?.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });
    }),
  );
  document.addEventListener("languagechange", () => show(selected));
  show(selected);
})();
