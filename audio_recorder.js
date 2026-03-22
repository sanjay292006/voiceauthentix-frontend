// ================================================================
//  VoiceAuthentix — Audio Recorder Module
//  Adds: Record directly in browser → Auto analyze
// ================================================================

// ── RECORDER STATE ──────────────────────────────────────────────
let mediaRecorder = null;
let audioChunks = [];
let recordingStream = null;
let recordingTimer = null;
let recordingSeconds = 0;
let isRecording = false;

// ── INJECT RECORDER UI INTO ANALYZE SECTION ─────────────────────
function injectRecorderUI() {
    const dropZone = document.querySelector('.upload-zone') ||
                     document.querySelector('#upload-zone') ||
                     document.querySelector('.drop-zone');

    if (!dropZone) return;

    const recorderHTML = `
    <div id="recorder-section" style="
        margin-top: 20px;
        border: 1px solid rgba(0,200,255,0.3);
        border-radius: 12px;
        padding: 20px;
        background: rgba(0,200,255,0.03);
    ">
        <div style="
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
        ">
            <span style="
                background: linear-gradient(135deg,#00c8ff,#7b2ff7);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 14px;
                font-weight: 700;
                letter-spacing: 2px;
                font-family: 'JetBrains Mono', monospace;
            ">🎙️ RECORD AUDIO</span>
            <div style="flex:1;height:1px;background:rgba(0,200,255,0.2);"></div>
        </div>

        <!-- Timer Display -->
        <div id="rec-timer" style="
            text-align: center;
            font-size: 42px;
            font-family: 'JetBrains Mono', monospace;
            color: #00c8ff;
            margin: 10px 0;
            letter-spacing: 4px;
            display: none;
        ">00:00</div>

        <!-- Waveform Canvas -->
        <canvas id="rec-waveform" width="100%" height="60" style="
            width: 100%;
            height: 60px;
            border-radius: 8px;
            background: rgba(0,0,0,0.3);
            margin: 10px 0;
            display: none;
        "></canvas>

        <!-- Status -->
        <div id="rec-status" style="
            text-align: center;
            font-size: 12px;
            font-family: 'JetBrains Mono', monospace;
            color: #5a6a8a;
            margin-bottom: 15px;
        ">Click Record to start</div>

        <!-- Buttons -->
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
            <button id="rec-btn" onclick="toggleRecording()" style="
                background: linear-gradient(135deg,#00c8ff,#7b2ff7);
                border: none;
                border-radius: 8px;
                padding: 12px 28px;
                color: white;
                font-size: 13px;
                font-weight: 700;
                font-family: 'JetBrains Mono', monospace;
                cursor: pointer;
                letter-spacing: 1px;
                transition: all 0.3s;
            ">⏺ START RECORDING</button>

            <button id="analyze-rec-btn" onclick="analyzeRecording()" style="
                background: rgba(0,255,136,0.1);
                border: 1px solid rgba(0,255,136,0.4);
                border-radius: 8px;
                padding: 12px 28px;
                color: #00ff88;
                font-size: 13px;
                font-weight: 700;
                font-family: 'JetBrains Mono', monospace;
                cursor: pointer;
                letter-spacing: 1px;
                transition: all 0.3s;
                display: none;
            ">🔍 ANALYZE RECORDING</button>

            <button id="download-rec-btn" onclick="downloadRecording()" style="
                background: rgba(123,47,247,0.1);
                border: 1px solid rgba(123,47,247,0.4);
                border-radius: 8px;
                padding: 12px 28px;
                color: #7b2ff7;
                font-size: 13px;
                font-weight: 700;
                font-family: 'JetBrains Mono', monospace;
                cursor: pointer;
                letter-spacing: 1px;
                transition: all 0.3s;
                display: none;
            ">⬇ DOWNLOAD</button>

            <button id="clear-rec-btn" onclick="clearRecording()" style="
                background: rgba(255,68,68,0.1);
                border: 1px solid rgba(255,68,68,0.3);
                border-radius: 8px;
                padding: 12px 28px;
                color: #ff4444;
                font-size: 13px;
                font-weight: 700;
                font-family: 'JetBrains Mono', monospace;
                cursor: pointer;
                letter-spacing: 1px;
                transition: all 0.3s;
                display: none;
            ">✕ CLEAR</button>
        </div>

        <!-- Playback -->
        <div id="rec-playback" style="margin-top:15px;display:none;">
            <p style="
                font-size:11px;
                color:#5a6a8a;
                font-family:'JetBrains Mono',monospace;
                margin-bottom:8px;
                text-align:center;
            ">PREVIEW RECORDING</p>
            <audio id="rec-audio" controls style="
                width:100%;
                border-radius:8px;
            "></audio>
        </div>
    </div>`;

    dropZone.insertAdjacentHTML('afterend', recorderHTML);
}

// ── TOGGLE RECORDING ────────────────────────────────────────────
async function toggleRecording() {
    if (!isRecording) {
        await startRecording();
    } else {
        stopRecording();
    }
}

