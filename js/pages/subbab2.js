
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
                <p style="margin:8px 0 0; color:#6b7280; font-size:14px;">Setelah melakukan berbagai aktivitas analisis perubahan entalpi standar pada section sebelumnya, sekarang saatnya membuktikan pemahamanmu melalui kuis verifikasi konsep.</p>
              </div>
              <div class="scoreBadge">🎯 Skor Terkunci: <span style="font-size:14px;">${typeof savedScore === "number" ? savedScore : "—"}</span></div>
            </div>

            <div class="divider"></div>

            <div id="stageProgressBar"></div>

            <div id="subContent">${state.content[key].html}</div>

            <div id="quizSection">
              <div class="divider"></div>

              <h3 style="margin:0 0 8px;">🧠 Kuis Verifikasi Konsep (${label})</h3>
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
    initDragDrop();
    initStages(key);
}
