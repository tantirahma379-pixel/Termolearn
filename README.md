# bismillah-jadi-mediaku

## Arsitektur Google Apps Script & GitHub CDN

Aplikasi ini menggunakan kombinasi **Google Apps Script (GAS)** sebagai backend/penyedia UI utama dan **GitHub** sebagai CDN (Content Delivery Network) untuk aset statis (CSS, JS, Gambar).

### Panduan Deployment:

1. **Upload Aset ke GitHub**
   Pastikan semua folder aset (`css`, `js`, `gambar`) sudah di-push ke repository GitHub Anda (misal: `tantirahma379-pixel/Termolearn`). Aset ini akan diakses menggunakan jsDelivr CDN.

2. **Setup Google Apps Script**
   - Buka Google Sheets baru, lalu klik **Ekstensi > Apps Script**.
   - Salin isi dari file `google_script.js` ke dalam `Code.gs`.
   - Buat file baru di Apps Script dengan nama `index.html` (File > Baru > HTML), lalu salin seluruh isi dari file `index.html` lokal Anda ke sana.
   - Variabel `GAS_URL` di dalam `index.html` akan otomatis diisi dengan URL Web App oleh `<?= ScriptApp.getService().getUrl() ?>`.
   - Jalankan fungsi setup atau deploy untuk membuat dokumen spreadsheet dengan nama sheet Users dan Results
   - Pada sheet Users tambahkan secara manual user dengan role admin, untuk kolom password bisa diisi secara plain teks tanpa di encode karena nanti akan dienkripsi otomatis saat login

3. **Deploy Web App**
   - Di editor Apps Script, klik tombol **Terapkan (Deploy) > Deployment baru**.
   - Pilih jenis **Aplikasi Web** (Web App).
   - Atur Akses ke **Siapa saja** (Anyone).
   - Salin **URL Web App** yang dihasilkan.

4. **Setup Custom Domain dengan Iframe**
   - Agar pengguna bisa mengakses aplikasi melalui domain atau hosting yang mudah diingat (seperti GitHub Pages, Appwrite, dll.), gunakan file `iframe.html`.
   - Buka file `iframe.html` dan ganti `ISI_URL_WEB_APP_GOOGLE_SCRIPT_DI_SINI` pada tag `<iframe src="...">` dengan URL Web App yang Anda dapatkan di langkah 3.
   - Host file `iframe.html` ini (Anda bisa mengganti namanya menjadi `index.html` di hosting utama Anda) untuk digunakan sebagai pintu masuk (entry point) aplikasi.

### Cara setting di localhost menggunakan index.html

1. Buka localstorage di inspect element (F12) pada browser
2. Tambah var dev_gas_url
3. Isi dengan url Google Apps Script Web App yang sudah di deploy
4. Buka index.html di browser (localhost)

### Cara setting di localhost menggunakan iframe.html

1. Copy file iframe.html ke folder web server lokal anda
2. Ganti "ISI_URL_WEB_APP_GOOGLE_SCRIPT_DI_SINI" dengan url web app (GAS) yang sudah di deploy
3. Buka iframe.html di browser (localhost)

### Menghapus cache jsDelivr

Untuk membersihkan cache jsDelivr:
```
https://www.jsdelivr.com/terms/cache-purging
```
masukan url: https://cdn.jsdelivr.net/gh/[NAMA_USER]/[NAMA_REPO]@latest/[NAMA_FILE_YANG_DI_EDIT]
```
https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/css/style.css, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/utils.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/data.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/state.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/components.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/chat.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/quiz.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/pages/cover.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/pages/landing.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/pages/materi.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/pages/subbab1.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/pages/subbab2.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/pages/subbab3.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/pages/subbab4.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/pages/evaluasi.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/pages/final.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/pages/admin.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/pages/router.js, https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/js/main.js
```