// ── START RECORDING ─────────────────────────────────────────────
async function startRecording() {
    try {
        recordingStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                sampleRate: 22050,
                channelCount: 1,
                echoCancellation: true,
                noiseSuppression: true,
            }
        });

        audioChunks = [];
        mediaRecorder = new MediaRecorder(recordingStream, {
            mimeType: 'audio/webm;codecs=opus'
        });

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) audioChunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(audioChunks, { type: 'audio/webm' });
            const url = URL.createObjectURL(blob);
            document.getElementById('rec-audio').src = url;
            document.getElementById('rec-playback').style.display = 'block';
            document.getElementById('analyze-rec-btn').style.display = 'inline-block';
            document.getElementById('download-rec-btn').style.display = 'inline-block';
            document.getElementById('clear-rec-btn').style.display = 'inline-block';
        };

        mediaRecorder.start(100);
        isRecording = true;

        // Update UI
        document.getElementById('rec-btn').innerHTML = '⏹ STOP RECORDING';
        document.getElementById('rec-btn').style.background = 'linear-gradient(135deg,#ff4444,#ff8800)';
        document.getElementById('rec-timer').style.display = 'block';
        document.getElementById('rec-waveform').style.display = 'block';
        document.getElementById('rec-status').style.color = '#ff4444';
        document.getElementById('rec-status').innerHTML = '🔴 Recording in progress...';
        document.getElementById('rec-playback').style.display = 'none';
        document.getElementById('analyze-rec-btn').style.display = 'none';
        document.getElementById('download-rec-btn').style.display = 'none';
        document.getElementById('clear-rec-btn').style.display = 'none';

        // Start timer
        recordingSeconds = 0;
        recordingTimer = setInterval(() => {
            recordingSeconds++;
            const mins = String(Math.floor(recordingSeconds / 60)).padStart(2, '0');
            const secs = String(recordingSeconds % 60).padStart(2, '0');
            document.getElementById('rec-timer').textContent = `${mins}:${secs}`;

            // Auto stop at 3 minutes
            if (recordingSeconds >= 180) stopRecording();
        }, 1000);

        // Start waveform visualization
        drawRecordingWaveform(recordingStream);

    } catch (err) {
        document.getElementById('rec-status').style.color = '#ff4444';
        document.getElementById('rec-status').textContent =
            '❌ Microphone access denied. Please allow microphone permission!';
    }
}

// ── STOP RECORDING ──────────────────────────────────────────────
function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
    if (recordingStream) {
        recordingStream.getTracks().forEach(t => t.stop());
    }
    clearInterval(recordingTimer);
    isRecording = false;

    document.getElementById('rec-btn').innerHTML = '⏺ RECORD AGAIN';
    document.getElementById('rec-btn').style.background = 'linear-gradient(135deg,#00c8ff,#7b2ff7)';
    document.getElementById('rec-status').style.color = '#00ff88';
    document.getElementById('rec-status').textContent = '✅ Recording complete! Preview and analyze below.';
}

// ── DRAW WAVEFORM ───────────────────────────────────────────────
function drawRecordingWaveform(stream) {
    const canvas = document.getElementById('rec-waveform');
    const ctx = canvas.getContext('2d');
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        if (!isRecording) return;
        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);
        canvas.width = canvas.offsetWidth;
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#00c8ff';
        ctx.beginPath();

        const sliceWidth = canvas.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * canvas.height) / 2;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            x += sliceWidth;
        }
        ctx.stroke();
    }
    draw();
}

// ── ANALYZE RECORDING ───────────────────────────────────────────
async function analyzeRecording() {
    if (audioChunks.length === 0) return;

    const blob = new Blob(audioChunks, { type: 'audio/webm' });
    const file = new File([blob], 'recording.webm', { type: 'audio/webm' });

    document.getElementById('rec-status').style.color = '#00c8ff';
    document.getElementById('rec-status').textContent = '🔍 Analyzing recording...';

    // Create FormData and send to backend
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${API_BASE}/analyze`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Analysis failed');

        const result = await response.json();

        document.getElementById('rec-status').style.color = '#00ff88';
        document.getElementById('rec-status').textContent =
            `✅ Analysis complete! Verdict: ${result.verdict} — ${(result.authentic_probability * 100).toFixed(1)}% Authentic`;

        // Display results using existing displayResults function if available
        if (typeof displayResults === 'function') {
            displayResults(result, 'recording.webm');
        }

    } catch (err) {
        document.getElementById('rec-status').style.color = '#ff4444';
        document.getElementById('rec-status').textContent = '❌ Analysis failed. Try again!';
    }
}

// ── DOWNLOAD RECORDING ──────────────────────────────────────────
function downloadRecording() {
    if (audioChunks.length === 0) return;

    const blob = new Blob(audioChunks, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voiceauthentix_recording_${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
}

// ── CLEAR RECORDING ─────────────────────────────────────────────
function clearRecording() {
    audioChunks = [];
    document.getElementById('rec-audio').src = '';
    document.getElementById('rec-playback').style.display = 'none';
    document.getElementById('analyze-rec-btn').style.display = 'none';
    document.getElementById('download-rec-btn').style.display = 'none';
    document.getElementById('clear-rec-btn').style.display = 'none';
    document.getElementById('rec-timer').style.display = 'none';
    document.getElementById('rec-waveform').style.display = 'none';
    document.getElementById('rec-timer').textContent = '00:00';
    document.getElementById('rec-status').style.color = '#5a6a8a';
    document.getElementById('rec-status').textContent = 'Click Record to start';
    document.getElementById('rec-btn').innerHTML = '⏺ START RECORDING';
    document.getElementById('rec-btn').style.background = 'linear-gradient(135deg,#00c8ff,#7b2ff7)';
}

// ── INIT ON PAGE LOAD ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(injectRecorderUI, 1000);
});
