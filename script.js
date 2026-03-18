// ================================================================
//  VoiceAuthentix — Frontend JavaScript (Backend Connected)
//  File: script.js
//  Connects to FastAPI at http://localhost:8000
// ================================================================

// Auto-detect server IP from current page hostname
const SERVER_HOST = 'sanjay-voiceauthenthix-voiceauthentix.hf.space';
const API_BASE = `https://sanjay-voiceauthenthix-voiceauthentix.hf.space/api`;
const WS_BASE  = `wss://sanjay-voiceauthenthix-voiceauthentix.hf.space/api`;

// ═══════════════════════════════════════════════
//  LOADING
// ═══════════════════════════════════════════════
window.addEventListener("load", () => {
  checkBackendHealth();
  setTimeout(() => {
    document.getElementById("loading-overlay").classList.add("hidden");
  }, 1800);
});

async function checkBackendHealth() {
  try {
    const res  = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    if (data.status === "ok") {
      notify("✅ Backend Connected", "VoiceAuthentix API is online", "success");
    }
  } catch {
    notify("⚠️ Backend Offline", "Start the FastAPI server: python main.py", "warn");
  }
}

// ═══════════════════════════════════════════════
//  NOTIFICATIONS
// ═══════════════════════════════════════════════
function notify(head, body, type = "info") {
  const el = document.getElementById("notification");
  const colors = {
    info:    "var(--accent)",
    success: "var(--safe)",
    error:   "var(--danger)",
    warn:    "var(--warn)"
  };
  document.getElementById("notif-head").textContent = head;
  document.getElementById("notif-head").style.color = colors[type] || colors.info;
  document.getElementById("notif-body").textContent = body;
  el.style.borderColor = (colors[type] || "var(--border)") + "44";
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 3800);
}

// ═══════════════════════════════════════════════
//  HERO CANVAS — Animated spectrogram
// ═══════════════════════════════════════════════
(function () {
  const canvas = document.getElementById("hero-canvas");
  const ctx    = canvas.getContext("2d");
  let cols     = [];
  let frame    = 0;

  function resize() {
    canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  function colorFromValue(v) {
    if (v < 0.25) {
      const t = v / 0.25;
      return `rgb(0,${Math.floor(t * 50)},${Math.floor(50 + t * 150)})`;
    } else if (v < 0.5) {
      const t = (v - 0.25) / 0.25;
      return `rgb(0,${Math.floor(50 + t * 200)},${Math.floor(200 - t * 100)})`;
    } else if (v < 0.75) {
      const t = (v - 0.5) / 0.25;
      return `rgb(${Math.floor(t * 255)},${Math.floor(250 - t * 50)},${Math.floor(100 - t * 100)})`;
    } else {
      const t = (v - 0.75) / 0.25;
      return `rgb(255,${Math.floor(200 - t * 150)},0)`;
    }
  }

  function generateColumn() {
    const h   = Math.ceil(canvas.offsetHeight);
    const col = [];
    for (let i = 0; i < h; i++) {
      const norm = i / h;
      let v = Math.random() * 0.3;
      if (norm > 0.1 && norm < 0.35) v += 0.3 + Math.random() * 0.4;
      if (norm > 0.4 && norm < 0.55) v += 0.2 + Math.random() * 0.3;
      if (norm > 0.6 && norm < 0.7)  v += 0.15 + Math.random() * 0.2;
      v *= (1 - norm * 0.6);
      col.push(Math.min(1, v));
    }
    return col;
  }

  function draw() {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (!w || !h) { requestAnimationFrame(draw); return; }

    const numCols = Math.ceil(w / 4);
    while (cols.length < numCols) cols.push(generateColumn());

    if (frame % 2 === 0) { cols.shift(); cols.push(generateColumn()); }

    ctx.clearRect(0, 0, w, h);
    const colW = w / cols.length;

    cols.forEach((col, ci) => {
      const pixH = h / col.length;
      col.forEach((v, ri) => {
        ctx.fillStyle   = colorFromValue(v);
        ctx.globalAlpha = 0.85;
        ctx.fillRect(ci * colW, ri * pixH, colW + 0.5, pixH + 0.5);
      });
    });

    const scanX = (frame * 2) % w;
    ctx.globalAlpha = 0.15;
    ctx.fillStyle   = "#fff";
    ctx.fillRect(scanX, 0, 2, h);
    ctx.globalAlpha = 1;
    frame++;
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  draw();
})();

// ═══════════════════════════════════════════════
//  FILE UPLOAD + ANALYSIS  (→ FastAPI /api/analyze)
// ═══════════════════════════════════════════════
const dropZone  = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");
let analysisHistory = [];
let selectedFile    = null;

dropZone.addEventListener("dragover",  e => { e.preventDefault(); dropZone.classList.add("drag-over"); });
dropZone.addEventListener("dragleave", () => dropZone.classList.remove("drag-over"));
dropZone.addEventListener("drop", e => {
  e.preventDefault();
  dropZone.classList.remove("drag-over");
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("audio/")) loadFile(file);
  else notify("Invalid File", "Please drop an audio file (MP3, WAV, OGG, FLAC)", "error");
});

fileInput.addEventListener("change", e => {
  if (e.target.files[0]) loadFile(e.target.files[0]);
});

function loadFile(file) {
  selectedFile = file;
  document.getElementById("file-name").textContent = file.name;
  document.getElementById("file-info").style.display = "block";
  document.getElementById("analysis-status").textContent = "LOADED";
  document.getElementById("analysis-status").className  = "status-badge badge-idle";
  document.getElementById("result-card").classList.remove("show");
  document.getElementById("real-bar").style.width  = "0%";
  document.getElementById("fake-bar").style.width  = "0%";
  document.getElementById("real-pct").textContent  = "0%";
  document.getElementById("fake-pct").textContent  = "0%";

  // Draw local waveform preview with WebAudio
  const reader = new FileReader();
  reader.onload = e => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtx.decodeAudioData(e.target.result.slice(0), buffer => {
      drawWaveform(buffer);
      drawMelSpectrogram(buffer);
    });
  };
  reader.readAsArrayBuffer(file);

  notify("File Loaded", file.name + " — click Analyze to run detection", "info");
}

