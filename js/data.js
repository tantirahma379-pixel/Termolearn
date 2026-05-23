
/***********************
 * Data & Constants
 ***********************/
const ADMIN_EMAIL = "tantirahma379@gmail.com";
const LS_KEYS = {
  session: "thermolearn_session_v1",
  users: "thermolearn_users_v1",
  content: "thermolearn_content_v1",
  results: "thermolearn_results_v1"
};

function defaultContent() {
  return {
    s1: {
      title: "Konsep Dasar Termokimia",
      html: `
            <!-- Stage 0: Video Pengamatan (SECTION 1) -->
            <div class="content-stage" data-stage="0" data-type="video">
              <div class="contentBox">
                <h4 style="margin:0 0 8px;">🔍 Yuk, amati video berikut!</h4>
                <p style="margin:0 0 12px; color:#6b7280; font-weight:650;">
                  Perhatikan fenomena kayu terbakar dan es mencair pada video. Amati perubahan suhu yang terjadi serta bagaimana kalor berpindah pada kedua peristiwa tersebut.
                </p>
                <div class="videoWrap" style="margin-bottom:20px; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/QxV4Xpz_lj0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
              </div>
            </div>

            <!-- Stage 1: Dugaan Awal (SECTION 2) -->
            <div class="content-stage" data-stage="1" data-type="activity">
              <div class="contentBox">
                <p style="margin:0 0 8px; color:#6b7280; font-weight:650;">
                  Setelah mengamati video tentang kayu terbakar dan es mencair, coba pikirkan: mengapa pembakaran kayu menghasilkan panas, sedangkan es batu membutuhkan kalor untuk mencair, serta bagaimana kalor dapat berpindah pada kedua peristiwa tersebut?
                </p>
                <h4 style="margin:12px 0 8px;">✍ DUGAAN AWAL</h4>
                <p style="margin:0 0 8px; color:#6b7280; font-weight:650;">Tuliskan jawabanmu pada kolom berikut.</p>
                <textarea id="dugaanAwal" rows="5" style="width:100%; padding:12px; border:1px solid rgba(17,24,39,0.15); border-radius:8px; font-size:14px; resize:vertical; box-sizing:border-box;" placeholder="Tuliskan dugaanmu di sini..."></textarea>
              </div>
            </div>

            <!-- Stage 2: Bahan Bacaan Interaktif (SECTION 3) -->
            <div class="content-stage" data-stage="2" data-type="content">
              <div class="contentBox">
                <h4 style="margin:0 0 8px;">📖 Bahan Bacaan Interaktif</h4>
                <p style="margin:0 0 12px; color:#6b7280; font-weight:650;">
                  Untuk memahami konsep dasar termokimia, bacalah bahan bacaan digital berikut dengan saksama. Pada bahan bacaan ini, kamu akan mempelajari konsep termokimia, sistem dan lingkungan, perpindahan kalor, reaksi eksoterm dan endoterm, serta perubahan entalpi (ΔH).
                </p>
                <p style="margin:0 0 12px; color:#6b7280; font-weight:650;">
                  Selama membaca, cobalah temukan hubungan antara perpindahan kalor dengan perubahan energi yang terjadi pada suatu zat. Catat informasi penting yang kamu temukan untuk membantu menjawab aktivitas dan pertanyaan pada section berikutnya.
                </p>
                <a href="https://online.fliphtml5.com/nttmb/Bahan-Bacaan-Subbab-1-BTY7/" target="_blank" class="btn btnPrimary" style="display:inline-block; text-decoration:none;">
                  📘 Buka Bahan Bacaan
                </a>
              </div>
            </div>

            <!-- Stage 3: Aktivitas 1 — Analisis Sistem dan Lingkungan (SECTION 4) -->
            <div class="content-stage" data-stage="3" data-type="quiz" data-quiz="aktivitas1">
              <div class="contentBox" style="border: 1px solid rgba(17, 24, 39, 0.15);">
                <h4 style="margin:0 0 8px;">🧠 Aktivitas 1 — Analisis Sistem dan Lingkungan</h4>
                <p style="margin:0 0 12px; color:#6b7280; font-size:13.5px; font-weight:600;">
                  Perhatikan beberapa gambar peristiwa berikut, kemudian tentukan bagian yang termasuk sistem dan lingkungan dengan cara menyeret jawaban ke kolom yang sesuai.
                </p>

                <!-- Peristiwa 1: Kayu Terbakar -->
                <div id="akt1_p1" class="akt1-peristiwa">
                  <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                    <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-1/KayuTerbakar.png" alt="Kayu Terbakar" style="width:120px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                    <strong style="font-size:14px;">Peristiwa 1: Kayu Terbakar</strong>
                  </div>
                  <div style="overflow-x:auto; margin-bottom:12px;">
                    <table style="width:100%; border-collapse:collapse; font-size:13.5px;">
                      <thead>
                        <tr style="background:rgba(255,106,0,0.05);">
                          <th style="border:1px solid rgba(17,24,39,0.1); padding:10px; text-align:center; font-weight:800; width:50%;">Sistem</th>
                          <th style="border:1px solid rgba(17,24,39,0.1); padding:10px; text-align:center; font-weight:800; width:50%;">Lingkungan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="border:1px solid rgba(17,24,39,0.1); padding:8px; vertical-align:top;">
                            <div class="drop-zone" id="dz_akt1_p1_sistem" data-accept="akt1_p1_kayu"></div>
                          </td>
                          <td style="border:1px solid rgba(17,24,39,0.1); padding:8px; vertical-align:top;">
                            <div class="drop-zone" id="dz_akt1_p1_lingkungan" data-accept="akt1_p1_lingkungan,akt1_p1_udara"></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style="background:rgba(255,255,255,0.5); border:1px dashed rgba(17,24,39,0.2); border-radius:12px; padding:12px; margin-bottom:8px;">
                    <p style="margin:0 0 8px; font-weight:800; font-size:13px; color:#2f6bff;">▼ Pilihan Jawaban</p>
                    <div class="drag-source-group" id="drag_source_akt1_p1" style="display:flex; flex-wrap:wrap; gap:8px;">
                      <div class="drag-item" draggable="true" data-id="akt1_p1_kayu">Kayu yang terbakar</div>
                      <div class="drag-item" draggable="true" data-id="akt1_p1_lingkungan">Lingkungan sekitar</div>
                      <div class="drag-item" draggable="true" data-id="akt1_p1_udara">Udara</div>
                    </div>
                  </div>
                  <div style="text-align:right;">
                    <button class="btn btnPrimary" onclick="checkAktivitas1Peristiwa('p1')" style="padding:8px 16px; font-size:12px;">Periksa Jawaban 🔍</button>
                  </div>
                  <div id="feedback_akt1_p1" style="display:none; margin-top:10px;"></div>
                </div>

                <!-- Peristiwa 2: Es Batu Mencair -->
                <div id="akt1_p2" class="akt1-peristiwa" style="display:none; margin-top:20px; padding-top:20px; border-top:1px dashed rgba(17,24,39,0.1);">
                  <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                    <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-1/EsBatu.png" alt="Es Batu Mencair" style="width:120px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                    <strong style="font-size:14px;">Peristiwa 2: Es Batu Mencair</strong>
                  </div>
                  <div style="overflow-x:auto; margin-bottom:12px;">
                    <table style="width:100%; border-collapse:collapse; font-size:13.5px;">
                      <thead>
                        <tr style="background:rgba(255,106,0,0.05);">
                          <th style="border:1px solid rgba(17,24,39,0.1); padding:10px; text-align:center; font-weight:800; width:50%;">Sistem</th>
                          <th style="border:1px solid rgba(17,24,39,0.1); padding:10px; text-align:center; font-weight:800; width:50%;">Lingkungan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="border:1px solid rgba(17,24,39,0.1); padding:8px; vertical-align:top;">
                            <div class="drop-zone" id="dz_akt1_p2_sistem" data-accept="akt1_p2_es"></div>
                          </td>
                          <td style="border:1px solid rgba(17,24,39,0.1); padding:8px; vertical-align:top;">
                            <div class="drop-zone" id="dz_akt1_p2_lingkungan" data-accept="akt1_p2_udara,akt1_p2_meja,akt1_p2_lingkungan"></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style="background:rgba(255,255,255,0.5); border:1px dashed rgba(17,24,39,0.2); border-radius:12px; padding:12px; margin-bottom:8px;">
                    <p style="margin:0 0 8px; font-weight:800; font-size:13px; color:#2f6bff;">▼ Pilihan Jawaban</p>
                    <div class="drag-source-group" id="drag_source_akt1_p2" style="display:flex; flex-wrap:wrap; gap:8px;">
                      <div class="drag-item" draggable="true" data-id="akt1_p2_es">Es batu</div>
                      <div class="drag-item" draggable="true" data-id="akt1_p2_udara">Udara sekitar</div>
                      <div class="drag-item" draggable="true" data-id="akt1_p2_meja">Meja</div>
                      <div class="drag-item" draggable="true" data-id="akt1_p2_lingkungan">Lingkungan sekitar</div>
                    </div>
                  </div>
                  <div style="text-align:right;">
                    <button class="btn btnPrimary" onclick="checkAktivitas1Peristiwa('p2')" style="padding:8px 16px; font-size:12px;">Periksa Jawaban 🔍</button>
                  </div>
                  <div id="feedback_akt1_p2" style="display:none; margin-top:10px;"></div>
                </div>

                <!-- Peristiwa 3: Air Dipanaskan dalam Panci -->
                <div id="akt1_p3" class="akt1-peristiwa" style="display:none; margin-top:20px; padding-top:20px; border-top:1px dashed rgba(17,24,39,0.1);">
                  <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                    <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-1/AirDalamPanci.png" alt="Air Dipanaskan dalam Panci" style="width:120px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                    <strong style="font-size:14px;">Peristiwa 3: Air Dipanaskan dalam Panci</strong>
                  </div>
                  <div style="overflow-x:auto; margin-bottom:12px;">
                    <table style="width:100%; border-collapse:collapse; font-size:13.5px;">
                      <thead>
                        <tr style="background:rgba(255,106,0,0.05);">
                          <th style="border:1px solid rgba(17,24,39,0.1); padding:10px; text-align:center; font-weight:800; width:50%;">Sistem</th>
                          <th style="border:1px solid rgba(17,24,39,0.1); padding:10px; text-align:center; font-weight:800; width:50%;">Lingkungan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="border:1px solid rgba(17,24,39,0.1); padding:8px; vertical-align:top;">
                            <div class="drop-zone" id="dz_akt1_p3_sistem" data-accept="akt1_p3_air"></div>
                          </td>
                          <td style="border:1px solid rgba(17,24,39,0.1); padding:8px; vertical-align:top;">
                            <div class="drop-zone" id="dz_akt1_p3_lingkungan" data-accept="akt1_p3_panci,akt1_p3_api,akt1_p3_lingkungan"></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style="background:rgba(255,255,255,0.5); border:1px dashed rgba(17,24,39,0.2); border-radius:12px; padding:12px; margin-bottom:8px;">
                    <p style="margin:0 0 8px; font-weight:800; font-size:13px; color:#2f6bff;">▼ Pilihan Jawaban</p>
                    <div class="drag-source-group" id="drag_source_akt1_p3" style="display:flex; flex-wrap:wrap; gap:8px;">
                      <div class="drag-item" draggable="true" data-id="akt1_p3_air">Air</div>
                      <div class="drag-item" draggable="true" data-id="akt1_p3_panci">Panci</div>
                      <div class="drag-item" draggable="true" data-id="akt1_p3_api">Api</div>
                      <div class="drag-item" draggable="true" data-id="akt1_p3_lingkungan">Lingkungan sekitar</div>
                    </div>
                  </div>
                  <div style="text-align:right;">
                    <button class="btn btnPrimary" onclick="checkAktivitas1Peristiwa('p3')" style="padding:8px 16px; font-size:12px;">Periksa Jawaban 🔍</button>
                  </div>
                  <div id="feedback_akt1_p3" style="display:none; margin-top:10px;"></div>
                </div>
              </div>
            </div>

            <!-- Stage 4: Aktivitas 2 — Klasifikasi Eksoterm dan Endoterm -->
            <div class="content-stage" data-stage="4" data-type="quiz" data-quiz="aktivitas2">
              <div class="contentBox" style="border: 1px solid rgba(17, 24, 39, 0.15);">
                <h4 style="margin:0 0 8px;">🔥 Aktivitas 2 — Klasifikasi Eksoterm dan Endoterm</h4>
                <p style="margin:0 0 12px; color:#6b7280; font-size:13.5px; font-weight:600;">
                  Berdasarkan informasi yang telah kamu pelajari, kelompokkan peristiwa berikut ke dalam reaksi eksoterm atau endoterm dengan cara menyeret kartu peristiwa ke kolom yang sesuai.
                </p>
                <div style="display:flex; gap:16px; flex-wrap:wrap; margin-bottom:16px;">
                  <div style="flex:1; min-width:200px;">
                    <h5 style="margin:0 0 8px; text-align:center; color:#ef4444;">🔥 Eksoterm</h5>
                    <div class="drop-zone" id="dz_eksoterm" data-accept="kt_kayu,kt_respirasi" style="min-height:180px;"></div>
                  </div>
                  <div style="flex:1; min-width:200px;">
                    <h5 style="margin:0 0 8px; text-align:center; color:#3b82f6;">❄️ Endoterm</h5>
                    <div class="drop-zone" id="dz_endoterm" data-accept="kt_es,kt_fotosintesis" style="min-height:180px;"></div>
                  </div>
                </div>
                <div style="background:rgba(255,255,255,0.5); border:1px dashed rgba(17,24,39,0.2); border-radius:12px; padding:12px; margin-bottom:12px;">
                  <p style="margin:0 0 8px; font-weight:800; font-size:13px; color:#2f6bff;">▼ Kartu Peristiwa (Seret ke kolom yang sesuai)</p>
                  <div class="drag-source-group" id="drag_source_akt2" style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center;">
                    <div class="drag-item" draggable="true" data-id="kt_es" style="padding:4px;">
                      <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-1/KtEsBatuMencir.png" alt="Es Batu Mencair" style="width:140px; border-radius:8px;">
                    </div>
                    <div class="drag-item" draggable="true" data-id="kt_kayu" style="padding:4px;">
                      <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-1/KtKayuTerbakar.png" alt="Kayu Terbakar" style="width:140px; border-radius:8px;">
                    </div>
                    <div class="drag-item" draggable="true" data-id="kt_fotosintesis" style="padding:4px;">
                      <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-1/KtFotosintesis.png" alt="Fotosintesis" style="width:140px; border-radius:8px;">
                    </div>
                    <div class="drag-item" draggable="true" data-id="kt_respirasi" style="padding:4px;">
                      <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-1/KtRespirasi.png" alt="Respirasi" style="width:140px; border-radius:8px;">
                    </div>
                  </div>
                </div>
                <div style="text-align:right;">
                  <button class="btn btnPrimary" onclick="checkAktivitas2()" style="padding:10px 20px; font-size:12px;">Periksa Jawaban 🔍</button>
                </div>
                <div id="feedback_akt2" style="display:none; margin-top:10px;"></div>
              </div>
            </div>

            <!-- Stage 5: Aktivitas 3 — Analisis Perpindahan Kalor -->
            <div class="content-stage" data-stage="5" data-type="quiz" data-quiz="aktivitas3">
              <div class="contentBox" style="border: 1px solid rgba(17, 24, 39, 0.15);">
                <h4 style="margin:0 0 8px;">🌡 Aktivitas 3 — Analisis Perpindahan Kalor</h4>
                <p style="margin:0 0 12px; color:#6b7280; font-size:13.5px; font-weight:600;">
                  Perhatikan ilustrasi perpindahan kalor berikut, kemudian analisis arah perpindahan kalor, tanda ΔH, dan jenis reaksi yang terjadi dengan memilih jawaban yang sesuai.
                </p>
                <div class="imgWrap" style="margin-bottom:16px; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1); text-align:center;">
                  <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-1/GifAktivitas3.gif" alt="Ilustrasi Perpindahan Kalor" style="max-width:100%; display:block; margin:0 auto;">
                </div>
                <div style="margin-bottom:12px;">
                  <p style="margin:0 0 6px; font-weight:700;">1. Arah perpindahan kalor pada peristiwa tersebut adalah ...</p>
                  <label style="display:flex; align-items:center; gap:8px; cursor:pointer; margin-bottom:4px; padding:6px 8px;">
                    <input type="radio" name="akt3_q1" value="sistem_ke_lingkungan"> Dari sistem ke lingkungan
                  </label>
                  <label style="display:flex; align-items:center; gap:8px; cursor:pointer; padding:6px 8px;">
                    <input type="radio" name="akt3_q1" value="lingkungan_ke_sistem"> Dari lingkungan ke sistem
                  </label>
                </div>
                <div style="margin-bottom:12px;">
                  <p style="margin:0 0 6px; font-weight:700;">2. Nilai ΔH pada peristiwa tersebut adalah ...</p>
                  <label style="display:flex; align-items:center; gap:8px; cursor:pointer; margin-bottom:4px; padding:6px 8px;">
                    <input type="radio" name="akt3_q2" value="positif"> Positif
                  </label>
                  <label style="display:flex; align-items:center; gap:8px; cursor:pointer; padding:6px 8px;">
                    <input type="radio" name="akt3_q2" value="negatif"> Negatif
                  </label>
                </div>
                <div style="margin-bottom:12px;">
                  <p style="margin:0 0 6px; font-weight:700;">3. Jenis reaksi yang terjadi adalah ...</p>
                  <label style="display:flex; align-items:center; gap:8px; cursor:pointer; margin-bottom:4px; padding:6px 8px;">
                    <input type="radio" name="akt3_q3" value="eksoterm"> Eksoterm
                  </label>
                  <label style="display:flex; align-items:center; gap:8px; cursor:pointer; padding:6px 8px;">
                    <input type="radio" name="akt3_q3" value="endoterm"> Endoterm
                  </label>
                </div>
                <div style="text-align:right;">
                  <button class="btn btnPrimary" onclick="checkAktivitas3()" style="padding:10px 20px; font-size:12px;">Periksa Jawaban 🔍</button>
                </div>
                <div id="feedback_akt3" style="display:none; margin-top:10px;"></div>
              </div>
            </div>

            <!-- Stage 6: Kesimpulan (SECTION 6) -->
            <div class="content-stage" data-stage="6" data-type="activity">
              <div class="contentBox">
                <h4 style="margin:0 0 8px;">✍ Kesimpulan</h4>
                <p style="margin:0 0 12px; color:#6b7280; font-weight:650;">
                  Setelah mengamati fenomena, membaca bahan bacaan, menganalisis data, dan mengerjakan kuis verifikasi, sekarang saatnya menyusun kesimpulan berdasarkan konsep yang telah kamu temukan selama pembelajaran.
                </p>
                <p style="margin:0 0 8px; color:#6b7280; font-weight:650;">Tuliskan kesimpulanmu pada kolom berikut.</p>
                <textarea id="kesimpulanS1" rows="5" style="width:100%; padding:12px; border:1px solid rgba(17,24,39,0.15); border-radius:8px; font-size:14px; resize:vertical; box-sizing:border-box;" placeholder="Tuliskan kesimpulanmu di sini..."></textarea>
                <div style="margin-top:12px; padding:12px; background:rgba(16,185,129,0.08); border-radius:8px;">
                  <p style="margin:0; color:#065f46; font-weight:650;">
                    🎉 Selamat! Kamu telah mempelajari konsep dasar termokimia dan memahami hubungan antara sistem, lingkungan, perpindahan kalor, serta perubahan entalpi.
                  </p>
                </div>
              </div>
            </div>
          `
    },
    s2: {
      title: "Perubahan Entalpi Standar (∆H°)",
      html: `
            <div class="contentBox">
              <h4 style="margin:0 0 8px;">✨ Placeholder Materi Subbab 2</h4>
              <p style="margin:0; color:#6b7280; font-weight:650;">
                Konten bisa kamu tempel nanti dalam bentuk HTML.
              </p>
            </div>
          `
    },
    s3: {
      title: "Penentuan Perubahan Entalpi Reaksi (ΔH)",
      html: `
            <div class="contentBox">
              <h4 style="margin:0 0 8px;">✨ Placeholder Materi Subbab 3</h4>
              <p style="margin:0; color:#6b7280; font-weight:650;">
                Konten bisa kamu tempel nanti dalam bentuk HTML.
              </p>
            </div>
          `
    },
    s4: {
      title: "Pendalaman Materi",
      html: `
            <div class="contentBox">
              <h4 style="margin:0 0 8px;">✨ Placeholder Materi Subbab 4</h4>
              <p style="margin:0; color:#6b7280; font-weight:650;">
                Konten bisa kamu tempel nanti dalam bentuk HTML.
              </p>
            </div>
          `
    },
    eval: {
      title: "Evaluasi Akhir",
      html: `
            <div class="contentBox">
              <h4 style="margin:0 0 8px;">🧪 Placeholder Evaluasi</h4>
              <p style="margin:0; color:#6b7280; font-weight:650;">
                Admin dapat menempelkan HTML evaluasi (materi/soal tambahan/embedded) di sini.
              </p>
            </div>
          `
    }
  };
}

