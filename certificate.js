(() => {
  "use strict";

  /* ---------------- copy (card's own internal text) ---------------- */
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
      verifiedPill: "موثّق"
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
      verifiedPill: "Verified"
    }
  };

  function t(key, lng) { return (STR[lng] || STR.ar)[key] || key; }

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

  /**
   * Builds the certificate data object for a username.
   * The certificate IMAGE always uses the public, abbreviated score
   * from data.json — never the separate full-score file.
   */
  function buildCertData(username, data) {
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

  /* ---------------- card markup ---------------- */
  function cardHTML(cd, lng) {
    const dir = lng === "ar" ? "rtl" : "ltr";
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(cd.verifyUrl)}`;
    return `
      <div class="cert-card tier-${cd.tier}" dir="${dir}" lang="${lng}">
        <div class="cert-watermark"><img src="logo.png" alt=""></div>
        <div class="cert-frame">
          <div class="cert-top">
            <div class="cert-brand">
              <img src="logo.png" alt="" class="cert-brand-mark">
              <span>TopScoreSnap</span>
            </div>
            <div class="cert-verified-pill">
              <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true"><path fill="currentColor" d="M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4Zm-1.2 13.6-3.4-3.4 1.4-1.4 2 2 4.6-4.6 1.4 1.4-6 6Z"/></svg>
              <span>${t("verifiedPill", lng)}</span>
            </div>
          </div>

          <p class="cert-eyebrow">${t("eyebrow", lng)}</p>

          <div class="cert-seal tier-${cd.tier}"><span>#${cd.rank}</span></div>

          <h2 class="cert-username">${escapeHtml(cd.username)}</h2>
          <p class="cert-subtitle">${t("subtitle", lng)}</p>

          <div class="cert-score-block">
            <span class="cert-score-value">${escapeHtml(cd.score)}</span>
            <span class="cert-score-label">${t("scoreLabel", lng)}</span>
          </div>

          <div class="cert-chips">
            <div class="cert-chip facet">
              <span class="cert-chip-value">#${cd.rank}</span>
              <span class="cert-chip-label">${t("rankLabel", lng)}</span>
            </div>
            <div class="cert-chip facet">
              <span class="cert-chip-value">${t("topLabel", lng)} ${cd.topPercent}%</span>
              <span class="cert-chip-label">${t("percentileLabel", lng)}</span>
            </div>
          </div>

          <div class="cert-divider"></div>

          <div class="cert-footer">
            <div class="cert-footer-meta">
              <p><span>${t("idLabel", lng)}:</span><b>${cd.certId}</b></p>
              <p><span>${t("dateLabel", lng)}:</span><b>${formatDate(cd.date, lng)}</b></p>
            </div>
            <div class="cert-footer-qr">
              <img src="${qrUrl}" alt="QR" crossorigin="anonymous" width="72" height="72">
              <span>${t("scanLabel", lng)}</span>
            </div>
          </div>

          <p class="cert-fine-print">${t("disclaimer", lng)}</p>
        </div>
      </div>`;
  }

  /**
   * Mounts the certificate card into a container, scaled to fit, with a reveal animation.
   * Returns the mounted .cert-card element.
   */
  function mount(container, cd, lng) {
    container.innerHTML = `<div class="cert-scaler" id="certScaler">${cardHTML(cd, lng)}</div>`;
    const scaler = container.querySelector("#certScaler");
    const card = container.querySelector(".cert-card");
    fitScaler(scaler, card);
    requestAnimationFrame(() => card.classList.add("reveal"));
    const onResize = () => fitScaler(scaler, card);
    window.addEventListener("resize", onResize);
    card._tssCleanup = () => window.removeEventListener("resize", onResize);
    return card;
  }

  function fitScaler(scaler, card) {
    if (!scaler || !card) return;
    const avail = scaler.clientWidth;
    const scale = Math.min(1, (avail - 8) / 540);
    card.style.transform = `scale(${scale})`;
    scaler.style.height = (960 * scale) + "px";
  }

  /* ---------------- export ---------------- */
  async function exportCanvas(cardEl) {
    const clone = cardEl.cloneNode(true);
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

  async function downloadFromCard(cd, cardEl, onStateChange) {
    if (onStateChange) onStateChange("busy");
    try {
      const canvas = await exportCanvas(cardEl);
      const link = document.createElement("a");
      link.download = `topscoresnap-${cd.username}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      if (onStateChange) onStateChange("done");
    } catch (err) {
      console.error("Certificate export failed", err);
      if (onStateChange) onStateChange("error");
    }
  }

  async function shareFromCard(cd, cardEl, onStateChange) {
    if (onStateChange) onStateChange("busy");
    try {
      const canvas = await exportCanvas(cardEl);
      canvas.toBlob(async blob => {
        if (!blob) { if (onStateChange) onStateChange("error"); return; }
        const file = new File([blob], `topscoresnap-${cd.username}.png`, { type: "image/png" });
        try {
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: "TopScoreSnap", text: cd.verifyUrl });
          } else if (navigator.share) {
            await navigator.share({ title: "TopScoreSnap", text: cd.verifyUrl, url: cd.verifyUrl });
          } else {
            await downloadFromCard(cd, cardEl, onStateChange);
            return;
          }
          if (onStateChange) onStateChange("done");
        } catch (err) {
          if (err && err.name !== "AbortError") console.error("Share failed", err);
          if (onStateChange) onStateChange("done");
        }
      }, "image/png");
    } catch (err) {
      console.error("Certificate export failed", err);
      if (onStateChange) onStateChange("error");
    }
  }

  window.TSSCertificate = {
    buildCertData,
    cardHTML,
    mount,
    exportCanvas,
    downloadFromCard,
    shareFromCard,
    hashId
  };
})();
