// ===== ROLLER COLOR 1 – APP.JS =====

let currentData = null;
let currentAccessCode = null;

// ============================================================
// 100 CODES PRÉ-CHARGÉS – intégrés directement dans le fichier
// ============================================================
const PRESET_CODES = {
  "5C8ZGUQWEV": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "FYS4PYK4KG": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "HZB2HW66X9": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "S9ETYG2NMR": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "TUXN6QAKMW": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "BNNQ2QFJ5G": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "82L3XHDBJX": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "8KCUHTR3MV": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "NFWHZAYPP2": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "B56C9F48M5": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "L83UUGTL7P": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "NMK5ZJXD3L": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "K668CVBG3A": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "RGJHWHQ9BZ": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "4HRZAVTETC": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "BUE7PVJ8FP": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "VSSQB4MNFG": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "8YZL8XPVM2": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "9A7KWAYJEK": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "GF4MBPFANQ": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "82MVH554L9": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "HFTE4EWGZQ": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "63SAT9EJ9V": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "P75WWVZYU9": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "FC7WFHY6A6": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "KNHC34XS2Z": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "PRXWVNZVGF": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "SV7KEA6Y2G": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "UQBD34TPFA": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "WMP6Q8MTH9": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "KLKFJHVGEM": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "KD8K5AU6ZP": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "GQ6TYE9UN8": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "AV34ZK57T5": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "DT33P6F2SX": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "SS9A6C7WG6": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "H5SAALMDPM": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "964PDTRLEG": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "79WZEZ8FZF": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "RPBAR74VK5": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "9ZHQZY49ED": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "ZPNQNWGW5X": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "BZJ7WFHPEE": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "WBGSX7BTWB": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "VGJDMS2JQ4": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "LDMDM8XMDN": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "4LMDPQUZX2": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "GKCXBG3UC3": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "JW5N7G5SSR": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "AMZC422SNG": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "E72KUKD33Q": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "HA7R4PGNHM": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "CS5DAKX8XY": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "ZCTK7BDD7P": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "J567FAZ3BP": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "HLRYPVZPW7": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "YFZA3LUJMX": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "7WRUFVWK3K": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "YMFU4HSM2R": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "VTCKBZE8JJ": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "4XBP6QX2MX": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "A9B9MPN3TB": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "D7LQ5DLCSW": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "K669B8XQDU": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "2AX32ZTCRL": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "JTB373W7J2": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "R9NVP3P7LG": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "7CM2KJSHHP": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "3HKTSS9QAX": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "VPJ6K22KVJ": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "7CBANNZ7P5": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "4PGHJ5MS5Z": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "QVJ8XZLZSC": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "2TK7QNXLEL": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "6GHKGZCABB": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "HEJWKQ2MSZ": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "35WSRU7DWP": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "T66SYAQUSK": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "RAQSZKGZ2Y": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "ZM26W9XLPX": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "EVR4MPNNPC": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "F2C978L9JV": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "DBLTUWS9DZ": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "42YK3YAGMS": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "SLW8KKSR5U": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "SKH6AE29BB": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "XKVJ34AGTR": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "89H6E3HR5K": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "7S7N5YNXWX": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "LTR47A6HY4": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "4LBH3CC3N8": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "DDHCQHY4GG": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "53SZSUBSWB": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "2DGFZW6YWT": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "ZM47DDBEFJ": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "8GQTZ2CZHP": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "KXSAXFNTTU": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "UXMQBB38JL": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "CQ8PCZTW92": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  },
  "K9SQ28XRBE": {
    "used": false,
    "usedBy": null,
    "usedAt": null,
    "clientName": null,
    "createdAt": "2025-06-24T00:00:00.000Z"
  }
};

function getAllCodes() {
  try {
    const stored = JSON.parse(localStorage.getItem('rc1_codes') || 'null');
    if (stored) return stored;
  } catch {}
  // Première visite : on charge les codes depuis le fichier
  localStorage.setItem('rc1_codes', JSON.stringify(PRESET_CODES));
  return PRESET_CODES;
}

function saveCodes(codes) {
  localStorage.setItem('rc1_codes', JSON.stringify(codes));
}

function isCodeValid(code) {
  const codes = getAllCodes();
  return codes[code] && !codes[code].used;
}

function markCodeUsed(code, nom) {
  const codes = getAllCodes();
  if (codes[code]) {
    codes[code].used = true;
    codes[code].usedBy = nom;
    codes[code].usedAt = new Date().toISOString();
    saveCodes(codes);
  }
}

// ============================================================
// VÉRIFICATION À L'ENTRÉE
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (!code) { showBlocked(); return; }

  const codes = getAllCodes();

  if (!codes[code]) { showBlocked(); return; }

  if (codes[code].used) {
    showMainContent(code);
    showAlreadyUsed();
    return;
  }

  currentAccessCode = code;
  showMainContent(code);
  document.getElementById('accessCodeDisplay').textContent = `Code d'accès : ${code}`;
});

function showBlocked() {
  document.getElementById('accessBlocked').style.display = 'flex';
  document.getElementById('mainContent').style.display = 'none';
}

function showMainContent(code) {
  document.getElementById('accessBlocked').style.display = 'none';
  document.getElementById('mainContent').style.display = 'block';
}

function showAlreadyUsed() {
  document.getElementById('alreadyUsed').style.display = 'block';
  document.getElementById('formCard').style.display = 'none';
}

// ============================================================
// UTILITAIRES
// ============================================================
function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'RC1-';
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

function showToast(msg, type = 'error') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

