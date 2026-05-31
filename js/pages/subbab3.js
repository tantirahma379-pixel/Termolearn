
/***********************
 * Subbab 3 Page
 ***********************/
function renderSubbab3(app) {
    var key = "s3";
    var label = "Subbab 3";
    setChatContext(label + ": tanya konsep, rumus, contoh soal.");

    var res = currentUserResult();
    var savedScore = res ? res[key] : null;

    var nextHash = "#/s4";
    var nextUnlocked = canOpen(nextHash);

    var lockedInfo = "";
    if (typeof savedScore === "number") {
        lockedInfo = '<div class="lockHint">&#128274; Nilai ' + label + ' sudah terkunci (' + savedScore + '). Submit ulang hanya untuk latihan (tidak mengubah nilai).</div>';
    }

    var quizSectionClass = nextUnlocked ? "" : " stage-locked";
    var nextBtnClass = nextUnlocked ? "" : "disabled";
    var nextBtnOnclick = nextUnlocked ? 'onclick="go(\'' + nextHash + '\')"' : 'disabled="disabled"';
    var nextLockHint = nextUnlocked ? "" : '<div class="lockHint">Next masih terkunci. Submit (pertama kali) agar terbuka 🙂</div>';
    var scoreText = typeof savedScore === "number" ? savedScore : "—";

    var html = '\
<section class="card">\
  <div class="cardPad">\
    <div class="row" style="justify-content:space-between;">\
      <div>\
        <span class="badge"><i></i> ' + label.toUpperCase() + '</span>\
        <h2 style="margin:10px 0 6px; font-size:32px;">' + escapeHtml(state.content[key].title) + '</h2>\
        <p class="subtitle" style="margin:0;">Pada subbab ini, kamu akan mempelajari cara menentukan perubahan entalpi (ΔH) suatu reaksi kimia melalui percobaan kalorimeter dan perhitungan menggunakan Hukum Hess. Kamu juga akan belajar menganalisis perubahan suhu selama reaksi berlangsung, menghitung kalor reaksi berdasarkan data percobaan, serta menentukan nilai ΔH reaksi yang sulit diukur secara langsung melalui penggabungan beberapa persamaan reaksi kimia.</p>\
      </div>\
      <div class="scoreBadge">&#127919; Skor Terkunci: <span style="font-size:14px;">' + scoreText + '</span></div>\
    </div>\
    <div class="divider"></div>\
    <div id="stageProgressBar"></div>\
    <div id="subContent">' + state.content[key].html + '</div>\
    <div class="row" style="margin-top:10px;">\
      <button class="btn btnGhost" onclick="go(\'#/materi\')">&#11013;&#65039; Back ke Materi</button>\
    </div>\
    <div id="quizSection' + quizSectionClass + '">\
      <div class="divider"></div>\
      <h3 style="margin:0 0 8px;">&#129392; Kuis Verifikasi Konsep (' + label + ')</h3>\
      ' + lockedInfo + '\
      <div id="quizArea"></div>\
      <div class="row" style="margin-top:10px;">\
        <button class="btn btnGhost" onclick="go(\'#/materi\')">&#11013;&#65039; Back</button>\
        <button class="btn btnPrimary" onclick="submitQuiz(\'' + key + '\')">Submit &#10004;</button>\
        <button class="btn btnGhost ' + nextBtnClass + '" ' + nextBtnOnclick + '>&#10145;&#65039; Next</button>\
      </div>\
      ' + nextLockHint + '\
    </div>\
  </div>\
</section>';

    app.innerHTML = html;

    renderQuiz(key);
    initDragDrop();
    initStages(key);
}

