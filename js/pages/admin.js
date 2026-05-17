/***********************
 * Admin Page
 ***********************/
async function renderAdmin(app) {
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

    // Loading state while fetching data
    app.innerHTML = `
      <section class="card"><div class="cardPad centerCol">
         <p>Memuat data pengunjung dan nilai...</p>
      </div></section>
    `;

    try {
        const res = await fetch("/api/results");
        if (!res.ok) throw new Error("Gagal mengambil data");

        const results = await res.json();
        const rows = results.sort((a, b) => (b.updated_at || "").localeCompare(a.updated_at || ""));
        const countUsers = rows.length;

        app.innerHTML = `
            <section class="card">
              <div class="cardPad">
                <div class="row" style="justify-content:space-between;">
                  <div>
                    <span class="badge"><i></i> SERVER PEMBUAT • DASHBOARD ADMIN</span>
                    <h2 style="margin:10px 0 6px; font-size:26px;">Kelola ThermoLearn 👩‍🏫</h2>
                    <p class="subtitle" style="margin:0;">
                      Lihat nilai siswa (nilai terkunci).
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
    } catch (error) {
        console.error(error);
        app.innerHTML = `
          <section class="card"><div class="cardPad centerCol">
            <h2 style="margin:0 0 6px; color:var(--red);">Terjadi Kesalahan</h2>
            <p class="subtitle" style="margin:0;">Gagal memuat data dari database.</p>
            <div class="divider"></div>
            <button class="btn btnPrimary" onclick="renderAdmin(document.getElementById('app'))">Coba Lagi</button>
          </div></section>
        `;
    }
}
