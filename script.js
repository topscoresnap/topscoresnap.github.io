let globalData = {};
let currentLang = 'ar';

document.addEventListener("DOMContentLoaded", () => {
    // جلب البيانات بشكل آمن ومستقل تماماً لمنع أي تعليق
    fetch('data.json')
        .then(response => {
            if (!response.ok) throw new Error("فشل جلب ملف البيانات");
            return response.json();
        })
        .then(data => {
            globalData = data;
            renderSite();
        })
        .catch(err => {
            console.error("Error loading JSON:", err);
            const container = document.getElementById('rowsContainer');
            if (container) {
                container.innerHTML = `
                    <div style="text-align: center; color: #ff5c5c; padding: 20px; font-weight: bold;">
                        ⚠️ فشل تحميل البيانات! تأكد من وجود ملف data.json في نفس المجلد.
                    </div>`;
            }
        });
});

function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

function safeSetHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
}

// وظيفة التمرير السلس للمتصدرين عند الضغط على الزر الكبير
function scrollToLeaderboard() {
    const section = document.getElementById('mainLeaderboardSection');
    if(section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function renderSite() {
    if (!globalData.languages || !globalData.languages[currentLang]) return;
    const langData = globalData.languages[currentLang];
    
    document.body.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    // عناوين توب سكور سناب الذكية
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

    // بناء القائمة العلوية
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        const links = [langData.nav_home, langData.nav_leaderboard, langData.nav_levels, langData.nav_rewards, langData.nav_about];
        navLinks.innerHTML = links.map((link, i) => `<a href="#" class="${i===0?'active':''}" onclick="return false;">${link}</a>`).join('');
    }

    if (globalData.accounts) {
        populateLeaderboard(globalData.accounts);
    }
}

function populateLeaderboard(accounts) {
    const rowsContainer = document.getElementById('rowsContainer');
    const podiumContainer = document.getElementById('podiumContainer');
    
    if (rowsContainer) rowsContainer.innerHTML = '';
    
    // حقن بيانات الهرم الثلاثي الأول وتحديث الكرت الجانبي
    if (accounts.length >= 3 && podiumContainer) {
        const top1 = accounts[0];
        const top2 = accounts[1];
        const top3 = accounts[2];

        safeSetText('previewPlayerName', top1.username);
        safeSetText('previewPlayerScore', top1.score);

        podiumContainer.innerHTML = `
            <div class="podium-box p-2" style="cursor:pointer;">
                <div class="p-badge">2</div>
                <div class="p-name">${top2.username}</div>
                <div class="p-score">${top2.score}</div>
            </div>
            <div class="podium-box p-1" style="cursor:pointer;">
                <div class="p-badge">👑</div>
                <div class="p-name">${top1.username}</div>
                <div class="p-score">${top1.score}</div>
            </div>
            <div class="podium-box p-3" style="cursor:pointer;">
                <div class="p-badge">3</div>
                <div class="p-name">${top3.username}</div>
                <div class="p-score">${top3.score}</div>
            </div>
        `;
        
        // ربط أزرار الهرم بالكرت الجانبي حتى تصبح تفاعلية وتنضغط
        const boxes = podiumContainer.querySelectorAll('.podium-box');
        boxes[0].addEventListener('click', () => updatePreview(top2.username, top2.score, 2));
        boxes[1].addEventListener('click', () => updatePreview(top1.username, top1.score, 1));
        boxes[2].addEventListener('click', () => updatePreview(top3.username, top3.score, 3));
    }

    if (rowsContainer) {
        if (accounts.length === 0) {
            rowsContainer.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:20px;">لم يتم العثور على حسابات!</div>`;
            return;
        }

        // بناء صفوف الـ 27 حساباً وتفعيل ميزة الضغط عليها فوراً
        accounts.forEach((account, index) => {
            const row = document.createElement('div');
            row.className = 'leader-row';
            row.innerHTML = `
                <div class="leader-rank">#${index + 1}</div>
                <div class="leader-profile">
                    <div class="leader-avatar">👤</div>
                    <div>${account.username}</div>
                </div>
                <div class="leader-score">${account.score}</div>
            `;
            row.addEventListener('click', () => {
                updatePreview(account.username, account.score, index + 1);
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
    if (!globalData.accounts) return;
    const filtered = globalData.accounts.filter(acc => 
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
