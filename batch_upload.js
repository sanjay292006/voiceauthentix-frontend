// ================================================================
//  VoiceAuthentix — Batch Upload Module
//  Upload multiple files → analyze all → show results table
// ================================================================

let batchFiles = [];
let batchResults = [];
let batchProcessing = false;

// ── INJECT BATCH UI ─────────────────────────────────────────────
function injectBatchUI() {
    // Find recorder section or upload zone as anchor
    const anchor = document.getElementById('recorder-section') ||
                   document.querySelector('.upload-zone') ||
                   document.querySelector('[class*="upload"]') ||
                   document.querySelector('[class*="drop"]');

    if (!anchor) {
        // Fallback: append to body
        document.body.insertAdjacentHTML('beforeend', getBatchHTML());
        return;
    }

    const batchHTML = `
    <div id="batch-section" style="
        margin-top: 25px;
        border: 1px solid rgba(123,47,247,0.3);
        border-radius: 12px;
        padding: 20px;
        background: rgba(123,47,247,0.03);
    ">
        <!-- Header -->
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:15px;">
            <span style="
                background: linear-gradient(135deg,#7b2ff7,#00c8ff);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 14px;
                font-weight: 700;
                letter-spacing: 2px;
                font-family: 'JetBrains Mono', monospace;
            ">📦 BATCH ANALYSIS</span>
            <div style="flex:1;height:1px;background:rgba(123,47,247,0.2);"></div>
            <span style="
                font-size: 10px;
                color: #5a6a8a;
                font-family: 'JetBrains Mono', monospace;
            ">Analyze up to 10 files at once</span>
        </div>

        <!-- Drop Zone -->
        <div id="batch-dropzone" onclick="document.getElementById('batch-file-input').click()"
            ondragover="batchDragOver(event)"
            ondragleave="batchDragLeave(event)"
            ondrop="batchDrop(event)"
            style="
                border: 2px dashed rgba(123,47,247,0.4);
                border-radius: 10px;
                padding: 25px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
                background: rgba(0,0,0,0.2);
                margin-bottom: 15px;
            ">
            <div style="font-size: 32px; margin-bottom: 8px;">📁</div>
            <div style="
                font-size: 13px;
                font-weight: 700;
                color: #7b2ff7;
                font-family: 'JetBrains Mono', monospace;
                margin-bottom: 5px;
            ">Drop Multiple Files Here</div>
            <div style="
                font-size: 11px;
                color: #5a6a8a;
                font-family: 'JetBrains Mono', monospace;
            ">or click to browse — MP3, WAV, OGG, FLAC, M4A · Max 10 files</div>
        </div>

        <input type="file" id="batch-file-input" multiple
            accept=".mp3,.wav,.ogg,.flac,.m4a,.webm"
            style="display:none"
            onchange="batchFilesSelected(this.files)">

        <!-- File List -->
        <div id="batch-file-list" style="
            margin-bottom: 15px;
            display: none;
        ">
            <div style="
                font-size: 11px;
                color: #5a6a8a;
                font-family: 'JetBrains Mono', monospace;
                margin-bottom: 8px;
            ">SELECTED FILES (<span id="batch-count">0</span>/10):</div>
            <div id="batch-files-container"></div>
        </div>

        <!-- Progress -->
        <div id="batch-progress" style="display:none;margin-bottom:15px;">
            <div style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
            ">
                <span style="
                    font-size: 11px;
                    color: #00c8ff;
                    font-family: 'JetBrains Mono', monospace;
                " id="batch-progress-text">Processing 0/0...</span>
                <span style="
                    font-size: 11px;
                    color: #5a6a8a;
                    font-family: 'JetBrains Mono', monospace;
                " id="batch-progress-pct">0%</span>
            </div>
            <div style="
                height: 6px;
                background: rgba(0,0,0,0.3);
                border-radius: 3px;
                overflow: hidden;
            ">
                <div id="batch-progress-bar" style="
                    height: 100%;
                    width: 0%;
                    background: linear-gradient(90deg,#7b2ff7,#00c8ff);
                    border-radius: 3px;
                    transition: width 0.3s;
                "></div>
            </div>
        </div>

        <!-- Buttons -->
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:15px;">
            <button id="batch-analyze-btn" onclick="startBatchAnalysis()" style="
                background: linear-gradient(135deg,#7b2ff7,#00c8ff);
                border: none;
                border-radius: 8px;
                padding: 12px 24px;
                color: white;
                font-size: 12px;
                font-weight: 700;
                font-family: 'JetBrains Mono', monospace;
                cursor: pointer;
                letter-spacing: 1px;
                display: none;
            ">🔍 ANALYZE ALL FILES</button>

            <button id="batch-download-btn" onclick="downloadBatchReport()" style="
                background: rgba(0,255,136,0.1);
                border: 1px solid rgba(0,255,136,0.4);
                border-radius: 8px;
                padding: 12px 24px;
                color: #00ff88;
                font-size: 12px;
                font-weight: 700;
                font-family: 'JetBrains Mono', monospace;
                cursor: pointer;
                letter-spacing: 1px;
                display: none;
            ">📄 DOWNLOAD BATCH REPORT</button>

            <button onclick="clearBatch()" style="
                background: rgba(255,68,68,0.1);
                border: 1px solid rgba(255,68,68,0.3);
                border-radius: 8px;
                padding: 12px 24px;
                color: #ff4444;
                font-size: 12px;
                font-weight: 700;
                font-family: 'JetBrains Mono', monospace;
                cursor: pointer;
                letter-spacing: 1px;
            ">✕ CLEAR ALL</button>
        </div>

        <!-- Results Table -->
        <div id="batch-results-container" style="display:none;">
            <div style="
                font-size: 11px;
                color: #5a6a8a;
                font-family: 'JetBrains Mono', monospace;
                margin-bottom: 8px;
            ">BATCH RESULTS SUMMARY:</div>

            <!-- Summary Cards -->
            <div style="display:flex;gap:10px;margin-bottom:15px;flex-wrap:wrap;">
                <div style="
                    flex:1;
                    min-width:100px;
                    background: rgba(0,255,136,0.05);
                    border: 1px solid rgba(0,255,136,0.3);
                    border-radius: 8px;
                    padding: 12px;
                    text-align: center;
                ">
                    <div style="font-size:24px;font-weight:700;color:#00ff88;font-family:'JetBrains Mono',monospace;" id="batch-real-count">0</div>
                    <div style="font-size:10px;color:#5a6a8a;font-family:'JetBrains Mono',monospace;">AUTHENTIC</div>
                </div>
                <div style="
                    flex:1;
                    min-width:100px;
                    background: rgba(255,68,68,0.05);
                    border: 1px solid rgba(255,68,68,0.3);
                    border-radius: 8px;
                    padding: 12px;
                    text-align: center;
                ">
                    <div style="font-size:24px;font-weight:700;color:#ff4444;font-family:'JetBrains Mono',monospace;" id="batch-fake-count">0</div>
                    <div style="font-size:10px;color:#5a6a8a;font-family:'JetBrains Mono',monospace;">DEEPFAKE</div>
                </div>
                <div style="
                    flex:1;
                    min-width:100px;
                    background: rgba(0,200,255,0.05);
                    border: 1px solid rgba(0,200,255,0.3);
                    border-radius: 8px;
                    padding: 12px;
                    text-align: center;
                ">
                    <div style="font-size:24px;font-weight:700;color:#00c8ff;font-family:'JetBrains Mono',monospace;" id="batch-avg-score">0%</div>
                    <div style="font-size:10px;color:#5a6a8a;font-family:'JetBrains Mono',monospace;">AVG AUTHENTIC</div>
                </div>
            </div>

            <!-- Results Table -->
            <div style="overflow-x:auto;">
                <table id="batch-results-table" style="
                    width: 100%;
                    border-collapse: collapse;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 11px;
                ">
                    <thead>
                        <tr style="background:rgba(0,0,0,0.4);">
                            <th style="padding:8px;text-align:left;color:#00c8ff;border-bottom:1px solid rgba(0,200,255,0.2);">#</th>
                            <th style="padding:8px;text-align:left;color:#00c8ff;border-bottom:1px solid rgba(0,200,255,0.2);">FILE NAME</th>
                            <th style="padding:8px;text-align:center;color:#00c8ff;border-bottom:1px solid rgba(0,200,255,0.2);">VERDICT</th>
                            <th style="padding:8px;text-align:center;color:#00c8ff;border-bottom:1px solid rgba(0,200,255,0.2);">AUTHENTIC</th>
                            <th style="padding:8px;text-align:center;color:#00c8ff;border-bottom:1px solid rgba(0,200,255,0.2);">FAKE</th>
                            <th style="padding:8px;text-align:center;color:#00c8ff;border-bottom:1px solid rgba(0,200,255,0.2);">STATUS</th>
                        </tr>
                    </thead>
                    <tbody id="batch-results-tbody"></tbody>
                </table>
            </div>
        </div>
    </div>`;

    anchor.insertAdjacentHTML('afterend', batchHTML);
}

