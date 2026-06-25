// ===== ROLLER COLOR 1 – APP.JS =====

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx7IpqgMm4NfT_a5Bk2dEKCM4zD8QbVc5AXpzQ6DIwTQiis7xaHIIAPFe7DeNOVyCqm/exec';

let currentData = null;
let currentAccessCode = null;

// ============================================================
// VÉRIFICATION À L'ENTRÉE
// ============================================================
window.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (!code) { showBlocked(); return; }

  // Vérifier le code via Google Sheets
  try {
    const res = await fetch(`${SCRIPT_URL}?action=check&code=${code}`);
    const data = await res.json();

    if (!data.valid && data.reason === 'invalid') {
      showBlocked();
      return;
    }

    if (!data.valid && data.reason === 'used') {
      showMainContent();
      showAlreadyUsed();
      return;
    }

    // Code valide et libre
    currentAccessCode = code;
    showMainContent();
    document.getElementById('accessCodeDisplay').textContent = `Code d'accès : ${code}`;

  } catch (err) {
    // En cas d'erreur réseau, bloquer par sécurité
    showBlocked();
  }
});

function showBlocked() {
  document.getElementById('accessBlocked').style.display = 'flex';
  document.getElementById('mainContent').style.display = 'none';
}

function showMainContent() {
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
async function generateTicket() {
  if (!currentAccessCode) { showToast('Accès non autorisé.'); return; }

  const data = validateForm();
  if (!data) return;

  const ref = generateRef();

  // Afficher chargement
  const btn = document.querySelector('.btn-generate');
  btn.textContent = '⏳ Enregistrement en cours...';
  btn.disabled = true;

  try {
    // Envoyer les données à Google Sheets
    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        code: currentAccessCode,
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        whatsapp: data.whatsapp,
        taille: data.taille,
        ref: ref
      })
    });

    const result = await res.json();

    if (!result.success) {
      if (result.reason === 'already_used') {
        showAlreadyUsed();
      } else {
        showToast('❌ Code invalide ou erreur. Contactez-nous.');
      }
      btn.textContent = '🎫 Générer mon ticket';
      btn.disabled = false;
      return;
    }

    // Succès — générer le ticket
    currentData = { ...data, ref, code: currentAccessCode };

    document.getElementById('tNom').textContent = `${data.prenom} ${data.nom}`;
    document.getElementById('tEmail').textContent = data.email;
    document.getElementById('tWhatsapp').textContent = data.whatsapp;
    document.getElementById('tTaille').textContent = data.taille;
    document.getElementById('tRef').textContent = `Réf : ${ref}`;

    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';
    new QRCode(qrContainer, {
      text: JSON.stringify({
        ref,
        code: currentAccessCode,
        nom: `${data.prenom} ${data.nom}`,
        taille: data.taille,
        event: 'ROLLER COLOR 1',
        date: '27 Juin 2025'
      }),
      width: 120, height: 120,
      colorDark: '#000000', colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });

    document.getElementById('formCard').style.display = 'none';
    const preview = document.getElementById('ticketPreview');
    preview.style.display = 'block';
    preview.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast('✅ Ticket généré avec succès !', 'success');

  } catch (err) {
    showToast('❌ Erreur réseau. Vérifiez votre connexion.');
    btn.textContent = '🎫 Générer mon ticket';
    btn.disabled = false;
  }
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