// ── Run Analysis → POST /api/analyze ────────────────────────────
async function runAnalysis() {
  if (!selectedFile) {
    notify("No File", "Please upload an audio file first.", "warn");
    return;
  }

  const btn = document.getElementById("analyze-btn");
  btn.disabled    = true;
  btn.textContent = "⚙️ Analyzing...";

  document.getElementById("analysis-status").textContent = "ANALYZING";
  document.getElementById("analysis-status").className   = "status-badge badge-analyzing";
  document.getElementById("result-card").classList.remove("show");

  // Animate bars while waiting
  let fake_prog = 0;
  const progInterval = setInterval(() => {
    fake_prog = Math.min(fake_prog + Math.random() * 5, 70);
    document.getElementById("real-bar").style.width = fake_prog * 0.4 + "%";
    document.getElementById("fake-bar").style.width = fake_prog * 0.15 + "%";
  }, 120);

  try {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("include_images", "true");
    formData.append("include_chunks", "true");

    const res = await fetch(`${API_BASE}/analyze`, {
      method: "POST",
      body:   formData,
    });

    clearInterval(progInterval);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || `Server error ${res.status}`);
    }

    const data = await res.json();
    displayAnalysisResult(data);

  } catch (err) {
    clearInterval(progInterval);
    notify("Analysis Failed", err.message, "error");
    document.getElementById("analysis-status").textContent = "ERROR";
    document.getElementById("analysis-status").className   = "status-badge badge-fake";
  } finally {
    btn.disabled    = false;
    btn.textContent = "🔍 Run Deep Learning Analysis";
  }
}

