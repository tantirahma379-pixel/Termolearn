
/***********************
 * Materi Page (Modules)
 ***********************/
function renderMateri(app) {
  setChatContext("Materi: kerjakan Subbab 1 dulu ya.");

  const me = state.session;
  const res = currentUserResult() || { s1: null, s2: null, s3: null, s4: null, eval: null };

  app.innerHTML = `
        <section class="card">
          <div class="cardPad">
            <div class="row" style="justify-content:space-between;">
              <div>
                <span class="badge"><i></i> Petunjuk Penggunaan</span>
                <div style="position:relative;padding-top:0;width:900px;height:500px;"><iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/nttmb/Petunjuk-Penggunaan/" title="Petunjuk Penggunaan " seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe></div>
              </div>
            </div>

            <div class="divider"></div>
            <div class="row" style="justify-content:space-between;">
              <div>
                <span class="badge"><i></i> Peta Konsep</span>
                <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/gambar/PetaKonsep.png" alt="Peta Konsep Termokimia" style="width:100%; max-width:1000px; margin:20px 0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
              </div>
            </div>

            <div class="divider"></div>
            <div class="row" style="justify-content:space-between;">
              <div>
                <span class="badge"><i></i> Profil</span>
                <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@latest/gambar/Profil.png" alt="Profil" style="width:100%; max-width:1000px; margin:20px 0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
              </div>
            </div>

            <div class="divider"></div>

            <div class="row" style="justify-content:space-between;">
              <div>
                <span class="badge"><i></i> MATERI PEMBELAJARAN</span>
                <h2 style="margin:10px 0 6px; font-size:26px;">Pilih Materi 📚</h2>
                <p class="subtitle" style="margin:0;">
                  Kerjakan subbab berurutan. Nilai <b>otomatis dikunci</b> setelah pertama kali submit.
                </p>
              </div>
            </div>

            <div class="divider"></div>

            <div class="modules">
              ${moduleCardLocked("s1", "SUBBAB 1", state.content.s1.title, "Eksoterm/Endoterm • Sistem/Lingkungan", res.s1, true)}
              ${moduleCardLocked("s2", "SUBBAB 2", state.content.s2.title, "Kondisi standar • ∆H° • ∆H°f", res.s2, hasDone("s1"))}
              ${moduleCardLocked("s3", "SUBBAB 3", state.content.s3.title, "Kalorimeter • Hess • Energi ikatan", res.s3, hasDone("s1") && hasDone("s2"))}
              ${moduleCardLocked("s4", "SUBBAB 4", state.content.s4.title, "Pendalaman Materi", res.s4, hasDone("s1") && hasDone("s2") && hasDone("s3"))}
            </div>

            <div class="lockHint">
              🔒 Evaluasi akan muncul setelah semua Subbab selesai.
            </div>

            ${allSubbabDone() ? `
              <div class="divider"></div>
              <div class="row">
                <button class="btn btnPrimary" onclick="go('#/eval')">Mulai Evaluasi 🧪</button>
              </div>
            ` : ``}
          </div>
        </section>
      `;
}
