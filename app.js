// ===== ROLLER COLOR 1 – APP.JS =====

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf5KBOHkKBliQQ3lkivvbgLkP1Z7l1yx5GPx2scEdVf721jsw/formResponse';

// 100 codes valides intégrés directement
const VALID_CODES = [
  "226MLGJN7E","23WZ36QVQ4","27WJ9W7JCD","3J5NSEL3DB","3L6YEVN5VT",
  "3R6H5AGBUD","4BYKNXZ55B","4M9J4DZVZA","58LKWFAF3F","5B4UB2UFLT",
  "5RE5PCBYZJ","5SZTKUDZHT","5VX6CFQ95X","5WFPRQTJ2P","66FMUQLF5J",
  "6ULSMEB5HD","76XQFQBACZ","7BNLDLKN45","7HHB7E28QL","7KMX32R7XG",
  "7PLELHRNLT","85ZZG995S2","882MP7PNFV","893G9ZYWVY","96NUYWLCNG",
  "9VQ3XADVCG","A3ZK5YXGN9","AVTFYCA95B","AWMMETWMVN","BBHENXGXD6",
  "BCW292G4MD","BL2384GDUW","BLRA4SP4RC","BTP3HUPB49","BW5VRXU7B8",
  "BZJULURRUJ","CAPGK9RSH8","D4MNXJL2CP","DCQ529RL7T","DYK9L8EMYT",
  "EA558VP9PE","EWZHUJW4UX","EX4DMHE72V","EXKKYE3S8A","F3RRE264AU",
  "FGD74QZVEK","FUQ5EZHJPU","FWM876KJXB","GBE6JSVGGU","GBWGA2RN4Z",
  "HJEPP3UZNL","HLWMBPX4ZL","HTUH5GQ335","JCDMQLDNPA","JL6EDMC9GJ",
  "K92VASYPFN","KQGJ47STSA","L9CPMQ6ABE","LD6XXHYHB6","LFXYZKUUTH",
  "LT77YVU9NQ","M9UGK8AG6E","MN6TJ7SLRR","N6H2X9SESU","N6U4GVJVY4",
  "N7PK2KRA2G","NFX2SKNHWL","NZTSDGDSMR","PV2JP5WCY7","PXTBWUBNHH",
  "Q6DWUD57PB","Q9WZM3QB63","QPL4YWWS9F","QS8CWW6G9G","RKEG2E8FJZ",
  "RNZSSBU5FW","RUR7BWL42T","SHCZTYZME2","SJUDNR7RSS","SQ26T7HDG4",
  "SRLTVUSEFT","STPGRE48ZR","TG3HU9DGVC","TTNFDUE4AF","TTRQXG9CT7",
  "TUQRNHVJ6E","U6A6C9W9DC","U8BB8VXR28","UX2WC8NK9T","V2XXCD3BCH",
  "VW7DCELFMA","WUDXNZVVAD","X2EG4ZTKCL","X8QVQNNT94","XWXBN3GZ2G",
  "ZJ2MMSRUXB","ZJRGTM885C","ZNGTEBLYHL","ZVNUZ6EZHW","ZZHVU4YWWV"
];

let currentData = null;
let currentAccessCode = null;

// ============================================================
// VÉRIFICATION À L'ENTRÉE — via localStorage uniquement
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (!code || !VALID_CODES.includes(code)) {
    showBlocked(); return;
  }

  // Vérifier si déjà utilisé dans localStorage
  const used = localStorage.getItem('rc1_used_' + code);
  if (used) {
    showMainContent();
    showAlreadyUsed(); return;
  }

  currentAccessCode = code;
  showMainContent();
  document.getElementById('accessCodeDisplay').textContent = `Code d'accès : ${code}`;
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
  const niveau = document.getElementById('niveau').value;
  const statut = document.getElementById('statut').value;
  const prix = document.getElementById('prix').value;
  const pointure = document.getElementById('pointure').value.trim();

  if (!nom) { showToast('Veuillez entrer votre nom.'); return null; }
  if (!prenom) { showToast('Veuillez entrer votre prénom.'); return null; }
  if (!email || !/\S+@\S+\.\S+/.test(email)) { showToast('Adresse e-mail invalide.'); return null; }
  if (!whatsapp) { showToast('Veuillez entrer votre numéro WhatsApp.'); return null; }
  if (!taille) { showToast('Veuillez choisir votre taille de t-shirt.'); return null; }
  if (!niveau) { showToast('Veuillez choisir votre niveau en roller.'); return null; }
  if (!statut) { showToast('Veuillez choisir votre statut de ticket.'); return null; }
  if (!prix) { showToast('Veuillez choisir le prix de votre ticket.'); return null; }

  return { nom, prenom, email, whatsapp, taille, niveau, statut, prix, pointure };
}

