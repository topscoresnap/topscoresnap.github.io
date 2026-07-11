(() => {
  "use strict";

  /* ---------------- translations ---------------- */
  const translations = {
    ar: {
      "nav.home": "الرئيسية",
      "nav.leaderboard": "المتصدرين",
      "nav.about": "عن الموقع",
      "nav.contact": "تواصل",
      "nav.compare": "قارن",
      "nav.faq": "الأسئلة الشائعة",
      "hero.eyebrow": "قائمة حصرية · 100 مليون نقطة فأكثر",
      "hero.title1": "أعلى الحسابات",
      "hero.title2": "من حيث نقاط سناب",
      "hero.subtitle": "نجمع لك في مكان واحد أبرز حسابات Snapchat حول العالم التي تجاوزت نقاطها 100 مليون نقطة، ونرتبها بوضوح لتشوف بسهولة مين يتصدّر السباق عالميًا.",
      "hero.ctaPrimary": "شوف المتصدرين",
      "hero.ctaSecondary": "عن الموقع",
      "stats.ranked": "حساب مُصنّف",
      "stats.highest": "أعلى نقاط",
      "stats.updated": "آخر تحديث",
      "podium.title": "أعلى 3 حسابات",
      "board.title": "كل الحسابات",
      "search.placeholder": "ابحث عن يوزر...",
      "table.username": "اليوزر",
      "table.score": "النقاط",
      "empty.title": "لا توجد نتائج مطابقة",
      "empty.subtitle": "جرّب كلمة بحث ثانية.",
      "leaderboard.compareCta": "قارن بين حسابين",
      "about.eyebrow": "عن الموقع",
      "about.title": "ما هو TopScoreSnap؟",
      "about.p1": "TopScoreSnap لوحة عرض مستقلة تُعنى برصد أعلى حسابات Snapchat حول العالم من حيث نقاط Snap Score، وتُبنى القائمة حصرًا من الحسابات التي بلغت نقاطها مئة مليون نقطة فأكثر. الهدف أن يجد الزائر في مكانٍ واحد صورة واضحة عمّن يتصدّر هذا الترتيب عالميًا، دون الحاجة للبحث في مصادر متفرقة.",
      "about.p2": "تُحدَّث الأرقام يدويًا وبشكل دوري اعتمادًا على ما هو متاح من مصادر عامة، ويستطيع أي زائر تصفح القائمة كاملة أو البحث عن يوزر معيّن في أي وقت.",
      "about.pointsTitle": "كيف تزداد نقاط Snap Score؟",
      "about.pointsIntro": "لا يكشف Snapchat رسميًا عن معادلة احتساب النقاط بدقة، لكن من المعروف أنها ترتفع كلما زاد تفاعلك اليومي داخل التطبيق، وأبرز ما يرفعها:",
      "about.pointsItem1": "إرسال السنابات (صور ومقاطع فيديو) لأصدقائك بشكل يومي",
      "about.pointsItem2": "فتح ومشاهدة السنابات التي تصلك من الآخرين",
      "about.pointsItem3": "نشر القصص (الستوري) بانتظام",
      "about.pointsOutro": "كل نشاط بسيط يُحتسب، وكلما داومت على استخدام التطبيق يوميًا كلما تراكمت نقطتك أكثر مع الوقت.",
      "about.disclaimerTitle": "تنويه مهم",
      "about.disclaimer": "هذا الموقع مستقل وغير رسمي، وما له أي ارتباط أو علاقة برعاية أو تأييد من شركة Snap Inc. أو تطبيق Snapchat. اسم \"Snapchat\" وشعاراته ملك لأصحابها، ونستخدمها هنا فقط للإشارة إلى الخدمة التي تُقاس نقاطها.",
      "about.activeTitle": "ملاحظة حول الحسابات المدرجة",
      "about.activeText": "جميع الحسابات المدرجة في هذه القائمة فعّالة وقت آخر تحديث، ولا تشمل القائمة أي حساب تم حظره أو إيقافه من قِبل Snapchat. كما أن القائمة لا تمثّل جميع حسابات Snapchat عالميًا، بل تقتصر على الحسابات الفعّالة التي توفّرت بياناتها لدينا.",
      "contact.eyebrow": "تواصل معنا",
      "contact.title": "تواصل معنا",
      "contact.text": "إذا كنت تملك نقاطًا تقارب 100 مليون نقطة أو أكثر، أو تعرف شخصًا يملك ذلك، لا تتردد في التواصل معنا لإضافتك ضمن القائمة.",
      "contact.tiktok": "تابعنا على TikTok",
      "profile.viewBtn": "عرض الملف والشهادة",
      "footer.tagline": "تتبع أعلى نقاط سناب شات، ببساطة.",
      "footer.rights": "جميع الحقوق محفوظة",
      "toggleLabel": "EN"
    },
    en: {
      "nav.home": "Home",
      "nav.leaderboard": "Leaderboard",
      "nav.about": "About",
      "nav.contact": "Contact",
      "nav.compare": "Compare",
      "nav.faq": "FAQ",
      "hero.eyebrow": "Exclusive list · 100M points and above",
      "hero.title1": "The Highest",
      "hero.title2": "Snapchat Scores",
      "hero.subtitle": "We bring together, in one place, the world's top Snapchat accounts that have crossed 100 million Snap Score points — clearly ranked so you can see who's leading globally.",
      "hero.ctaPrimary": "View Leaderboard",
      "hero.ctaSecondary": "About",
      "stats.ranked": "Ranked Accounts",
      "stats.highest": "Highest Score",
      "stats.updated": "Last Updated",
      "podium.title": "Top 3 Accounts",
      "board.title": "All Accounts",
      "search.placeholder": "Search username...",
      "table.username": "Username",
      "table.score": "Score",
      "empty.title": "No matching results",
      "empty.subtitle": "Try a different search term.",
      "leaderboard.compareCta": "Compare two accounts",
      "about.eyebrow": "About",
      "about.title": "What is TopScoreSnap?",
      "about.p1": "TopScoreSnap is an independent leaderboard dedicated to tracking the highest Snapchat accounts worldwide by Snap Score. The list is built exclusively from accounts that have reached 100 million points or more. The goal is simple: give visitors a clear picture, in one place, of who leads this ranking globally, without digging through scattered sources.",
      "about.p2": "Numbers are updated by hand on a regular basis using publicly available sources, and anyone can browse the full list or search for a specific username at any time.",
      "about.pointsTitle": "How does Snap Score go up?",
      "about.pointsIntro": "Snapchat doesn't officially publish the exact scoring formula, but it's well known that the score rises with daily activity in the app, mainly through:",
      "about.pointsItem1": "Sending snaps (photos and videos) to friends every day",
      "about.pointsItem2": "Opening and viewing snaps you receive from others",
      "about.pointsItem3": "Posting to your Story regularly",
      "about.pointsOutro": "Every small action counts — the more consistently you use the app day to day, the more your score builds up over time.",
      "about.disclaimerTitle": "Important disclaimer",
      "about.disclaimer": "This site is an independent, unofficial project and is not affiliated with, sponsored by, or endorsed by Snap Inc. or Snapchat. The Snapchat name and logo are trademarks of their respective owner, used here only to reference the service being measured.",
      "about.activeTitle": "A note on the accounts listed",
      "about.activeText": "Every account on this list was active as of the last update. Accounts that have been banned or suspended by Snapchat are not included. This list also doesn't represent every Snapchat account worldwide — only the active accounts we had data for.",
      "contact.eyebrow": "Contact",
      "contact.title": "Get in touch",
      "contact.text": "If you have around 100 million points or more — or know someone who does — feel free to reach out and we'll add you to the list.",
      "contact.tiktok": "Follow us on TikTok",
      "profile.viewBtn": "View Profile & Certificate",
      "footer.tagline": "Tracking the highest Snapchat scores, made simple.",
      "footer.rights": "All rights reserved",
      "toggleLabel": "عربي"
    }
  };

  const LANG_KEY = "tss_lang";
  let currentLang = localStorage.getItem(LANG_KEY) || "ar";
  let boardData = { meta: {}, accounts: [] };

  /* ---------------- i18n ---------------- */
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    window.TSS_LANG = lang;

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
    window.dispatchEvent(new CustomEvent("tss:lang-change", { detail: lang }));
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
    const list = boardData.accounts || [];
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
        <a href="profile.html?u=${encodeURIComponent(entry.username)}" class="podium-cert-btn facet">
          <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path fill="currentColor" d="M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4Zm-1.2 13.6-3.4-3.4 1.4-1.4 2 2 4.6-4.6 1.4 1.4-6 6Z"/></svg>
          <span data-i18n="profile.viewBtn">عرض الملف والشهادة</span>
        </a>
      `;
      podium.appendChild(card);
    });
  }

  function rankDeltaHTML(entry) {
    if (entry.prevRank === undefined || entry.prevRank === null) return "";
    const diff = entry.prevRank - entry.rank;
    if (diff > 0) return `<span class="rank-delta up">▲${diff}</span>`;
    if (diff < 0) return `<span class="rank-delta down">▼${Math.abs(diff)}</span>`;
    return "";
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
      tr.className = "profile-row";
      tr.tabIndex = 0;
      tr.setAttribute("role", "link");
      tr.setAttribute("data-username", entry.username);
      tr.innerHTML = `
        <td class="col-rank"><span class="rank-num">#${entry.rank}</span>${rankDeltaHTML(entry)}</td>
        <td class="col-user row-username">${escapeHtml(entry.username)}</td>
        <td class="col-score row-score">
          <span>${escapeHtml(entry.score)}</span>
          <svg class="profile-row-icon" viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path fill="currentColor" d="M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4Zm-1.2 13.6-3.4-3.4 1.4-1.4 2 2 4.6-4.6 1.4 1.4-6 6Z"/></svg>
        </td>
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
    const list = boardData.accounts || [];
    const q = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!q) return list;
    return list.filter(e => e.username.toLowerCase().includes(q));
  }

  function renderBoard() {
    const list = getFilteredList();
    renderPodium(document.getElementById("searchInput").value.trim() ? [] : list);
    renderTable(list);
    applyLanguage(currentLang);
  }

  /* ---------------- events ---------------- */
  function initSearch() {
    document.getElementById("searchInput").addEventListener("input", renderBoard);
  }

  function initRowNavigation() {
    document.getElementById("boardBody").addEventListener("click", e => {
      const row = e.target.closest(".profile-row");
      if (row) location.href = "profile.html?u=" + encodeURIComponent(row.getAttribute("data-username"));
    });
    document.getElementById("boardBody").addEventListener("keydown", e => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const row = e.target.closest(".profile-row");
      if (row) {
        e.preventDefault();
        location.href = "profile.html?u=" + encodeURIComponent(row.getAttribute("data-username"));
      }
    });
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
    initSearch();
    initRowNavigation();
    initLangToggle();

    try {
      const res = await fetch("data.json", { cache: "no-store" });
      boardData = await res.json();
    } catch (err) {
      console.error("Could not load data.json", err);
      boardData = { meta: {}, accounts: [] };
    }
    window.TSS_DATA = boardData;
    window.dispatchEvent(new CustomEvent("tss:data-ready", { detail: boardData }));

    injectItemListSchema(boardData.accounts || []);
    renderStats();
    renderBoard();
  }

  function injectItemListSchema(accounts) {
    if (!accounts.length) return;
    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "أعلى نقاط سناب شات — TopScoreSnap",
      "itemListElement": accounts.slice(0, 10).map(a => ({
        "@type": "ListItem",
        "position": a.rank,
        "name": a.username,
        "description": `Snap Score: ${a.score}`
      }))
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
