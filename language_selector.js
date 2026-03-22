// ================================================================
//  VoiceAuthentix — Complete i18n Language System v2
//  Translates the ENTIRE page when language is changed
// ================================================================

const VA_LANGUAGES = {
    en: {
        name: "English", flag: "🇬🇧", dir: "ltr",
        t: {
            // Navbar
            "nav-home": "Home",
            "nav-analyze": "Analyze",
            "nav-live": "Live",
            "nav-features": "Features",
            "nav-about": "About",
            // Hero
            "hero-title": "Detect DeepFake Audio",
            "hero-sub": "in Real Time",
            "hero-desc": "Advanced CNN-BiLSTM neural network analyzes mel-spectrogram patterns to identify AI-generated or manipulated audio with 96%+ accuracy.",
            "hero-analyze-btn": "🎵 Analyze Audio File",
            "hero-live-btn": "🎙 Live Detection",
            // Upload
            "upload-title": "Upload & Analyze",
            "upload-desc": "Upload any audio file. Our model extracts mel-spectrogram features and runs deep learning inference to detect manipulation.",
            "drop-text": "Drop Audio File Here",
            "drop-sub": "Supports MP3, WAV, OGG, FLAC, M4A · Max 50MB",
            "browse-btn": "Browse Files",
            "analyze-btn": "🔍 Run Deep Learning Analysis",
            // Model
            "model-title": "Model Details",
            "model-loaded": "LOADED",
            // History
            "history-title": "Detection History",
            "history-empty": "No files analyzed yet...",
            // Live
            "live-title": "Live Detection",
            "live-desc": "Real-time audio analysis using your microphone.",
            "live-start": "🎙 Start Detection",
            "live-stop": "⏹ Stop Detection",
            // Loading
            "loading-text": "Initializing AI Engine...",
            // Verdicts
            "verdict-real": "AUTHENTIC",
            "verdict-fake": "FAKE DETECTED",
            "score-authentic": "Authentic Score",
            "score-fake": "Fake Score",
            // Install
            "install-btn": "📲 Install App",
        }
    },
    ta: {
        name: "தமிழ்", flag: "🇮🇳", dir: "ltr",
        t: {
            "nav-home": "முகப்பு",
            "nav-analyze": "பகுப்பாய்வு",
            "nav-live": "நேரடி",
            "nav-features": "அம்சங்கள்",
            "nav-about": "பற்றி",
            "hero-title": "டீப்ஃபேக் ஆடியோவை கண்டறி",
            "hero-sub": "நிகழ்நேரத்தில்",
            "hero-desc": "மேம்பட்ட CNN-BiLSTM நரம்பு வலை 96%+ துல்லியத்துடன் AI-உருவாக்கப்பட்ட ஆடியோவை அடையாளம் காண்கிறது.",
            "hero-analyze-btn": "🎵 ஆடியோ கோப்பை பகுப்பாய்வு செய்",
            "hero-live-btn": "🎙 நேரடி கண்டறிதல்",
            "upload-title": "பதிவேற்று & பகுப்பாய்வு",
            "upload-desc": "எந்த ஆடியோ கோப்பையும் பதிவேற்றுங்கள். எங்கள் மாதிரி கையாளுதலை கண்டறிய ஆழமான கற்றல் செயல்படுத்துகிறது.",
            "drop-text": "ஆடியோ கோப்பை இங்கே இடுங்கள்",
            "drop-sub": "MP3, WAV, OGG, FLAC, M4A · அதிகபட்சம் 50MB",
            "browse-btn": "கோப்புகளை தேர்வுசெய்",
            "analyze-btn": "🔍 ஆழமான கற்றல் பகுப்பாய்வை இயக்கு",
            "model-title": "மாதிரி விவரங்கள்",
            "model-loaded": "ஏற்றப்பட்டது",
            "history-title": "கண்டறிதல் வரலாறு",
            "history-empty": "இதுவரை கோப்புகள் பகுப்பாய்வு செய்யப்படவில்லை...",
            "live-title": "நேரடி கண்டறிதல்",
            "live-desc": "உங்கள் மைக்ரோஃபோனைப் பயன்படுத்தி நிகழ்நேர ஆடியோ பகுப்பாய்வு.",
            "live-start": "🎙 கண்டறிதல் தொடங்கு",
            "live-stop": "⏹ நிறுத்து",
            "loading-text": "AI எஞ்சினை துவக்குகிறது...",
            "verdict-real": "உண்மையானது",
            "verdict-fake": "போலி கண்டறியப்பட்டது",
            "score-authentic": "உண்மை மதிப்பெண்",
            "score-fake": "போலி மதிப்பெண்",
            "install-btn": "📲 ஆப் நிறுவு",
        }
    },
    hi: {
        name: "हिंदी", flag: "🇮🇳", dir: "ltr",
        t: {
            "nav-home": "होम",
            "nav-analyze": "विश्लेषण",
            "nav-live": "लाइव",
            "nav-features": "विशेषताएं",
            "nav-about": "के बारे में",
            "hero-title": "डीपफेक ऑडियो का पता लगाएं",
            "hero-sub": "रियल टाइम में",
            "hero-desc": "उन्नत CNN-BiLSTM न्यूरल नेटवर्क 96%+ सटीकता के साथ AI-जनित ऑडियो की पहचान करता है।",
            "hero-analyze-btn": "🎵 ऑडियो फ़ाइल विश्लेषण करें",
            "hero-live-btn": "🎙 लाइव डिटेक्शन",
            "upload-title": "अपलोड और विश्लेषण",
            "upload-desc": "कोई भी ऑडियो फ़ाइल अपलोड करें। हमारा मॉडल हेरफेर का पता लगाने के लिए डीप लर्निंग इनफेरेंस चलाता है।",
            "drop-text": "ऑडियो फ़ाइल यहाँ छोड़ें",
            "drop-sub": "MP3, WAV, OGG, FLAC, M4A · अधिकतम 50MB",
            "browse-btn": "फ़ाइलें ब्राउज़ करें",
            "analyze-btn": "🔍 डीप लर्निंग विश्लेषण चलाएं",
            "model-title": "मॉडल विवरण",
            "model-loaded": "लोड किया गया",
            "history-title": "पता लगाने का इतिहास",
            "history-empty": "अभी तक कोई फ़ाइल विश्लेषण नहीं किया गया...",
            "live-title": "लाइव डिटेक्शन",
            "live-desc": "आपके माइक्रोफोन का उपयोग करके रियल-टाइम ऑडियो विश्लेषण।",
            "live-start": "🎙 डिटेक्शन शुरू करें",
            "live-stop": "⏹ बंद करें",
            "loading-text": "AI इंजन शुरू हो रहा है...",
            "verdict-real": "प्रामाणिक",
            "verdict-fake": "नकली पाया गया",
            "score-authentic": "प्रामाणिक स्कोर",
            "score-fake": "नकली स्कोर",
            "install-btn": "📲 ऐप इंस्टॉल करें",
        }
    },
    te: {
        name: "తెలుగు", flag: "🇮🇳", dir: "ltr",
        t: {
            "nav-home": "హోమ్",
            "nav-analyze": "విశ్లేషణ",
            "nav-live": "లైవ్",
            "nav-features": "లక్షణాలు",
            "nav-about": "గురించి",
            "hero-title": "డీప్‌ఫేక్ ఆడియోను గుర్తించండి",
            "hero-sub": "రియల్ టైమ్‌లో",
            "hero-desc": "అధునాతన CNN-BiLSTM నెట్‌వర్క్ 96%+ ఖచ్చితత్వంతో AI-రూపొందించిన ఆడియోను గుర్తిస్తుంది.",
            "hero-analyze-btn": "🎵 ఆడియో ఫైల్ విశ్లేషించండి",
            "hero-live-btn": "🎙 లైవ్ డిటెక్షన్",
            "upload-title": "అప్‌లోడ్ & విశ్లేషించండి",
            "upload-desc": "ఏదైనా ఆడియో ఫైల్ అప్‌లోడ్ చేయండి. మా మోడల్ తారుమారును గుర్తించడానికి డీప్ లెర్నింగ్ అనుమానాన్ని అమలు చేస్తుంది.",
            "drop-text": "ఆడియో ఫైల్‌ను ఇక్కడ వదలండి",
            "drop-sub": "MP3, WAV, OGG, FLAC, M4A · గరిష్టం 50MB",
            "browse-btn": "ఫైళ్లను బ్రౌజ్ చేయండి",
            "analyze-btn": "🔍 డీప్ లెర్నింగ్ విశ్లేషణను అమలు చేయండి",
            "model-title": "మోడల్ వివరాలు",
            "model-loaded": "లోడ్ చేయబడింది",
            "history-title": "గుర్తింపు చరిత్ర",
            "history-empty": "ఇంకా ఫైళ్లు విశ్లేషించబడలేదు...",
            "live-title": "లైవ్ డిటెక్షన్",
            "live-desc": "మీ మైక్రోఫోన్‌ని ఉపయోగించి రియల్-టైమ్ ఆడియో విశ్లేషణ.",
            "live-start": "🎙 డిటెక్షన్ ప్రారంభించండి",
            "live-stop": "⏹ ఆపండి",
            "loading-text": "AI ఇంజిన్ ప్రారంభమవుతోంది...",
            "verdict-real": "అసలైనది",
            "verdict-fake": "నకిలీ గుర్తించబడింది",
            "score-authentic": "అసలు స్కోర్",
            "score-fake": "నకిలీ స్కోర్",
            "install-btn": "📲 యాప్ ఇన్‌స్టాల్ చేయండి",
        }
    },
    ml: {
        name: "മലയാളം", flag: "🇮🇳", dir: "ltr",
        t: {
            "nav-home": "ഹോം",
            "nav-analyze": "വിശകലനം",
            "nav-live": "തത്സമയം",
            "nav-features": "സവിശേഷതകൾ",
            "nav-about": "കുറിച്ച്",
            "hero-title": "ഡീപ്ഫേക്ക് ഓഡിയോ കണ്ടെത്തുക",
            "hero-sub": "തത്സമയം",
            "hero-desc": "നൂതന CNN-BiLSTM നെറ്റ്‌വർക്ക് 96%+ കൃത്യതയോടെ AI-നിർമ്മിത ഓഡിയോ തിരിച്ചറിയുന്നു.",
            "hero-analyze-btn": "🎵 ഓഡിയോ ഫയൽ വിശകലനം ചെയ്യുക",
            "hero-live-btn": "🎙 തത്സമയ കണ്ടെത്തൽ",
            "upload-title": "അപ്‌ലോഡ് & വിശകലനം",
            "upload-desc": "ഏതെങ്കിലും ഓഡിയോ ഫയൽ അപ്‌ലോഡ് ചെയ്യുക. ഞങ്ങളുടെ മോഡൽ കൃത്രിമം കണ്ടെത്തുന്നു.",
            "drop-text": "ഓഡിയോ ഫയൽ ഇവിടെ ഇടുക",
            "drop-sub": "MP3, WAV, OGG, FLAC, M4A · പരമാവധി 50MB",
            "browse-btn": "ഫയലുകൾ തിരഞ്ഞെടുക്കുക",
            "analyze-btn": "🔍 ഡീപ് ലേണിംഗ് വിശകലനം",
            "model-title": "മോഡൽ വിവരങ്ങൾ",
            "model-loaded": "ലോഡ് ചെയ്തു",
            "history-title": "കണ്ടെത്തൽ ചരിത്രം",
            "history-empty": "ഇതുവരെ ഫയലുകൾ വിശകലനം ചെയ്തിട്ടില്ല...",
            "live-title": "തത്സമയ കണ്ടെത്തൽ",
            "live-desc": "മൈക്രോഫോൺ ഉപയോഗിച്ച് തത്സമയ ഓഡിയോ വിശകലനം.",
            "live-start": "🎙 കണ്ടെത്തൽ ആരംഭിക്കുക",
            "live-stop": "⏹ നിർത്തുക",
            "loading-text": "AI എഞ്ചിൻ ആരംഭിക്കുന്നു...",
            "verdict-real": "യഥാർത്ഥം",
            "verdict-fake": "വ്യാജം കണ്ടെത്തി",
            "score-authentic": "യഥാർത്ഥ സ്കോർ",
            "score-fake": "വ്യാജ സ്കോർ",
            "install-btn": "📲 ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യുക",
        }
    },
    kn: {
        name: "ಕನ್ನಡ", flag: "🇮🇳", dir: "ltr",
        t: {
            "nav-home": "ಮುಖಪುಟ",
            "nav-analyze": "ವಿಶ್ಲೇಷಣೆ",
            "nav-live": "ನೇರ",
            "nav-features": "ವೈಶಿಷ್ಟ್ಯಗಳು",
            "nav-about": "ಬಗ್ಗೆ",
            "hero-title": "ಡೀಪ್‌ಫೇಕ್ ಆಡಿಯೋ ಪತ್ತೆ ಮಾಡಿ",
            "hero-sub": "ನೈಜ ಸಮಯದಲ್ಲಿ",
            "hero-desc": "ಸುಧಾರಿತ CNN-BiLSTM ನೆಟ್‌ವರ್ಕ್ 96%+ ನಿಖರತೆಯೊಂದಿಗೆ AI-ರಚಿತ ಆಡಿಯೋ ಗುರುತಿಸುತ್ತದೆ.",
            "hero-analyze-btn": "🎵 ಆಡಿಯೋ ಫೈಲ್ ವಿಶ್ಲೇಷಿಸಿ",
            "hero-live-btn": "🎙 ನೇರ ಪತ್ತೆ",
            "upload-title": "ಅಪ್‌ಲೋಡ್ & ವಿಶ್ಲೇಷಿಸಿ",
            "upload-desc": "ಯಾವುದೇ ಆಡಿಯೋ ಫೈಲ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ನಮ್ಮ ಮಾದರಿ ಕುಶಲತೆಯನ್ನು ಪತ್ತೆ ಮಾಡಲು ಡೀಪ್ ಲರ್ನಿಂಗ್ ಬಳಸುತ್ತದೆ.",
            "drop-text": "ಆಡಿಯೋ ಫೈಲ್ ಅನ್ನು ಇಲ್ಲಿ ಬಿಡಿ",
            "drop-sub": "MP3, WAV, OGG, FLAC, M4A · ಗರಿಷ್ಠ 50MB",
            "browse-btn": "ಫೈಲ್‌ಗಳನ್ನು ಹುಡುಕಿ",
            "analyze-btn": "🔍 ಡೀಪ್ ಲರ್ನಿಂಗ್ ವಿಶ್ಲೇಷಣೆ ಚಲಾಯಿಸಿ",
            "model-title": "ಮಾದರಿ ವಿವರಗಳು",
            "model-loaded": "ಲೋಡ್ ಆಗಿದೆ",
            "history-title": "ಪತ್ತೆ ಇತಿಹಾಸ",
            "history-empty": "ಇನ್ನೂ ಯಾವುದೇ ಫೈಲ್‌ಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗಿಲ್ಲ...",
            "live-title": "ನೇರ ಪತ್ತೆ",
            "live-desc": "ಮೈಕ್ರೋಫೋನ್ ಬಳಸಿ ನೈಜ-ಸಮಯ ಆಡಿಯೋ ವಿಶ್ಲೇಷಣೆ.",
            "live-start": "🎙 ಪತ್ತೆ ಪ್ರಾರಂಭಿಸಿ",
            "live-stop": "⏹ ನಿಲ್ಲಿಸಿ",
            "loading-text": "AI ಎಂಜಿನ್ ಪ್ರಾರಂಭವಾಗುತ್ತಿದೆ...",
            "verdict-real": "ಅಸಲಿ",
            "verdict-fake": "ನಕಲಿ ಪತ್ತೆಯಾಯಿತು",
            "score-authentic": "ಅಸಲಿ ಸ್ಕೋರ್",
            "score-fake": "ನಕಲಿ ಸ್ಕೋರ್",
            "install-btn": "📲 ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ",
        }
    },
    fr: {
        name: "Français", flag: "🇫🇷", dir: "ltr",
        t: {
            "nav-home": "Accueil",
            "nav-analyze": "Analyser",
            "nav-live": "En Direct",
            "nav-features": "Fonctions",
            "nav-about": "À Propos",
            "hero-title": "Détecter l'Audio Deepfake",
            "hero-sub": "en Temps Réel",
            "hero-desc": "Le réseau CNN-BiLSTM avancé identifie l'audio généré par l'IA avec une précision de 96%+.",
            "hero-analyze-btn": "🎵 Analyser le fichier audio",
            "hero-live-btn": "🎙 Détection en direct",
            "upload-title": "Télécharger et Analyser",
            "upload-desc": "Téléchargez n'importe quel fichier audio. Notre modèle détecte la manipulation.",
            "drop-text": "Déposez le fichier audio ici",
            "drop-sub": "Supporte MP3, WAV, OGG, FLAC, M4A · Max 50MB",
            "browse-btn": "Parcourir les fichiers",
            "analyze-btn": "🔍 Lancer l'analyse Deep Learning",
            "model-title": "Détails du modèle",
            "model-loaded": "CHARGÉ",
            "history-title": "Historique de détection",
            "history-empty": "Aucun fichier analysé pour l'instant...",
            "live-title": "Détection en Direct",
            "live-desc": "Analyse audio en temps réel avec votre microphone.",
            "live-start": "🎙 Démarrer la détection",
            "live-stop": "⏹ Arrêter",
            "loading-text": "Initialisation du moteur IA...",
            "verdict-real": "AUTHENTIQUE",
            "verdict-fake": "DEEPFAKE DÉTECTÉ",
            "score-authentic": "Score authentique",
            "score-fake": "Score faux",
            "install-btn": "📲 Installer l'app",
        }
    },
    es: {
        name: "Español", flag: "🇪🇸", dir: "ltr",
        t: {
            "nav-home": "Inicio",
            "nav-analyze": "Analizar",
            "nav-live": "En Vivo",
            "nav-features": "Funciones",
            "nav-about": "Acerca de",
            "hero-title": "Detectar Audio Deepfake",
            "hero-sub": "en Tiempo Real",
            "hero-desc": "La red CNN-BiLSTM avanzada identifica audio generado por IA con precisión superior al 96%.",
            "hero-analyze-btn": "🎵 Analizar archivo de audio",
            "hero-live-btn": "🎙 Detección en vivo",
            "upload-title": "Subir y Analizar",
            "upload-desc": "Sube cualquier archivo de audio. Nuestro modelo detecta la manipulación.",
            "drop-text": "Suelta el archivo de audio aquí",
            "drop-sub": "Soporta MP3, WAV, OGG, FLAC, M4A · Máx 50MB",
            "browse-btn": "Explorar archivos",
            "analyze-btn": "🔍 Ejecutar análisis de Deep Learning",
            "model-title": "Detalles del modelo",
            "model-loaded": "CARGADO",
            "history-title": "Historial de detección",
            "history-empty": "No se han analizado archivos aún...",
            "live-title": "Detección en Vivo",
            "live-desc": "Análisis de audio en tiempo real con tu micrófono.",
            "live-start": "🎙 Iniciar detección",
            "live-stop": "⏹ Detener",
            "loading-text": "Inicializando motor IA...",
            "verdict-real": "AUTÉNTICO",
            "verdict-fake": "DEEPFAKE DETECTADO",
            "score-authentic": "Puntuación auténtica",
            "score-fake": "Puntuación falsa",
            "install-btn": "📲 Instalar app",
        }
    },
    de: {
        name: "Deutsch", flag: "🇩🇪", dir: "ltr",
        t: {
            "nav-home": "Startseite",
            "nav-analyze": "Analysieren",
            "nav-live": "Live",
            "nav-features": "Funktionen",
            "nav-about": "Über uns",
            "hero-title": "Deepfake-Audio erkennen",
            "hero-sub": "in Echtzeit",
            "hero-desc": "Das CNN-BiLSTM-Netzwerk identifiziert KI-generiertes Audio mit über 96% Genauigkeit.",
            "hero-analyze-btn": "🎵 Audiodatei analysieren",
            "hero-live-btn": "🎙 Live-Erkennung",
            "upload-title": "Hochladen und Analysieren",
            "upload-desc": "Laden Sie eine Audiodatei hoch. Unser Modell erkennt Manipulationen.",
            "drop-text": "Audiodatei hier ablegen",
            "drop-sub": "Unterstützt MP3, WAV, OGG, FLAC, M4A · Max 50MB",
            "browse-btn": "Dateien durchsuchen",
            "analyze-btn": "🔍 Deep Learning Analyse starten",
            "model-title": "Modelldetails",
            "model-loaded": "GELADEN",
            "history-title": "Erkennungsverlauf",
            "history-empty": "Noch keine Dateien analysiert...",
            "live-title": "Live-Erkennung",
            "live-desc": "Echtzeit-Audioanalyse mit Ihrem Mikrofon.",
            "live-start": "🎙 Erkennung starten",
            "live-stop": "⏹ Stoppen",
            "loading-text": "KI-Engine wird gestartet...",
            "verdict-real": "AUTHENTISCH",
            "verdict-fake": "DEEPFAKE ERKANNT",
            "score-authentic": "Authentizitätswert",
            "score-fake": "Fälschungswert",
            "install-btn": "📲 App installieren",
        }
    },
    ja: {
        name: "日本語", flag: "🇯🇵", dir: "ltr",
        t: {
            "nav-home": "ホーム",
            "nav-analyze": "分析",
            "nav-live": "ライブ",
            "nav-features": "機能",
            "nav-about": "概要",
            "hero-title": "ディープフェイク音声を検出",
            "hero-sub": "リアルタイムで",
            "hero-desc": "高度なCNN-BiLSTMネットワークが96%以上の精度でAI生成音声を識別します。",
            "hero-analyze-btn": "🎵 音声ファイルを分析",
            "hero-live-btn": "🎙 ライブ検出",
            "upload-title": "アップロードと分析",
            "upload-desc": "音声ファイルをアップロードしてください。モデルが操作を検出します。",
            "drop-text": "音声ファイルをここにドロップ",
            "drop-sub": "MP3、WAV、OGG、FLAC、M4A対応 · 最大50MB",
            "browse-btn": "ファイルを参照",
            "analyze-btn": "🔍 ディープラーニング分析を実行",
            "model-title": "モデル詳細",
            "model-loaded": "読み込み済み",
            "history-title": "検出履歴",
            "history-empty": "まだファイルが分析されていません...",
            "live-title": "ライブ検出",
            "live-desc": "マイクを使ったリアルタイム音声分析。",
            "live-start": "🎙 検出開始",
            "live-stop": "⏹ 停止",
            "loading-text": "AIエンジンを起動中...",
            "verdict-real": "本物",
            "verdict-fake": "ディープフェイク検出",
            "score-authentic": "本物スコア",
            "score-fake": "偽物スコア",
            "install-btn": "📲 アプリをインストール",
        }
    },
    zh: {
        name: "中文", flag: "🇨🇳", dir: "ltr",
        t: {
            "nav-home": "主页",
            "nav-analyze": "分析",
            "nav-live": "直播",
            "nav-features": "功能",
            "nav-about": "关于",
            "hero-title": "检测深度伪造音频",
            "hero-sub": "实时",
            "hero-desc": "先进的CNN-BiLSTM网络以96%以上的精度识别AI生成的音频。",
            "hero-analyze-btn": "🎵 分析音频文件",
            "hero-live-btn": "🎙 实时检测",
            "upload-title": "上传和分析",
            "upload-desc": "上传任何音频文件。我们的模型检测操纵行为。",
            "drop-text": "将音频文件拖放到此处",
            "drop-sub": "支持 MP3、WAV、OGG、FLAC、M4A · 最大 50MB",
            "browse-btn": "浏览文件",
            "analyze-btn": "🔍 运行深度学习分析",
            "model-title": "模型详情",
            "model-loaded": "已加载",
            "history-title": "检测历史",
            "history-empty": "尚未分析任何文件...",
            "live-title": "实时检测",
            "live-desc": "使用麦克风进行实时音频分析。",
            "live-start": "🎙 开始检测",
            "live-stop": "⏹ 停止",
            "loading-text": "正在初始化AI引擎...",
            "verdict-real": "真实",
            "verdict-fake": "检测到深度伪造",
            "score-authentic": "真实评分",
            "score-fake": "伪造评分",
            "install-btn": "📲 安装应用",
        }
    },
    pt: {
        name: "Português", flag: "🇧🇷", dir: "ltr",
        t: {
            "nav-home": "Início",
            "nav-analyze": "Analisar",
            "nav-live": "Ao Vivo",
            "nav-features": "Recursos",
            "nav-about": "Sobre",
            "hero-title": "Detectar Áudio Deepfake",
            "hero-sub": "em Tempo Real",
            "hero-desc": "A rede CNN-BiLSTM avançada identifica áudio gerado por IA com precisão superior a 96%.",
            "hero-analyze-btn": "🎵 Analisar arquivo de áudio",
            "hero-live-btn": "🎙 Detecção ao vivo",
            "upload-title": "Enviar e Analisar",
            "upload-desc": "Envie qualquer arquivo de áudio. Nosso modelo detecta manipulação.",
            "drop-text": "Solte o arquivo de áudio aqui",
            "drop-sub": "Suporta MP3, WAV, OGG, FLAC, M4A · Máx 50MB",
            "browse-btn": "Procurar arquivos",
            "analyze-btn": "🔍 Executar análise de Deep Learning",
            "model-title": "Detalhes do modelo",
            "model-loaded": "CARREGADO",
            "history-title": "Histórico de detecção",
            "history-empty": "Nenhum arquivo analisado ainda...",
            "live-title": "Detecção ao Vivo",
            "live-desc": "Análise de áudio em tempo real com seu microfone.",
            "live-start": "🎙 Iniciar detecção",
            "live-stop": "⏹ Parar",
            "loading-text": "Inicializando motor IA...",
            "verdict-real": "AUTÊNTICO",
            "verdict-fake": "DEEPFAKE DETECTADO",
            "score-authentic": "Pontuação autêntica",
            "score-fake": "Pontuação falsa",
            "install-btn": "📲 Instalar app",
        }
    },
    ko: {
        name: "한국어", flag: "🇰🇷", dir: "ltr",
        t: {
            "nav-home": "홈",
            "nav-analyze": "분석",
            "nav-live": "라이브",
            "nav-features": "기능",
            "nav-about": "정보",
            "hero-title": "딥페이크 오디오 감지",
            "hero-sub": "실시간으로",
            "hero-desc": "고급 CNN-BiLSTM 네트워크가 96% 이상의 정확도로 AI 생성 오디오를 식별합니다.",
            "hero-analyze-btn": "🎵 오디오 파일 분석",
            "hero-live-btn": "🎙 라이브 감지",
            "upload-title": "업로드 및 분석",
            "upload-desc": "오디오 파일을 업로드하세요. 우리 모델이 조작을 감지합니다.",
            "drop-text": "오디오 파일을 여기에 놓으세요",
            "drop-sub": "MP3, WAV, OGG, FLAC, M4A 지원 · 최대 50MB",
            "browse-btn": "파일 찾아보기",
            "analyze-btn": "🔍 딥러닝 분석 실행",
            "model-title": "모델 세부 정보",
            "model-loaded": "로드됨",
            "history-title": "감지 기록",
            "history-empty": "아직 분석된 파일이 없습니다...",
            "live-title": "라이브 감지",
            "live-desc": "마이크를 사용한 실시간 오디오 분석.",
            "live-start": "🎙 감지 시작",
            "live-stop": "⏹ 중지",
            "loading-text": "AI 엔진 초기화 중...",
            "verdict-real": "진짜",
            "verdict-fake": "딥페이크 감지됨",
            "score-authentic": "진짜 점수",
            "score-fake": "가짜 점수",
            "install-btn": "📲 앱 설치",
        }
    },
    ar: {
        name: "العربية", flag: "🇸🇦", dir: "rtl",
        t: {
            "nav-home": "الرئيسية",
            "nav-analyze": "تحليل",
            "nav-live": "مباشر",
            "nav-features": "الميزات",
            "nav-about": "حول",
            "hero-title": "اكتشف الصوت المزيف",
            "hero-sub": "في الوقت الفعلي",
            "hero-desc": "تحدد شبكة CNN-BiLSTM المتقدمة الصوت الذي تم إنشاؤه بواسطة الذكاء الاصطناعي بدقة تزيد عن 96%.",
            "hero-analyze-btn": "🎵 تحليل ملف صوتي",
            "hero-live-btn": "🎙 الكشف المباشر",
            "upload-title": "رفع وتحليل",
            "upload-desc": "ارفع أي ملف صوتي. يكتشف نموذجنا التلاعب.",
            "drop-text": "أسقط ملف الصوت هنا",
            "drop-sub": "يدعم MP3، WAV، OGG، FLAC، M4A · الحد الأقصى 50 ميغابايت",
            "browse-btn": "تصفح الملفات",
            "analyze-btn": "🔍 تشغيل تحليل التعلم العميق",
            "model-title": "تفاصيل النموذج",
            "model-loaded": "محمّل",
            "history-title": "سجل الكشف",
            "history-empty": "لم يتم تحليل أي ملفات بعد...",
            "live-title": "الكشف المباشر",
            "live-desc": "تحليل صوتي في الوقت الفعلي باستخدام الميكروفون.",
            "live-start": "🎙 بدء الكشف",
            "live-stop": "⏹ إيقاف",
            "loading-text": "جاري تهيئة محرك الذكاء الاصطناعي...",
            "verdict-real": "أصيل",
            "verdict-fake": "تم اكتشاف مزيف",
            "score-authentic": "درجة الأصالة",
            "score-fake": "درجة التزوير",
            "install-btn": "📲 تثبيت التطبيق",
        }
    }
};