function displayAnalysisResult(data) {
  const isReal   = !data.is_deepfake;
  const fakeProb = data.fake_probability;
  const realProb = data.real_probability;

  // Bars
  document.getElementById("real-bar").style.width = (realProb * 100).toFixed(1) + "%";
  document.getElementById("fake-bar").style.width = (fakeProb * 100).toFixed(1) + "%";
  document.getElementById("real-pct").textContent = (realProb * 100).toFixed(1) + "%";
  document.getElementById("fake-pct").textContent = (fakeProb * 100).toFixed(1) + "%";

  // Status badge
  const statusBadge = document.getElementById("analysis-status");
  statusBadge.textContent = isReal ? "AUTHENTIC" : "FAKE DETECTED";
  statusBadge.className   = "status-badge " + (isReal ? "badge-real" : "badge-fake");

  // Result card
  const card = document.getElementById("result-card");
  card.className = "result-card show " + (isReal ? "result-real" : "result-fake");
  document.getElementById("result-icon").textContent  = isReal ? "✅" : "🚨";
  document.getElementById("result-score").textContent = (data.confidence * 100).toFixed(1) + "%";
  document.getElementById("result-score").className   = "result-score " + (isReal ? "score-real" : "score-fake");
  document.getElementById("result-desc").textContent  = isReal
    ? `Authentic audio — ${(realProb * 100).toFixed(1)}% real · Latency: ${data.latency_ms}ms · ${data.feature_stats?.chunks_analyzed || 0} chunks`
    : `⚠️ DeepFake — ${data.anomaly_regions?.length || 0} anomalous region(s) · Confidence: ${(fakeProb * 100).toFixed(1)}%`;

  // Show mel spectrogram image from backend
  if (data.mel_spectrogram_img) {
    const melCanvas = document.getElementById("mel-canvas");
    const img = new Image();
    img.onload = () => {
      const ctx = melCanvas.getContext("2d");
      melCanvas.width  = melCanvas.offsetWidth  * window.devicePixelRatio;
      melCanvas.height = melCanvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.drawImage(img, 0, 0, melCanvas.offsetWidth, melCanvas.offsetHeight);
    };
    img.src = "data:image/png;base64," + data.mel_spectrogram_img;
  }

  // History
  addToHistory(data.file_name, isReal, data.confidence);

  notify(
    isReal ? "✅ Authentic Audio" : "🚨 DeepFake Detected",
    isReal ? `Real: ${(realProb * 100).toFixed(1)}%` : `Fake: ${(fakeProb * 100).toFixed(1)}%`,
    isReal ? "success" : "error"
  );
}

