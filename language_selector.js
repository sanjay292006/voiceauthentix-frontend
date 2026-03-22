// ================================================================
//  VoiceAuthentix — Language Selector Module
//  Supports: English, Tamil, Hindi, Telugu, French, Spanish, Arabic
// ================================================================

const VA_LANGUAGES = {
    en: {
        name: 'English',
        flag: '🇬🇧',
        translations: {
            appTitle: 'Voice Authentix',
            tagline: 'Detect DeepFake Audio in Real Time',
            analyzeNav: 'ANALYZE',
            liveNav: 'LIVE',
            featuresNav: 'FEATURES',
            aboutNav: 'ABOUT',
            dropText: 'Drop Audio File Here',
            dropSub: 'Supports MP3, WAV, OGG, FLAC, M4A · Max 50MB',
            browseBtn: 'Browse Files',
            analyzeBtn: 'Run Deep Learning Analysis',
            recordTitle: 'RECORD AUDIO',
            recordBtn: 'START RECORDING',
            recordStatus: 'Click Record to start',
            batchTitle: 'BATCH ANALYSIS',
            batchDrop: 'Drop Multiple Files Here',
            batchAnalyze: 'ANALYZE ALL FILES',
            modelTitle: 'Model Details',
            historyTitle: 'Detection History',
            noHistory: 'No files analyzed yet...',
            authentic: 'AUTHENTIC',
            fake: 'FAKE DETECTED',
            authenticScore: 'Authentic Score',
            fakeScore: 'Fake Score',
            shareTitle: 'SHARE RESULTS',
            downloadPdf: 'DOWNLOAD PDF REPORT',
        }
    },
    ta: {
        name: 'தமிழ்',
        flag: '🇮🇳',
        translations: {
            appTitle: 'வாய்ஸ் ஆதென்டிக்ஸ்',
            tagline: 'நிகழ்நேரத்தில் டீப்ஃபேக் ஆடியோவை கண்டறியுங்கள்',
            analyzeNav: 'பகுப்பாய்வு',
            liveNav: 'நேரடி',
            featuresNav: 'அம்சங்கள்',
            aboutNav: 'பற்றி',
            dropText: 'ஆடியோ கோப்பை இங்கே இடுங்கள்',
            dropSub: 'MP3, WAV, OGG, FLAC, M4A · அதிகபட்சம் 50MB',
            browseBtn: 'கோப்புகளை தேர்வுசெய்',
            analyzeBtn: 'ஆழமான கற்றல் பகுப்பாய்வை இயக்கு',
            recordTitle: 'ஆடியோ பதிவு',
            recordBtn: 'பதிவு தொடங்கு',
            recordStatus: 'பதிவு தொடங்க கிளிக் செய்யுங்கள்',
            batchTitle: 'தொகுதி பகுப்பாய்வு',
            batchDrop: 'பல கோப்புகளை இங்கே இடுங்கள்',
            batchAnalyze: 'அனைத்து கோப்புகளையும் பகுப்பாய்வு செய்',
            modelTitle: 'மாதிரி விவரங்கள்',
            historyTitle: 'கண்டறிதல் வரலாறு',
            noHistory: 'இதுவரை கோப்புகள் பகுப்பாய்வு செய்யப்படவில்லை...',
            authentic: 'உண்மையானது',
            fake: 'போலி கண்டறியப்பட்டது',
            authenticScore: 'உண்மை மதிப்பெண்',
            fakeScore: 'போலி மதிப்பெண்',
            shareTitle: 'முடிவுகளை பகிர்',
            downloadPdf: 'PDF அறிக்கையை பதிவிறக்கு',
        }
    },
    hi: {
        name: 'हिंदी',
        flag: '🇮🇳',
        translations: {
            appTitle: 'वॉइस ऑथेंटिक्स',
            tagline: 'रियल टाइम में डीपफेक ऑडियो का पता लगाएं',
            analyzeNav: 'विश्लेषण',
            liveNav: 'लाइव',
            featuresNav: 'विशेषताएं',
            aboutNav: 'के बारे में',
            dropText: 'ऑडियो फ़ाइल यहाँ छोड़ें',
            dropSub: 'MP3, WAV, OGG, FLAC, M4A · अधिकतम 50MB',
            browseBtn: 'फ़ाइलें ब्राउज़ करें',
            analyzeBtn: 'डीप लर्निंग विश्लेषण चलाएं',
            recordTitle: 'ऑडियो रिकॉर्ड करें',
            recordBtn: 'रिकॉर्डिंग शुरू करें',
            recordStatus: 'शुरू करने के लिए रिकॉर्ड पर क्लिक करें',
            batchTitle: 'बैच विश्लेषण',
            batchDrop: 'कई फ़ाइलें यहाँ छोड़ें',
            batchAnalyze: 'सभी फ़ाइलों का विश्लेषण करें',
            modelTitle: 'मॉडल विवरण',
            historyTitle: 'पता लगाने का इतिहास',
            noHistory: 'अभी तक कोई फ़ाइल विश्लेषण नहीं किया गया...',
            authentic: 'प्रामाणिक',
            fake: 'नकली पाया गया',
            authenticScore: 'प्रामाणिक स्कोर',
            fakeScore: 'नकली स्कोर',
            shareTitle: 'परिणाम साझा करें',
            downloadPdf: 'PDF रिपोर्ट डाउनलोड करें',
        }
    },
    te: {
        name: 'తెలుగు',
        flag: '🇮🇳',
        translations: {
            appTitle: 'వాయిస్ అథెంటిక్స్',
            tagline: 'రియల్ టైమ్‌లో డీప్‌ఫేక్ ఆడియోను గుర్తించండి',
            analyzeNav: 'విశ్లేషణ',
            liveNav: 'లైవ్',
            featuresNav: 'లక్షణాలు',
            aboutNav: 'గురించి',
            dropText: 'ఆడియో ఫైల్‌ను ఇక్కడ వదలండి',
            dropSub: 'MP3, WAV, OGG, FLAC, M4A · గరిష్టం 50MB',
            browseBtn: 'ఫైళ్లను బ్రౌజ్ చేయండి',
            analyzeBtn: 'డీప్ లెర్నింగ్ విశ్లేషణను అమలు చేయండి',
            recordTitle: 'ఆడియో రికార్డ్ చేయండి',
            recordBtn: 'రికార్డింగ్ ప్రారంభించండి',
            recordStatus: 'ప్రారంభించడానికి రికార్డ్ క్లిక్ చేయండి',
            batchTitle: 'బ్యాచ్ విశ్లేషణ',
            batchDrop: 'అనేక ఫైళ్లను ఇక్కడ వదలండి',
            batchAnalyze: 'అన్ని ఫైళ్లను విశ్లేషించండి',
            modelTitle: 'మోడల్ వివరాలు',
            historyTitle: 'గుర్తింపు చరిత్ర',
            noHistory: 'ఇంకా ఫైళ్లు విశ్లేషించబడలేదు...',
            authentic: 'అసలైనది',
            fake: 'నకిలీ గుర్తించబడింది',
            authenticScore: 'అసలు స్కోర్',
            fakeScore: 'నకిలీ స్కోర్',
            shareTitle: 'ఫలితాలను పంచుకోండి',
            downloadPdf: 'PDF నివేదికను డౌన్‌లోడ్ చేయండి',
        }
    },
    fr: {
        name: 'Français',
        flag: '🇫🇷',
        translations: {
            appTitle: 'Voice Authentix',
            tagline: 'Détectez les deepfakes audio en temps réel',
            analyzeNav: 'ANALYSER',
            liveNav: 'EN DIRECT',
            featuresNav: 'FONCTIONS',
            aboutNav: 'À PROPOS',
            dropText: 'Déposez le fichier audio ici',
            dropSub: 'Supporte MP3, WAV, OGG, FLAC, M4A · Max 50MB',
            browseBtn: 'Parcourir les fichiers',
            analyzeBtn: 'Lancer l\'analyse Deep Learning',
            recordTitle: 'ENREGISTRER L\'AUDIO',
            recordBtn: 'DÉMARRER L\'ENREGISTREMENT',
            recordStatus: 'Cliquez sur Enregistrer pour commencer',
            batchTitle: 'ANALYSE EN LOT',
            batchDrop: 'Déposez plusieurs fichiers ici',
            batchAnalyze: 'ANALYSER TOUS LES FICHIERS',
            modelTitle: 'Détails du modèle',
            historyTitle: 'Historique de détection',
            noHistory: 'Aucun fichier analysé pour l\'instant...',
            authentic: 'AUTHENTIQUE',
            fake: 'DEEPFAKE DÉTECTÉ',
            authenticScore: 'Score authentique',
            fakeScore: 'Score faux',
            shareTitle: 'PARTAGER LES RÉSULTATS',
            downloadPdf: 'TÉLÉCHARGER LE RAPPORT PDF',
        }
    },
    es: {
        name: 'Español',
        flag: '🇪🇸',
        translations: {
            appTitle: 'Voice Authentix',
            tagline: 'Detecta audio deepfake en tiempo real',
            analyzeNav: 'ANALIZAR',
            liveNav: 'EN VIVO',
            featuresNav: 'FUNCIONES',
            aboutNav: 'ACERCA DE',
            dropText: 'Suelta el archivo de audio aquí',
            dropSub: 'Soporta MP3, WAV, OGG, FLAC, M4A · Máx 50MB',
            browseBtn: 'Explorar archivos',
            analyzeBtn: 'Ejecutar análisis de Deep Learning',
            recordTitle: 'GRABAR AUDIO',
            recordBtn: 'INICIAR GRABACIÓN',
            recordStatus: 'Haz clic en Grabar para comenzar',
            batchTitle: 'ANÁLISIS EN LOTE',
            batchDrop: 'Suelta varios archivos aquí',
            batchAnalyze: 'ANALIZAR TODOS LOS ARCHIVOS',
            modelTitle: 'Detalles del modelo',
            historyTitle: 'Historial de detección',
            noHistory: 'No se han analizado archivos aún...',
            authentic: 'AUTÉNTICO',
            fake: 'DEEPFAKE DETECTADO',
            authenticScore: 'Puntuación auténtica',
            fakeScore: 'Puntuación falsa',
            shareTitle: 'COMPARTIR RESULTADOS',
            downloadPdf: 'DESCARGAR INFORME PDF',
        }
    },
    ar: {
        name: 'العربية',
        flag: '🇸🇦',
        dir: 'rtl',
        translations: {
            appTitle: 'فويس أوثنتيكس',
            tagline: 'اكتشف الصوت المزيف في الوقت الفعلي',
            analyzeNav: 'تحليل',
            liveNav: 'مباشر',
            featuresNav: 'الميزات',
            aboutNav: 'حول',
            dropText: 'أسقط ملف الصوت هنا',
            dropSub: 'يدعم MP3، WAV، OGG، FLAC، M4A · الحد الأقصى 50 ميغابايت',
            browseBtn: 'تصفح الملفات',
            analyzeBtn: 'تشغيل تحليل التعلم العميق',
            recordTitle: 'تسجيل الصوت',
            recordBtn: 'بدء التسجيل',
            recordStatus: 'انقر على تسجيل للبدء',
            batchTitle: 'التحليل المجمع',
            batchDrop: 'أسقط ملفات متعددة هنا',
            batchAnalyze: 'تحليل جميع الملفات',
            modelTitle: 'تفاصيل النموذج',
            historyTitle: 'سجل الكشف',
            noHistory: 'لم يتم تحليل أي ملفات بعد...',
            authentic: 'أصيل',
            fake: 'تم اكتشاف مزيف',
            authenticScore: 'درجة الأصالة',
            fakeScore: 'درجة التزوير',
            shareTitle: 'مشاركة النتائج',
            downloadPdf: 'تنزيل تقرير PDF',
        }
    }
};