function unlockAndScrollS3() {
    unlockNextStage("s3");
    setTimeout(function() {
        var next = document.querySelector('.content-stage[data-stage="3"]');
        if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
}

function unlockAndScrollS3Kesimpulan() {
    unlockNextStage("s3");
    setTimeout(function() {
        var next = document.querySelector('.content-stage[data-stage="4"]');
        if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
}

function checkS3Praktikum() {
    var tAwal = document.getElementById("s3_suhu_awal").value;
    var tAkhir = document.getElementById("s3_suhu_akhir").value;
    var dt = document.getElementById("s3_dt").value;
    var hitung = document.getElementById("s3_perhitungan").value;
    var alasan = document.getElementById("s3_alasan").value;
    var kesimpulanPraktikum = document.getElementById("s3_kesimpulan_praktikum").value;

    var sifat = "";
    var radios = document.getElementsByName("s3_sifat");
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            sifat = radios[i].value;
            break;
        }
    }

    var fb = document.getElementById("feedback_s3_praktikum");
    fb.style.display = "block";

    if (!tAwal || !tAkhir || !dt || !hitung || !sifat || !alasan || !kesimpulanPraktikum) {
        fb.innerHTML = '<div style="padding:10px; background:rgba(239,68,68,0.1); color:#b91c1c; border-radius:6px;">&#9888;&#65039; Harap lengkapi semua isian terlebih dahulu!</div>';
        return;
    }

    var score = 0;
    var dtNum = parseFloat(dt);
    var tAwalNum = parseFloat(tAwal);
    var tAkhirNum = parseFloat(tAkhir);

    if (!isNaN(dtNum) && !isNaN(tAwalNum) && !isNaN(tAkhirNum) && Math.abs(dtNum - (tAkhirNum - tAwalNum)) < 0.1) {
        score += 30;
    }

    if (hitung.indexOf("2940") !== -1) {
        score += 40;
    }

    if (sifat === "eksoterm") {
        score += 20;
    }

    if (kesimpulanPraktikum.length >= 20) {
        score += 10;
    }

    var lanjutBtn = '<div style="margin-top:16px; text-align:center;"><button class="btn btnPrimary" onclick="unlockAndScrollS3()">Lanjutkan ke Hukum Hess ▶️</button></div>';
    fb.innerHTML = '<div style="padding:12px; background:rgba(16,185,129,0.1); color:#065f46; border-radius:6px;"><strong>&#10004; Jawaban Tersimpan!</strong><br>Nilai Lkpd Praktikum kamu: ' + score + '/100<br><em>Feedback: Perhitungan kalor yang benar adalah q = m x c x ΔT = 100 x 4,2 x 7 = 2940 J. Reaksi bersifat eksoterm karena suhu meningkat (melepas kalor).</em>' + lanjutBtn + '</div>';
}

function checkS3Hess() {
    var h1_1 = document.getElementById("s3_hess1_1").value.trim();
    var h1_2 = document.getElementById("s3_hess1_2").value.trim();
    var h2_1 = document.getElementById("s3_hess2_1").value.trim();
    var h2_2 = document.getElementById("s3_hess2_2").value.trim();

    var fb = document.getElementById("feedback_s3_hess");
    fb.style.display = "block";

    if (!h1_1 || !h1_2 || !h2_1 || !h2_2) {
        fb.innerHTML = '<div style="padding:10px; background:rgba(239,68,68,0.1); color:#b91c1c; border-radius:6px;">&#128161; Perhatikan hubungan antara koefisien reaksi dan ΔH. Harap isi semua kolom!</div>';
        return;
    }

    var benar = true;
    var h1_1Num = parseFloat(h1_1.replace(",", "."));
    var h1_2Num = parseFloat(h1_2.replace(",", "."));
    var h2_2Num = parseFloat(h2_2.replace(",", "."));

    if (Math.abs(h1_1Num - 285.8) > 0.1) { benar = false; }
    if (Math.abs(h1_2Num - (-571.6)) > 0.1) { benar = false; }
    if (Math.abs(h2_2Num - (-110.5)) > 0.1) { benar = false; }

    if (benar) {
        var lanjutBtnHess = '<div style="margin-top:16px; text-align:center;"><button class="btn btnPrimary" onclick="unlockAndScrollS3Kesimpulan()">Lanjutkan ke Kesimpulan ▶️</button></div>';
        fb.innerHTML = '<div style="padding:12px; background:rgba(16,185,129,0.1); color:#065f46; border-radius:6px;"><strong>&#10004; Tepat Sekali!</strong><br>Aktivitas 1: Jika reaksi dibalik, ΔH menjadi +285,8 kJ. Jika dikali 2, ΔH menjadi −571,6 kJ.<br>Aktivitas 2: Reaksi 2 dibalik, lalu dijumlahkan dengan Reaksi 1. ΔH = −393,5 + 283 = −110,5 kJ.' + lanjutBtnHess + '</div>';
    } else {
        fb.innerHTML = '<div style="padding:10px; background:rgba(239,68,68,0.1); color:#b91c1c; border-radius:6px;">&#128161; Masih ada yang kurang tepat. Coba periksa kembali tanda positif/negatif dan perhitungan matematikanya! Petunjuk: jika reaksi dibalik, tanda ΔH berubah.</div>';
    }
}
