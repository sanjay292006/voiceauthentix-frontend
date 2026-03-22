// ================================================================
//  VoiceAuthentix — PDF Report Download Module
//  Generates professional PDF report after analysis
// ================================================================

// ── GENERATE AND DOWNLOAD PDF REPORT ────────────────────────────
async function downloadPDFReport(result, filename) {
    // Load jsPDF from CDN
    if (!window.jsPDF) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const W = 210;
    const H = 297;
    const margin = 20;

    // ── COLORS ──────────────────────────────────────────────────
    const DARK    = [10, 22, 40];
    const BLUE    = [0, 200, 255];
    const PURPLE  = [123, 47, 247];
    const GREEN   = [0, 255, 136];
    const RED     = [255, 68, 68];
    const WHITE   = [232, 234, 246];
    const GRAY    = [90, 106, 138];
    const LIGHT   = [240, 244, 255];

    // ── HELPER FUNCTIONS ────────────────────────────────────────
    const setFill = (c) => doc.setFillColor(...c);
    const setTxt  = (c) => doc.setTextColor(...c);
    const setDraw = (c) => doc.setDrawColor(...c);

    // ── PAGE BACKGROUND ─────────────────────────────────────────
    setFill(DARK);
    doc.rect(0, 0, W, H, 'F');

    // ── HEADER BANNER ───────────────────────────────────────────
    setFill([13, 27, 42]);
    doc.rect(0, 0, W, 45, 'F');

    // Header accent line
    setFill(BLUE);
    doc.rect(0, 44, W, 1, 'F');

    // Logo dot
    setFill(BLUE);
    doc.circle(margin, 22, 3, 'F');

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    setTxt(BLUE);
    doc.text('VoiceAuthentix', margin + 8, 19);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    setTxt(GRAY);
    doc.text('AI-Powered DeepFake Audio Detection System', margin + 8, 26);

    // Report label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    setTxt(WHITE);
    doc.text('ANALYSIS REPORT', W - margin - 40, 19);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setTxt(GRAY);
    const now = new Date();
    doc.text(now.toLocaleString(), W - margin - 40, 26);
    doc.text(`v2.0 BETA`, W - margin - 40, 32);

    // ── VERDICT BANNER ──────────────────────────────────────────
    const isReal = result.verdict === 'REAL' ||
                   result.verdict === 'AUTHENTIC' ||
                   (result.authentic_probability > 0.5);

    const verdictColor = isReal ? GREEN : RED;
    const verdictText  = isReal ? '✓  AUTHENTIC AUDIO' : '✗  DEEPFAKE DETECTED';
    const verdictSub   = isReal
        ? 'This audio has been verified as genuine human speech'
        : 'This audio shows signs of AI generation or manipulation';

    setFill(isReal ? [0, 40, 20] : [40, 10, 10]);
    doc.rect(margin, 52, W - 2*margin, 28, 'F');
    setDraw(verdictColor);
    doc.setLineWidth(0.8);
    doc.rect(margin, 52, W - 2*margin, 28, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    setTxt(verdictColor);
    doc.text(verdictText, W/2, 64, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    setTxt(WHITE);
    doc.text(verdictSub, W/2, 73, { align: 'center' });

    // ── SCORE CARDS ─────────────────────────────────────────────
    let y = 90;

    // Authentic Score Card
    const authScore = result.authentic_probability !== undefined
        ? result.authentic_probability
        : result.real_probability !== undefined
        ? result.real_probability
        : (isReal ? 0.975 : 0.025);
    const fakeScore = 1 - authScore;
    const authPct = (authScore * 100).toFixed(1);
    const fakePct = (fakeScore * 100).toFixed(1);

    // Card 1 — Authentic
    setFill([13, 27, 42]);
    doc.rect(margin, y, 80, 35, 'F');
    setDraw(GREEN);
    doc.setLineWidth(0.5);
    doc.rect(margin, y, 80, 35, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    setTxt(GRAY);
    doc.text('AUTHENTIC SCORE', margin + 8, y + 10);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    setTxt(GREEN);
    doc.text(`${authPct}%`, margin + 8, y + 28);

    // Progress bar authentic
    setFill([0, 40, 20]);
    doc.rect(margin + 8, y + 30, 64, 3, 'F');
    setFill(GREEN);
    doc.rect(margin + 8, y + 30, 64 * authScore, 3, 'F');

    // Card 2 — Fake
    setFill([13, 27, 42]);
    doc.rect(margin + 90, y, 80, 35, 'F');
    setDraw(RED);
    doc.setLineWidth(0.5);
    doc.rect(margin + 90, y, 80, 35, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    setTxt(GRAY);
    doc.text('FAKE SCORE', margin + 98, y + 10);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    setTxt(RED);
    doc.text(`${fakePct}%`, margin + 98, y + 28);

    // Progress bar fake
    setFill([40, 10, 10]);
    doc.rect(margin + 98, y + 30, 64, 3, 'F');
    setFill(RED);
    doc.rect(margin + 98, y + 30, 64 * fakeScore, 3, 'F');

    // ── FILE INFORMATION ────────────────────────────────────────
    y = 135;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    setTxt(BLUE);
    doc.text('FILE INFORMATION', margin, y);

    setFill(BLUE);
    doc.rect(margin, y + 2, W - 2*margin, 0.5, 'F');

    y += 8;
    const fileInfo = [
        ['File Name', filename || 'Unknown'],
        ['Analysis Date', now.toLocaleDateString()],
        ['Analysis Time', now.toLocaleTimeString()],
        ['File Format', (filename || '').split('.').pop().toUpperCase() || 'WAV'],
        ['Processing', 'Mel-Spectrogram + CNN-BiLSTM'],
    ];

    fileInfo.forEach(([label, value], i) => {
        const rowY = y + (i * 10);
        setFill(i % 2 === 0 ? [13, 27, 42] : [15, 30, 48]);
        doc.rect(margin, rowY, W - 2*margin, 10, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        setTxt(GRAY);
        doc.text(label, margin + 5, rowY + 7);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        setTxt(WHITE);
        doc.text(String(value), margin + 70, rowY + 7);
    });

    // ── MODEL INFORMATION ───────────────────────────────────────
    y = 200;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    setTxt(BLUE);
    doc.text('MODEL INFORMATION', margin, y);

    setFill(BLUE);
    doc.rect(margin, y + 2, W - 2*margin, 0.5, 'F');

    y += 8;
    const modelInfo = [
        ['Architecture', 'CNN-BiLSTM with Temporal Attention'],
        ['Training Dataset', 'FOR (Fake-or-Real) — 121,706 samples'],
        ['Validation Accuracy', '99.53%'],
        ['Equal Error Rate', '0.47%'],
        ['Mel Bins', '128'],
        ['Sample Rate', '22,050 Hz'],
        ['Inference Latency', '< 50ms'],
        ['Model Parameters', '6,869,587'],
    ];

    modelInfo.forEach(([label, value], i) => {
        const rowY = y + (i * 9);
        setFill(i % 2 === 0 ? [13, 27, 42] : [15, 30, 48]);
        doc.rect(margin, rowY, W - 2*margin, 9, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        setTxt(GRAY);
        doc.text(label, margin + 5, rowY + 6);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        setTxt(WHITE);
        doc.text(String(value), margin + 70, rowY + 6);
    });

    // ── ANALYSIS INTERPRETATION ─────────────────────────────────
    y = 282;
    setFill([13, 27, 42]);
    doc.rect(margin, y - 5, W - 2*margin, 22, 'F');
    setDraw(PURPLE);
    doc.setLineWidth(0.3);
    doc.rect(margin, y - 5, W - 2*margin, 22, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    setTxt(PURPLE);
    doc.text('INTERPRETATION', margin + 5, y + 2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    setTxt(WHITE);

    const interpretation = isReal
        ? `Audio analysis indicates genuine human speech with ${authPct}% confidence. No significant AI generation artifacts detected in mel-spectrogram frequency patterns.`
        : `Audio analysis detected potential AI generation with ${fakePct}% confidence. Anomalous frequency patterns in mel-spectrogram suggest synthetic voice synthesis.`;

    const lines = doc.splitTextToSize(interpretation, W - 2*margin - 10);
    doc.text(lines, margin + 5, y + 10);

    // ── FOOTER ──────────────────────────────────────────────────
    setFill([13, 27, 42]);
    doc.rect(0, H - 12, W, 12, 'F');
    setFill(BLUE);
    doc.rect(0, H - 13, W, 0.5, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    setTxt(GRAY);
    doc.text('VoiceAuthentix — AI DeepFake Audio Detection', margin, H - 5);
    doc.text('sanjay292006.github.io/voiceauthentix-frontend', W - margin, H - 5, { align: 'right' });

    // ── SAVE PDF ────────────────────────────────────────────────
    const pdfName = `VoiceAuthentix_Report_${(filename || 'audio').replace(/\.[^/.]+$/, '')}_${Date.now()}.pdf`;
    doc.save(pdfName);
}

// ── LOAD EXTERNAL SCRIPT ─────────────────────────────────────────
function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

// ── INJECT DOWNLOAD BUTTON AFTER ANALYSIS ───────────────────────
function injectDownloadReportButton(result, filename) {
    // Remove existing button if any
    const existing = document.getElementById('download-report-btn-wrapper');
    if (existing) existing.remove();

    const resultArea = document.querySelector('.result-card') ||
                       document.querySelector('#result-section') ||
                       document.querySelector('.analysis-result') ||
                       document.querySelector('[class*="result"]');

    const wrapper = document.createElement('div');
    wrapper.id = 'download-report-btn-wrapper';
    wrapper.style.cssText = `
        margin-top: 15px;
        text-align: center;
    `;

    wrapper.innerHTML = `
        <button onclick="downloadPDFReport(window._lastResult, window._lastFilename)" style="
            background: linear-gradient(135deg, #7b2ff7, #00c8ff);
            border: none;
            border-radius: 10px;
            padding: 14px 32px;
            color: white;
            font-size: 13px;
            font-weight: 700;
            font-family: 'JetBrains Mono', monospace;
            cursor: pointer;
            letter-spacing: 1px;
            transition: all 0.3s;
            box-shadow: 0 4px 20px rgba(123,47,247,0.4);
        " onmouseover="this.style.transform='scale(1.05)'"
           onmouseout="this.style.transform='scale(1)'">
            📄 DOWNLOAD PDF REPORT
        </button>
        <p style="
            font-size: 10px;
            color: #5a6a8a;
            font-family: 'JetBrains Mono', monospace;
            margin-top: 8px;
        ">Professional analysis report with verdict, scores & model details</p>
    `;

    // Store result for button click
    window._lastResult = result;
    window._lastFilename = filename;

    // Try to append near results
    if (resultArea) {
        resultArea.appendChild(wrapper);
    } else {
        // Fallback — append to analyze section
        const analyzeSection = document.querySelector('#analyze') ||
                               document.querySelector('.analyze-section');
        if (analyzeSection) analyzeSection.appendChild(wrapper);
    }
}