function addToHistory(name, isReal, score) {
  analysisHistory.unshift({ name, isReal, score, time: new Date().toLocaleTimeString() });
  if (analysisHistory.length > 10) analysisHistory.pop();

  const list = document.getElementById("history-list");
  list.innerHTML = analysisHistory.map(h => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;
         background:rgba(255,255,255,0.02);border-radius:6px;
         border-left:2px solid ${h.isReal ? "var(--safe)" : "var(--danger)"}">
      <span style="font-size:0.72rem;color:var(--text);overflow:hidden;text-overflow:ellipsis;
            white-space:nowrap;max-width:140px">${h.name}</span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;
            color:${h.isReal ? "var(--safe)" : "var(--danger)"};flex-shrink:0">
        ${h.isReal ? "✓ REAL" : "✗ FAKE"} ${(h.score * 100).toFixed(0)}%
      </span>
    </div>
  `).join("");
}

// ── Local waveform + mel preview (unchanged from original) ───────
function drawWaveform(buffer) {
  const canvas = document.getElementById("wave-canvas");
  const ctx    = canvas.getContext("2d");
  canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
  canvas.height = canvas.offsetHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  const data = buffer.getChannelData(0);
  const w = canvas.offsetWidth, h = canvas.offsetHeight;
  const step = Math.ceil(data.length / w);
  ctx.fillStyle = "#020510";
  ctx.fillRect(0, 0, w, h);
  ctx.beginPath();
  ctx.strokeStyle = "#00c8ff";
  ctx.lineWidth   = 1.5;
  ctx.globalAlpha = 0.8;
  for (let i = 0; i < w; i++) {
    let min = 1, max = -1;
    for (let j = 0; j < step; j++) {
      const d = data[i * step + j] || 0;
      if (d < min) min = d;
      if (d > max) max = d;
    }
    ctx.moveTo(i, (1 + min) * h / 2);
    ctx.lineTo(i, (1 + max) * h / 2);
  }
  ctx.stroke();
}

function drawMelSpectrogram(buffer) {
  const canvas = document.getElementById("mel-canvas");
  const ctx    = canvas.getContext("2d");
  canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
  canvas.height = canvas.offsetHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  const data         = buffer.getChannelData(0);
  const nMels        = 128;
  const nFft         = 2048;
  const hopLength    = 512;
  const w = canvas.offsetWidth, h = canvas.offsetHeight;
  const numFrames    = Math.floor((data.length - nFft) / hopLength) + 1;
  const displayFrames = Math.min(numFrames, 300);
  const melMatrix    = [];

  for (let frame = 0; frame < displayFrames; frame++) {
    const start = Math.floor((frame / displayFrames) * (numFrames - 1)) * hopLength;
    const win   = new Float32Array(nFft);
    for (let i = 0; i < nFft; i++) {
      win[i] = (data[start + i] || 0) * 0.5 * (1 - Math.cos(2 * Math.PI * i / nFft));
    }
    const half      = nFft / 2;
    const magnitude = new Float32Array(half);
    for (let k = 0; k < half; k++) {
      let re = 0, im = 0;
      const stride = Math.max(1, Math.floor(half / 64));
      for (let n = 0; n < nFft; n += stride) {
        const angle = -2 * Math.PI * k * n / nFft;
        re += win[n] * Math.cos(angle);
        im += win[n] * Math.sin(angle);
      }
      magnitude[k] = re * re + im * im;
    }
    const melBins = new Float32Array(nMels);
    for (let m = 0; m < nMels; m++) {
      const fLow = Math.floor((m / nMels) * half);
      const fHigh = Math.floor(((m + 2) / nMels) * half);
      let sum = 0;
      for (let k = fLow; k < Math.min(fHigh, half); k++) sum += magnitude[k];
      melBins[m] = Math.log1p(sum);
    }
    const maxVal = Math.max(...melBins) || 1;
    for (let m = 0; m < nMels; m++) melBins[m] /= maxVal;
    melMatrix.push(melBins);
  }

  ctx.fillStyle = "#020510";
  ctx.fillRect(0, 0, w, h);
  const colW = w / melMatrix.length;
  const rowH = h / nMels;
  melMatrix.forEach((col, ci) => {
    for (let m = 0; m < nMels; m++) {
      const v = col[m];
      let r, g, b;
      if (v < 0.25)      { r=0;   g=0;   b=Math.floor(v/0.25*200+55); }
      else if (v < 0.5)  { r=0;   g=Math.floor((v-0.25)/0.25*200+55); b=255-Math.floor((v-0.25)/0.25*200); }
      else if (v < 0.75) { r=Math.floor((v-0.5)/0.25*255); g=255; b=0; }
      else               { r=255; g=Math.floor(255-(v-0.75)/0.25*200); b=0; }
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(ci * colW, h - (m + 1) * rowH, colW + 0.5, rowH + 0.5);
    }
  });
}

// ═══════════════════════════════════════════════
//  LIVE MICROPHONE → WebSocket /api/stream
// ═══════════════════════════════════════════════
let micStream    = null;
let micProcessor = null;
let micContext   = null;
let liveActive   = false;
let ws           = null;
let liveTimer    = 0;
let timerInterval = null;
let chunksAnalyzed = 0, fakeDetections = 0, realDetections = 0;
let scoreSum     = 0;
let liveAudioBuffer = [];
const LIVE_CHUNK_SAMPLES = 22050;

async function startMic() {
  if (liveActive) return;

  // ── Connect WebSocket ──────────────────────────────────────────
  try {
    ws = new WebSocket(`${WS_BASE}/stream`);
  } catch {
    notify("WebSocket Error", "Cannot connect to backend. Is the server running?", "error");
    return;
  }

  ws.onopen = () => {
    addLog("info", "WebSocket connected to VoiceAuthentix backend");
  };

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);

    if (msg.type === "connected") {
      addLog("info", `Session ${msg.session_id} — model: ${msg.config?.model}`);
    }

    if (msg.type === "result") {
      const fp = msg.fake_probability;
      const isFake = msg.verdict === "FAKE";
      chunksAnalyzed = msg.session_stats?.chunks_analyzed || chunksAnalyzed + 1;
      fakeDetections = msg.session_stats?.fake_count || fakeDetections;
      realDetections = msg.session_stats?.real_count  || realDetections;
      scoreSum       = msg.session_stats?.average_score * chunksAnalyzed || scoreSum;
      updateLiveUI(fp, isFake);
      addLog(
        isFake ? "fake" : "real",
        `Chunk #${chunksAnalyzed} — ${msg.verdict} (${(fp * 100).toFixed(1)}% fake · ${msg.latency_ms}ms)`
      );
    }

    if (msg.type === "error") {
      addLog("info", "Error: " + msg.message);
    }

    if (msg.type === "session_end") {
      addLog("sys", `Session ended · ${msg.summary?.chunks_analyzed} chunks · Fakes: ${msg.summary?.fake_count}`);
    }
  };

  ws.onerror = () => {
    notify("WebSocket Error", "Connection lost. Check that FastAPI is running.", "error");
    stopMic();
  };

  ws.onclose = () => {
    if (liveActive) stopMic();
  };

  // ── Start mic ──────────────────────────────────────────────────
  try {
    micStream  = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    micContext  = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 22050 });
    const source = micContext.createMediaStreamSource(micStream);
    micProcessor = micContext.createScriptProcessor(4096, 1, 1);

    source.connect(micProcessor);
    micProcessor.connect(micContext.destination);

    micProcessor.onaudioprocess = e => {
      const data = e.inputBuffer.getChannelData(0);
      drawLiveWaveform(data);

      // Buffer samples
      liveAudioBuffer.push(...Array.from(data));

      // When we have 1 second → send to backend via WebSocket
      if (liveAudioBuffer.length >= LIVE_CHUNK_SAMPLES && ws?.readyState === WebSocket.OPEN) {
        const chunk    = new Float32Array(liveAudioBuffer.splice(0, LIVE_CHUNK_SAMPLES));
        const binary   = chunk.buffer;
        ws.send(binary);
      }
    };

    liveActive = true;
    document.getElementById("live-dot").classList.add("active");
    document.getElementById("live-status-txt").textContent = "LIVE — BACKEND ANALYZING";
    document.getElementById("btn-start-mic").style.opacity       = "0.4";
    document.getElementById("btn-start-mic").style.pointerEvents = "none";
    document.getElementById("btn-stop-mic").style.opacity        = "1";
    document.getElementById("btn-stop-mic").style.pointerEvents  = "auto";

    liveTimer    = 0;
    timerInterval = setInterval(() => {
      liveTimer++;
      const m = String(Math.floor(liveTimer / 60)).padStart(2, "0");
      const s = String(liveTimer % 60).padStart(2, "0");
      document.getElementById("live-timer").textContent = m + ":" + s;
    }, 1000);

    addLog("info", "Microphone started — streaming PCM to FastAPI WebSocket");
    notify("🎙️ Live Detection Active", "Mic → FastAPI → CNN-BiLSTM → Result", "success");
    startLiveMelAnimation();

  } catch (err) {
    if (err.name === "NotAllowedError") {
      notify("Microphone Denied", "Please allow microphone access.", "error");
      addLog("info", "Microphone permission denied");
    } else {
      notify("Mic Error", err.message, "error");
    }
    if (ws) ws.close();
  }
}