// ── DRAG & DROP ──────────────────────────────────────────────────
function batchDragOver(e) {
    e.preventDefault();
    document.getElementById('batch-dropzone').style.borderColor = '#7b2ff7';
    document.getElementById('batch-dropzone').style.background = 'rgba(123,47,247,0.1)';
}

function batchDragLeave(e) {
    document.getElementById('batch-dropzone').style.borderColor = 'rgba(123,47,247,0.4)';
    document.getElementById('batch-dropzone').style.background = 'rgba(0,0,0,0.2)';
}

function batchDrop(e) {
    e.preventDefault();
    batchDragLeave(e);
    batchFilesSelected(e.dataTransfer.files);
}

// ── FILES SELECTED ───────────────────────────────────────────────
function batchFilesSelected(files) {
    const newFiles = Array.from(files).slice(0, 10 - batchFiles.length);
    batchFiles = [...batchFiles, ...newFiles].slice(0, 10);
    renderBatchFileList();
}

// ── RENDER FILE LIST ─────────────────────────────────────────────
function renderBatchFileList() {
    if (batchFiles.length === 0) return;

    document.getElementById('batch-file-list').style.display = 'block';
    document.getElementById('batch-count').textContent = batchFiles.length;
    document.getElementById('batch-analyze-btn').style.display = 'inline-block';

    const container = document.getElementById('batch-files-container');
    container.innerHTML = '';

    batchFiles.forEach((file, i) => {
        const item = document.createElement('div');
        item.id = `batch-file-${i}`;
        item.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 10px;
            margin-bottom: 5px;
            background: rgba(0,0,0,0.2);
            border-radius: 6px;
            border: 1px solid rgba(123,47,247,0.2);
        `;
        item.innerHTML = `
            <span style="color:#7b2ff7;font-size:14px;">🎵</span>
            <span style="
                flex:1;
                color:#e8eaf6;
                font-family:'JetBrains Mono',monospace;
                font-size:11px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
            ">${file.name}</span>
            <span style="
                color:#5a6a8a;
                font-family:'JetBrains Mono',monospace;
                font-size:10px;
            ">${(file.size/1024).toFixed(0)}KB</span>
            <span id="batch-status-${i}" style="
                color:#5a6a8a;
                font-family:'JetBrains Mono',monospace;
                font-size:10px;
            ">PENDING</span>
            <button onclick="removeBatchFile(${i})" style="
                background:none;
                border:none;
                color:#ff4444;
                cursor:pointer;
                font-size:14px;
            ">×</button>
        `;
        container.appendChild(item);
    });
}

// ── REMOVE FILE ──────────────────────────────────────────────────
function removeBatchFile(index) {
    batchFiles.splice(index, 1);
    if (batchFiles.length === 0) {
        clearBatch();
    } else {
        renderBatchFileList();
    }
}

// ── START BATCH ANALYSIS ─────────────────────────────────────────
async function startBatchAnalysis() {
    if (batchFiles.length === 0 || batchProcessing) return;

    batchProcessing = true;
    batchResults = [];

    document.getElementById('batch-analyze-btn').disabled = true;
    document.getElementById('batch-analyze-btn').textContent = '⏳ ANALYZING...';
    document.getElementById('batch-progress').style.display = 'block';
    document.getElementById('batch-results-container').style.display = 'none';

    for (let i = 0; i < batchFiles.length; i++) {
        const file = batchFiles[i];
        const pct = Math.round(((i) / batchFiles.length) * 100);

        // Update progress
        document.getElementById('batch-progress-text').textContent =
            `Processing ${i+1}/${batchFiles.length}: ${file.name}`;
        document.getElementById('batch-progress-pct').textContent = `${pct}%`;
        document.getElementById('batch-progress-bar').style.width = `${pct}%`;
        document.getElementById(`batch-status-${i}`).textContent = 'ANALYZING...';
        document.getElementById(`batch-status-${i}`).style.color = '#00c8ff';

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_BASE}/analyze`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Failed');

            const result = await response.json();
            batchResults.push({ file: file.name, result, success: true });

            const isReal = result.verdict === 'REAL' ||
                           result.verdict === 'AUTHENTIC' ||
                           (result.authentic_probability > 0.5);

            document.getElementById(`batch-status-${i}`).textContent =
                isReal ? 'AUTHENTIC' : 'FAKE';
            document.getElementById(`batch-status-${i}`).style.color =
                isReal ? '#00ff88' : '#ff4444';

        } catch (err) {
            batchResults.push({ file: file.name, result: null, success: false });
            document.getElementById(`batch-status-${i}`).textContent = 'ERROR';
            document.getElementById(`batch-status-${i}`).style.color = '#ff8800';
        }
    }

    // Complete
    document.getElementById('batch-progress-text').textContent =
        `Analysis complete! ${batchFiles.length}/${batchFiles.length} files processed`;
    document.getElementById('batch-progress-pct').textContent = '100%';
    document.getElementById('batch-progress-bar').style.width = '100%';

    batchProcessing = false;
    document.getElementById('batch-analyze-btn').disabled = false;
    document.getElementById('batch-analyze-btn').textContent = '🔍 ANALYZE ALL FILES';

    renderBatchResults();
}

