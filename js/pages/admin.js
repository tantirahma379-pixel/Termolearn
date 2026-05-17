/***********************
 * Admin Page
 ***********************/
function renderAdmin(app) {
    if (state.session?.role !== "admin") {
        app.innerHTML = `
          <section class="card"><div class="cardPad">
            <h2 style="margin:0 0 6px;">Akses ditolak</h2>
            <p class="subtitle" style="margin:0;">Halaman ini hanya untuk Admin.</p>
            <div class="divider"></div>
            <button class="btn btnPrimary" onclick="go('#/landing')">Kembali</button>
          </div></section>
        `;
        return;
    }

    setChatContext("Admin: kelola data nilai siswa.");

    const results = loadResultsFromStorage();
    const rows = results.sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
    const countUsers = rows.length;

    app.innerHTML = `
        <section class="card">
          <div class="cardPad">
            <div class="row" style="justify-content:space-between;">
              <div>
                <span class="badge"><i></i> LOKAL • DASHBOARD ADMIN</span>
                <h2 style="margin:10px 0 6px; font-size:26px;">Kelola ThermoLearn 👩‍🏫</h2>
                <p class="subtitle" style="margin:0;">
                  Lihat nilai siswa (nilai terkunci). Data tersimpan di localStorage.
                </p>
              </div>
              <div class="scoreBadge">👥 Pengunjung: <span style="font-size:14px;">${countUsers}</span></div>
            </div>

            <div class="divider"></div>

            <h3 style="margin:0 0 10px;">📋 Data Nilai (Terkunci)</h3>
            <div style="overflow:auto;">
              ${adminTable(rows)}
            </div>

            <div class="divider"></div>
            <div class="row">
              <button class="btn btnPrimary" onclick="go('#/landing')">Kembali ke Beranda</button>
              <button class="btn btnGhost" onclick="go('#/final')">Lihat Halaman Akhir</button>
            </div>
          </div>
        </section>
      `;
}