let currentLang = localStorage.getItem("va_lang") || "en";

// ── APPLY TRANSLATIONS TO ENTIRE PAGE ───────────────────────────
function applyTranslations(langCode) {
    const lang = VA_LANGUAGES[langCode];
    if (!lang) return;

    const t = lang.t;
    currentLang = langCode;
    localStorage.setItem("va_lang", langCode);

    // Set page direction
    document.documentElement.dir = lang.dir || "ltr";
    document.documentElement.lang = langCode;

    // Translate all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (t[key]) {
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                el.placeholder = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });

    // Update language button
    const btn = document.getElementById("lang-toggle-btn");
    if (btn) {
        document.getElementById("lang-flag").textContent = lang.flag;
        document.getElementById("lang-name").textContent = lang.name;
    }

    // Close menu
    const menu = document.getElementById("lang-menu");
    if (menu) menu.style.display = "none";

    // Rebuild selector to update checkmarks
    buildLangSelector();

    console.log("Language set to:", lang.name);
}

// ── ADD data-i18n TAGS TO PAGE ELEMENTS ─────────────────────────
function tagPageElements() {
    // Helper to tag element
    function tag(selector, key, attr) {
        const els = document.querySelectorAll(selector);
        els.forEach(el => {
            if (!el.getAttribute("data-i18n")) {
                el.setAttribute("data-i18n", key);
            }
        });
    }

    // Navbar links
    const navLinks = document.querySelectorAll(".nav-links a, nav a");
    navLinks.forEach(link => {
        const href = link.getAttribute("href") || "";
        const text = link.textContent.trim().toLowerCase();
        if (href.includes("hero") || text === "home") link.setAttribute("data-i18n", "nav-home");
        else if (href.includes("upload") || text === "analyze") link.setAttribute("data-i18n", "nav-analyze");
        else if (href.includes("live") || text === "live") link.setAttribute("data-i18n", "nav-live");
        else if (href.includes("feature") || text === "features") link.setAttribute("data-i18n", "nav-features");
        else if (href.includes("about") || text === "about") link.setAttribute("data-i18n", "nav-about");
    });

    // Hero section
    document.querySelectorAll("h1, .hero-title, [class*=hero] h1").forEach(el => {
        if (!el.getAttribute("data-i18n") && el.textContent.includes("DeepFake")) {
            el.setAttribute("data-i18n", "hero-title");
        }
    });

    // Upload section heading
    document.querySelectorAll("h2, section h2, .section-title").forEach(el => {
        if (!el.getAttribute("data-i18n")) {
            const text = el.textContent.trim();
            if (text.toLowerCase().includes("upload") || text.toLowerCase().includes("analyze")) {
                el.setAttribute("data-i18n", "upload-title");
            } else if (text.toLowerCase().includes("live")) {
                el.setAttribute("data-i18n", "live-title");
            }
        }
    });

    // Drop zone text
    document.querySelectorAll(".upload-zone h3, [class*=drop] h3, [class*=upload] h3").forEach(el => {
        if (!el.getAttribute("data-i18n")) el.setAttribute("data-i18n", "drop-text");
    });

    // Browse button
    document.querySelectorAll(".browse-btn, button[onclick*=browse], button[onclick*=click]").forEach(el => {
        if (!el.getAttribute("data-i18n") && el.textContent.includes("Browse")) {
            el.setAttribute("data-i18n", "browse-btn");
        }
    });

    // Analyze button
    document.querySelectorAll("button[onclick*=runAnalysis], .analyze-btn").forEach(el => {
        if (!el.getAttribute("data-i18n")) el.setAttribute("data-i18n", "analyze-btn");
    });

    // Model card title
    document.querySelectorAll(".model-card h3, [class*=model] h3").forEach(el => {
        if (!el.getAttribute("data-i18n") && el.textContent.includes("Model")) {
            el.setAttribute("data-i18n", "model-title");
        }
    });

    // History title
    document.querySelectorAll(".history-card h3, [class*=history] h3").forEach(el => {
        if (!el.getAttribute("data-i18n") && el.textContent.includes("History")) {
            el.setAttribute("data-i18n", "history-title");
        }
    });

    // Loading text
    document.querySelectorAll(".loader-sub, [class*=loader] div").forEach(el => {
        if (!el.getAttribute("data-i18n") && el.textContent.includes("Initializing")) {
            el.setAttribute("data-i18n", "loading-text");
        }
    });

    // Install button
    const installBtn = document.getElementById("pwa-install-btn");
    if (installBtn && !installBtn.getAttribute("data-i18n")) {
        installBtn.setAttribute("data-i18n", "install-btn");
    }
}

