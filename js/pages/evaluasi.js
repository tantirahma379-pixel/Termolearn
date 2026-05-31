
/***********************
 * Evaluasi Page
 ***********************/
function renderEvaluasi(app) {
    setChatContext("Evaluasi: latihan campuran termokimia.");

    const res = currentUserResult() || {};
    const nextUnlocked = hasDone("eval");
    const savedScore = (typeof res.eval === "number") ? res.eval : null;

    const lockedInfo = (typeof savedScore === "number")
        ? `<div class="lockHint">🔒 Nilai Evaluasi sudah terkunci (${savedScore}). Submit ulang hanya untuk latihan.</div>`
        : ``;

    app.innerHTML = `
        <section class="card">
          <div class="cardPad">
            <div class="row" style="justify-content:space-between;">
              <div>
                <span class="badge"><i></i> EVALUASI AKHIR</span>
                <h2 style="margin:10px 0 6px; font-size:32px;">Uji Pemahaman Termokimia 🧪</h2>
                <p class="subtitle" style="margin:0;">Selamat! Kamu telah menyelesaikan seluruh materi. Sekarang saatnya menguji pemahamanmu melalui evaluasi akhir ini. Terdapat 10 soal pilihan ganda. Kerjakan dengan teliti ya!</p>
                <ul style="margin:0 0 12px; padding-left:20px; font-size:13.5px; color:#4b5563;">
                  <li>Pilih satu jawaban yang paling tepat.</li>
                  <li>Setelah semua soal dijawab, submit kuis untuk melihat nilai akhirmu.</li>
                </ul>
              </div>
              <div class="scoreBadge">🧾 Skor Terkunci: <span style="font-size:14px;">${typeof res.eval === "number" ? res.eval : "—"}</span></div>
            </div>

            <div class="divider"></div>

            <div class="divider"></div>

            <h3 style="margin:0 0 8px;">🧠 Kuis Evaluasi</h3>
            ${lockedInfo}
            <div id="quizArea"></div>

            <div class="row" style="margin-top:10px;">
              <button class="btn btnGhost" onclick="go('#/s3')">⬅️ Back</button>
              <button class="btn btnPrimary" onclick="submitQuiz('eval')">Submit Evaluasi ✅</button>
              <button class="btn btnGhost ${nextUnlocked ? "" : "disabled"}" ${nextUnlocked ? `onclick="go('#/final')"` : "disabled"}>
                Next ➡️
              </button>
            </div>
          </div>
        </section>
      `;

    renderQuiz("eval");
}
