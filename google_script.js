// ==========================================
// GOOGLE APPS SCRIPT UNTUK TERMOLEARN (MODIFIED)
// ==========================================

const SHEET_NAME_USERS = 'Users';
const SHEET_NAME_RESULTS = 'Results';
const SPREADSHEET_ID = 'xxxxxxxx';

// Helper untuk mendapatkan objek Spreadsheet secara aman (bound atau standalone)
function getSpreadsheet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) return ss;
  } catch (e) {}
  try {
    if (SPREADSHEET_ID && SPREADSHEET_ID !== 'xxxxxxxx') {
      return SpreadsheetApp.openById(SPREADSHEET_ID);
    }
  } catch (e) {}
  return SpreadsheetApp.getActiveSpreadsheet();
}

function setup() {
  const ss = getSpreadsheet();

  let sheetUsers = ss.getSheetByName(SHEET_NAME_USERS);
  if (!sheetUsers) {
    sheetUsers = ss.insertSheet(SHEET_NAME_USERS);
    sheetUsers.appendRow(['Timestamp', 'Email', 'Password', 'Nama', 'Role', 'Login Terakhir', 'ResetToken', 'ResetTokenExpires']);
    sheetUsers.getRange("A1:H1").setFontWeight("bold");
    sheetUsers.setFrozenRows(1);
  } else {
    // Pastikan jika kolom ResetToken & ResetTokenExpires belum ada, kita tambahkan header-nya
    const headers = sheetUsers.getRange("1:1").getValues()[0];
    if (headers.indexOf('ResetToken') === -1) {
      sheetUsers.getRange(1, 7).setValue('ResetToken');
      sheetUsers.getRange(1, 8).setValue('ResetTokenExpires');
      sheetUsers.getRange("A1:H1").setFontWeight("bold");
    }
  }

  let sheetResults = ss.getSheetByName(SHEET_NAME_RESULTS);
  if (!sheetResults) {
    sheetResults = ss.insertSheet(SHEET_NAME_RESULTS);
    sheetResults.appendRow(['Email', 'Nama', 'S1', 'S2', 'S3', 'S4', 'Eval', 'Total', 'Summary', 'UpdatedAt']);
    sheetResults.getRange("A1:J1").setFontWeight("bold");
    sheetResults.setFrozenRows(1);
  }
}

// Regex validasi format email
function validateEmailFormat(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Hash MD5 ganda (MD5(MD5(input))) untuk keamanan password
function md5(input) {
  if (!input) return '';
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, input, Utilities.Charset.UTF_8);
  let hash = '';
  for (let i = 0; i < digest.length; i++) {
    let byteVal = digest[i];
    if (byteVal < 0) byteVal += 256;
    let byteString = byteVal.toString(16);
    if (byteString.length === 1) byteString = '0' + byteString;
    hash += byteString;
  }
  return hash;
}

function md5Double(input) {
  return md5(md5(input));
}