const quizBank = {
  s1: [
    { q: "Saat praktikum, seorang siswa mencampurkan serbuk soda kue dan cuka ke dalam gelas kimia. Setelah beberapa saat, gelas terasa lebih dingin. Reaksi yang terjadi termasuk ...", a: ["eksoterm karena melepaskan kalor", "endoterm karena menyerap kalor", "eksoterm karena suhu sistem menurun", "isoterm karena suhu berubah", "netral karena tidak terjadi perpindahan kalor"], correct: 1 },
    { q: "\"Jika suatu reaksi memiliki nilai ΔH positif, maka reaksi tersebut melepaskan kalor ke lingkungan.\" Pernyataan tersebut adalah ...", a: ["benar, karena ΔH positif menunjukkan kalor dilepaskan", "benar, karena lingkungan menerima kalor", "salah, karena ΔH positif menunjukkan sistem menyerap kalor", "salah, karena ΔH tidak berhubungan dengan kalor", "salah, karena semua reaksi memiliki ΔH negatif"], correct: 2 },
    { q: "Gas hidrogen bereaksi dengan oksigen membentuk air dan menghasilkan kalor sebesar 572 kJ. Persamaan termokimia yang tepat adalah ...", a: ["2H₂(g) + O₂(g) → 2H₂O(l) ΔH = +572 kJ", "2H₂(g) + O₂(g) → 2H₂O(l) ΔH = −572 kJ", "2H₂O(l) → 2H₂(g) + O₂(g) ΔH = −572 kJ", "H₂(g) + O₂(g) → H₂O(l) ΔH = 0", "H₂(g) + O₂(g) → 2H₂O(l) ΔH = +572 kJ"], correct: 1 },
    { q: "Seorang siswa memasukkan serbuk kapur tohor (CaO) ke dalam air. Wadah terasa panas ketika disentuh. Pernyataan yang tepat adalah ...", a: ["sistem menyerap kalor dari lingkungan sehingga reaksi endoterm", "kalor berpindah dari lingkungan ke sistem sehingga ΔH positif", "sistem melepaskan kalor ke lingkungan sehingga reaksi eksoterm", "suhu lingkungan menurun karena kalor diserap sistem", "tidak terjadi perpindahan kalor antara sistem dan lingkungan"], correct: 2 },
    { q: "Persamaan termokimia: N₂(g) + O₂(g) → 2NO(g) ΔH = +180 kJ. Pernyataan yang tepat adalah ...", a: ["reaksi melepaskan kalor ke lingkungan", "reaksi termasuk eksoterm karena ΔH positif", "sistem menyerap kalor dari lingkungan", "suhu lingkungan meningkat karena sistem melepaskan kalor", "kalor berpindah dari sistem ke lingkungan"], correct: 2 },
  ],
  s2: [
    { q: "ΔH° menyatakan perubahan entalpi pada kondisi...", a: ["acak", "standar (mis. 1 atm dan 25°C)", "tekanan nol", "selalu 100°C"], correct: 1 },
  ],
  s3: [
    { q: "Hukum Hess menyatakan bahwa ΔH reaksi...", a: ["bergantung pada jalannya reaksi", "tidak bergantung pada jalannya reaksi", "selalu nol", "selalu positif"], correct: 1 },
  ],
  s4: [
    { q: "Placeholder kuis Subbab 4...", a: ["A", "B", "C", "D"], correct: 0 },
  ],
  eval: [
    { q: "Perubahan entalpi pembakaran standar adalah...", a: ["pembentukan 1 mol senyawa", "pembakaran 1 mol zat dengan oksigen", "penguraian 1 mol senyawa", "pelarutan 1 mol zat"], correct: 1 },
    { q: "Jika ΔH negatif, maka reaksi bersifat...", a: ["endoterm", "eksoterm", "adiabatik", "isoterm"], correct: 1 },
    { q: "Alat untuk mengukur kalor reaksi disebut...", a: ["termometer", "kalorimeter", "barometer", "voltmeter"], correct: 1 },
    { q: "Jika reaksi melepaskan kalor, ΔH bernilai...", a: ["positif", "negatif", "nol", "tidak bisa ditentukan"], correct: 1 },
  ]
};
