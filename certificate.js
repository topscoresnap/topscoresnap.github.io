(() => {
  "use strict";

  /* ---------------- copy ---------------- */
  const STR = {
    ar: {
      eyebrow: "شهادة إنجاز موثّقة",
      subtitle: "من أعلى حسابات Snap Score عالميًا",
      scoreLabel: "نقاط Snap Score",
      rankLabel: "الترتيب العالمي",
      topLabel: "من أفضل",
      percentileLabel: "النسبة المئوية",
      idLabel: "رقم الشهادة",
      dateLabel: "تاريخ التوثيق",
      scanLabel: "امسح للتحقق",
      disclaimer: "لوحة مستقلة غير رسمية — غير تابعة لشركة Snap Inc. أو تطبيق Snapchat.",
      loading: "جارٍ توثيق الإنجاز...",
      download: "تحميل الشهادة",
      share: "مشاركة",
      copyLink: "نسخ رابط التحقق",
      copied: "تم النسخ",
      verifiedPill: "موثّق",
      notFound: "تعذّر العثور على هذا الحساب في القائمة الحالية."
    },
    en: {
      eyebrow: "Verified Achievement Certificate",
      subtitle: "Top-Ranked Global Snap Score Account",
      scoreLabel: "Snap Score",
      rankLabel: "Global Rank",
      topLabel: "Top",
      percentileLabel: "Percentile",
      idLabel: "Certificate ID",
      dateLabel: "Verified On",
      scanLabel: "Scan to verify",
      disclaimer: "Independent, unofficial leaderboard — not affiliated with Snap Inc. or Snapchat.",
      loading: "Authenticating achievement...",
      download: "Download Certificate",
      share: "Share",
      copyLink: "Copy Verify Link",
      copied: "Copied",
      verifiedPill: "Verified",
      notFound: "This account could not be found on the current list."
    }
  };

  function lang() { return window.TSS_LANG || document.documentElement.lang || "ar"; }
  function t(key) { return (STR[lang()] || STR.ar)[key] || key; }

  /* ---------------- helpers ---------------- */
  function hashId(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(36).toUpperCase().padStart(7, "0");
  }

  function tierOf(rank) {
    if (rank === 1) return "gold";
    if (rank === 2) return "silver";
    if (rank === 3) return "bronze";
    return "ice";
  }

  function getBaseUrl() {
    const path = location.pathname;
    const dir = path.substring(0, path.lastIndexOf("/") + 1);
    return location.origin + dir;
  }

  function formatDate(d, lng) {
    const monthsAr = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
    const monthsEn = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const names = lng === "ar" ? monthsAr : monthsEn;
    return `${d.getDate()} ${names[d.getMonth()]} ${d.getFullYear()}`;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function buildCertData(username) {
    const data = window.TSS_DATA;
    if (!data || !Array.isArray(data.accounts)) return null;
    const account = data.accounts.find(a => a.username.toLowerCase() === String(username).toLowerCase());
    if (!account) return null;
    const total = data.accounts.length;
    const topPercent = Math.max(1, Math.ceil((account.rank / total) * 100));
    const certId = "TSS-" + hashId(account.username.toLowerCase());
    const verifyUrl = getBaseUrl() + "verify.html?u=" + encodeURIComponent(account.username) + "&id=" + encodeURIComponent(certId);
    return {
      username: account.username,
      score: account.score,
      rank: account.rank,
      total,
      topPercent,
      certId,
      verifyUrl,
      tier: tierOf(account.rank),
      date: new Date()
    };
  }

  /* ---------------- modal shell ---------------- */
  const modalEl = () => document.getElementById("certModal");
  const bodyEl = () => document.getElementById("certModalBody");
  let lastFocused = null;

  function openModal() {
    lastFocused = document.activeElement;
    modalEl().classList.add("open");
    modalEl().setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const closeBtn = modalEl().querySelector(".cert-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modalEl().classList.remove("open");
    modalEl().setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => { bodyEl().innerHTML = ""; }, 250);
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function renderLoading() {
    bodyEl().innerHTML = `
      <div class="cert-loading">
        <div class="cert-loading-ring"></div>
        <p class="cert-loading-text">${t("loading")}</p>
      </div>`;
  }

  function renderNotFound() {
    bodyEl().innerHTML = `<div class="cert-loading"><p class="cert-loading-text">${t("notFound")}</p></div>`;
  }

  /* ---------------- certificate render ---------------- */
  function renderCertificate(cd) {
    const L = lang();
    const dir = L === "ar" ? "rtl" : "ltr";
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(cd.verifyUrl)}`;

    bodyEl().innerHTML = `
      <div class="cert-scaler" id="certScaler">
        <div class="cert-card tier-${cd.tier}" id="certCard" dir="${dir}" lang="${L}">
          <div class="cert-watermark"><img src="logo.png" alt=""></div>
          <div class="cert-frame">
            <div class="cert-top">
              <div class="cert-brand">
                <img src="logo.png" alt="" class="cert-brand-mark">
                <span>TopScoreSnap</span>
              </div>
              <div class="cert-verified-pill">
                <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true"><path fill="currentColor" d="M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4Zm-1.2 13.6-3.4-3.4 1.4-1.4 2 2 4.6-4.6 1.4 1.4-6 6Z"/></svg>
                <span>${t("verifiedPill")}</span>
              </div>
            </div>

            <p class="cert-eyebrow">${t("eyebrow")}</p>

            <div class="cert-seal tier-${cd.tier}"><span>#${cd.rank}</span></div>

            <h2 class="cert-username">${escapeHtml(cd.username)}</h2>
            <p class="cert-subtitle">${t("subtitle")}</p>

            <div class="cert-score-block">
              <span class="cert-score-value">${escapeHtml(cd.score)}</span>
              <span class="cert-score-label">${t("scoreLabel")}</span>
            </div>

            <div class="cert-chips">
              <div class="cert-chip facet">
                <span class="cert-chip-value">#${cd.rank}</span>
                <span class="cert-chip-label">${t("rankLabel")}</span>
              </div>
              <div class="cert-chip facet">
                <span class="cert-chip-value">${t("topLabel")} ${cd.topPercent}%</span>
                <span class="cert-chip-label">${t("percentileLabel")}</span>
              </div>
            </div>

            <div class="cert-divider"></div>

            <div class="cert-footer">
              <div class="cert-footer-meta">
                <p><span>${t("idLabel")}:</span><b>${cd.certId}</b></p>
                <p><span>${t("dateLabel")}:</span><b>${formatDate(cd.date, L)}</b></p>
              </div>
              <div class="cert-footer-qr">
                <img src="${qrUrl}" alt="QR" crossorigin="anonymous" width="72" height="72">
                <span>${t("scanLabel")}</span>
              </div>
            </div>

            <p class="cert-fine-print">${t("disclaimer")}</p>
          </div>
        </div>
      </div>

      <div class="cert-actions">
        <button type="button" class="btn btn-primary facet cert-download" id="certDownloadBtn">${t("download")}</button>
        <button type="button" class="btn btn-ghost facet" id="certShareBtn">${t("share")}</button>
        <button type="button" class="btn btn-ghost facet" id="certCopyBtn">${t("copyLink")}</button>
      </div>`;

    fitScaler();
    requestAnimationFrame(() => {
      const card = document.getElementById("certCard");
      if (card) card.classList.add("reveal");
    });

    document.getElementById("certDownloadBtn").addEventListener("click", () => downloadCert(cd));
    document.getElementById("certShareBtn").addEventListener("click", () => shareCert(cd));
    document.getElementById("certCopyBtn").addEventListener("click", e => copyLink(cd, e.currentTarget));
  }

  function fitScaler() {
    const scaler = document.getElementById("certScaler");
    const card = document.getElementById("certCard");
    if (!scaler || !card) return;
    const avail = scaler.clientWidth;
    const scale = Math.min(1, (avail - 8) / 540);
    card.style.transform = `scale(${scale})`;
    scaler.style.height = (960 * scale) + "px";
  }

  /* ---------------- export ---------------- */
  async function renderToCanvas() {
    const original = document.getElementById("certCard");
    const clone = original.cloneNode(true);
    clone.classList.add("reveal");
    clone.style.transform = "none";
    clone.style.position = "fixed";
    clone.style.insetInlineStart = "-9999px";
    clone.style.top = "0";
    clone.style.opacity = "1";
    document.body.appendChild(clone);
    try {
      return await html2canvas(clone, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        width: 540,
        height: 960
      });
    } finally {
      document.body.removeChild(clone);
    }
  }

  async function downloadCert(cd) {
    const btn = document.getElementById("certDownloadBtn");
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "...";
    try {
      const canvas = await renderToCanvas();
      const link = document.createElement("a");
      link.download = `topscoresnap-${cd.username}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Certificate export failed", err);
    } finally {
      btn.disabled = false;
      btn.textContent = original;
    }
  }

  async function shareCert(cd) {
    try {
      const canvas = await renderToCanvas();
      canvas.toBlob(async blob => {
        if (!blob) return;
        const file = new File([blob], `topscoresnap-${cd.username}.png`, { type: "image/png" });
        try {
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: "TopScoreSnap", text: cd.verifyUrl });
          } else if (navigator.share) {
            await navigator.share({ title: "TopScoreSnap", text: cd.verifyUrl, url: cd.verifyUrl });
          } else {
            downloadCert(cd);
          }
        } catch (err) {
          if (err && err.name !== "AbortError") console.error("Share failed", err);
        }
      }, "image/png");
    } catch (err) {
      console.error("Certificate export failed", err);
    }
  }

  function copyLink(cd, btn) {
    navigator.clipboard.writeText(cd.verifyUrl).then(() => {
      const original = btn.textContent;
      btn.textContent = t("copied");
      setTimeout(() => { btn.textContent = original; }, 1600);
    }).catch(() => {});
  }

  /* ---------------- open flow ---------------- */
  function openCertificateFor(username) {
    if (!username) return;
    openModal();
    renderLoading();
    const start = Date.now();
    const cd = buildCertData(username);
    const minDelay = 700; // brief ceremonial pause before the reveal
    const elapsed = Date.now() - start;
    setTimeout(() => {
      if (!modalEl().classList.contains("open")) return;
      if (!cd) { renderNotFound(); return; }
      renderCertificate(cd);
    }, Math.max(0, minDelay - elapsed));
  }

  /* ---------------- global events ---------------- */
  document.addEventListener("click", e => {
    const trigger = e.target.closest("[data-cert-trigger]");
    if (trigger) {
      openCertificateFor(trigger.getAttribute("data-cert-user"));
      return;
    }
    if (e.target.closest("[data-cert-close]")) closeModal();
  });

  document.addEventListener("keydown", e => {
    if ((e.key === "Enter" || e.key === " ") && document.activeElement && document.activeElement.classList.contains("cert-row")) {
      e.preventDefault();
      openCertificateFor(document.activeElement.getAttribute("data-cert-user"));
    }
    if (e.key === "Escape" && modalEl().classList.contains("open")) closeModal();
  });

  window.addEventListener("resize", () => {
    if (modalEl().classList.contains("open")) fitScaler();
  });

  window.addEventListener("tss:lang-change", () => {
    // If a certificate is currently open, re-render it in the new language.
    const card = document.getElementById("certCard");
    if (!card) return;
    const usernameEl = card.querySelector(".cert-username");
    if (!usernameEl) return;
    const cd = buildCertData(usernameEl.textContent);
    if (cd) renderCertificate(cd);
  });
})();