function stopMic() {
  if (!liveActive) return;
  liveActive = false;

  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "stop" }));
    ws.close();
  }

  if (micProcessor) { micProcessor.disconnect(); micProcessor = null; }
  if (micStream)    { micStream.getTracks().forEach(t => t.stop()); micStream = null; }
  if (micContext)   { micContext.close(); micContext = null; }
  clearInterval(timerInterval);

  document.getElementById("live-dot").classList.remove("active");
  document.getElementById("live-status-txt").textContent        = "MICROPHONE OFFLINE";
  document.getElementById("btn-start-mic").style.opacity        = "1";
  document.getElementById("btn-start-mic").style.pointerEvents  = "auto";
  document.getElementById("btn-stop-mic").style.opacity         = "0.4";
  document.getElementById("btn-stop-mic").style.pointerEvents   = "none";

  addLog("sys", `Session ended · Analyzed ${chunksAnalyzed} chunks`);
  notify("⏹ Detection Stopped", `${chunksAnalyzed} chunks · Fakes: ${fakeDetections}`, "warn");
}

function updateLiveUI(fakeProb, isFake) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference * (1 - fakeProb);
  const ring   = document.getElementById("ring-fill");
  ring.style.strokeDashoffset = offset;
  ring.style.stroke = fakeProb > 0.6 ? "var(--danger)" : fakeProb > 0.4 ? "var(--warn)" : "var(--safe)";

  const ringPct = document.getElementById("ring-pct");
  ringPct.textContent = (fakeProb * 100).toFixed(0) + "%";
  ringPct.style.color = ring.style.stroke;

  document.getElementById("live-verdict").textContent = isFake ? "🚨 DEEPFAKE" : "✅ AUTHENTIC";
  document.getElementById("live-verdict").style.color = isFake ? "var(--danger)" : "var(--safe)";

  document.getElementById("stat-chunks").textContent = chunksAnalyzed;
  document.getElementById("stat-fakes").textContent  = fakeDetections;
  document.getElementById("stat-reals").textContent  = realDetections;
  document.getElementById("stat-avg").textContent    = chunksAnalyzed
    ? (scoreSum / chunksAnalyzed * 100).toFixed(0) + "%"
    : "--";
}