// ── RENDER RESULTS ───────────────────────────────────────────────
function renderBatchResults() {
    document.getElementById('batch-results-container').style.display = 'block';
    document.getElementById('batch-download-btn').style.display = 'inline-block';

    const tbody = document.getElementById('batch-results-tbody');
    tbody.innerHTML = '';

    let realCount = 0;
    let fakeCount = 0;
    let totalAuth = 0;

    batchResults.forEach((item, i) => {
        const tr = document.createElement('tr');
        tr.style.cssText = `
            background: ${i % 2 === 0 ? 'rgba(13,27,42,0.5)' : 'rgba(15,30,48,0.5)'};
            border-bottom: 1px solid rgba(0,200,255,0.05);
        `;

        if (!item.success) {
            tr.innerHTML = `
                <td style="padding:8px;color:#5a6a8a;">${i+1}</td>
                <td style="padding:8px;color:#e8eaf6;">${item.file}</td>
                <td colspan="3" style="padding:8px;color:#ff8800;text-align:center;">ERROR</td>
                <td style="padding:8px;color:#ff8800;text-align:center;">FAILED</td>
            `;
        } else {
            const r = item.result;
            const isReal = r.verdict === 'REAL' ||
                           r.verdict === 'AUTHENTIC' ||
                           (r.authentic_probability > 0.5);
            const authPct = r.authentic_probability !== undefined
                ? (r.authentic_probability * 100).toFixed(1)
                : r.real_probability !== undefined
                ? (r.real_probability * 100).toFixed(1)
                : (isReal ? '97.5' : '2.5');
            const fakePct = (100 - parseFloat(authPct)).toFixed(1);

            if (isReal) realCount++; else fakeCount++;
            totalAuth += parseFloat(authPct);

            tr.innerHTML = `
                <td style="padding:8px;color:#5a6a8a;">${i+1}</td>
                <td style="padding:8px;color:#e8eaf6;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${item.file}</td>
                <td style="padding:8px;text-align:center;">
                    <span style="
                        background: ${isReal ? 'rgba(0,255,136,0.15)' : 'rgba(255,68,68,0.15)'};
                        color: ${isReal ? '#00ff88' : '#ff4444'};
                        padding: 3px 8px;
                        border-radius: 4px;
                        font-weight: 700;
                        font-size: 10px;
                    ">${isReal ? 'AUTHENTIC' : 'DEEPFAKE'}</span>
                </td>
                <td style="padding:8px;text-align:center;color:#00ff88;">${authPct}%</td>
                <td style="padding:8px;text-align:center;color:#ff4444;">${fakePct}%</td>
                <td style="padding:8px;text-align:center;">
                    <span style="color:#00c8ff;font-size:10px;">DONE</span>
                </td>
            `;
        }
        tbody.appendChild(tr);
    });

    // Update summary cards
    document.getElementById('batch-real-count').textContent = realCount;
    document.getElementById('batch-fake-count').textContent = fakeCount;
    document.getElementById('batch-avg-score').textContent =
        batchResults.length > 0
            ? `${(totalAuth / batchResults.filter(r => r.success).length).toFixed(1)}%`
            : '0%';
}

