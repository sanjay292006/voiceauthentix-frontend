// ================================================================
//  VoiceAuthentix — Firebase Authentication Module
//  Features: Email/Password + Google Sign-in
// ================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
         signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ── FIREBASE CONFIG ──────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyATJDFr8R-jGxS19y5h7tDTAmzuUFyk_dk",
  authDomain: "voiceauthentix.firebaseapp.com",
  projectId: "voiceauthentix",
  storageBucket: "voiceauthentix.firebasestorage.app",
  messagingSenderId: "914917433595",
  appId: "1:914917433595:web:054f65c513ad877a3a905e",
  measurementId: "G-CEXW4PCT7H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ── INJECT LOGIN UI ──────────────────────────────────────────────
function injectLoginUI() {
    if (document.getElementById('va-auth-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'va-auth-overlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(5,8,16,0.97);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
    `;

    overlay.innerHTML = `
        <div style="
            background: rgba(12,18,32,0.98);
            border: 1px solid rgba(0,200,255,0.2);
            border-radius: 20px;
            padding: 40px;
            width: 90%;
            max-width: 420px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        ">
            <div style="text-align:center;margin-bottom:32px;">
                <div style="font-family:Syne,sans-serif;font-size:24px;font-weight:800;color:#e8f0ff;margin-bottom:8px;">
                    <span style="color:#00c8ff;">Voice</span>Authentix
                </div>
                <div style="font-size:12px;color:#5a6a8a;font-family:JetBrains Mono,monospace;letter-spacing:2px;">AI DEEPFAKE DETECTION</div>
            </div>

            <div style="display:flex;background:rgba(0,0,0,0.3);border-radius:10px;padding:4px;margin-bottom:24px;">
                <button id="tab-login" onclick="window._switchTab('login')" style="flex:1;padding:10px;border:none;border-radius:8px;background:linear-gradient(135deg,#00c8ff,#7b2ff7);color:white;font-family:JetBrains Mono,monospace;font-size:12px;font-weight:700;cursor:pointer;letter-spacing:1px;">SIGN IN</button>
                <button id="tab-signup" onclick="window._switchTab('signup')" style="flex:1;padding:10px;border:none;border-radius:8px;background:transparent;color:#5a6a8a;font-family:JetBrains Mono,monospace;font-size:12px;font-weight:700;cursor:pointer;letter-spacing:1px;">SIGN UP</button>
            </div>

            <div id="auth-title" style="font-family:Syne,sans-serif;font-size:18px;font-weight:700;color:#e8f0ff;margin-bottom:20px;text-align:center;">Welcome Back</div>

            <div id="auth-error" style="display:none;background:rgba(255,61,110,0.1);border:1px solid rgba(255,61,110,0.3);border-radius:8px;padding:10px 14px;color:#ff3d6e;font-size:12px;font-family:JetBrains Mono,monospace;margin-bottom:16px;"></div>
            <div id="auth-success" style="display:none;background:rgba(0,255,170,0.1);border:1px solid rgba(0,255,170,0.3);border-radius:8px;padding:10px 14px;color:#00ffaa;font-size:12px;font-family:JetBrains Mono,monospace;margin-bottom:16px;"></div>

            <div id="name-field" style="display:none;margin-bottom:16px;">
                <label style="font-size:11px;color:#5a6a8a;font-family:JetBrains Mono,monospace;letter-spacing:1px;display:block;margin-bottom:6px;">YOUR NAME</label>
                <input id="auth-name" type="text" placeholder="Enter your name" style="width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(0,200,255,0.2);border-radius:8px;padding:12px 14px;color:#e8f0ff;font-family:JetBrains Mono,monospace;font-size:13px;outline:none;box-sizing:border-box;">
            </div>

            <div style="margin-bottom:16px;">
                <label style="font-size:11px;color:#5a6a8a;font-family:JetBrains Mono,monospace;letter-spacing:1px;display:block;margin-bottom:6px;">EMAIL</label>
                <input id="auth-email" type="email" placeholder="Enter your email" style="width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(0,200,255,0.2);border-radius:8px;padding:12px 14px;color:#e8f0ff;font-family:JetBrains Mono,monospace;font-size:13px;outline:none;box-sizing:border-box;">
            </div>

            <div style="margin-bottom:24px;">
                <label style="font-size:11px;color:#5a6a8a;font-family:JetBrains Mono,monospace;letter-spacing:1px;display:block;margin-bottom:6px;">PASSWORD</label>
                <input id="auth-password" type="password" placeholder="Enter your password" style="width:100%;background:rgba(0,0,0,0.3);border:1px solid rgba(0,200,255,0.2);border-radius:8px;padding:12px 14px;color:#e8f0ff;font-family:JetBrains Mono,monospace;font-size:13px;outline:none;box-sizing:border-box;">
            </div>

            <button id="auth-main-btn" onclick="window._handleEmailAuth()" style="width:100%;background:linear-gradient(135deg,#00c8ff,#7b2ff7);border:none;border-radius:10px;padding:14px;color:white;font-family:JetBrains Mono,monospace;font-size:13px;font-weight:700;cursor:pointer;letter-spacing:1px;margin-bottom:16px;">SIGN IN</button>

            <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                <div style="flex:1;height:1px;background:rgba(0,200,255,0.1);"></div>
                <span style="font-size:11px;color:#5a6a8a;font-family:JetBrains Mono,monospace;">OR</span>
                <div style="flex:1;height:1px;background:rgba(0,200,255,0.1);"></div>
            </div>

            <button onclick="window._handleGoogleAuth()" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px;color:#e8f0ff;font-family:JetBrains Mono,monospace;font-size:12px;font-weight:700;cursor:pointer;letter-spacing:1px;display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:16px;">
                <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
            </button>

            <div style="text-align:center;">
                <button onclick="window._skipAuth()" style="background:none;border:none;color:#5a6a8a;font-size:11px;font-family:JetBrains Mono,monospace;cursor:pointer;text-decoration:underline;">Continue without login</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
}

// ── SWITCH TABS ──────────────────────────────────────────────────
function switchTab(tab) {
    const isLogin = tab === 'login';
    document.getElementById('tab-login').style.background = isLogin ? 'linear-gradient(135deg,#00c8ff,#7b2ff7)' : 'transparent';
    document.getElementById('tab-login').style.color = isLogin ? 'white' : '#5a6a8a';
    document.getElementById('tab-signup').style.background = !isLogin ? 'linear-gradient(135deg,#00c8ff,#7b2ff7)' : 'transparent';
    document.getElementById('tab-signup').style.color = !isLogin ? 'white' : '#5a6a8a';
    document.getElementById('name-field').style.display = isLogin ? 'none' : 'block';
    document.getElementById('auth-title').textContent = isLogin ? 'Welcome Back' : 'Create Account';
    document.getElementById('auth-main-btn').textContent = isLogin ? 'SIGN IN' : 'CREATE ACCOUNT';
    document.getElementById('auth-error').style.display = 'none';
    document.getElementById('auth-success').style.display = 'none';
    window._authMode = tab;
}

window._authMode = 'login';

// ── EMAIL AUTH ───────────────────────────────────────────────────
async function handleEmailAuth() {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const errorEl = document.getElementById('auth-error');
    const successEl = document.getElementById('auth-success');
    const btn = document.getElementById('auth-main-btn');

    if (!email || !password) {
        errorEl.textContent = 'Please enter email and password';
        errorEl.style.display = 'block';
        return;
    }

    btn.textContent = 'Please wait...';
    btn.disabled = true;
    errorEl.style.display = 'none';

    try {
        if (window._authMode === 'login') {
            await signInWithEmailAndPassword(auth, email, password);
        } else {
            await createUserWithEmailAndPassword(auth, email, password);
            successEl.textContent = 'Account created successfully!';
            successEl.style.display = 'block';
        }
    } catch (err) {
        btn.textContent = window._authMode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT';
        btn.disabled = false;
        errorEl.textContent = getErrorMessage(err.code);
        errorEl.style.display = 'block';
    }
}

// ── GOOGLE AUTH ──────────────────────────────────────────────────
async function handleGoogleAuth() {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (err) {
        const errorEl = document.getElementById('auth-error');
        if (errorEl) {
            errorEl.textContent = getErrorMessage(err.code);
            errorEl.style.display = 'block';
        }
    }
}

// ── SKIP AUTH ────────────────────────────────────────────────────
function skipAuth() {
    sessionStorage.setItem('va_guest', 'true');
    removeAuthOverlay();
}

// ── SIGN OUT ─────────────────────────────────────────────────────
async function signOutUser() {
    await signOut(auth);
    sessionStorage.removeItem('va_guest');
    injectLoginUI();
}

// ── REMOVE OVERLAY ───────────────────────────────────────────────
function removeAuthOverlay() {
    const overlay = document.getElementById('va-auth-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s';
        setTimeout(() => overlay.remove(), 300);
    }
}

// ── SHOW USER IN NAVBAR ──────────────────────────────────────────
function showUserInNavbar(user) {
    const existing = document.getElementById('va-user-info');
    if (existing) existing.remove();

    const navbar = document.querySelector('nav');
    if (!navbar) return;

    const name = user.displayName || user.email.split('@')[0];
    const photo = user.photoURL;

    const userDiv = document.createElement('div');
    userDiv.id = 'va-user-info';
    userDiv.style.cssText = 'display:flex;align-items:center;gap:10px;margin-left:auto;';
    userDiv.innerHTML = `
        ${photo ? `<img src="${photo}" style="width:28px;height:28px;border-radius:50%;border:2px solid #00c8ff;" alt="profile">` : ''}
        <span style="font-family:JetBrains Mono,monospace;font-size:11px;color:#00c8ff;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${name}</span>
        <button onclick="window._signOutUser()" style="background:rgba(255,61,110,0.1);border:1px solid rgba(255,61,110,0.3);border-radius:6px;padding:4px 10px;color:#ff3d6e;font-family:JetBrains Mono,monospace;font-size:10px;cursor:pointer;letter-spacing:1px;">LOGOUT</button>
    `;
    navbar.appendChild(userDiv);
}

// ── ERROR MESSAGES ───────────────────────────────────────────────
function getErrorMessage(code) {
    const messages = {
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/email-already-in-use': 'Email already registered. Please sign in',
        'auth/weak-password': 'Password must be at least 6 characters',
        'auth/invalid-email': 'Please enter a valid email address',
        'auth/too-many-requests': 'Too many attempts. Please try again later',
        'auth/popup-closed-by-user': 'Google sign-in was cancelled',
        'auth/network-request-failed': 'Network error. Check your connection',
        'auth/invalid-credential': 'Invalid email or password',
    };
    return messages[code] || 'Something went wrong. Please try again';
}

// ── EXPORT TO WINDOW ─────────────────────────────────────────────
window._switchTab = switchTab;
window._handleEmailAuth = handleEmailAuth;
window._handleGoogleAuth = handleGoogleAuth;
window._skipAuth = skipAuth;
window._signOutUser = signOutUser;

// ── AUTH STATE OBSERVER ──────────────────────────────────────────
onAuthStateChanged(auth, (user) => {
    if (user) {
        removeAuthOverlay();
        showUserInNavbar(user);
    } else {
        const isGuest = sessionStorage.getItem('va_guest');
        if (!isGuest) {
            setTimeout(injectLoginUI, 1000);
        }
    }
});