// ============================================================
// GÉNÉRATION DU TICKET
// ============================================================
function generateTicket() {
  if (!currentAccessCode) { showToast('Accès non autorisé.'); return; }

  const data = validateForm();
  if (!data) return;

  const ref = generateRef();

  // Marquer utilisé dans localStorage
  localStorage.setItem('rc1_used_' + currentAccessCode, JSON.stringify({
    nom: `${data.prenom} ${data.nom}`, ref, date: new Date().toISOString()
  }));

  // Envoyer vers Google Forms en arrière-plan
  const formData = new FormData();
  formData.append('entry.1028937762', currentAccessCode);
  formData.append('entry.1573522421', data.nom);
  formData.append('entry.460397449', data.prenom);
  formData.append('entry.757513500', data.email);
  formData.append('entry.2139388098', data.whatsapp);
  formData.append('entry.150173702', data.taille);
  formData.append('entry.186289773', data.niveau);
  formData.append('entry.2133509689', data.statut);
  formData.append('entry.596297077', data.prix);
  formData.append('entry.441166058', data.pointure || '-');
  formData.append('entry.1657431358', ref);
  fetch(FORM_URL, { method: 'POST', body: formData, mode: 'no-cors' }).catch(() => {});

  // Remplir et afficher le ticket immédiatement
  currentData = { ...data, ref, code: currentAccessCode };

  document.getElementById('tNom').textContent = `${data.prenom} ${data.nom}`;
  document.getElementById('tEmail').textContent = data.email;
  document.getElementById('tWhatsapp').textContent = data.whatsapp;
  document.getElementById('tTaille').textContent = data.taille;
  document.getElementById('tNiveau').textContent = data.niveau;
  document.getElementById('tStatut').textContent = data.statut;
  document.getElementById('tPrix').textContent = data.prix;
  document.getElementById('tRef').textContent = `Réf : ${ref}`;

  const qrContainer = document.getElementById('qrcode');
  qrContainer.innerHTML = '';
  new QRCode(qrContainer, {
    text: JSON.stringify({ ref, code: currentAccessCode, nom: `${data.prenom} ${data.nom}`, taille: data.taille, statut: data.statut, event: 'ROLLER COLOR 1', date: '27 Juin 2025' }),
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
    ['WHATSAPP', currentData.whatsapp],
    ['T-SHIRT', currentData.taille],
    ['NIVEAU', currentData.niveau],
    ['STATUT', currentData.statut],
    ['PRIX', currentData.prix],
  ];
  infos.forEach(([lbl, val], i) => {
    const x = i < 3 ? 8 : 72;
    const yy = 36 + (i % 3) * 13;
    doc.setFontSize(6); doc.setTextColor(212, 160, 23); doc.setFont('helvetica', 'bold'); doc.text(lbl, x, yy);
    doc.setFontSize(8); doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'normal'); doc.text(String(val), x, yy + 5);
  });

  // Date et lieu
  doc.setFontSize(6); doc.setTextColor(212, 160, 23); doc.setFont('helvetica', 'bold');
  doc.text('DATE', 8, 75); doc.text('LIEU', 72, 75);
  doc.setFontSize(8); doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'normal');
  doc.text('27 Juin 2025 – 15H GMT', 8, 80);
  doc.text("Patte d'oie, cite Asecna", 72, 80);

  const qrCanvas = document.querySelector('#qrcode canvas');
  if (qrCanvas) {
    doc.addImage(qrCanvas.toDataURL('image/png'), 'PNG', 114, 30, 26, 26);
    doc.setFontSize(5.5); doc.setTextColor(150, 150, 150);
    doc.text("Scanner a l'entree", 127, 59, { align: 'center' });
  }

  doc.setDrawColor(50, 50, 50); doc.setLineWidth(0.3);
  doc.setLineDashPattern([2, 1], 0); doc.line(8, 86, 140, 86); doc.setLineDashPattern([], 0);

  ['Pass Entree','T-shirt','Couleurs fluos','Rafraichissement','Coaching roller']
    .forEach((p, i) => { doc.setFontSize(6.5); doc.setTextColor(212,160,23); doc.text(p, [8,34,60,88,114][i], 92); });

  doc.setFontSize(5.5); doc.setTextColor(80,80,80);
  doc.text(`Ref : ${currentData.ref}`, 8, 99);
  doc.text('Developpe par DynamixVision', 80, 99, { align: 'center' });

  doc.save(`ticket_${currentData.ref}_${currentData.nom.toLowerCase()}.pdf`);
  showToast('✅ Ticket telecharge !', 'success');
}
