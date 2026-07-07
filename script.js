(() => {
  "use strict";

  /* ---------------- translations ---------------- */
  const translations = {
    ar: {
      "nav.home": "الرئيسية",
      "nav.leaderboard": "المتصدرين",
      "nav.about": "عن الموقع",
      "hero.eyebrow": "لوحة عامة · بدون تسجيل دخول",
      "hero.title1": "أعلى الحسابات",
      "hero.title2": "من حيث نقاط سناب",
      "hero.subtitle": "تصفح ترتيب أعلى حسابات Snap Score حول العالم لحظة بلحظة، افتح الموقع وشوف مكانك بين الكبار — بدون حساب، بدون تسجيل، بدون تعقيد.",
      "hero.ctaPrimary": "شوف المتصدرين",
      "hero.ctaSecondary": "عن الموقع",
      "stats.ranked": "حساب مُصنّف",
      "stats.highest": "أعلى نقاط",
      "stats.updated": "آخر تحديث",
      "podium.title": "أعلى 3 حسابات",
      "tabs.all": "الكل",
      "tabs.weekly": "أسبوعي",
      "tabs.monthly": "شهري",
      "search.placeholder": "ابحث عن يوزر...",
      "table.rank": "الترتيب",
      "table.username": "اليوزر",
      "table.score": "النقاط",
      "empty.title": "لا توجد بيانات لهذه الفترة بعد",
      "empty.subtitle": "راجعنا بعدين — نحدّث الأرقام أول بأول.",
      "about.eyebrow": "عن الموقع",
      "about.title": "شنو هو TopScoreSnap؟",
      "about.p1": "TopScoreSnap لوحة عرض مستقلة تجمع أعلى نقاط Snap Score المعروفة حول العالم في مكان واحد. الفكرة بسيطة: تفتح الموقع، تشوف الترتيب، وخلاص — بدون حساب، بدون تسجيل دخول، وبدون أي بيانات شخصية منك.",
      "about.p2": "نحدّث الأرقام يدويًا بشكل دوري بناءً على ما يتوفر من مصادر عامة، وأي حد يقدر يتصفح القائمة أو يبحث عن يوزر معيّن في أي وقت مجانًا.",
      "about.disclaimerTitle": "تنويه مهم",
      "about.disclaimer": "هذا الموقع مستقل وغير رسمي، وما له أي ارتباط أو علاقة برعاية أو تأييد من شركة Snap Inc. أو تطبيق Snapchat. اسم \"Snapchat\" وشعاراته ملك لأصحابها، ونستخدمها هنا فقط للإشارة إلى الخدمة التي تُقاس نقاطها.",
      "footer.tagline": "تتبع أعلى نقاط سناب شات، ببساطة.",
      "footer.rights": "جميع الحقوق محفوظة",
      "toggleLabel": "EN"
    },
    en: {
      "nav.home": "Home",
      "nav.leaderboard": "Leaderboard",
      "nav.about": "About",
      "hero.eyebrow": "Public leaderboard · No login required",
      "hero.title1": "The Highest",
      "hero.title2": "Snapchat Scores",
      "hero.subtitle": "Browse the top-ranked Snap Score accounts in the world. Open the site and see where the leaders stand — no account, no sign-up, no clutter.",
      "hero.ctaPrimary": "View Leaderboard",
      "hero.ctaSecondary": "About",
      "stats.ranked": "Ranked Accounts",
      "stats.highest": "Highest Score",
      "stats.updated": "Last Updated",
      "podium.title": "Top 3 Accounts",
      "tabs.all": "All Time",
      "tabs.weekly": "Weekly",
      "tabs.monthly": "Monthly",
      "search.placeholder": "Search username...",
      "table.rank": "Rank",
      "table.username": "Username",
      "table.score": "Score",
      "empty.title": "No data for this period yet",
      "empty.subtitle": "Check back soon — we update the numbers regularly.",
      "about.eyebrow": "About",
      "about.title": "What is TopScoreSnap?",
      "about.p1": "TopScoreSnap is an independent leaderboard that brings together the highest known Snap Score accounts in one place. The idea is simple: open the site, see the ranking, done — no account, no sign-up, no personal data required.",
      "about.p2": "We update the numbers by hand on a regular basis using publicly available sources, and anyone can browse the list or search for a specific username, free, anytime.",
      "about.disclaimerTitle": "Important disclaimer",
      "about.disclaimer": "This site is an independent, unofficial project and is not affiliated with, sponsored by, or endorsed by Snap Inc. or Snapchat. The Snapchat name and logo are trademarks of their respective owner, used here only to reference the service being measured.",
      "footer.tagline": "Tracking the highest Snapchat scores, made simple.",
      "footer.rights": "All rights reserved",
      "toggleLabel": "عربي"
    }
  };

  const LANG_KEY = "tss_lang";
  let currentLang = localStorage.getItem(LANG_KEY) || "ar";
  let currentPeriod = "all";
  let boardData = { meta: {}, periods: { all: [], weekly: [], monthly: [] } };

  /* ---------------- i18n ---------------- */
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);

    const dict = translations[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key]) el.setAttribute("placeholder", dict[key]);
    });

    document.getElementById("langToggleLabel").textContent = dict.toggleLabel;
    document.title = lang === "ar"
      ? "TopScoreSnap — أعلى نقاط سناب شات"
      : "TopScoreSnap — Highest Snapchat Scores";
  }

  /* ---------------- rendering ---------------- */
  function formatMonth(ym, lang) {
    if (!ym) return "—";
    const [y, m] = ym.split("-").map(Number);
    const monthsAr = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
    const monthsEn = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const names = lang === "ar" ? monthsAr : monthsEn;
    return `${names[m - 1]} ${y}`;
  }

  function renderStats() {
    const list = boardData.periods.all || [];
    document.getElementById("statRanked").textContent = list.length;
    document.getElementById("statHighest").textContent = list[0] ? list[0].score : "—";
    document.getElementById("statUpdated").textContent = formatMonth(boardData.meta.lastUpdate, currentLang);
  }

  function renderPodium(list) {
    const podium = document.getElementById("podium");
    podium.innerHTML = "";
    if (!list.length) return;
    const top3 = list.slice(0, 3);
    top3.forEach(entry => {
      const card = document.createElement("div");
      card.className = `podium-card rank-${entry.rank}`;
      card.innerHTML = `
        <div class="podium-badge">${entry.rank}</div>
        <p class="podium-user">${escapeHtml(entry.username)}</p>
        <p class="podium-score">${escapeHtml(entry.score)}</p>
      `;
      podium.appendChild(card);
    });
  }

  function renderTable(list) {
    const body = document.getElementById("boardBody");
    const emptyState = document.getElementById("emptyState");
    const table = document.querySelector(".board-table");
    body.innerHTML = "";

    if (!list.length) {
      table.style.display = "none";
      emptyState.hidden = false;
      return;
    }
    table.style.display = "";
    emptyState.hidden = true;

    const frag = document.createDocumentFragment();
    list.forEach(entry => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="col-rank"><span class="rank-num">#${entry.rank}</span></td>
        <td class="col-user row-username">${escapeHtml(entry.username)}</td>
        <td class="col-score row-score">${escapeHtml(entry.score)}</td>
      `;
      frag.appendChild(tr);
    });
    body.appendChild(frag);
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function getFilteredList() {
    const list = boardData.periods[currentPeriod] || [];
    const q = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!q) return list;
    return list.filter(e => e.username.toLowerCase().includes(q));
  }

  function renderBoard() {
    const list = getFilteredList();
    renderPodium(document.getElementById("searchInput").value.trim() ? [] : list);
    renderTable(list);
  }

  /* ---------------- events ---------------- */
  function initTabs() {
    document.querySelectorAll(".tab").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(b => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        currentPeriod = btn.getAttribute("data-period");
        document.getElementById("searchInput").value = "";
        renderBoard();
      });
    });
  }

  function initSearch() {
    document.getElementById("searchInput").addEventListener("input", renderBoard);
  }

  function initLangToggle() {
    document.getElementById("langToggle").addEventListener("click", () => {
      applyLanguage(currentLang === "ar" ? "en" : "ar");
      renderStats();
    });
  }

  /* ---------------- init ---------------- */
  async function init() {
    document.getElementById("year").textContent = new Date().getFullYear();
    applyLanguage(currentLang);
    initTabs();
    initSearch();
    initLangToggle();

    try {
      const res = await fetch("data.json", { cache: "no-store" });
      boardData = await res.json();
    } catch (err) {
      console.error("Could not load data.json", err);
      boardData = { meta: {}, periods: { all: [], weekly: [], monthly: [] } };
    }

    renderStats();
    renderBoard();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