// ── Live waveform ────────────────────────────────────────────────
function drawLiveWaveform(data) {
  const canvas = document.getElementById("live-canvas");
  const ctx    = canvas.getContext("2d");
  if (!canvas.width) {
    canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  const w = canvas.offsetWidth, h = canvas.offsetHeight;
  ctx.fillStyle = "#020510";
  ctx.fillRect(0, 0, w, h);
  ctx.beginPath();
  ctx.strokeStyle = "#00c8ff";
  ctx.lineWidth   = 2;
  ctx.globalAlpha = 0.9;
  const slice = data.slice(0, 512);
  const step  = w / slice.length;
  for (let i = 0; i < slice.length; i++) {
    const x = i * step;
    const y = (0.5 + slice[i] * 0.45) * h;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.strokeStyle = "rgba(0,200,255,0.1)";
  ctx.lineWidth   = 1;
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
  ctx.stroke();
}

// ── Live mel animation ───────────────────────────────────────────
let liveMelCols = [];
function startLiveMelAnimation() {
  function frame() {
    if (!liveActive) return;
    const canvas = document.getElementById("live-mel");
    const ctx    = canvas.getContext("2d");
    if (!canvas.width) {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    const nMels = 64;
    const col   = [];
    for (let m = 0; m < nMels; m++) {
      const norm = m / nMels;
      let v = Math.random() * 0.2;
      if (norm > 0.1 && norm < 0.4)  v += 0.3 + Math.random() * 0.5;
      if (norm > 0.45 && norm < 0.6) v += 0.2 + Math.random() * 0.3;
      v *= (1 - norm * 0.5);
      col.push(Math.min(1, v));
    }
    const maxCols = Math.ceil(w / 4);
    liveMelCols.push(col);
    if (liveMelCols.length > maxCols) liveMelCols.shift();
    ctx.fillStyle = "#020510";
    ctx.fillRect(0, 0, w, h);
    const colW = w / Math.max(liveMelCols.length, 1);
    const rowH = h / nMels;
    liveMelCols.forEach((c, ci) => {
      c.forEach((v, mi) => {
        let r, g, b;
        if (v < 0.25)      { r=0;   g=0;   b=Math.floor(v/0.25*200+55); }
        else if (v < 0.5)  { r=0;   g=Math.floor((v-0.25)/0.25*200+55); b=255-Math.floor((v-0.25)/0.25*200); }
        else if (v < 0.75) { r=Math.floor((v-0.5)/0.25*255); g=255; b=0; }
        else               { r=255; g=Math.floor(255-(v-0.75)/0.25*200); b=0; }
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(ci * colW, h - (mi + 1) * rowH, colW + 0.5, rowH + 0.5);
      });
    });
    setTimeout(() => requestAnimationFrame(frame), 50);
  }
  requestAnimationFrame(frame);
}

// ── Log ──────────────────────────────────────────────────────────
function addLog(type, msg) {
  const log = document.getElementById("live-log");
  const now = new Date();
  const t   = String(now.getHours()).padStart(2,"0") + ":" +
              String(now.getMinutes()).padStart(2,"0") + ":" +
              String(now.getSeconds()).padStart(2,"0");
  const div = document.createElement("div");
  div.className = "log-entry";
  div.innerHTML = `<span class="log-time">${t}</span><span class="log-${type}">${msg}</span>`;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
  while (log.children.length > 100) log.removeChild(log.firstChild);
}

// ── Resize canvases ──────────────────────────────────────────────
window.addEventListener("resize", () => {
  ["live-canvas","live-mel","wave-canvas","mel-canvas"].forEach(id => {
    const c = document.getElementById(id);
    c.width = 0; c.height = 0;
  });
});