// ── BUILD LANGUAGE SELECTOR UI ───────────────────────────────────
function buildLangSelector() {
    let wrapper = document.getElementById("lang-selector-wrapper");
    if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.id = "lang-selector-wrapper";
        wrapper.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 99999;
            font-family: "JetBrains Mono", monospace;
        `;
        document.body.appendChild(wrapper);
    }

    const options = Object.entries(VA_LANGUAGES).map(([code, lang]) => `
        <div onclick="applyTranslations('${code}')" style="
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 9px 16px;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.2s;
            color: ${code === currentLang ? "#00c8ff" : "#e8eaf6"};
            background: ${code === currentLang ? "rgba(0,200,255,0.1)" : "transparent"};
            font-size: 12px;
            font-weight: ${code === currentLang ? "700" : "400"};
        "
        onmouseover="this.style.background='rgba(0,200,255,0.1)'"
        onmouseout="this.style.background='${code === currentLang ? "rgba(0,200,255,0.1)" : "transparent"}'">
            <span style="font-size:16px;">${lang.flag}</span>
            <span>${lang.name}</span>
            ${code === currentLang ? '<span style="color:#00c8ff;margin-left:auto;font-size:14px;">✓</span>' : ""}
        </div>
    `).join("");

    wrapper.innerHTML = `
        <button id="lang-toggle-btn" onclick="toggleLangMenu()" style="
            background: rgba(13,27,42,0.95);
            border: 1px solid rgba(0,200,255,0.3);
            border-radius: 10px;
            padding: 10px 16px;
            color: #00c8ff;
            font-size: 12px;
            font-weight: 700;
            font-family: JetBrains Mono, monospace;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            transition: all 0.3s;
            white-space: nowrap;
        ">
            <span id="lang-flag">${VA_LANGUAGES[currentLang].flag}</span>
            <span id="lang-name">${VA_LANGUAGES[currentLang].name}</span>
            <span id="lang-arrow" style="font-size:10px;">▲</span>
        </button>

        <div id="lang-menu" style="
            display: none;
            position: absolute;
            bottom: 52px;
            right: 0;
            background: rgba(10,22,40,0.98);
            border: 1px solid rgba(0,200,255,0.2);
            border-radius: 12px;
            padding: 8px;
            min-width: 180px;
            max-height: 400px;
            overflow-y: auto;
            box-shadow: 0 8px 40px rgba(0,0,0,0.6);
            backdrop-filter: blur(10px);
        ">
            <div style="
                font-size: 10px;
                color: #5a6a8a;
                padding: 4px 16px 8px;
                letter-spacing: 2px;
            ">🌐 SELECT LANGUAGE</div>
            ${options}
        </div>
    `;
}

// ── TOGGLE MENU ──────────────────────────────────────────────────
function toggleLangMenu() {
    const menu = document.getElementById("lang-menu");
    const arrow = document.getElementById("lang-arrow");
    const isOpen = menu.style.display === "block";
    menu.style.display = isOpen ? "none" : "block";
    if (arrow) arrow.textContent = isOpen ? "▲" : "▼";
}

// ── CLOSE ON OUTSIDE CLICK ───────────────────────────────────────
document.addEventListener("click", e => {
    const wrapper = document.getElementById("lang-selector-wrapper");
    if (wrapper && !wrapper.contains(e.target)) {
        const menu = document.getElementById("lang-menu");
        if (menu) menu.style.display = "none";
        const arrow = document.getElementById("lang-arrow");
        if (arrow) arrow.textContent = "▲";
    }
});

// ── INIT ─────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        tagPageElements();
        buildLangSelector();
        const saved = localStorage.getItem("va_lang");
        if (saved && saved !== "en" && VA_LANGUAGES[saved]) {
            applyTranslations(saved);
        }
    }, 1500);
});
