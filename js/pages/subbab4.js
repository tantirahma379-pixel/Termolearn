
/***********************
 * Subbab 4 Page
 ***********************/
function renderSubbab4(app) {
    const key = "s4";
    const label = "Subbab 4";
    setChatContext(`${label}: tanya konsep, rumus, contoh soal.`);

    const res = currentUserResult();
    const savedScore = res ? res[key] : null;

    const nextHash = "#/eval";
    const nextUnlocked = canOpen(nextHash);

    const lockedInfo = (typeof savedScore === "number")
        ? `<div class="lockHint">🔒 Nilai ${label} sudah terkunci (${savedScore}). Submit ulang hanya untuk latihan (tidak mengubah nilai).</div>`
        : ``;

    app.innerHTML = `
        <section class="card">
          <div class="cardPad">
            <div class="row" style="justify-content:space-between;">
              <div>
                <span class="badge"><i></i> ${label.toUpperCase()}</span>
                <h2 style="margin:10px 0 6px; font-size:32px;">${escapeHtml(state.content[key].title)}</h2>
                <p class="subtitle" style="margin:0;">Pada subbab ini, kamu akan mempelajari cara menentukan perubahan entalpi reaksi (ΔH) menggunakan data energi ikatan dan data entalpi pembentukan standar (ΔH°f). Kamu juga akan belajar menganalisis hubungan antara pemutusan dan pembentukan ikatan terhadap perubahan energi reaksi, menghitung ΔH reaksi berdasarkan data termokimia, serta menginterpretasikan hasil perhitungan untuk menentukan sifat reaksi kimia yang terjadi.</p>
              </div>
              <div class="scoreBadge">🎯 Skor Terkunci: <span style="font-size:14px;">${typeof savedScore === "number" ? savedScore : "—"}</span></div>
            </div>

            <div class="divider"></div>

            <div id="stageProgressBar"></div>

            <div id="subContent">${state.content[key].html}</div>

            <div id="quizSection">
              <div class="divider"></div>

              <h3 style="margin:0 0 8px;">🧠 Kuis Singkat (${label})</h3>
              ${lockedInfo}
              <div id="quizArea"></div>

              <div class="row" style="margin-top:10px;">
                <button class="btn btnGhost" onclick="go('#/materi')">⬅️ Back</button>
                <button class="btn btnPrimary" onclick="submitQuiz('${key}')">Submit ✅</button>
                <button class="btn btnGhost ${nextUnlocked ? "" : "disabled"}" ${nextUnlocked ? `onclick="go('${nextHash}')"` : "disabled"}>
                  Next ➡️
                </button>
              </div>

              ${nextUnlocked ? "" : `<div class="lockHint">Next masih terkunci. Submit (pertama kali) agar terbuka 🙂</div>`}
            </div>
          </div>
        </section>
      `;

    renderQuiz(key);
    initStages(key);
}

function unlockAndScrollS4Entalpi() {
    unlockNextStage("s4");
    setTimeout(function() {
        var next = document.querySelector('.content-stage[data-stage="4"]');
        if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
}

function checkS4Ikatan() {
  const diputus = document.getElementById("s4_ikatan_diputus").value.toLowerCase();
  const dibentuk = document.getElementById("s4_ikatan_dibentuk").value.toLowerCase();
  const eDiputus = document.getElementById("s4_energi_diputus").value;
  const eDibentuk = document.getElementById("s4_energi_dibentuk").value;
  const dh = document.getElementById("s4_dh_reaksi1").value;

  const fb = document.getElementById("feedback_s4_ikatan");
  fb.style.display = "block";

  if (!diputus || !dibentuk || !eDiputus || !eDibentuk || !dh) {
    fb.innerHTML = '<div style="padding:10px; background:rgba(239,68,68,0.1); color:#b91c1c; border-radius:6px;">⚠️ Harap isi semua kolom penyelesaian terlebih dahulu!</div>';
    return;
  }

  let benar = true;
  if (eDiputus != "2646") benar = false;
  if (eDibentuk != "3300") benar = false;
  if (dh != "-654" && dh != "-650") benar = false;

  if (benar) {
    var lanjutBtn = '<div style="margin-top:16px; text-align:center;"><button class="btn btnPrimary" onclick="unlockAndScrollS4Entalpi()">Lanjutkan ke Bagian B \u25B6️</button></div>';
    fb.innerHTML = '<div style="padding:10px; background:rgba(16,185,129,0.1); color:#065f46; border-radius:6px;"><strong>✅ Jawaban benar!</strong><br>Kamu berhasil menentukan \u0394H reaksi menggunakan data energi ikatan.<br><em>Energi Diputus: 2646 kJ. Energi Dibentuk: 3300 kJ. \u0394H = 2646 - 3300 = -654 kJ.</em>' + lanjutBtn + '</div>';
  } else {
    fb.innerHTML = '<div style="padding:10px; background:rgba(239,68,68,0.1); color:#b91c1c; border-radius:6px;">❌ Jawaban masih kurang tepat.<br>💡 Petunjuk: Perhatikan kembali jumlah ikatan pada pereaksi dan produk. Ingat bahwa pemutusan ikatan membutuhkan energi.</div>';
  }
}

function checkS4Entalpi() {
  const dhfProduk = document.getElementById("s4_dhf_produk").value;
  const dhfPereaksi = document.getElementById("s4_dhf_pereaksi").value;
  const sumProduk = document.getElementById("s4_sum_produk").value;
  const sumPereaksi = document.getElementById("s4_sum_pereaksi").value;
  const dh = document.getElementById("s4_dh_reaksi2").value;

  const fb = document.getElementById("feedback_s4_entalpi");
  fb.style.display = "block";

  if (!dhfProduk || !dhfPereaksi || !sumProduk || !sumPereaksi || !dh) {
    fb.innerHTML = '<div style="padding:10px; background:rgba(239,68,68,0.1); color:#b91c1c; border-radius:6px;">⚠️ Harap isi semua kolom penyelesaian terlebih dahulu!</div>';
    return;
  }

  let benar = true;
  if (sumProduk != "-965.1") benar = false;
  if (sumPereaksi != "-74.9") benar = false;
  if (dh != "-890.2") benar = false;

  if (benar) {
    fb.innerHTML = '<div style="padding:10px; background:rgba(16,185,129,0.1); color:#065f46; border-radius:6px;"><strong>✅ Jawaban benar!</strong><br>Kamu berhasil menentukan \u0394H reaksi menggunakan data \u0394H\u00B0f.<br><em>\u0394H = (-965.1) - (-74.9) = -890.2 kJ. Karena \u0394H negatif, reaksi bersifat eksoterm.</em></div>';
  } else {
    fb.innerHTML = '<div style="padding:10px; background:rgba(239,68,68,0.1); color:#b91c1c; border-radius:6px;">❌ Jawaban masih kurang tepat.<br>💡 Petunjuk: Perhatikan kembali jumlah \u0394H\u00B0f produk dan pereaksi. Jangan lupa koefisien reaksi memengaruhi perhitungan \u0394H.</div>';
  }
}