let currentLang = 'en';

// ── INJECT LANGUAGE SELECTOR ─────────────────────────────────────
function injectLanguageSelector() {
    const navbar = document.querySelector('nav') ||
                   document.querySelector('.navbar') ||
                   document.querySelector('header');

    if (!navbar) return;

    // Remove existing
    const existing = document.getElementById('lang-selector-wrapper');
    if (existing) existing.remove();

    const wrapper = document.createElement('div');
    wrapper.id = 'lang-selector-wrapper';
    wrapper.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
    `;

    const options = Object.entries(VA_LANGUAGES).map(([code, lang]) => `
        <div onclick="setLanguage('${code}')" style="
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.2s;
            color: ${code === currentLang ? '#00c8ff' : '#e8eaf6'};
            background: ${code === currentLang ? 'rgba(0,200,255,0.1)' : 'transparent'};
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
        "
        onmouseover="this.style.background='rgba(0,200,255,0.1)'"
        onmouseout="this.style.background='${code === currentLang ? 'rgba(0,200,255,0.1)' : 'transparent'}'">
            <span>${lang.flag}</span>
            <span>${lang.name}</span>
            ${code === currentLang ? '<span style="color:#00c8ff;margin-left:auto;">✓</span>' : ''}
        </div>
    `).join('');

    wrapper.innerHTML = `
        <!-- Toggle Button -->
        <button id="lang-toggle-btn" onclick="toggleLangMenu()" style="
            background: rgba(13,27,42,0.95);
            border: 1px solid rgba(0,200,255,0.3);
            border-radius: 10px;
            padding: 10px 16px;
            color: #00c8ff;
            font-size: 13px;
            font-weight: 700;
            font-family: 'JetBrains Mono', monospace;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
            transition: all 0.3s;
        ">
            <span id="lang-flag">${VA_LANGUAGES[currentLang].flag}</span>
            <span id="lang-name">${VA_LANGUAGES[currentLang].name}</span>
            <span style="font-size:10px;" id="lang-arrow">▲</span>
        </button>

        <!-- Dropdown Menu -->
        <div id="lang-menu" style="
            display: none;
            position: absolute;
            bottom: 50px;
            right: 0;
            background: rgba(13,27,42,0.98);
            border: 1px solid rgba(0,200,255,0.2);
            border-radius: 10px;
            padding: 8px;
            min-width: 160px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.5);
            backdrop-filter: blur(10px);
        ">
            <div style="
                font-size: 10px;
                color: #5a6a8a;
                font-family: 'JetBrains Mono', monospace;
                padding: 4px 14px 8px;
                letter-spacing: 1px;
            ">SELECT LANGUAGE</div>
            ${options}
        </div>
    `;

    document.body.appendChild(wrapper);
}

// ── TOGGLE MENU ──────────────────────────────────────────────────
function toggleLangMenu() {
    const menu = document.getElementById('lang-menu');
    const arrow = document.getElementById('lang-arrow');
    const isOpen = menu.style.display === 'block';
    menu.style.display = isOpen ? 'none' : 'block';
    arrow.textContent = isOpen ? '▲' : '▼';
}

// ── SET LANGUAGE ─────────────────────────────────────────────────
function setLanguage(code) {
    if (!VA_LANGUAGES[code]) return;
    currentLang = code;
    localStorage.setItem('va_language', code);

    const lang = VA_LANGUAGES[code];
    const t = lang.translations;

    // Update flag and name in button
    document.getElementById('lang-flag').textContent = lang.flag;
    document.getElementById('lang-name').textContent = lang.name;

    // Close menu
    document.getElementById('lang-menu').style.display = 'none';
    document.getElementById('lang-arrow').textContent = '▲';

    // Apply RTL if needed
    document.body.dir = lang.dir || 'ltr';

    // ── UPDATE TEXT CONTENT ──────────────────────────────────────

    // Drop zone
    const dropTitle = document.querySelector('.upload-zone h3') ||
                      document.querySelector('[class*="drop"] h3');
    if (dropTitle) dropTitle.textContent = t.dropText;

    const dropSub = document.querySelector('.upload-zone p') ||
                    document.querySelector('[class*="drop"] p');
    if (dropSub) dropSub.textContent = t.dropSub;

    // Browse button
    const browseBtn = document.querySelector('.browse-btn') ||
                      document.querySelector('[onclick*="browse"]') ||
                      document.querySelector('button[class*="browse"]');
    if (browseBtn) browseBtn.textContent = t.browseBtn;

    // Analyze button
    const analyzeBtn = document.querySelector('[onclick*="runAnalysis"]') ||
                       document.querySelector('button[class*="analyze"]');
    if (analyzeBtn) analyzeBtn.textContent = t.analyzeBtn;

    // Record section
    const recTitle = document.querySelector('#recorder-section [style*="letter-spacing"]');
    if (recTitle) recTitle.textContent = `🎙️ ${t.recordTitle}`;

    const recStatus = document.getElementById('rec-status');
    if (recStatus) recStatus.textContent = t.recordStatus;

    const recBtn = document.getElementById('rec-btn');
    if (recBtn && !recBtn.textContent.includes('STOP') && !recBtn.textContent.includes('AGAIN')) {
        recBtn.textContent = `⏺ ${t.recordBtn}`;
    }

    // Batch section
    const batchTitle = document.querySelector('#batch-section [style*="letter-spacing"]');
    if (batchTitle) batchTitle.textContent = `📦 ${t.batchTitle}`;

    const batchBtn = document.getElementById('batch-analyze-btn');
    if (batchBtn) batchBtn.textContent = `🔍 ${t.batchAnalyze}`;

    // Model details
    const modelTitle = document.querySelector('.model-card h3') ||
                       document.querySelector('[class*="model"] h3');
    if (modelTitle) modelTitle.textContent = t.modelTitle;

    // History
    const histTitle = document.querySelector('.history-card h3') ||
                      document.querySelector('[class*="history"] h3');
    if (histTitle) histTitle.textContent = t.historyTitle;

    // Share section
    const shareTitle = document.querySelector('#share-results-wrapper [style*="letter-spacing"]');
    if (shareTitle) shareTitle.textContent = `📤 ${t.shareTitle}`;

    // Download PDF button
    const dlBtn = document.querySelector('#download-report-btn-wrapper button');
    if (dlBtn) dlBtn.textContent = `📄 ${t.downloadPdf}`;

    // Rebuild lang selector to update checkmarks
    injectLanguageSelector();

    console.log(`Language changed to: ${lang.name}`);
}

// ── CLOSE MENU ON OUTSIDE CLICK ──────────────────────────────────
document.addEventListener('click', (e) => {
    const wrapper = document.getElementById('lang-selector-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
        const menu = document.getElementById('lang-menu');
        if (menu) menu.style.display = 'none';
        const arrow = document.getElementById('lang-arrow');
        if (arrow) arrow.textContent = '▲';
    }
});

// ── INIT ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Restore saved language
        const saved = localStorage.getItem('va_language');
        if (saved && VA_LANGUAGES[saved]) currentLang = saved;
        injectLanguageSelector();
        if (currentLang !== 'en') setLanguage(currentLang);
    }, 2000);
});