function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    const action = params.action;
    const email = (params.email || '').trim();

    if (action === 'get_all_results') {
      return handleGetAllResults();
    }

    if (action === 'sync_result') {
      return handleSyncResult(params);
    }

    // Untuk action login, register, forgot_password, reset_password_submit
    if (!email) {
      return createJsonResponse({ status: 'error', message: 'Email tidak boleh kosong.' });
    }

    if (!validateEmailFormat(email)) {
      return createJsonResponse({ status: 'error', message: 'Format email tidak valid.' });
    }

    const password = params.password || '';
    const name = params.name || email.split('@')[0];

    const ss = getSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME_USERS);
    if (!sheet) {
      setup();
      sheet = ss.getSheetByName(SHEET_NAME_USERS);
    }

    const data = sheet.getDataRange().getValues();
    let userRowIndex = -1;
    let userData = null;

    // Cari baris user berdasarkan email
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === email) {
        userRowIndex = i + 1;
        userData = {
          email: data[i][1],
          password: data[i][2],
          name: data[i][3],
          role: data[i][4]
        };
        break;
      }
    }

    const timestamp = new Date();

    if (action === 'login') {
      if (userRowIndex !== -1) {
        const hashedPassword = md5Double(password);
        
        // Cek jika password cocok (baik dengan hash md5 2x maupun plain text untuk kompatibilitas migrasi)
        if (userData.password !== hashedPassword && userData.password !== password) {
          return createJsonResponse({ status: 'error', message: 'Password salah!' });
        }
        
        // Jika password di database masih berupa plain text, kita migrasikan otomatis ke md5 2x!
        if (userData.password === password) {
          sheet.getRange(userRowIndex, 3).setValue(hashedPassword);
        }

        sheet.getRange(userRowIndex, 6).setValue(timestamp);

        // Ambil progress dari tabel Results
        const progress = getUserProgress(email);

        return createJsonResponse({
          status: 'success',
          message: 'Login berhasil',
          data: userData,
          progress: progress
        });
      } else {
        return createJsonResponse({ status: 'error', message: 'Email belum terdaftar. Silakan daftar terlebih dahulu.' });
      }

    } else if (action === 'register') {
      if (userRowIndex !== -1) {
        return createJsonResponse({ status: 'error', message: 'Email sudah terdaftar. Silakan login.' });
      } else {
        if (!password) {
          return createJsonResponse({ status: 'error', message: 'Password tidak boleh kosong untuk pendaftaran baru.' });
        }
        const role = 'siswa';
        const hashedPassword = md5Double(password);
        // Simpan data pendaftaran baru
        sheet.appendRow([timestamp, email, hashedPassword, name, role, timestamp, '', '']);
        userData = { email: email, name: name, role: role };

        return createJsonResponse({
          status: 'success',
          message: 'Pendaftaran berhasil',
          data: userData,
          progress: null
        });
      }

    } else if (action === 'forgot_password') {
      if (userRowIndex === -1) {
        return createJsonResponse({ status: 'error', message: 'Email belum terdaftar.' });
      }

      const token = Utilities.getUuid();
      const expires = new Date();
      expires.setHours(expires.getHours() + 1); // Token berlaku 1 jam

      // Simpan token di kolom ResetToken (kolom 7) dan ResetTokenExpires (kolom 8)
      sheet.getRange(userRowIndex, 7).setValue(token);
      sheet.getRange(userRowIndex, 8).setValue(expires.toISOString());

      // Kirim email reset password
      const resetLink = ScriptApp.getService().getUrl() + "?action=reset_password&email=" + encodeURIComponent(email) + "&token=" + token;

      const subject = "[ThermoLearn] Permintaan Reset Password Anda";
      const body = "Halo " + userData.name + ",\n\n" +
                   "Kami menerima permintaan untuk mereset password akun ThermoLearn Anda.\n" +
                   "Silakan klik link di bawah ini untuk mereset password Anda (Link aktif selama 1 jam):\n\n" +
                   resetLink + "\n\n" +
                   "Jika Anda tidak merasa meminta hal ini, silakan abaikan email ini.\n\n" +
                   "Salam,\nThermoLearn Team";

      try {
        MailApp.sendEmail(email, subject, body);
      } catch (mailError) {
        return createJsonResponse({ status: 'error', message: 'Gagal mengirim email reset: ' + mailError.toString() });
      }

      return createJsonResponse({
        status: 'success',
        message: 'Link reset password telah dikirim ke email Anda. Silakan cek inbox/spam.'
      });

    } else if (action === 'reset_password_submit') {
      const token = params.token || '';
      const newPassword = params.newPassword || '';

      if (!newPassword) {
        return createJsonResponse({ status: 'error', message: 'Password baru tidak boleh kosong.' });
      }

      if (userRowIndex === -1) {
        return createJsonResponse({ status: 'error', message: 'Email tidak ditemukan.' });
      }

      const storedToken = sheet.getRange(userRowIndex, 7).getValue();
      const storedExpiresStr = sheet.getRange(userRowIndex, 8).getValue();

      if (!storedToken || storedToken !== token) {
        return createJsonResponse({ status: 'error', message: 'Token reset password tidak valid.' });
      }

      if (storedExpiresStr) {
        const expires = new Date(storedExpiresStr);
        if (new Date() > expires) {
          return createJsonResponse({ status: 'error', message: 'Token reset password telah kedaluwarsa.' });
        }
      } else {
        return createJsonResponse({ status: 'error', message: 'Token tidak valid.' });
      }

      const hashedPassword = md5Double(newPassword);
      // Update password (kolom 3)
      sheet.getRange(userRowIndex, 3).setValue(hashedPassword);

      // Hapus token reset yang sudah digunakan
      sheet.getRange(userRowIndex, 7).setValue('');
      sheet.getRange(userRowIndex, 8).setValue('');

      return createJsonResponse({
        status: 'success',
        message: 'Password berhasil diubah. Silakan login kembali dengan password baru.'
      });

    } else {
      return createJsonResponse({ status: 'error', message: 'Action tidak valid' });
    }

  } catch (error) {
    return createJsonResponse({ status: 'error', message: 'Terjadi kesalahan: ' + error.toString() });
  }
}

