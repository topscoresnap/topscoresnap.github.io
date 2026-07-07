let globalData = {};
let currentLang = 'ar';

// تحميل البيانات واللغات من ملف JSON بشكل منفصل تماماً
document.addEventListener("DOMContentLoaded", () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            globalData = data;
            renderSite();
        })
        .catch(err => console.error("Error loading JSON data:", err));
});

// دالة بناء الموقع بالكامل بناءً على اللغة المحددة والبيانات الفورية
function renderSite() {
    const langData = globalData.languages[currentLang];
    
    // تطبيق اتجاه الواجهة (RTL للعربي و LTR للإنجليزي)
    document.body.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    // ترجمة العناصر الثابتة والهيدر والـ Hero
    document.getElementById('heroTitle').innerHTML = currentLang === 'ar' ? 'أعلى الحسابات <br>من حيث <span>النقاط</span>' : 'Highest Accounts <br>in terms of <span>Scores</span>';
    document.getElementById('heroSubtitle').innerText = langData.subtitle;
    document.getElementById('btnView').innerText = langData.btn_view;
    document.getElementById('btnHow').innerText = langData.btn_how;
    document.getElementById('cardTitle').innerText = langData.card_title;
    document.getElementById('cardSub').innerText = langData.subtitle_card;
    document.getElementById('filterAll').innerText = langData.filter_all;
    document.getElementById('filterMonth').innerText = langData.filter_month;
    document.getElementById('filterWeek').innerText = langData.filter_week;
    document.getElementById('thRank').innerText = langData.th_rank;
    document.getElementById('thPlayer').innerText = langData.th_player;
    document.getElementById('thScore').innerText = langData.th_score;
    document.getElementById('btnAll').innerText = langData.btn_all;
    document.getElementById('searchNav').placeholder = langData.search_placeholder;
    document.getElementById('loginBtn').innerText = langData.login_btn;
    
    // صندوق التعريف الفخم الجديد
    document.getElementById('aboutBoxTitle').innerText = langData.about_box_title;
    document.getElementById('aboutBoxDesc').innerText = langData.about_box_desc;

    // كرت البروفايل والعدادات السفلي
    document.getElementById('previewTitleText').innerText = langData.preview_title;
    document.getElementById('thScoreLabel').innerText = langData.th_score;
    document.getElementById('btnProfile').innerText = langData.btn_profile;
    document.getElementById('statBadgesLabel').innerText = langData.stat_badges;
    document.getElementById('statWinLabel').innerText = langData.stat_win;
    document.getElementById('statLevelLabel').innerText = langData.stat_level;

    // بناء قائمة الملاحة العلوية (Navigation Links)
    const links = [langData.nav_home, langData.nav_leaderboard, langData.nav_levels, langData.nav_rewards, langData.nav_about];
    document.getElementById('navLinks').innerHTML = links.map((link, i) => `<a href="#" class="${i===0?'active':''}">${link}</a>`).join('');

    // عرض الحسابات الـ 27 وتوليد منصة الهرم للأوائل
    populateLeaderboard(globalData.accounts);
}

// بناء صفوف الجدول والـ Top 3
function populateLeaderboard(accounts) {
    const rowsContainer = document.getElementById('rowsContainer');
    const podiumContainer = document.getElementById('podiumContainer');
    
    rowsContainer.innerHTML = '';
    
    // بناء الهرم العلوي لأول 3 حسابات بشكل فني متناسق
    if (accounts.length >= 3) {
        const top1 = accounts[0];
        const top2 = accounts[1];
        const top3 = accounts[2];

        // تعيين بيانات كرت بروفايل المتصدر الأول تلقائياً في الجانب
        document.getElementById('previewPlayerName').innerText = top1.username;
        document.getElementById('previewPlayerScore').innerText = top1.score;

        podiumContainer.innerHTML = `
            <div class="podium-box p-2">
                <div class="p-badge">2</div>
                <div class="p-name">${top2.username}</div>
                <div class="p-score">${top2.score}</div>
            </div>
            <div class="podium-box p-1">
                <div class="p-badge">👑</div>
                <div class="p-name">${top1.username}</div>
                <div class="p-score">${top1.score}</div>
            </div>
            <div class="podium-box p-3">
                <div class="p-badge">3</div>
                <div class="p-name">${top3.username}</div>
                <div class="p-score">${top3.score}</div>
            </div>
        `;
    }

    // حقن وعرض بقية الـ 27 حساباً داخل جدول الصدارة المطور
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
        // تحديث كرت البروفايل الجانبي فوراً عند الضغط على أي لاعب في الجدول
        row.addEventListener('click', () => {
            document.getElementById('previewPlayerName').innerText = account.username;
            document.getElementById('previewPlayerScore').innerText = account.score;
            document.getElementById('previewTitleText').innerText = (globalData.languages[currentLang].th_rank) + " #" + (index + 1);
        });
        rowsContainer.appendChild(row);
    });
}

// دالة البحث الفوري التفاعلية عن اللاعبين
function handleSearch(query) {
    const filtered = globalData.accounts.filter(acc => 
        acc.username.toLowerCase().includes(query.toLowerCase())
    );
    populateLeaderboard(filtered);
}

// دالة التبديل الفوري بين اللغتين بدون إعادة تحميل الصفحة
function switchLanguage(lang) {
    currentLang = lang;
    document.getElementById('btnAr').classList.toggle('active', lang === 'ar');
    document.getElementById('btnEn').classList.toggle('active', lang === 'en');
    renderSite();
}