// ── DOWNLOAD BATCH REPORT ────────────────────────────────────────
async function downloadBatchReport() {
    if (!window.jsPDF) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const W = 210;
    const margin = 15;

    // Background
    doc.setFillColor(10, 22, 40);
    doc.rect(0, 0, W, 297, 'F');

    // Header
    doc.setFillColor(13, 27, 42);
    doc.rect(0, 0, W, 40, 'F');
    doc.setFillColor(0, 200, 255);
    doc.rect(0, 39, W, 1, 'F');

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 200, 255);
    doc.text('VoiceAuthentix', margin, 16);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(90, 106, 138);
    doc.text('Batch Analysis Report', margin, 24);
    doc.text(new Date().toLocaleString(), margin, 31);

    // Summary
    let y = 50;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 200, 255);
    doc.text('BATCH SUMMARY', margin, y);

    y += 8;
    const realCount = batchResults.filter(r => r.success && (
        r.result.verdict === 'REAL' ||
        r.result.verdict === 'AUTHENTIC' ||
        r.result.authentic_probability > 0.5
    )).length;
    const fakeCount = batchResults.filter(r => r.success).length - realCount;

    const summaryData = [
        ['Total Files', batchResults.length],
        ['Authentic', realCount],
        ['Deepfake', fakeCount],
        ['Failed', batchResults.filter(r => !r.success).length],
        ['Analysis Date', new Date().toLocaleDateString()],
    ];

    summaryData.forEach(([label, value], i) => {
        doc.setFillColor(i % 2 === 0 ? 13 : 15, i % 2 === 0 ? 27 : 30, i % 2 === 0 ? 42 : 48);
        doc.rect(margin, y, W - 2*margin, 9, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(90, 106, 138);
        doc.text(String(label), margin + 5, y + 6);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(232, 234, 246);
        doc.text(String(value), margin + 80, y + 6);
        y += 9;
    });

    // Results table
    y += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 200, 255);
    doc.text('INDIVIDUAL RESULTS', margin, y);

    y += 8;

    // Table header
    doc.setFillColor(0, 0, 0);
    doc.rect(margin, y, W - 2*margin, 9, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(0, 200, 255);
    doc.text('#', margin + 3, y + 6);
    doc.text('FILE NAME', margin + 12, y + 6);
    doc.text('VERDICT', margin + 100, y + 6);
    doc.text('AUTHENTIC', margin + 130, y + 6);
    doc.text('FAKE', margin + 158, y + 6);
    y += 9;

    batchResults.forEach((item, i) => {
        if (y > 270) {
            doc.addPage();
            doc.setFillColor(10, 22, 40);
            doc.rect(0, 0, 210, 297, 'F');
            y = 20;
        }

        doc.setFillColor(i % 2 === 0 ? 13 : 15, i % 2 === 0 ? 27 : 30, i % 2 === 0 ? 42 : 48);
        doc.rect(margin, y, W - 2*margin, 9, 'F');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(90, 106, 138);
        doc.text(String(i+1), margin + 3, y + 6);

        doc.setTextColor(232, 234, 246);
        const fname = item.file.length > 35 ? item.file.substring(0, 35) + '...' : item.file;
        doc.text(fname, margin + 12, y + 6);

        if (item.success) {
            const isReal = item.result.verdict === 'REAL' ||
                           item.result.verdict === 'AUTHENTIC' ||
                           item.result.authentic_probability > 0.5;
            const authPct = item.result.authentic_probability !== undefined
                ? (item.result.authentic_probability * 100).toFixed(1)
                : (isReal ? '97.5' : '2.5');
            const fakePct = (100 - parseFloat(authPct)).toFixed(1);

            doc.setTextColor(...(isReal ? [0, 255, 136] : [255, 68, 68]));
            doc.text(isReal ? 'AUTHENTIC' : 'DEEPFAKE', margin + 100, y + 6);
            doc.setTextColor(0, 255, 136);
            doc.text(`${authPct}%`, margin + 130, y + 6);
            doc.setTextColor(255, 68, 68);
            doc.text(`${fakePct}%`, margin + 158, y + 6);
        } else {
            doc.setTextColor(255, 136, 0);
            doc.text('ERROR', margin + 100, y + 6);
        }
        y += 9;
    });

    // Footer
    doc.setFillColor(13, 27, 42);
    doc.rect(0, 285, 210, 12, 'F');
    doc.setFontSize(7);
    doc.setTextColor(90, 106, 138);
    doc.text('VoiceAuthentix Batch Report', margin, 292);
    doc.text('sanjay292006.github.io/voiceauthentix-frontend', 210 - margin, 292, { align: 'right' });

    doc.save(`VoiceAuthentix_Batch_Report_${Date.now()}.pdf`);
}

// ── CLEAR BATCH ──────────────────────────────────────────────────
function clearBatch() {
    batchFiles = [];
    batchResults = [];
    batchProcessing = false;
    document.getElementById('batch-file-list').style.display = 'none';
    document.getElementById('batch-progress').style.display = 'none';
    document.getElementById('batch-results-container').style.display = 'none';
    document.getElementById('batch-analyze-btn').style.display = 'none';
    document.getElementById('batch-download-btn').style.display = 'none';
    document.getElementById('batch-files-container').innerHTML = '';
    document.getElementById('batch-count').textContent = '0';
    document.getElementById('batch-file-input').value = '';
}

// ── INIT ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(injectBatchUI, 1500);
});
