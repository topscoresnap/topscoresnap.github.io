// البيانات والترجمات مدمجة محلياً لضمان التشغيل الفوري 100% بدون أي تعليق
const siteData = {
  "languages": {
    "ar": {
      "subtitle": "اكتشف أقوى اللاعبين وتصدر الترتيب العالمي واجمع النقاط لتصل إلى القمة دائماً!",
      "btn_view": "عرض المتصدرين 🏆",
      "card_title": "لوحة المتصدرين",
      "subtitle_card": "أعلى 10 حسابات من حيث النقاط",
      "filter_all": "كل الوقت 🌐",
      "filter_month": "هذا الشهر 📅",
      "filter_week": "هذا الأسبوع ⏱️",
      "th_rank": "الترتيب",
      "th_player": "اللاعب",
      "th_score": "النقاط",
      "btn_all": "عرض القائمة كاملة ☰",
      "preview_title": "الملف الشخصي الفائز",
      "stat_badges": "الشارات",
      "stat_win": "نسبة الفوز",
      "stat_level": "المستوى",
      "nav_home": "الرئيسية",
      "nav_leaderboard": "لوحة المتصدرين",
      "nav_levels": "المستويات",
      "nav_rewards": "المكافآت",
      "nav_about": "عن الموقع",
      "search_placeholder": "ابحث عن لاعب...",
      "about_box_title": "تعريف المنصة ✨",
      "about_box_desc": "منصة توب سكور سناب هي اللوحة العالمية الأولى المتخصصة في رصد وتوثيق أعلى مستخدمي سناب شات من حيث النقاط (Snap Scores). نقوم بتحديث البيانات بشكل دوري لاستعراض أقوى المنافسين وأصحاب التفاعل المليوني برؤية بصرية فخمة وديناميكية."
    },
    "en": {
      "subtitle": "Discover the strongest players, check the global leaderboard updates, and climb your way to the very top!",
      "btn_view": "View Leaderboard 🏆",
      "card_title": "Leaderboard",
      "subtitle_card": "Top Accounts by Score",
      "filter_all": "All Time 🌐",
      "filter_month": "This Month 📅",
      "filter_week": "This Week ⏱️",
      "th_rank": "Rank",
      "th_player": "Player",
      "th_score": "Snap Score",
      "btn_all": "View Full List ☰",
      "preview_title": "Top Leader Profile",
      "stat_badges": "Badges",
      "stat_win": "Win Rate",
      "stat_level": "Level",
      "nav_home": "Home",
      "nav_leaderboard": "Leaderboard",
      "nav_levels": "Levels",
      "nav_rewards": "Rewards",
      "nav_about": "About Us",
      "search_placeholder": "Search username...",
      "about_box_title": "Platform Definition ✨",
      "about_box_desc": "TopScoreSnap is the premier global leaderboard dedicated to tracking and documenting the highest Snapchat accounts by scores. We update data regularly to showcase the most active creators with a luxurious interface."
    }
  },
  "accounts": [
    {"username": "rk_737", "score": "1.1B+"},
    {"username": "dannyxdev", "score": "462.2M"},
    {"username": "coffeetimeman", "score": "361M"},
    {"username": "s.karan98", "score": "264.5M"},
    {"username": "l0l00l000", "score": "222.3M"},
    {"username": "igg75dts", "score": "213.3M"},
    {"username": "cristhis-guy", "score": "212.1M+"},
    {"username": "starboy_99", "score": "195.4M"},
    {"username": "shadow_racer", "score": "180.2M"},
    {"username": "turbo_drift", "score": "165.8M"},
    {"username": "apex_hunter", "score": "150.0M"},
    {"username": "ghost_king", "score": "142.3M"},
    {"username": "alpha_wolf", "score": "138.1M"},
    {"username": "sam_v8", "score": "129.5M"},
    {"username": "neon_glow", "score": "122.4M"},
    {"username": "boosted_life", "score": "115.7M"},
    {"username": "z_performance", "score": "108.2M"},
    {"username": "carbon_fiber", "score": "99.4M"},
    {"username": "vtec_power", "score": "94.1M"},
    {"username": "redline_90", "score": "88.6M"},
    {"username": "octane_beast", "score": "83.2M"},
    {"username": "clutch_master", "score": "79.8M"},
    {"username": "silver_arrow", "score": "74.5M"},
    {"username": "drift_king_om", "score": "71.2M"},
    {"username": "asg_performance", "score": "68.9M"},
    {"username": "torque_monster", "score": "62.4M"},
    {"username": "nitro_boost", "score": "55.1M"}
  ]
};

let currentLang = 'ar';

document.addEventListener("DOMContentLoaded", () => {
    renderSite();
});

function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

function safeSetHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
}

