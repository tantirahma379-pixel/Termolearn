// ==========================================
// GOOGLE APPS SCRIPT UNTUK TERMOLEARN
// ==========================================
// Cara penggunaan:
// 1. Buat Google Spreadsheet baru (misal: "Data Termolearn").
// 2. Klik menu Ekstensi > Apps Script.
// 3. Hapus kode yang ada, lalu salin (paste) semua kode di file ini ke sana (Code.gs).
// 4. Simpan (Ctrl+S / Cmd+S).
// 5. Jalankan fungsi `setup` sekali saja dengan memilihnya di dropdown atas dan klik tombol "Jalankan", lalu izinkan akses.
// 6. Klik tombol "Terapkan" (Deploy) > "Deployment baru".
// 7. Pilih jenis: "Aplikasi Web" (Web App).
// 8. Akses: "Siapa saja" (Anyone).
// 9. Salin URL Web App yang dihasilkan. URL tersebut akan digunakan sebagai endpoint API di aplikasi Termolearn.
// ==========================================

const SHEET_NAME_USERS = 'Users';
const ADMIN_EMAIL = 'admin@thermolearn.id';

// Fungsi untuk setup awal sheet
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Setup Sheet Users
  let sheetUsers = ss.getSheetByName(SHEET_NAME_USERS);
  if (!sheetUsers) {
    sheetUsers = ss.insertSheet(SHEET_NAME_USERS);
    sheetUsers.appendRow(['Timestamp', 'Email', 'Password', 'Nama', 'Role', 'Login Terakhir']);
    sheetUsers.getRange("A1:F1").setFontWeight("bold");
    sheetUsers.setFrozenRows(1);
  }
}

// Fungsi utama untuk menerima request POST dari aplikasi Termolearn
function doPost(e) {
  try {
    // Parse data JSON yang dikirimkan dari aplikasi
    const params = JSON.parse(e.postData.contents);
    const action = params.action;
    const email = params.email || 'siswa@thermolearn.id';
    const password = params.password || '';
    const name = params.name || email.split('@')[0];
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME_USERS);
    
    if (!sheet) {
      setup();
      sheet = ss.getSheetByName(SHEET_NAME_USERS);
    }
    
    const data = sheet.getDataRange().getValues();
    let userRowIndex = -1;
    let userData = null;
    
    // Cari apakah user (email) sudah terdaftar
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === email) { // Index 1 adalah kolom Email
        userRowIndex = i + 1; // +1 karena getRange 1-indexed dan kita skip i=0 di sini untuk row? (i adalah 0-indexed dari array, tapi row index di sheet adalah i+1)
        userData = {
          email: data[i][1],
          password: data[i][2], // Index 2 adalah kolom Password
          name: data[i][3], // Index 3 adalah kolom Nama
          role: data[i][4]  // Index 4 adalah kolom Role
        };
        break;
      }
    }
    
    const timestamp = new Date();
    
    if (action === 'login') {
      if (userRowIndex !== -1) {
        // Cek password
        if (userData.password !== password) {
          return createJsonResponse({
            status: 'error',
            message: 'Password salah!'
          });
        }
        // Update waktu login terakhir (kolom ke-6)
        sheet.getRange(userRowIndex, 6).setValue(timestamp);
        
        return createJsonResponse({
          status: 'success',
          message: 'Login berhasil',
          data: userData
        });
      } else {
        return createJsonResponse({
          status: 'error',
          message: 'Email belum terdaftar. Silakan daftar terlebih dahulu.'
        });
      }
      
    } else if (action === 'register') {
      if (userRowIndex !== -1) {
        return createJsonResponse({
          status: 'error',
          message: 'Email sudah terdaftar. Silakan login.'
        });
      } else {
        if (!password) {
          return createJsonResponse({
            status: 'error',
            message: 'Password tidak boleh kosong untuk pendaftaran baru.'
          });
        }
        // User baru: Tambahkan ke sheet
        const role = (email === ADMIN_EMAIL) ? 'admin' : 'siswa';
        sheet.appendRow([timestamp, email, password, name, role, timestamp]);
        userData = { email: email, name: name, role: role };
        
        return createJsonResponse({
          status: 'success',
          message: 'Pendaftaran berhasil',
          data: userData
        });
      }
      
    } else {
      return createJsonResponse({
        status: 'error',
        message: 'Action tidak valid'
      });
    }
    
  } catch (error) {
    return createJsonResponse({
      status: 'error',
      message: 'Terjadi kesalahan: ' + error.toString()
    });
  }
}

// Menangani preflight request (CORS)
function doOptions(e) {
  return createJsonResponse({ status: 'success' });
}

// Helper untuk membuat JSON response yang support CORS
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// Menangani request GET untuk menampilkan halaman HTML
function doGet(e) {
  // Merender file index.html. Pastikan Anda membuat file index.html di Apps Script
  // setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL) digunakan agar 
  // web app bisa di-embed (iframe) dari domain/github pages lain.
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('ThermoLearn')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