function handleSyncResult(params) {
  const ss = getSpreadsheet();
  let sheetResults = ss.getSheetByName(SHEET_NAME_RESULTS);
  if (!sheetResults) {
    setup();
    sheetResults = ss.getSheetByName(SHEET_NAME_RESULTS);
  }

  const email = params.email;
  const name = params.name;
  if (!email) return createJsonResponse({ status: 'error', message: 'Email tidak valid untuk sinkronisasi' });

  const data = sheetResults.getDataRange().getValues();
  let rowIndex = -1;
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) { // Kolom Email indeks 0
      rowIndex = i + 1;
      break;
    }
  }

  const rowData = [
    email,
    name || '',
    params.s1 !== undefined && params.s1 !== null ? params.s1 : '',
    params.s2 !== undefined && params.s2 !== null ? params.s2 : '',
    params.s3 !== undefined && params.s3 !== null ? params.s3 : '',
    params.s4 !== undefined && params.s4 !== null ? params.s4 : '',
    params.eval !== undefined && params.eval !== null ? params.eval : '',
    params.total !== undefined && params.total !== null ? params.total : '',
    params.summary || '',
    params.updatedAt || new Date().toISOString()
  ];

  if (rowIndex !== -1) {
    sheetResults.getRange(rowIndex, 1, 1, 10).setValues([rowData]);
  } else {
    sheetResults.appendRow(rowData);
  }

  return createJsonResponse({ status: 'success', message: 'Sync berhasil' });
}

function handleGetAllResults() {
  const ss = getSpreadsheet();
  const sheetResults = ss.getSheetByName(SHEET_NAME_RESULTS);
  if (!sheetResults) return createJsonResponse({ status: 'success', data: [] });

  const data = sheetResults.getDataRange().getValues();
  const resultData = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    resultData.push({
      email: row[0],
      name: row[1],
      s1: row[2] === '' ? null : Number(row[2]),
      s2: row[3] === '' ? null : Number(row[3]),
      s3: row[4] === '' ? null : Number(row[4]),
      s4: row[5] === '' ? null : Number(row[5]),
      eval: row[6] === '' ? null : Number(row[6]),
      total: row[7] === '' ? null : Number(row[7]),
      summary: row[8],
      updatedAt: row[9]
    });
  }
  return createJsonResponse({ status: 'success', data: resultData });
}

function getUserProgress(email) {
  const ss = getSpreadsheet();
  const sheetResults = ss.getSheetByName(SHEET_NAME_RESULTS);
  if (!sheetResults) return null;

  const data = sheetResults.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      const row = data[i];
      return {
        email: row[0],
        name: row[1],
        s1: row[2] === '' ? null : Number(row[2]),
        s2: row[3] === '' ? null : Number(row[3]),
        s3: row[4] === '' ? null : Number(row[4]),
        s4: row[5] === '' ? null : Number(row[5]),
        eval: row[6] === '' ? null : Number(row[6]),
        total: row[7] === '' ? null : Number(row[7]),
        summary: row[8],
        updatedAt: row[9]
      };
    }
  }
  return null;
}

function doOptions(e) {
  return createJsonResponse({ status: 'success' });
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const html = HtmlService.createTemplateFromFile('index');
  // Inject parameter ke html template
  html.action = e && e.parameter && e.parameter.action ? e.parameter.action : '';
  html.email = e && e.parameter && e.parameter.email ? e.parameter.email : '';
  html.token = e && e.parameter && e.parameter.token ? e.parameter.token : '';

  let gasUrl = '';
  try {
    gasUrl = ScriptApp.getService().getUrl();
  } catch (err) {
    // Fallback jika dijalankan langsung di editor Apps Script tanpa status Web App
  }
  html.gasUrl = gasUrl;

  return html.evaluate()
    .setTitle('ThermoLearn')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}