function scrollToLeaderboard() {
    const section = document.getElementById('mainLeaderboardSection');
    if(section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function renderSite() {
    const langData = siteData.languages[currentLang];
    if (!langData) return;
    
    document.body.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    if(currentLang === 'ar') {
        safeSetHTML('heroTitle', 'أعلى الحسابات <br>من حيث <span>النقاط</span>');
    } else {
        safeSetHTML('heroTitle', 'Highest Accounts <br>in terms of <span>Scores</span>');
    }

    safeSetText('heroSubtitle', langData.subtitle);
    safeSetText('btnView', langData.btn_view);
    safeSetText('cardTitle', langData.card_title);
    safeSetText('cardSub', langData.subtitle_card);
    safeSetText('filterAll', langData.filter_all);
    safeSetText('filterMonth', langData.filter_month);
    safeSetText('filterWeek', langData.filter_week);
    safeSetText('thRank', langData.th_rank);
    safeSetText('thPlayer', langData.th_player);
    safeSetText('thScore', langData.th_score);
    safeSetText('btnAll', langData.btn_all);
    
    const searchInput = document.getElementById('searchNav');
    if (searchInput) searchInput.placeholder = langData.search_placeholder;
    
    safeSetText('aboutBoxTitle', langData.about_box_title);
    safeSetText('aboutBoxDesc', langData.about_box_desc);
    safeSetText('previewTitleText', langData.preview_title);
    safeSetText('thScoreLabel', langData.th_score);
    safeSetText('statBadgesLabel', langData.stat_badges);
    safeSetText('statWinLabel', langData.stat_win);
    safeSetText('statLevelLabel', langData.stat_level);

    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        const links = [langData.nav_home, langData.nav_leaderboard, langData.nav_levels, langData.nav_rewards, langData.nav_about];
        navLinks.innerHTML = links.map((link, i) => `<a href="#" class="${i===0?'active':''}" onclick="return false;">${link}</a>`).join('');
    }

    populateLeaderboard(siteData.accounts);
}

function populateLeaderboard(accounts) {
    const rowsContainer = document.getElementById('rowsContainer');
    const podiumContainer = document.getElementById('podiumContainer');
    
    if (rowsContainer) rowsContainer.innerHTML = '';
    
    if (accounts.length >= 3 && podiumContainer) {
        const top1 = accounts[0];
        const top2 = accounts[1];
        const top3 = accounts[2];

        safeSetText('previewPlayerName', top1.username);
        safeSetText('previewPlayerScore', top1.score);

        podiumContainer.innerHTML = `
            <div class="podium-box p-2" id="pod2">
                <div class="p-badge">2</div>
                <div class="p-name">${top2.username}</div>
                <div class="p-score">${top2.score}</div>
            </div>
            <div class="podium-box p-1" id="pod1">
                <div class="p-badge">👑</div>
                <div class="p-name">${top1.username}</div>
                <div class="p-score">${top1.score}</div>
            </div>
            <div class="podium-box p-3" id="pod3">
                <div class="p-badge">3</div>
                <div class="p-name">${top3.username}</div>
                <div class="p-score">${top3.score}</div>
            </div>
        `;
        
        document.getElementById('pod2').addEventListener('click', () => updatePreview(top2.username, top2.score, 2));
        document.getElementById('pod1').addEventListener('click', () => updatePreview(top1.username, top1.score, 1));
        document.getElementById('pod3').addEventListener('click', () => updatePreview(top3.username, top3.score, 3));
    }

    if (rowsContainer) {
        if (accounts.length === 0) {
            rowsContainer.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:20px;">لم يتم العثور على نتائج!</div>`;
            return;
        }

        accounts.forEach((account, index) => {
            const originalIndex = siteData.accounts.findIndex(a => a.username === account.username);
            const displayRank = originalIndex !== -1 ? originalIndex + 1 : index + 1;
            
            const row = document.createElement('div');
            row.className = 'leader-row';
            row.innerHTML = `
                <div class="leader-rank">#${displayRank}</div>
                <div class="leader-profile">
                    <div class="leader-avatar">👤</div>
                    <div>${account.username}</div>
                </div>
                <div class="leader-score">${account.score}</div>
            `;
            row.addEventListener('click', () => {
                updatePreview(account.username, account.score, displayRank);
            });
            rowsContainer.appendChild(row);
        });
    }
}

function updatePreview(username, score, rank) {
    safeSetText('previewPlayerName', username);
    safeSetText('previewPlayerScore', score);
    const prefix = currentLang === 'ar' ? 'الترتيب' : 'Rank';
    safeSetText('previewTitleText', `${prefix} #${rank}`);
}

function handleSearch(query) {
    const filtered = siteData.accounts.filter(acc => 
        acc.username.toLowerCase().includes(query.toLowerCase())
    );
    populateLeaderboard(filtered);
}

function switchLanguage(lang) {
    currentLang = lang;
    const btnAr = document.getElementById('btnAr');
    const btnEn = document.getElementById('btnEn');
    if (btnAr) btnAr.classList.toggle('active', lang === 'ar');
    if (btnEn) btnEn.classList.toggle('active', lang === 'en');
    renderSite();
}