function validateForm() {
  const nom = document.getElementById('nom').value.trim();
  const prenom = document.getElementById('prenom').value.trim();
  const email = document.getElementById('email').value.trim();
  const whatsapp = document.getElementById('whatsapp').value.trim();
  const taille = document.getElementById('taille').value;

  if (!nom) { showToast('Veuillez entrer votre nom.'); return null; }
  if (!prenom) { showToast('Veuillez entrer votre prénom.'); return null; }
  if (!email || !/\S+@\S+\.\S+/.test(email)) { showToast('Adresse e-mail invalide.'); return null; }
  if (!whatsapp) { showToast('Veuillez entrer votre numéro WhatsApp.'); return null; }
  if (!taille) { showToast('Veuillez choisir votre taille de t-shirt.'); return null; }

  return { nom, prenom, email, whatsapp, taille };
}

// ============================================================
// GÉNÉRATION DU TICKET
// ============================================================
function generateTicket() {
  if (!currentAccessCode) { showToast('Accès non autorisé.'); return; }
  if (!isCodeValid(currentAccessCode)) { showAlreadyUsed(); return; }

  const data = validateForm();
  if (!data) return;

  currentData = { ...data, ref: generateRef(), code: currentAccessCode };
  markCodeUsed(currentAccessCode, `${data.prenom} ${data.nom}`);

  document.getElementById('tNom').textContent = `${data.prenom} ${data.nom}`;
  document.getElementById('tEmail').textContent = data.email;
  document.getElementById('tWhatsapp').textContent = data.whatsapp;
  document.getElementById('tTaille').textContent = data.taille;
  document.getElementById('tRef').textContent = `Réf : ${currentData.ref}`;

  const qrContainer = document.getElementById('qrcode');
  qrContainer.innerHTML = '';
  new QRCode(qrContainer, {
    text: JSON.stringify({ ref: currentData.ref, code: currentAccessCode, nom: `${data.prenom} ${data.nom}`, taille: data.taille, event: 'ROLLER COLOR 1', date: '27 Juin 2025' }),
    width: 120, height: 120,
    colorDark: '#000000', colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  document.getElementById('formCard').style.display = 'none';
  const preview = document.getElementById('ticketPreview');
  preview.style.display = 'block';
  preview.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('✅ Ticket généré avec succès !', 'success');
}

// ============================================================
// TÉLÉCHARGEMENT PDF
// ============================================================
async function downloadTicketPDF() {
  if (!currentData) return;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [148, 105] });

  doc.setFillColor(10, 10, 10); doc.rect(0, 0, 148, 105, 'F');
  doc.setDrawColor(212, 160, 23); doc.setLineWidth(1.5); doc.rect(4, 4, 140, 97);
  doc.setDrawColor(80, 60, 0); doc.setLineWidth(0.3); doc.rect(6, 6, 136, 93);

  try {
    const logoImg = document.querySelector('.ticket-header img');
    const canvas = document.createElement('canvas'); canvas.width = 60; canvas.height = 60;
    canvas.getContext('2d').drawImage(logoImg, 0, 0, 60, 60);
    doc.addImage(canvas.toDataURL('image/png'), 'PNG', 8, 8, 18, 18);
  } catch(e) {}

  doc.setFont('helvetica', 'bold'); doc.setFontSize(20); doc.setTextColor(212, 160, 23);
  doc.text('ROLLER COLOR 1', 30, 17);
  doc.setFontSize(7); doc.setTextColor(150, 150, 150);
  doc.text('OMBRE ROLLER CENTER', 30, 23);
  doc.setDrawColor(212, 160, 23); doc.setLineWidth(0.5); doc.line(8, 28, 140, 28);

  const infos = [
    ['PARTICIPANT', `${currentData.prenom} ${currentData.nom}`],
    ['E-MAIL', currentData.email],
    ['WHATSAPP', currentData.whatsapp],
    ['T-SHIRT', currentData.taille],
    ['DATE', '27 Juin 2025 – 15H GMT'],
    ['LIEU', "Patte d'oie, cite Asecna"],
  ];
  infos.forEach(([lbl, val], i) => {
    const x = i < 3 ? 8 : 72;
    const yy = 36 + (i % 3) * 14;
    doc.setFontSize(6); doc.setTextColor(212, 160, 23); doc.setFont('helvetica', 'bold'); doc.text(lbl, x, yy);
    doc.setFontSize(8.5); doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'normal'); doc.text(val, x, yy + 5.5);
  });

  const qrCanvas = document.querySelector('#qrcode canvas');
  if (qrCanvas) {
    doc.addImage(qrCanvas.toDataURL('image/png'), 'PNG', 114, 30, 26, 26);
    doc.setFontSize(5.5); doc.setTextColor(150, 150, 150);
    doc.text("Scanner a l'entree", 127, 59, { align: 'center' });
  }

  doc.setDrawColor(50, 50, 50); doc.setLineWidth(0.3);
  doc.setLineDashPattern([2, 1], 0); doc.line(8, 75, 140, 75); doc.setLineDashPattern([], 0);

  ['Pass Entree','T-shirt','Couleurs fluos','Rafraichissement','Coaching roller']
    .forEach((p, i) => { doc.setFontSize(7); doc.setTextColor(212,160,23); doc.text(p, [8,36,64,90,116][i], 81); });

  doc.setFontSize(6); doc.setTextColor(100,100,100);
  doc.text(`Ref : ${currentData.ref}`, 8, 90);
  doc.text('Developpe par DynamixVision', 8, 95);

  doc.save(`ticket_${currentData.ref}_${currentData.nom.toLowerCase()}.pdf`);
  showToast('✅ Ticket telecharge !', 'success');
}
