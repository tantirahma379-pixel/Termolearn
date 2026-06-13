
/***********************
 * Subbab 2 Page
 ***********************/
function renderSubbab2(app) {
  const key = "s2";
  const label = "Subbab 2";
  setChatContext(`${label}: tanya konsep, rumus, contoh soal.`);

  const res = currentUserResult();
  const savedScore = res ? res[key] : null;

  const nextHash = "#/s3";
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
                <p class="subtitle" style="margin:0;">Pada subbab ini, kamu akan mempelajari mengapa setiap bahan bakar dapat menghasilkan kalor yang berbeda saat digunakan dalam kehidupan sehari-hari. Kamu juga akan belajar memahami konsep perubahan entalpi standar (ΔH°) dan kondisi standar reaksi, menganalisis jenis perubahan entalpi berdasarkan data atau diagram entalpi, serta mengaitkan perubahan entalpi standar dengan pemanfaatan energi dalam berbagai peristiwa di sekitar kita.</p>
              </div>
              <div class="scoreBadge">🎯 Skor Terkunci: <span style="font-size:14px;">${typeof savedScore === "number" ? savedScore : "—"}</span></div>
            </div>

            <div class="divider"></div>

            <div id="stageProgressBar"></div>

            <div id="subContent">${state.content[key].html}</div>

            <div id="quizSection" class="stage-locked">
              <div class="divider"></div>

              <h3 style="margin:0 0 8px;">🧠 Kuis Verifikasi Konsep (${label})</h3>
              ${lockedInfo}
              <div id="quizArea"></div>

              <div class="divider"></div>
              <div class="contentBox">
                <h4 style="margin:16px 0 8px;">✍ Kesimpulan</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Tuliskan kesimpulanmu mengenai hubungan antara: perubahan entalpi standar, jenis reaksi eksoterm dan endoterm, nilai ΔH°, serta kalor yang dilepaskan atau diserap pada reaksi kimia.
                </p>
                <textarea id="kesimpulanS2" rows="5" style="width:100%; padding:12px; border:1px solid rgba(17,24,39,0.15); border-radius:8px; font-size:14px; resize:vertical; box-sizing:border-box;" placeholder="Tuliskan kesimpulanmu di sini..."></textarea>
              </div>

              <div class="row" style="margin-top:20px;">
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
  initDragDrop();
  initStages(key);
}
