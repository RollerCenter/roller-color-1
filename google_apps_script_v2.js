const SHEET_ID = '1-UP-pQNeC2qaIAZyyyrm4ACovKxLBmi5mihH2tDG9l8';
const SHEET_NAME = 'Feuille 1';

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

function doGet(e) {
  const action = e.parameter.action;
  const code = e.parameter.code;

  let result;

  if (action === 'check') {
    if (!VALID_CODES.includes(code)) {
      result = { valid: false, reason: 'invalid' };
    } else {
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
      const data = sheet.getDataRange().getValues();
      const used = data.slice(1).some(row => row[0] === code);
      result = { valid: !used, reason: used ? 'used' : 'ok' };
    }
  } else if (action === 'register') {
    // Enregistrement via GET (évite les problèmes CORS du POST)
    const nom = e.parameter.nom;
    const prenom = e.parameter.prenom;
    const email = e.parameter.email;
    const whatsapp = e.parameter.whatsapp;
    const taille = e.parameter.taille;
    const ref = e.parameter.ref;

    if (!VALID_CODES.includes(code)) {
      result = { success: false, reason: 'invalid_code' };
    } else {
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
      const data = sheet.getDataRange().getValues();
      const used = data.slice(1).some(row => row[0] === code);

      if (used) {
        result = { success: false, reason: 'already_used' };
      } else {
        const now = new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Ouagadougou' });
        sheet.appendRow([code, nom, prenom, email, whatsapp, taille, now, ref,
          e.parameter.niveau || '', e.parameter.statut || '', e.parameter.prix || '', e.parameter.pointure || '']);
        result = { success: true };
      }
    }
  } else {
    result = { error: 'action inconnue' };
  }

  // CORS : répondre en JSONP ou JSON avec headers ouverts
  const callback = e.parameter.callback;
  if (callback) {
    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify(result)})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  return doGet(e);
}
