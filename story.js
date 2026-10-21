const scenes = {
  zh: {
    capture: [
      "一句话，就是一条完整的记录",
      "没有分类表单，也不用开始或停止计时。输入刚刚发生的事，时间戳会自动补上。",
    ],
    timeline: [
      "许多条小记录，拼出一天的真实形状",
      "记录沿时间线自然排列，空档也如实保留。它不是考勤表，而是让你看见自己的节奏。",
    ],
    find: [
      "用标签和搜索，找回任何一段过去",
      "轻点标签或输入命令，就能从完整历史中找回那个项目、那次散步或某种心情。",
    ],
  },
  en: {
    capture: [
      "One sentence is a complete entry",
      "No category forms and no timer to start or stop. Type what just happened; the timestamp is added for you.",
    ],
    timeline: [
      "Small entries reveal the real shape of a day",
      "Entries settle into a timeline and gaps stay honest. It is not a timesheet, just a clear view of your rhythm.",
    ],
    find: [
      "Tags and search bring back any moment",
      "Tap a tag or type a command to recover a project, a walk or a mood from your complete history.",
    ],
  },
};
const previews = {
  zh: {
    capture:
      '<p><time>09:15</time>写完登录页文案初稿 #工作</p><p class="cursor">&gt; 刚刚发生了什么？_</p>',
    timeline:
      '<p><time>09:15</time>写完登录页文案初稿 #工作</p><p class="gap"><time>09:30</time>—</p><p><time>09:45</time>和设计过了一遍首页 #工作</p><p><time>10:00</time>出门走了十分钟 #生活</p>',
    find: '<p class="cursor">&gt; #工作</p><p><time>09:15</time>写完登录页文案初稿</p><p><time>09:45</time>和设计过了一遍首页</p>',
  },
  en: {
    capture:
      '<p><time>09:15</time>Drafted landing page copy #work</p><p class="cursor">&gt; What just happened? _</p>',
    timeline:
      '<p><time>09:15</time>Drafted landing page copy #work</p><p class="gap"><time>09:30</time>—</p><p><time>09:45</time>Homepage review with design #work</p><p><time>10:00</time>A ten-minute walk #life</p>',
    find: '<p class="cursor">&gt; #work</p><p><time>09:15</time>Drafted landing page copy</p><p><time>09:45</time>Homepage review with design</p>',
  },
};
(() => {
  const tabs = [...document.querySelectorAll("[data-scene]")];
  const panel = document.getElementById("scene-panel");
  if (!tabs.length || !panel) return;
  let selected = tabs[0].dataset.scene;
  function show(key) {
    const lang = document.documentElement.dataset.active === "en" ? "en" : "zh";
    if (!scenes[lang][key]) return;
    selected = key;
    const [title, text] = scenes[lang][key];
    const caption = lang === "zh" ? "界面示意" : "Illustrative preview";
    document.getElementById("sceneKicker").textContent =
      `${tabs.findIndex((tab) => tab.dataset.scene === key) + 1} / ${tabs.length}`;
    document.getElementById("sceneTitle").textContent = title;
    document.getElementById("sceneText").textContent = text;
    document.getElementById("sceneVisual").innerHTML =
      `<div class="log-window"><div class="window-top"><i></i><i></i><i></i><span>every15min</span></div><div class="log-lines">${previews[lang][key]}</div></div><small class="preview-caption">${caption}</small>`;
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
  document.addEventListener("languagechange", () => show(selected));
  show(selected);
})();
