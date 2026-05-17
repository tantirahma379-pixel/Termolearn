
/***********************
 * Subbab 1 Page
 ***********************/
function renderSubbab1(app) {
  const key = "s1";
  const label = "Subbab 1";
  setChatContext(`${label}: tanya konsep, rumus, contoh soal.`);

  const res = currentUserResult();
  const savedScore = res ? res[key] : null;

  const nextHash = "#/s2";
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
                <h2 style="margin:10px 0 6px; font-size:26px;">${escapeHtml(state.content[key].title)}</h2>
                <p class="subtitle" style="margin:0;">Sekarang saatnya kita mulai mempelajari dasar-dasar termokimia.</p>
              </div>
              <div class="scoreBadge">🎯 Skor Terkunci: <span style="font-size:14px;">${typeof savedScore === "number" ? savedScore : "—"}</span></div>
            </div>

            <div class="divider"></div>

            <div id="stageProgressBar"></div>

            <div id="subContent">${state.content[key].html}</div>

            <div class="row" style="margin-top:10px;">
              <button class="btn btnGhost" onclick="go('#/materi')">⬅️ Back ke Materi</button>
            </div>

            <div id="quizSection" class="stage-locked">
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
  initDragDrop();
  initStages(key);
}
