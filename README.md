# bismillah-jadi-mediaku

## Deploy ke Appwrite

Proyek ini dapat di-deploy (di-hosting) menggunakan layanan **Appwrite Hosting**. Berikut adalah panduan langkah demi langkah untuk melakukan deploy:

### Cara 1: Menggunakan Appwrite CLI (Terminal)

1. **Install Appwrite CLI**
   Pastikan Node.js sudah terinstal, lalu jalankan perintah berikut untuk menginstal CLI secara global:
   ```bash
   npm install -g appwrite-cli
   ```

2. **Login ke Appwrite**
   ```bash
   appwrite login
   ```
   *Anda akan diminta untuk memasukkan endpoint Appwrite (misal: `https://cloud.appwrite.io/v1`), email, dan password.*

3. **Inisialisasi Proyek**
   Jalankan perintah ini di root folder proyek Anda:
   ```bash
   appwrite init project
   ```
   *Pilih untuk menghubungkan ke proyek yang sudah ada di console Appwrite atau buat yang baru.*

4. **Konfigurasi & Deploy Hosting**
   Untuk mengunggah file website Anda, jalankan:
   ```bash
   appwrite deploy hosting
   ```
   *Catatan: Saat ditanya direktori (directory) yang akan di-deploy, pastikan Anda memasukkan folder tempat file `index.html` dan aset Anda berada (misalnya `.` untuk folder saat ini atau `dist` / `public` jika menggunakan bundler).*

### Cara 2: Integrasi GitHub otomatis dari Appwrite Cloud

1. Buka [Console Appwrite Cloud](https://cloud.appwrite.io/) dan buka/buat proyek Anda.
2. Pergi ke menu **Hosting** di bagian Build pada sidebar kiri.
3. Klik tombol **Create Deployment** dan pilih opsi **GitHub**.
4. Hubungkan dan beri otorisasi Appwrite ke akun GitHub Anda, lalu pilih repositori proyek ini.
5. Konfigurasikan root directory, build command (contoh: kosong, atau jika pakai bundler `bun run build`), dan output directory (tempat file statis berada).
6. Klik **Create**. Appwrite sekarang akan secara otomatis men-deploy web Anda setiap kali ada *commit/push* baru ke branch repositori GitHub Anda.
