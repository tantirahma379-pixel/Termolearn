
/***********************
 * Data & Constants
 ***********************/
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
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Perhatikan fenomena kayu terbakar dan es mencair pada video. Amati perubahan suhu yang terjadi serta bagaimana kalor berpindah pada kedua peristiwa tersebut.
                </p>
                <div class="videoWrap" style="margin-bottom:20px; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                  <iframe src="https://www.youtube.com/embed/QxV4Xpz_lj0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
              </div>
            </div>

            <!-- Stage 1: Dugaan Awal (SECTION 2) -->
            <div class="content-stage" data-stage="1" data-type="activity">
              <div class="contentBox">
                <p style="margin:0 0 8px; color:#1a1818; font-weight:650;">
                  Setelah mengamati video tentang kayu terbakar dan es mencair, coba pikirkan: mengapa pembakaran kayu menghasilkan panas, sedangkan es batu membutuhkan kalor untuk mencair, serta bagaimana kalor dapat berpindah pada kedua peristiwa tersebut?
                </p>
                <h4 style="margin:12px 0 8px;">✍ DUGAAN AWAL</h4>
                <p style="margin:0 0 8px; color:#1a1818; font-weight:650;">Tuliskan jawabanmu pada kolom berikut.</p>
                <textarea id="dugaanAwal" rows="5" style="width:100%; padding:12px; border:1px solid rgba(17,24,39,0.15); border-radius:8px; font-size:14px; resize:vertical; box-sizing:border-box;" placeholder="Tuliskan dugaanmu di sini..."></textarea>
              </div>
            </div>

            <!-- Stage 2: Bahan Bacaan Interaktif (SECTION 3) -->
            <div class="content-stage" data-stage="2" data-type="content">
              <div class="contentBox">
                <h4 style="margin:0 0 8px;">📖 Bahan Bacaan Interaktif</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Untuk memahami konsep dasar termokimia, bacalah bahan bacaan digital berikut dengan saksama. Pada bahan bacaan ini, kamu akan mempelajari konsep termokimia, sistem dan lingkungan, perpindahan kalor, reaksi eksoterm dan endoterm, serta perubahan entalpi (ΔH).
                </p>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
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
                <p style="margin:0 0 12px; color:#1a1818; font-size:13.5px; font-weight:600;">
                  Perhatikan beberapa gambar peristiwa berikut, kemudian tentukan bagian yang termasuk sistem dan lingkungan dengan cara menyeret jawaban ke kolom yang sesuai.
                </p>

                <!-- Peristiwa 1: Kayu Terbakar -->
                <div id="akt1_p1" class="akt1-peristiwa">
                  <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                    <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-1/KayuTerbakar.png" alt="Kayu Terbakar" style="max-width:120px; width:100%; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
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
                    <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-1/EsBatu.png" alt="Es Batu Mencair" style="max-width:120px; width:100%; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
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
                    <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-1/AirDalamPanci.png" alt="Air Dipanaskan dalam Panci" style="max-width:120px; width:100%; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
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
                <p style="margin:0 0 12px; color:#1a1818; font-size:13.5px; font-weight:600;">
                  Berdasarkan informasi yang telah kamu pelajari, kelompokkan peristiwa berikut ke dalam reaksi eksoterm atau endoterm dengan cara menyeret kartu peristiwa ke kolom yang sesuai.
                </p>
                <div style="display:flex; gap:16px; flex-wrap:wrap; margin-bottom:16px;">
                  <div style="flex:1; min-width:min(200px, 45vw);">
                    <h5 style="margin:0 0 8px; text-align:center; color:#ef4444;">🔥 Eksoterm</h5>
                    <div class="drop-zone" id="dz_eksoterm" data-accept="kt_kayu,kt_respirasi" style="min-height:180px;"></div>
                  </div>
                  <div style="flex:1; min-width:min(200px, 45vw);">
                    <h5 style="margin:0 0 8px; text-align:center; color:#3b82f6;">❄️ Endoterm</h5>
                    <div class="drop-zone" id="dz_endoterm" data-accept="kt_es,kt_fotosintesis" style="min-height:180px;"></div>
                  </div>
                </div>
                <div style="background:rgba(255,255,255,0.5); border:1px dashed rgba(17,24,39,0.2); border-radius:12px; padding:12px; margin-bottom:12px;">
                  <p style="margin:0 0 8px; font-weight:800; font-size:13px; color:#2f6bff;">▼ Kartu Peristiwa (Seret ke kolom yang sesuai)</p>
                  <div class="drag-source-group" id="drag_source_akt2" style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center;">
                    <div class="drag-item" draggable="true" data-id="kt_es" style="padding:4px;">
                      <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-1/KtEsBatuMencir.png" alt="Es Batu Mencair" style="max-width:140px; width:100%; border-radius:8px;">
                    </div>
                    <div class="drag-item" draggable="true" data-id="kt_kayu" style="padding:4px;">
                      <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-1/KtKayuTerbakar.png" alt="Kayu Terbakar" style="max-width:140px; width:100%; border-radius:8px;">
                    </div>
                    <div class="drag-item" draggable="true" data-id="kt_fotosintesis" style="padding:4px;">
                      <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-1/KtFotosintesis.png" alt="Fotosintesis" style="max-width:140px; width:100%; border-radius:8px;">
                    </div>
                    <div class="drag-item" draggable="true" data-id="kt_respirasi" style="padding:4px;">
                      <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-1/KtRespirasi.png" alt="Respirasi" style="max-width:140px; width:100%; border-radius:8px;">
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
                <p style="margin:0 0 12px; color:#1a1818; font-size:13.5px; font-weight:600;">
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

          `
    },
    s2: {
      title: "Perubahan Entalpi Standar (∆H°)",
      html: `
            <!-- Stage 0: Video Pengamatan (SECTION 1) -->
            <div class="content-stage" data-stage="0" data-type="video">
              <div class="contentBox">
                <h4 style="margin:0 0 8px;">🔍 Yuk, amati video berikut!</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Amati video berikut dengan saksama. Perhatikan nyala api, asap, dan panas yang dihasilkan dari masing-masing bahan bakar!
                </p>
                <div class="videoWrap" style="margin-bottom:20px; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                  <iframe src="https://www.youtube.com/embed/mFls5tXQo9g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
              </div>
            </div>

            <!-- Stage 1: Dugaan Awal (SECTION 2) -->
            <div class="content-stage" data-stage="1" data-type="activity">
              <div class="contentBox">
                <p style="margin:0 0 8px; color:#1a1818; font-weight:650;">
                  Setelah mengamati video pembakaran berbagai bahan bakar, coba pikirkan: mengapa LPG dapat memanaskan air lebih cepat dibandingkan bahan bakar lainnya, mengapa setiap bahan bakar menghasilkan kalor yang berbeda, serta apa hubungan proses pembakaran dengan energi kimia?
                </p>
                <h4 style="margin:12px 0 8px;">✍ DUGAAN AWAL</h4>
                <p style="margin:0 0 8px; color:#1a1818; font-weight:650;">Tuliskan jawabanmu pada kolom berikut.</p>
                <textarea id="dugaanAwalS2" rows="5" style="width:100%; padding:12px; border:1px solid rgba(17,24,39,0.15); border-radius:8px; font-size:14px; resize:vertical; box-sizing:border-box;" placeholder="Tuliskan dugaanmu di sini..."></textarea>
              </div>
            </div>

            <!-- Stage 2: Bahan Bacaan — Flipcard & Data Tabel (SECTION 3) -->
            <div class="content-stage" data-stage="2" data-type="content">
              <div class="contentBox">
                <h4 style="margin:0 0 8px;">📘 Pengertian Perubahan Entalpi Standar</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Perubahan entalpi standar (ΔH°) merupakan perubahan kalor yang terjadi pada suatu reaksi kimia dalam kondisi standar, yaitu pada suhu 25°C (298 K) dan tekanan 1 atm. Nilai ΔH° menunjukkan jumlah kalor yang dilepaskan atau diserap selama reaksi berlangsung.
                </p>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Untuk memahami mengapa setiap bahan bakar dapat menghasilkan kalor yang berbeda, mari pelajari jenis-jenis perubahan entalpi standar melalui flipcard berikut.
                </p>

                <h4 style="margin:16px 0 12px;">🃏 Flipcard</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Klik kartu untuk melihat penjelasan di baliknya. Pelajari ketiga jenis perubahan entalpi standar berikut.
                </p>
                <div id="s2_flipcards" style="display:flex; flex-wrap:wrap; gap:16px; justify-content:center; margin-bottom:20px;">
                  <!-- Flipcard 1: Pembentukan -->
                  <div class="flipcard" onclick="toggleFlipcard(this)">
                    <div class="flipcard-inner">
                      <div class="flipcard-front">
                        <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-2/PembentukanDepan.png" alt="Pembentukan Standar" style="width:100%; border-radius:8px;">
                      </div>
                      <div class="flipcard-back">
                        <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-2/PembentukanBelakang.png" alt="Pembentukan Standar - Penjelasan" style="width:100%; border-radius:8px;">
                      </div>
                    </div>
                  </div>
                  <!-- Flipcard 2: Penguraian -->
                  <div class="flipcard" onclick="toggleFlipcard(this)">
                    <div class="flipcard-inner">
                      <div class="flipcard-front">
                        <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-2/PenguraianDepan.png" alt="Penguraian Standar" style="width:100%; border-radius:8px;">
                      </div>
                      <div class="flipcard-back">
                        <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-2/PenguraianBelakang.png" alt="Penguraian Standar - Penjelasan" style="width:100%; border-radius:8px;">
                      </div>
                    </div>
                  </div>
                  <!-- Flipcard 3: Pembakaran -->
                  <div class="flipcard" onclick="toggleFlipcard(this)">
                    <div class="flipcard-inner">
                      <div class="flipcard-front">
                        <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-2/PembakaranDepan.png" alt="Pembakaran Standar" style="width:100%; border-radius:8px;">
                      </div>
                      <div class="flipcard-back">
                        <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-2/PembakaranBelakang.png" alt="Pembakaran Standar - Penjelasan" style="width:100%; border-radius:8px;">
                      </div>
                    </div>
                  </div>
                </div>

                <h4 style="margin:16px 0 8px;">📊 Data Perubahan Entalpi Standar</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Setelah mempelajari jenis-jenis perubahan entalpi standar melalui flipcard, amati data perubahan entalpi (ΔH°) berikut dengan saksama. Perhatikan hubungan antara: tanda ΔH°, jenis perubahan entalpi, serta kalor yang dilepaskan atau diserap selama reaksi berlangsung.
                </p>
                <div style="text-align:center; margin-bottom:12px;">
                  <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-2/TabelDataPerubahan.png" alt="Tabel Data Perubahan Entalpi" style="max-width:100%; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                </div>
                <p style="margin:0; color:#1a1818; font-weight:650;">
                  Gunakan informasi pada tabel untuk membantu menyelesaikan aktivitas analisis pada section berikutnya.
                </p>
              </div>
            </div>

            <!-- Stage 3: Aktivitas Analisis (SECTION 4) -->
            <div class="content-stage" data-stage="3" data-type="quiz" data-quiz="s2aktivitas">
              <div class="contentBox" style="border: 1px solid rgba(17, 24, 39, 0.15);">
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Setelah mempelajari konsep perubahan entalpi standar melalui flipcard pada section sebelumnya, sekarang saatnya mengolah informasi tersebut melalui beberapa aktivitas analisis. Pada section ini, kamu akan menentukan jenis perubahan entalpi standar, menganalisis persamaan reaksi, serta menghitung perubahan entalpi sederhana berdasarkan data reaksi.
                </p>

                <!-- Aktivitas 1: Drag & Drop — Menentukan Jenis Perubahan Entalpi -->
                <div id="s2_akt1_wrap">
                  <h4 style="margin:0 0 8px;">🧠 Aktivitas 1 — Menentukan Jenis Perubahan Entalpi</h4>
                  <p style="margin:0 0 12px; color:#1a1818; font-size:13.5px; font-weight:600;">
                    Perhatikan reaksi berikut, kemudian tentukan jenis perubahan entalpinya dengan menyeret jawaban ke kolom yang sesuai.
                  </p>
                  <div style="overflow-x:auto; margin-bottom:12px;">
                    <table style="width:100%; border-collapse:collapse; font-size:13.5px;">
                      <thead>
                        <tr style="background:rgba(255,106,0,0.05);">
                          <th style="border:1px solid rgba(17,24,39,0.1); padding:10px; text-align:center; font-weight:800; width:60%;">Reaksi</th>
                          <th style="border:1px solid rgba(17,24,39,0.1); padding:10px; text-align:center; font-weight:800; width:40%;">Jenis Perubahan Entalpi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="border:1px solid rgba(17,24,39,0.1); padding:10px; font-weight:600;">H₂(<em>g</em>) + ½O₂(<em>g</em>) → H₂O(<em>l</em>)</td>
                          <td style="border:1px solid rgba(17,24,39,0.1); padding:8px; vertical-align:top;">
                            <div class="drop-zone" id="dz_s2akt1_r1" data-accept="s2akt1_dhf" style="min-height:40px;"></div>
                          </td>
                        </tr>
                        <tr>
                          <td style="border:1px solid rgba(17,24,39,0.1); padding:10px; font-weight:600;">H₂O(<em>l</em>) → H₂(<em>g</em>) + ½O₂(<em>g</em>)</td>
                          <td style="border:1px solid rgba(17,24,39,0.1); padding:8px; vertical-align:top;">
                            <div class="drop-zone" id="dz_s2akt1_r2" data-accept="s2akt1_dhd1" style="min-height:40px;"></div>
                          </td>
                        </tr>
                        <tr>
                          <td style="border:1px solid rgba(17,24,39,0.1); padding:10px; font-weight:600;">CH₄(<em>g</em>) + 2O₂(<em>g</em>) → CO₂(<em>g</em>) + 2H₂O(<em>l</em>)</td>
                          <td style="border:1px solid rgba(17,24,39,0.1); padding:8px; vertical-align:top;">
                            <div class="drop-zone" id="dz_s2akt1_r3" data-accept="s2akt1_dhc" style="min-height:40px;"></div>
                          </td>
                        </tr>
                        <tr>
                          <td style="border:1px solid rgba(17,24,39,0.1); padding:10px; font-weight:600;">CaCO₃(<em>s</em>) → CaO(<em>s</em>) + CO₂(<em>g</em>)</td>
                          <td style="border:1px solid rgba(17,24,39,0.1); padding:8px; vertical-align:top;">
                            <div class="drop-zone" id="dz_s2akt1_r4" data-accept="s2akt1_dhd2" style="min-height:40px;"></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style="background:rgba(255,255,255,0.5); border:1px dashed rgba(17,24,39,0.2); border-radius:12px; padding:12px; margin-bottom:8px;">
                    <p style="margin:0 0 8px; font-weight:800; font-size:13px; color:#2f6bff;">▼ Pilihan Jawaban (Seret ke kolom yang sesuai)</p>
                    <div class="drag-source-group" id="drag_source_s2akt1" style="display:flex; flex-wrap:wrap; gap:8px;">
                      <div class="drag-item" draggable="true" data-id="s2akt1_dhf">🧪 ΔH°f — Pembentukan Standar</div>
                      <div class="drag-item" draggable="true" data-id="s2akt1_dhd1">⚡ ΔH°d — Penguraian Standar</div>
                      <div class="drag-item" draggable="true" data-id="s2akt1_dhc">🔥 ΔH°c — Pembakaran Standar</div>
                      <div class="drag-item" draggable="true" data-id="s2akt1_dhd2">⚡ ΔH°d — Penguraian Standar</div>
                    </div>
                  </div>
                  <div style="text-align:right;">
                    <button class="btn btnPrimary" onclick="checkS2Aktivitas1()" style="padding:10px 20px; font-size:12px;">Periksa Jawaban 🔍</button>
                  </div>
                  <div id="feedback_s2akt1" style="display:none; margin-top:10px;"></div>
                </div>

                <!-- Aktivitas 2: Pilihan Ganda — Menentukan Persamaan Termokimia -->
                <div id="s2_akt2_wrap" style="display:none; margin-top:20px; padding-top:20px; border-top:1px dashed rgba(17,24,39,0.1);">
                  <h4 style="margin:0 0 8px;">🌡 Aktivitas 2 — Menentukan Persamaan Termokimia yang Benar</h4>
                  <p style="margin:0 0 8px; color:#1a1818; font-size:13.5px; font-weight:600;">
                    Pilih persamaan yang menunjukkan <strong>entalpi pembentukan standar H₂O(<em>l</em>)</strong>:
                  </p>
                  <div style="margin-bottom:12px;">
                    <label style="display:flex; align-items:center; gap:8px; cursor:pointer; margin-bottom:4px; padding:6px 8px;">
                      <input type="radio" name="s2_akt2_q1" value="A"> A. 2H₂(<em>g</em>) + O₂(<em>g</em>) → 2H₂O(<em>l</em>)
                    </label>
                    <label style="display:flex; align-items:center; gap:8px; cursor:pointer; margin-bottom:4px; padding:6px 8px;">
                      <input type="radio" name="s2_akt2_q1" value="B"> B. H₂(<em>g</em>) + ½O₂(<em>g</em>) → H₂O(<em>l</em>)
                    </label>
                    <label style="display:flex; align-items:center; gap:8px; cursor:pointer; margin-bottom:4px; padding:6px 8px;">
                      <input type="radio" name="s2_akt2_q1" value="C"> C. H₂O(<em>l</em>) → H₂(<em>g</em>) + ½O₂(<em>g</em>)
                    </label>
                    <label style="display:flex; align-items:center; gap:8px; cursor:pointer; padding:6px 8px;">
                      <input type="radio" name="s2_akt2_q1" value="D"> D. CH₄(<em>g</em>) + 2O₂(<em>g</em>) → CO₂(<em>g</em>) + 2H₂O(<em>l</em>)
                    </label>
                  </div>
                  <div style="text-align:right;">
                    <button class="btn btnPrimary" onclick="checkS2Aktivitas2()" style="padding:10px 20px; font-size:12px;">Periksa Jawaban 🔍</button>
                  </div>
                  <div id="feedback_s2akt2" style="display:none; margin-top:10px;"></div>
                </div>

                <!-- Aktivitas 3: Pilihan Ganda — Menghitung ΔH Reaksi -->
                <div id="s2_akt3_wrap" style="display:none; margin-top:20px; padding-top:20px; border-top:1px dashed rgba(17,24,39,0.1);">
                  <h4 style="margin:0 0 8px;">🔥 Aktivitas 3 — Menghitung ΔH Reaksi</h4>
                  <p style="margin:0 0 8px; color:#1a1818; font-size:13.5px; font-weight:600;">
                    Diketahui: ΔH°c = −890,3 kJ/mol<br>
                    Jika <strong>2 mol CH₄ dibakar sempurna</strong>, maka besar ΔH total adalah ...
                  </p>
                  <div style="margin-bottom:12px;">
                    <label style="display:flex; align-items:center; gap:8px; cursor:pointer; margin-bottom:4px; padding:6px 8px;">
                      <input type="radio" name="s2_akt3_q1" value="A"> A. −1780,6 kJ
                    </label>
                    <label style="display:flex; align-items:center; gap:8px; cursor:pointer; margin-bottom:4px; padding:6px 8px;">
                      <input type="radio" name="s2_akt3_q1" value="B"> B. −890,3 kJ
                    </label>
                    <label style="display:flex; align-items:center; gap:8px; cursor:pointer; margin-bottom:4px; padding:6px 8px;">
                      <input type="radio" name="s2_akt3_q1" value="C"> C. +1780,6 kJ
                    </label>
                    <label style="display:flex; align-items:center; gap:8px; cursor:pointer; margin-bottom:4px; padding:6px 8px;">
                      <input type="radio" name="s2_akt3_q1" value="D"> D. +890,3 kJ
                    </label>
                    <label style="display:flex; align-items:center; gap:8px; cursor:pointer; padding:6px 8px;">
                      <input type="radio" name="s2_akt3_q1" value="E"> E. −445,15 kJ
                    </label>
                  </div>
                  <div style="text-align:right;">
                    <button class="btn btnPrimary" onclick="checkS2Aktivitas3()" style="padding:10px 20px; font-size:12px;">Periksa Jawaban 🔍</button>
                  </div>
                  <div id="feedback_s2akt3" style="display:none; margin-top:10px;"></div>
                </div>
              </div>
            </div>

            <!-- Stage 4: Kesimpulan (SECTION 6) -->
            <div class="content-stage" data-stage="4" data-type="activity">
              <div class="contentBox">
                <h4 style="margin:0 0 8px;">✍ Lengkapi Pernyataan</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Lengkapilah pernyataan berikut berdasarkan hasil pembelajaran yang telah kamu lakukan.
                </p>
                <div style="margin-bottom:16px;">
                  <p style="margin:0 0 8px; font-weight:700;">A. Perubahan entalpi standar (ΔH°) merupakan perubahan kalor yang terjadi pada suatu reaksi kimia dalam kondisi standar yaitu suhu
                    <input type="text" id="s2_fill_a1" placeholder="..." style="width:100px; padding:4px 8px; border:1px solid rgba(17,24,39,0.2); border-radius:6px; font-size:13px;">
                    dan tekanan
                    <input type="text" id="s2_fill_a2" placeholder="..." style="width:80px; padding:4px 8px; border:1px solid rgba(17,24,39,0.2); border-radius:6px; font-size:13px;">
                  </p>
                </div>
                <div style="margin-bottom:16px;">
                  <p style="margin:0 0 8px; font-weight:700;">B. Entalpi pembentukan standar dilambangkan dengan
                    <input type="text" id="s2_fill_b1" placeholder="..." style="width:80px; padding:4px 8px; border:1px solid rgba(17,24,39,0.2); border-radius:6px; font-size:13px;">
                    dan menunjukkan proses pembentukan
                    <input type="text" id="s2_fill_b2" placeholder="..." style="width:50px; padding:4px 8px; border:1px solid rgba(17,24,39,0.2); border-radius:6px; font-size:13px;">
                    mol senyawa dari unsur-unsurnya.
                  </p>
                </div>
                <div style="text-align:right; margin-bottom:16px;">
                  <button class="btn btnPrimary" onclick="checkS2FillBlank()" style="padding:10px 20px; font-size:12px;">Periksa Jawaban 🔍</button>
                </div>
                <div id="feedback_s2fill" style="display:none; margin-bottom:16px;"></div>

                <h4 style="margin:16px 0 8px;">✍ Kesimpulan</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Tuliskan kesimpulanmu mengenai hubungan antara: perubahan entalpi standar, jenis reaksi eksoterm dan endoterm, nilai ΔH°, serta kalor yang dilepaskan atau diserap pada reaksi kimia.
                </p>
                <textarea id="kesimpulanS2" rows="5" style="width:100%; padding:12px; border:1px solid rgba(17,24,39,0.15); border-radius:8px; font-size:14px; resize:vertical; box-sizing:border-box;" placeholder="Tuliskan kesimpulanmu di sini..."></textarea>
                <div style="margin-top:12px; padding:12px; background:rgba(16,185,129,0.08); border-radius:8px;">
                  <p style="margin:0; color:#065f46; font-weight:650;">
                    🏆 Selamat! Kamu telah menyelesaikan Subbab 2 — Perubahan Entalpi Standar (ΔH°). Kamu telah memahami konsep perubahan entalpi standar dan jenis-jenisnya.
                  </p>
                </div>
              </div>
            </div>
          `
    },
    s3: {
      title: "Penentuan ΔH Reaksi Menggunakan Kalorimeter dan Hukum Hess",
      html: `
            <!-- Stage 0: Ilustrasi (SECTION 1) -->
            <div class="content-stage" data-stage="0" data-type="content">
              <div class="contentBox">
                <h4 style="margin:0 0 8px;">👀 Amati ilustrasi berikut dengan saksama!</h4>
                <div style="text-align:center; margin-bottom:16px;">
                  <img src="/gambar/sub-bab-3/IlustrasiKalorimeter.png" alt="Ilustrasi Kalorimeter" style="max-width:100%; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                </div>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Seorang siswa melakukan percobaan dengan mencampurkan larutan HCl dan NaOH ke dalam kalorimeter sederhana. Setelah kedua larutan dicampurkan, suhu larutan meningkat dari 25°C menjadi 32°C. Fenomena tersebut menunjukkan bahwa selama reaksi berlangsung terjadi perpindahan kalor.
                </p>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Menurutmu, dari mana asal kalor tersebut? Bagaimana cara menentukan besar kalor yang dihasilkan reaksi?
                </p>
              </div>
            </div>

            <!-- Stage 1: Dugaan Awal (SECTION 2) -->
            <div class="content-stage" data-stage="1" data-type="activity">
              <div class="contentBox">
                <p style="margin:0 0 8px; color:#1a1818; font-weight:650;">
                  Berdasarkan ilustrasi sebelumnya, suhu larutan meningkat setelah HCl dan NaOH dicampurkan ke dalam kalorimeter. Kenaikan suhu tersebut menunjukkan bahwa reaksi menghasilkan kalor. Namun: bagaimana cara menentukan besar kalor yang dihasilkan? apakah semua reaksi menghasilkan kalor yang sama? dan bagaimana jika kalor suatu reaksi sulit diukur secara langsung?
                </p>
                <h4 style="margin:12px 0 8px;">✍ DUGAAN AWAL</h4>
                <p style="margin:0 0 8px; color:#1a1818; font-weight:650;">Tuliskan jawabanmu pada kolom berikut.</p>
                <textarea id="dugaanAwalS3" rows="5" style="width:100%; padding:12px; border:1px solid rgba(17,24,39,0.15); border-radius:8px; font-size:14px; resize:vertical; box-sizing:border-box;" placeholder="Tuliskan dugaanmu di sini..."></textarea>
                <div style="margin-top:12px; padding:12px; background:rgba(16,185,129,0.08); border-radius:8px;">
                  <p style="margin:0; color:#065f46; font-weight:650;">💡 Jawabanmu berhasil disimpan. Lanjutkan ke section berikutnya.</p>
                </div>
              </div>
            </div>

            <!-- Stage 2: Kalorimeter (SECTION 3) -->
            <div class="content-stage" data-stage="2" data-type="quiz" data-quiz="s3_kalorimeter">
              <div class="contentBox">
                <h4 style="margin:0 0 8px;">🧪 BAGIAN 1 MENENTUKAN ΔH REAKSI MENGGUNAKAN KALORIMETER</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Pada section ini, peserta didik akan melakukan praktikum virtual menggunakan simulasi kalorimeter untuk mengetahui besar kalor reaksi berdasarkan perubahan suhu yang terjadi selama reaksi berlangsung.
                </p>
                <h4 style="margin:12px 0 8px;">📘 Infografis Konsep: Mengenal Kalorimeter dan Perubahan Entalpi Reaksi</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Sebelum melakukan praktikum virtual, pelajari terlebih dahulu konsep dasar kalorimeter dan perubahan entalpi reaksi melalui infografis berikut.
                </p>
                <div style="text-align:center; margin-bottom:16px;">
                  <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-3/image2.png" alt="Infografis Kalorimeter" style="max-width:100%; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                </div>

                <hr style="border:0; border-top:1px dashed #ccc; margin:20px 0;">

                <h4 style="margin:0 0 8px;">🧪 BAGIAN 2 SIMULASI VIRTUAL KALORIMETER</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Setelah mempelajari konsep kalorimeter, lakukan praktikum virtual berikut untuk mengetahui perubahan kalor selama reaksi berlangsung.<br>
                  <strong>🎯 Tujuan:</strong> Menganalisis perubahan suhu dan menghitung kalor reaksi melalui praktikum virtual.
                </p>
                
                <div style="background:rgba(255,106,0,0.05); padding:16px; border-radius:8px; margin-bottom:16px;">
                  <h5 style="margin:0 0 8px;">A. Petunjuk Praktikum Virtual Kalorimeter</h5>
                  <ul style="margin:0 0 12px; padding-left:20px; font-size:13.5px;">
                    <li>Buka simulasi kalorimeter virtual: <a href="https://media.pearsoncmg.com/bc/bc_0media_chem/chem_sim/calorimetry/Calor.php" target="_blank" style="color:#2f6bff; text-decoration:none; font-weight:bold;">Mulai Simulasi ↗️</a></li>
                    <li>Baca petunjuk penggunaan simulator: <a href="https://online.fliphtml5.com/nttmb/PetunjukSimulasi/" target="_blank" style="color:#2f6bff; text-decoration:none; font-weight:bold;">Petunjuk Simulator ↗️</a></li>
                    <li>Amati bagian-bagian kalorimeter virtual: gelas kalorimeter, termometer, pilihan zat, pengatur massa/volume, dan tombol "Run Experiment".</li>
                  </ul>

                  <h5 style="margin:0 0 8px;">B. Langkah Kerja</h5>
                  <ul style="margin:0 0 12px; padding-left:20px; font-size:13.5px;">
                    <li><strong>Larutan 1:</strong> Pilih: HCl(<em>aq</em>) | Atur: Volume = 50 mL | Molaritas = 1 M | Suhu = 20°C</li>
                    <li><strong>Larutan 2:</strong> Pilih: NaOH(<em>aq</em>) | Atur: Volume = 50 mL | Molaritas = 1 M | Suhu = 20°C</li>
                  </ul>

                  <h5 style="margin:0 0 8px;">C. Menjalankan Percobaan</h5>
                  <ul style="margin:0 0 0; padding-left:20px; font-size:13.5px;">
                    <li>Klik tombol Run Experiment. Amati perubahan suhu pada kalorimeter. Catat suhu akhir yang diperoleh.</li>
                  </ul>
                </div>

                <h4 style="margin:0 0 8px;">📝 LKPD Praktikum</h4>
                <div style="margin-bottom:16px;">
                  <p style="margin:0 0 6px; font-weight:700;">A. Data Pengamatan</p>
                  <table style="width:100%; max-width:400px; border-collapse:collapse; font-size:13.5px;">
                    <tr>
                      <td style="border:1px solid rgba(17,24,39,0.1); padding:8px;">Suhu awal</td>
                      <td style="border:1px solid rgba(17,24,39,0.1); padding:8px;"><input type="number" id="s3_suhu_awal" style="width:80px; padding:4px 8px; border:1px solid rgba(17,24,39,0.2); border-radius:4px;"> °C</td>
                    </tr>
                    <tr>
                      <td style="border:1px solid rgba(17,24,39,0.1); padding:8px;">Suhu akhir</td>
                      <td style="border:1px solid rgba(17,24,39,0.1); padding:8px;"><input type="number" id="s3_suhu_akhir" style="width:80px; padding:4px 8px; border:1px solid rgba(17,24,39,0.2); border-radius:4px;"> °C</td>
                    </tr>
                    <tr>
                      <td style="border:1px solid rgba(17,24,39,0.1); padding:8px;">ΔT</td>
                      <td style="border:1px solid rgba(17,24,39,0.1); padding:8px;"><input type="number" id="s3_dt" style="width:80px; padding:4px 8px; border:1px solid rgba(17,24,39,0.2); border-radius:4px;"> °C</td>
                    </tr>
                    <tr>
                      <td style="border:1px solid rgba(17,24,39,0.1); padding:8px;">Massa larutan</td>
                      <td style="border:1px solid rgba(17,24,39,0.1); padding:8px;">100 g</td>
                    </tr>
                  </table>
                </div>

                <div style="margin-bottom:16px;">
                  <p style="margin:0 0 6px; font-weight:700;">B. Menghitung Kalor Reaksi</p>
                  <p style="margin:0 0 6px; font-size:13.5px;">Gunakan rumus: <em>q = m × c × ΔT</em><br>Diketahui: m = 100 g, c = 4,2 J/g°C</p>
                  <p style="margin:0 0 6px; font-size:13.5px;">Tuliskan perhitungan dan hasil akhir (dalam Joule):</p>
                  <textarea id="s3_perhitungan" rows="3" style="width:100%; padding:8px; border:1px solid rgba(17,24,39,0.15); border-radius:6px; font-size:14px; box-sizing:border-box;" placeholder="q = 100 × 4,2 × ... = ... J"></textarea>
                </div>

                <div style="margin-bottom:16px;">
                  <p style="margin:0 0 6px; font-weight:700;">C. Analisis</p>
                  <p style="margin:0 0 6px; font-size:13.5px;">1. Berdasarkan perubahan suhu yang terjadi pada simulasi, tentukan sifat reaksi yang berlangsung.</p>
                  <label style="display:inline-block; margin-right:20px; font-size:13.5px; cursor:pointer; padding:6px 12px; background:rgba(255,255,255,0.5); border:1px solid rgba(17,24,39,0.1); border-radius:6px;"><input type="radio" name="s3_sifat" value="eksoterm"> 🔥 Eksoterm</label>
                  <label style="display:inline-block; font-size:13.5px; cursor:pointer; padding:6px 12px; background:rgba(255,255,255,0.5); border:1px solid rgba(17,24,39,0.1); border-radius:6px;"><input type="radio" name="s3_sifat" value="endoterm"> ❄️ Endoterm</label>
                  <p style="margin:8px 0 6px; font-size:13.5px;">✍ Alasan:</p>
                  <textarea id="s3_alasan" rows="2" style="width:100%; padding:8px; border:1px solid rgba(17,24,39,0.15); border-radius:6px; font-size:14px; box-sizing:border-box;" placeholder="Jelaskan mengapa reaksi bersifat eksoterm/endoterm..."></textarea>
                  
                  <p style="margin:12px 0 6px; font-size:13.5px;">2. Tuliskan kesimpulan berdasarkan hasil percobaan virtual yang telah dilakukan.</p>
                  <textarea id="s3_kesimpulan_praktikum" rows="3" style="width:100%; padding:8px; border:1px solid rgba(17,24,39,0.15); border-radius:6px; font-size:14px; box-sizing:border-box;" placeholder="Tuliskan kesimpulan percobaanmu di sini..."></textarea>
                </div>

                <div style="text-align:right;">
                  <button class="btn btnPrimary" onclick="checkS3Praktikum()" style="padding:10px 20px; font-size:12px;">Periksa LKPD 🔍</button>
                </div>
                <div id="feedback_s3_praktikum" style="display:none; margin-top:12px;"></div>
              </div>
            </div>

            <!-- Stage 3: Hukum Hess (SECTION 4) -->
            <div class="content-stage" data-stage="3" data-type="quiz" data-quiz="s3_hess">
              <div class="contentBox">
                <h4 style="margin:0 0 8px;">📘 BAGIAN 2 MENENTUKAN ΔH REAKSI MENGGUNAKAN HUKUM HESS</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Pada percobaan sebelumnya, kamu telah menentukan kalor reaksi menggunakan kalorimeter berdasarkan perubahan suhu yang terjadi selama reaksi berlangsung. Namun, tidak semua reaksi kimia dapat diukur secara langsung menggunakan kalorimeter. Oleh karena itu, ilmuwan menggunakan cara lain untuk menentukan perubahan entalpi reaksi, yaitu menggunakan Hukum Hess.
                </p>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">Pelajari konsep Hukum Hess melalui Video berikut:</p>
                <div class="videoWrap" style="margin-bottom:20px; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                  <iframe src="https://www.youtube.com/embed/J8E0Car5uiY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>

                <h4 style="margin:0 0 8px;">🧠 Aktivitas 1 — Analisis Perubahan Persamaan Reaksi dan Nilai ΔH</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-size:13.5px; font-weight:600;">
                  Perhatikan data reaksi berikut.<br>
                  H₂(<em>g</em>) + ½O₂(<em>g</em>) → H₂O(<em>l</em>) ΔH = −285,8 kJ<br>
                  Tentukan perubahan nilai ΔH jika:
                </p>
                <div style="overflow-x:auto; margin-bottom:16px;">
                  <table style="width:100%; border-collapse:collapse; font-size:13.5px;">
                    <thead>
                      <tr style="background:rgba(255,106,0,0.05);">
                        <th style="border:1px solid rgba(17,24,39,0.1); padding:10px; text-align:left; font-weight:800;">Perubahan Reaksi</th>
                        <th style="border:1px solid rgba(17,24,39,0.1); padding:10px; text-align:left; font-weight:800;">Perubahan Nilai ΔH (kJ)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="border:1px solid rgba(17,24,39,0.1); padding:10px;">H₂O(<em>l</em>) → H₂(<em>g</em>) + ½O₂(<em>g</em>)</td>
                        <td style="border:1px solid rgba(17,24,39,0.1); padding:10px;">
                          <input type="text" id="s3_hess1_1"" style="width:100px; padding:6px 8px; border:1px solid rgba(17,24,39,0.2); border-radius:6px; font-size:13px;">
                        </td>
                      </tr>
                      <tr>
                        <td style="border:1px solid rgba(17,24,39,0.1); padding:10px;">2H₂O(<em>l</em>) → 2H₂(<em>g</em>) + O₂(<em>g</em>)</td>
                        <td style="border:1px solid rgba(17,24,39,0.1); padding:10px;">
                          <input type="text" id="s3_hess1_2"" style="width:100px; padding:6px 8px; border:1px solid rgba(17,24,39,0.2); border-radius:6px; font-size:13px;">
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 style="margin:16px 0 8px;">🔥 Aktivitas 2 — Menentukan ΔH Reaksi</h4>
                <p style="margin:0 0 8px; color:#1a1818; font-size:13.5px; font-weight:600;">Gunakan data reaksi berikut untuk menentukan ΔH reaksi target.</p>
                <p style="margin:0 0 8px; font-size:13.5px;"><strong>Reaksi Target:</strong> C(<em>s</em>) + ½O₂(<em>g</em>) → CO(<em>g</em>)</p>
                <p style="margin:0 0 8px; font-size:13.5px;">
                  <strong>Data Reaksi:</strong><br>
                  Reaksi 1: C(<em>s</em>) + O₂(<em>g</em>) → CO₂(<em>g</em>) ΔH = −393,5 kJ<br>
                  Reaksi 2: CO(<em>g</em>) + ½O₂(<em>g</em>) → CO₂(<em>g</em>) ΔH = −283 kJ
                </p>
                <p style="margin:0 0 8px; font-size:13.5px;">Berdasarkan data reaksi, tentukan reaksi mana yang dibalik dan bagaimana nilai ΔH-nya!</p>
                <textarea id="s3_hess2_1" rows="2" style="width:100%; padding:8px; border:1px solid rgba(17,24,39,0.15); border-radius:6px; font-size:13.5px; margin-bottom:8px; box-sizing:border-box;" placeholder="Misal: Reaksi 2 dibalik karena..."></textarea>
                <p style="margin:0 0 8px; font-size:13.5px;">Tentukan ΔH total (kJ):</p>
                <input type="number" id="s3_hess2_2" step="0.1" placeholder="-110.5" style="width:120px; padding:6px 8px; border:1px solid rgba(17,24,39,0.15); border-radius:6px; font-size:14px; margin-bottom:16px;">
                
                <div style="text-align:right;">
                  <button class="btn btnPrimary" onclick="checkS3Hess()" style="padding:10px 20px; font-size:12px;">Periksa Jawaban 🔍</button>
                </div>
                <div id="feedback_s3_hess" style="display:none; margin-top:12px;"></div>
              </div>
            </div>

            <!-- Stage 4: Kesimpulan (SECTION 6) -->
            <div class="content-stage" data-stage="4" data-type="activity">
              <div class="contentBox">
                <h4 style="margin:0 0 8px;">✍ Kesimpulan</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Setelah mempelajari praktikum kalorimeter dan Hukum Hess, tuliskan kesimpulanmu tentang: cara menentukan perubahan entalpi reaksi, dan penggunaan Hukum Hess dalam menentukan ΔH reaksi.
                </p>
                <textarea id="kesimpulanS3" rows="5" style="width:100%; padding:12px; border:1px solid rgba(17,24,39,0.15); border-radius:8px; font-size:14px; resize:vertical; box-sizing:border-box;" placeholder="Tuliskan kesimpulanmu di sini..."></textarea>
                <div style="margin-top:12px; padding:12px; background:rgba(16,185,129,0.08); border-radius:8px;">
                  <p style="margin:0; color:#065f46; font-weight:650;">
                    🏆 Selamat! Kamu telah menyelesaikan Subbab 3 — Penentuan ΔH Reaksi Menggunakan Kalorimeter dan Hukum Hess.
                  </p>
                </div>
              </div>
            </div>
          `
    },
    s4: {
      title: "Penentuan \u0394H Reaksi Menggunakan Data Energi Ikatan dan Data Entalpi Pembentukan Standar (\u0394H\u00B0f)",
      html: `
            <!-- Stage 0: Video Pendahuluan (SECTION 1) -->
            <div class="content-stage" data-stage="0" data-type="video">
              <div class="contentBox">
                <h4 style="margin:0 0 8px;">&#128269; Yuk, amati video berikut!</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Perhatikan bagaimana ikatan kimia pada molekul dapat terputus dan terbentuk kembali selama reaksi berlangsung, serta bagaimana proses tersebut berkaitan dengan perubahan energi reaksi.
                </p>
                <div class="videoWrap" style="margin-bottom:20px; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                  <iframe src="https://www.youtube.com/embed/TK3GeOM2IVk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
              </div>
            </div>

            <!-- Stage 1: Dugaan Awal (SECTION 2) -->
            <div class="content-stage" data-stage="1" data-type="activity">
              <div class="contentBox">
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Setelah mengamati video, menurutmu mengapa setiap reaksi menghasilkan energi yang berbeda? Bagaimana cara menentukan perubahan entalpi reaksi (\u0394H) menggunakan data energi ikatan dan data \u0394H\u00B0f?
                </p>
                <h4 style="margin:12px 0 8px;">&#9998; DUGAAN AWAL</h4>
                <p style="margin:0 0 8px; color:#1a1818; font-weight:650;">Tuliskan jawabanmu pada kolom berikut.</p>
                <textarea id="dugaanAwalS4" rows="5" style="width:100%; padding:12px; border:1px solid rgba(17,24,39,0.15); border-radius:8px; font-size:14px; resize:vertical; box-sizing:border-box;" placeholder="Tuliskan dugaanmu di sini..."></textarea>
                <div style="margin-top:12px; padding:12px; background:rgba(16,185,129,0.08); border-radius:8px;">
                  <p style="margin:0; color:#065f46; font-weight:650;">&#128526; Jawabanmu berhasil disimpan. Lanjutkan ke section berikutnya.</p>
                </div>
              </div>
            </div>

            <!-- Stage 2: Bagian A - Energi Ikatan (SECTION 3) -->
            <div class="content-stage" data-stage="2" data-type="content">
              <div class="contentBox">
                <h4 style="margin:0 0 8px;">&#128218; BAGIAN A: MENENTUKAN \u0394H REAKSI MENGGUNAKAN DATA ENERGI IKATAN</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Pada section ini, kamu akan mempelajari cara menentukan perubahan entalpi reaksi (\u0394H) menggunakan data energi ikatan melalui video pembelajaran dan aktivitas analisis reaksi kimia.
                </p>

                <h5 style="margin:0 0 8px;">&#128250; Video Pembelajaran:</h5>
                <div class="videoWrap" style="margin-bottom:16px; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                  <iframe src="https://www.youtube.com/embed/65mpx9V2Rac" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>

                <h5 style="margin:0 0 8px;">&#128218; Materi Energi Ikatan:</h5>
                <p style="margin:0 0 8px; color:#1a1818; font-weight:650;">
                  Sebelum mengerjakan aktivitas, pelajari terlebih dahulu materi tentang energi ikatan melalui flipbook berikut. Amati hubungan antara pemutusan dan pembentukan ikatan terhadap perubahan energi reaksi.
                </p>
                <p style="margin:0 0 16px;">
                  <a href="https://online.fliphtml5.com/nttmb/DATA-ENERGI-IKATAN/" target="_blank" style="color:#2f6bff; text-decoration:none; font-weight:bold;">&#128279; Buka Flipbook Data Energi Ikatan &#8599;</a>
                </p>

                <h4 style="margin:16px 0 8px;">&#129514; Aktivitas Menghitung \u0394H Reaksi Menggunakan Energi Ikatan</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-size:13.5px; font-weight:600;">
                  Gunakan data energi ikatan berikut untuk menentukan \u0394H reaksi pembakaran metana.<br>
                  CH<sub>4</sub>(<em>g</em>) + 2O<sub>2</sub>(<em>g</em>) \u2192 CO<sub>2</sub>(<em>g</em>) + 2H<sub>2</sub>O(<em>l</em>)
                </p>

                <div style="overflow-x:auto; margin-bottom:16px;">
                  <table style="width:100%; border-collapse:collapse; font-size:13.5px;">
                    <thead>
                      <tr style="background:rgba(255,106,0,0.05);">
                        <th style="border:1px solid rgba(17,24,39,0.1); padding:10px; text-align:left; font-weight:800;">Ikatan</th>
                        <th style="border:1px solid rgba(17,24,39,0.1); padding:10px; text-align:left; font-weight:800;">Energi Ikatan (kJ/mol)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td style="border:1px solid rgba(17,24,39,0.1); padding:8px;">C\u2013H</td><td style="border:1px solid rgba(17,24,39,0.1); padding:8px;">414</td></tr>
                      <tr><td style="border:1px solid rgba(17,24,39,0.1); padding:8px;">O=O</td><td style="border:1px solid rgba(17,24,39,0.1); padding:8px;">495</td></tr>
                      <tr><td style="border:1px solid rgba(17,24,39,0.1); padding:8px;">C=O</td><td style="border:1px solid rgba(17,24,39,0.1); padding:8px;">724</td></tr>
                      <tr><td style="border:1px solid rgba(17,24,39,0.1); padding:8px;">O\u2013H</td><td style="border:1px solid rgba(17,24,39,0.1); padding:8px;">463</td></tr>
                    </tbody>
                  </table>
                </div>

                <p style="margin:0 0 8px; font-weight:600;">Tentukan: ikatan yang diputus pada pereaksi, dan ikatan yang dibentuk pada produk.</p>

                <h5 style="margin:12px 0 8px;">&#9998; Langkah Penyelesaian</h5>
                <div style="margin-bottom:12px;">
                  <p style="margin:0 0 6px; font-weight:600;">Ikatan Pereaksi yang Diputus:</p>
                  <input type="text" id="s4_ikatan_diputus" style="width:100%; padding:8px; border:1px solid rgba(17,24,39,0.15); border-radius:6px; font-size:13.5px; box-sizing:border-box;">
                </div>
                <div style="margin-bottom:12px;">
                  <p style="margin:0 0 6px; font-weight:600;">Ikatan Produk yang Dibentuk:</p>
                  <input type="text" id="s4_ikatan_dibentuk" style="width:100%; padding:8px; border:1px solid rgba(17,24,39,0.15); border-radius:6px; font-size:13.5px; box-sizing:border-box;">
                </div>
                <div style="margin-bottom:12px;">
                  <p style="margin:0 0 6px; font-weight:600;">Energi Total Ikatan yang Diputus (kJ):</p>
                  <input type="number" id="s4_energi_diputus" style="width:150px; padding:8px; border:1px solid rgba(17,24,39,0.15); border-radius:6px; font-size:13.5px;">
                </div>
                <div style="margin-bottom:12px;">
                  <p style="margin:0 0 6px; font-weight:600;">Energi Total Ikatan yang Dibentuk (kJ):</p>
                  <input type="number" id="s4_energi_dibentuk" style="width:150px; padding:8px; border:1px solid rgba(17,24,39,0.15); border-radius:6px; font-size:13.5px;">
                </div>
                <div style="margin-bottom:12px;">
                  <p style="margin:0 0 6px; font-weight:600;">\u0394H Reaksi (\u0394H = \u03A3E ikatan diputus \u2212 \u03A3E ikatan dibentuk):</p>
                  <input type="number" id="s4_dh_reaksi1" step="0.1" style="width:150px; padding:8px; border:1px solid rgba(17,24,39,0.15); border-radius:6px; font-size:13.5px;">
                </div>

                <div style="text-align:right;">
                  <button class="btn btnPrimary" onclick="checkS4Ikatan()" style="padding:10px 20px; font-size:12px;">Periksa Jawaban &#128269;</button>
                </div>
                <div id="feedback_s4_ikatan" style="display:none; margin-top:12px;"></div>
              </div>
            </div>

            <!-- Stage 3: Bagian B - Entalpi Pembentukan Standar (SECTION 4) -->
            <div class="content-stage" data-stage="3" data-type="content">
              <div class="contentBox">
                <h4 style="margin:0 0 8px;">&#128218; BAGIAN B: MENENTUKAN \u0394H REAKSI MENGGUNAKAN DATA ENTALPI PEMBENTUKAN STANDAR (\u0394H\u00B0f)</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Pada section ini, kamu akan mempelajari cara menentukan perubahan entalpi reaksi (\u0394H) menggunakan data entalpi pembentukan standar (\u0394H\u00B0f) melalui video pembelajaran dan aktivitas perhitungan \u0394H reaksi.
                </p>

                <h5 style="margin:0 0 8px;">&#128250; Video Pembelajaran \u0394H\u00B0f:</h5>
                <div class="videoWrap" style="margin-bottom:16px; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                  <iframe src="https://www.youtube.com/embed/UDutI0H2k1k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>

                <h5 style="margin:0 0 8px;">&#10024; Rumus Penentuan \u0394H Reaksi:</h5>
                <p style="margin:0 0 12px; font-size:16px; font-weight:700; padding:12px; background:rgba(255,106,0,0.08); border-radius:8px; text-align:center;">
                  \u0394H<sub>reaksi</sub> = \u03A3\u0394H\u00B0f<sub>produk</sub> \u2212 \u03A3\u0394H\u00B0f<sub>pereaksi</sub>
                </p>

                <h5 style="margin:0 0 8px;">&#128202; Data \u0394H\u00B0f:</h5>
                <div style="text-align:center; margin-bottom:16px;">
                  <img src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/sub-bab-4/DataPembentukanEntalpiStandar.jpg" alt="Data Entalpi Pembentukan Standar" style="max-width:100%; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                </div>

                <h4 style="margin:16px 0 8px;">&#129514; Aktivitas Menentukan \u0394H Reaksi Menggunakan \u0394H\u00B0f</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-size:13.5px; font-weight:600;">
                  Gunakan data \u0394H\u00B0f berikut untuk menentukan \u0394H reaksi pembakaran metana.<br>
                  CH<sub>4</sub>(<em>g</em>) + 2O<sub>2</sub>(<em>g</em>) \u2192 CO<sub>2</sub>(<em>g</em>) + 2H<sub>2</sub>O(<em>l</em>)
                </p>

                <h5 style="margin:12px 0 8px;">&#9998; Langkah Penyelesaian</h5>
                <div style="margin-bottom:12px;">
                  <p style="margin:0 0 6px; font-weight:600;">\u0394H\u00B0f Produk ( tuliskan senyawa dan nilainya):</p>
                  <input type="text" id="s4_dhf_produk" style="width:100%; padding:8px; border:1px solid rgba(17,24,39,0.15); border-radius:6px; font-size:13.5px; box-sizing:border-box;">
                </div>
                <div style="margin-bottom:12px;">
                  <p style="margin:0 0 6px; font-weight:600;">\u0394H\u00B0f Pereaksi ( tuliskan senyawa dan nilainya):</p>
                  <input type="text" id="s4_dhf_pereaksi" style="width:100%; padding:8px; border:1px solid rgba(17,24,39,0.15); border-radius:6px; font-size:13.5px; box-sizing:border-box;">
                </div>
                <div style="margin-bottom:12px;">
                  <p style="margin:0 0 6px; font-weight:600;">Jumlah \u0394H\u00B0f Produk (kJ):</p>
                  <input type="number" id="s4_sum_produk" step="0.1" style="width:150px; padding:8px; border:1px solid rgba(17,24,39,0.15); border-radius:6px; font-size:13.5px;">
                </div>
                <div style="margin-bottom:12px;">
                  <p style="margin:0 0 6px; font-weight:600;">Jumlah \u0394H\u00B0f Pereaksi (kJ):</p>
                  <input type="number" id="s4_sum_pereaksi" step="0.1" style="width:150px; padding:8px; border:1px solid rgba(17,24,39,0.15); border-radius:6px; font-size:13.5px;">
                </div>
                <div style="margin-bottom:12px;">
                  <p style="margin:0 0 6px; font-weight:600;">\u0394H Reaksi (kJ):</p>
                  <input type="number" id="s4_dh_reaksi2" step="0.1" style="width:150px; padding:8px; border:1px solid rgba(17,24,39,0.15); border-radius:6px; font-size:13.5px;">
                </div>

                <div style="text-align:right;">
                  <button class="btn btnPrimary" onclick="checkS4Entalpi()" style="padding:10px 20px; font-size:12px;">Periksa Jawaban &#128269;</button>
                </div>
                <div id="feedback_s4_entalpi" style="display:none; margin-top:12px;"></div>
              </div>
            </div>

            <!-- Stage 4: Kesimpulan (SECTION 6) -->
            <div class="content-stage" data-stage="4" data-type="activity">
              <div class="contentBox">
                <h4 style="margin:0 0 8px;">&#9998; Kesimpulan</h4>
                <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
                  Setelah mempelajari penentuan \u0394H reaksi menggunakan data energi ikatan dan data entalpi pembentukan standar (\u0394H\u00B0f), tuliskan kesimpulanmu tentang:
                </p>
                <ul style="margin:0 0 12px; padding-left:20px; font-size:13.5px; color:#4b5563;">
                  <li>Cara menentukan \u0394H reaksi menggunakan data energi ikatan</li>
                  <li>Cara menentukan \u0394H reaksi menggunakan data \u0394H\u00B0f</li>
                  <li>Hubungan nilai \u0394H terhadap sifat reaksi kimia</li>
                </ul>
                <textarea id="kesimpulanS4" rows="5" style="width:100%; padding:12px; border:1px solid rgba(17,24,39,0.15); border-radius:8px; font-size:14px; resize:vertical; box-sizing:border-box;" placeholder="Tuliskan kesimpulanmu di sini..."></textarea>
                <div style="margin-top:12px; padding:12px; background:rgba(16,185,129,0.08); border-radius:8px;">
                  <p style="margin:0; color:#065f46; font-weight:650;">&#128079; Kesimpulanmu sudah tersimpan. Kamu telah menyelesaikan Subbab 4!</p>
                </div>
              </div>
            </div>
          `
    },
    eval: {
      title: "Evaluasi Akhir",
      html: `\n<div class="contentBox">
  <h4 style="margin:0 0 8px;">🎓 Evaluasi Akhir Termokimia</h4>
  <p style="margin:0 0 12px; color:#1a1818; font-weight:650;">
    Selamat! Kamu telah menyelesaikan seluruh materi. Sekarang saatnya menguji pemahamanmu melalui evaluasi akhir ini. 
    Terdapat 10 soal pilihan ganda. Kerjakan dengan teliti ya!
  </p>
  <ul style="margin:0 0 12px; padding-left:20px; font-size:13.5px; color:#4b5563;">
    <li>Pilih satu jawaban yang paling tepat.</li>
    <li>Setelah semua soal dijawab, submit kuis untuk melihat nilai akhirmu.</li>
  </ul>
</div>
          `
    }
  };
}

const quizBank = {
  s1: [
    { q: "Saat praktikum, seorang siswa mencampurkan serbuk soda kue dan cuka ke dalam gelas kimia. Setelah beberapa saat, gelas terasa lebih dingin. Reaksi yang terjadi termasuk ...", a: ["eksoterm karena melepaskan kalor", "endoterm karena menyerap kalor", "eksoterm karena suhu sistem menurun", "isoterm karena suhu berubah", "netral karena tidak terjadi perpindahan kalor"], correct: 1, hint: "Perhatikan perubahan suhu pada gelas. Jika gelas terasa dingin, ke arah mana kalor berpindah?", pembahasan: "Gelas terasa lebih dingin menunjukkan bahwa sistem menyerap kalor dari lingkungan sehingga reaksi termasuk endoterm." },
    { q: "\"Jika suatu reaksi memiliki nilai ΔH positif, maka reaksi tersebut melepaskan kalor ke lingkungan.\" Pernyataan tersebut adalah ...", a: ["benar, karena ΔH positif menunjukkan kalor dilepaskan", "benar, karena lingkungan menerima kalor", "salah, karena ΔH positif menunjukkan sistem menyerap kalor", "salah, karena ΔH tidak berhubungan dengan kalor", "salah, karena semua reaksi memiliki ΔH negatif"], correct: 2, hint: "Perhatikan hubungan antara tanda ΔH dengan arah perpindahan kalor pada sistem.", pembahasan: "Nilai ΔH positif menunjukkan bahwa sistem menyerap kalor dari lingkungan sehingga reaksi termasuk endoterm." },
    { q: "Gas hidrogen bereaksi dengan oksigen membentuk air dan menghasilkan kalor sebesar 572 kJ. Persamaan termokimia yang tepat adalah ...", a: ["2H₂(g) + O₂(g) → 2H₂O(l) ΔH = +572 kJ", "2H₂(g) + O₂(g) → 2H₂O(l) ΔH = −572 kJ", "2H₂O(l) → 2H₂(g) + O₂(g) ΔH = −572 kJ", "H₂(g) + O₂(g) → H₂O(l) ΔH = 0", "H₂(g) + O₂(g) → 2H₂O(l) ΔH = +572 kJ"], correct: 1, hint: "Ingat: reaksi yang menghasilkan kalor memiliki ΔH bertanda negatif. Perhatikan juga kesetaraan reaksinya.", pembahasan: "Karena reaksi menghasilkan kalor, maka reaksi termasuk eksoterm sehingga nilai ΔH bertanda negatif." },
    { q: "Seorang siswa memasukkan serbuk kapur tohor (CaO) ke dalam air. Wadah terasa panas ketika disentuh. Pernyataan yang tepat adalah ...", a: ["sistem menyerap kalor dari lingkungan sehingga reaksi endoterm", "kalor berpindah dari lingkungan ke sistem sehingga ΔH positif", "sistem melepaskan kalor ke lingkungan sehingga reaksi eksoterm", "suhu lingkungan menurun karena kalor diserap sistem", "tidak terjadi perpindahan kalor antara sistem dan lingkungan"], correct: 2, hint: "Perhatikan perubahan suhu wadah. Jika wadah terasa panas, dari mana kalor tersebut berasal?", pembahasan: "Wadah terasa panas menunjukkan bahwa kalor dilepaskan dari sistem ke lingkungan. Oleh karena itu, reaksi termasuk eksoterm dan memiliki ΔH negatif." },
    { q: "Persamaan termokimia: N₂(g) + O₂(g) → 2NO(g) ΔH = +180 kJ. Pernyataan yang tepat adalah ...", a: ["reaksi melepaskan kalor ke lingkungan", "reaksi termasuk eksoterm karena ΔH positif", "sistem menyerap kalor dari lingkungan", "suhu lingkungan meningkat karena sistem melepaskan kalor", "kalor berpindah dari sistem ke lingkungan"], correct: 2, hint: "Perhatikan tanda ΔH pada persamaan tersebut dan hubungkan dengan arah perpindahan kalor.", pembahasan: "Nilai ΔH positif menunjukkan bahwa reaksi menyerap kalor dari lingkungan sehingga termasuk reaksi endoterm." },
  ],
  s2: [
    { q: "Perhatikan reaksi berikut.\nNaCl(s) → Na(s) + ½Cl₂(g)\nReaksi tersebut termasuk ...", a: ["ΔH°f", "ΔH°c", "ΔH°d", "eksoterm", "pembakaran"], correct: 2, hint: "Perhatikan arah panah reaksi. Ke kiri atau ke kanan? Dan apa yang terjadi pada senyawa NaCl?", pembahasan: "Reaksi tersebut menunjukkan senyawa NaCl diuraikan menjadi unsur-unsurnya, yaitu Na dan Cl₂. Reaksi penguraian seperti ini termasuk perubahan entalpi penguraian standar (ΔH°d). Ciri ΔH°d: senyawa dipecah menjadi zat yang lebih sederhana, membutuhkan energi, umumnya bersifat endoterm." },
    { q: "Perhatikan data berikut.\nΔH°f NH₄Cl = −314,4 kJ/mol\nPersamaan termokimia yang benar adalah ...", a: ["NH₄Cl(s) → NH₃(g) + HCl(g)", "½N₂(g) + 2H₂(g) + ½Cl₂(g) → NH₄Cl(s)", "N₂(g) + 2H₂(g) + Cl₂(g) → 2NH₄Cl(s)", "NH₄Cl(s) + O₂(g) → CO₂(g) + H₂O(l)", "NH₄Cl(s) → N₂(g) + H₂(g) + Cl₂(g)"], correct: 1, hint: "Entalpi pembentukan standar harus membentuk 1 mol senyawa dari unsur-unsurnya dalam keadaan standar. Berapa mol NH₄Cl yang dihasilkan?", pembahasan: "Entalpi pembentukan standar (ΔH°f) adalah perubahan entalpi saat 1 mol senyawa terbentuk dari unsur-unsurnya dalam keadaan standar. Persamaan yang benar harus berasal dari unsur standar N₂(g), H₂(g), dan Cl₂(g), menghasilkan tepat 1 mol NH₄Cl(s). Persamaan yang benar: ½N₂(g) + 2H₂(g) + ½Cl₂(g) → NH₄Cl(s)." },
    { q: "Diketahui: ΔH°f H₂O(l) = −285,85 kJ/mol\nJika terbentuk 4 mol H₂O(l), maka besar ΔH total adalah ...", a: ["−1143,4 kJ", "−571,7 kJ", "+1143,4 kJ", "+571,7 kJ", "−285,85 kJ"], correct: 0, hint: "Nilai ΔH berlaku untuk 1 mol. Jika mol diubah, maka ΔH juga ikut berubah.", pembahasan: "Nilai ΔH berlaku untuk 1 mol reaksi. Karena terbentuk 4 mol H₂O, maka: ΔH = 4 × (−285,85) = −1143,4 kJ. Semakin banyak mol zat yang bereaksi, semakin besar kalor yang dilepaskan atau diserap." },
    { q: "Reaksi berikut termasuk jenis perubahan entalpi ...\nC(s) + O₂(g) → CO₂(g)", a: ["penguraian", "endoterm", "pembentukan", "pembakaran dan pembentukan", "netral"], correct: 3, hint: "Reaksi ini termasuk pembakaran karena karbon bereaksi dengan oksigen. Namun, apakah juga termasuk pembentukan?", pembahasan: "Reaksi tersebut termasuk: pembakaran, karena karbon bereaksi dengan oksigen; pembentukan, karena membentuk 1 mol CO₂ dari unsur-unsurnya. Jadi reaksi dapat termasuk lebih dari satu jenis perubahan entalpi standar tergantung cara peninjauannya." },
    { q: "Mengapa reaksi pembakaran umumnya memiliki nilai ΔH negatif?", a: ["karena menyerap kalor", "karena kalor berpindah ke sistem", "karena melepaskan kalor ke lingkungan", "karena produk memiliki energi lebih tinggi", "karena tidak terjadi perpindahan kalor"], correct: 2, hint: "Perhatikan arah perpindahan kalor pada reaksi pembakaran. Ke mana kalor mengalir?", pembahasan: "Reaksi pembakaran umumnya memiliki nilai ΔH negatif karena melepaskan kalor ke lingkungan. Reaksi pembakaran bersifat eksoterm, yaitu reaksi yang melepaskan kalor sehingga suhu lingkungan meningkat. Hal ini terjadi karena energi yang dilepaskan saat pembentukan ikatan baru lebih besar dari energi yang dibutuhkan untuk memutuskan ikatan pereaksi." },
  ],
  s3: [
    { q: "Seorang siswa mencampurkan larutan HCl(aq) dan NaOH(aq) dalam kalorimeter sederhana. Massa total larutan sebesar 100 g. Setelah reaksi berlangsung, suhu naik dari 20°C menjadi 27°C. Jika kalor jenis larutan dianggap 4,2 J/g°C, maka besar kalor reaksi yang dihasilkan adalah ...", a: ["294 J", "1260 J", "2100 J", "2940 J", "4200 J"], correct: 3, hint: "Gunakan rumus q = m × c × ΔT. Diketahui: m = 100 g, c = 4,2 J/g°C, ΔT = 27 − 20 = 7°C", pembahasan: "q = m×c×ΔT = 100 × 4,2 × 7 = 2940 J. Karena suhu meningkat, reaksi bersifat eksoterm." },
    { q: "Pada suatu percobaan kalorimeter, suhu larutan turun setelah dua zat dicampurkan. Kesimpulan yang paling tepat adalah ...", a: ["reaksi bersifat eksoterm karena melepas kalor", "reaksi bersifat endoterm karena menyerap kalor", "kalor berpindah dari sistem ke lingkungan", "produk memiliki energi lebih rendah dari pereaksi", "ΔH bernilai negatif"], correct: 1, hint: "Perhatikan arah perpindahan kalor. Jika suhu turun, ke mana kalor berpindah?", pembahasan: "Penurunan suhu menunjukkan bahwa sistem menyerap kalor dari lingkungan. Akibatnya: reaksi bersifat endoterm, ΔH bernilai positif, kalor berpindah dari lingkungan ke sistem." },
    { q: "Diketahui persamaan reaksi: N₂(g) + 3H₂(g) → 2NH₃(g) ΔH = −92 kJ\nJika reaksi dibalik, maka nilai ΔH menjadi …", a: ["−184 kJ", "−92 kJ", "+46 kJ", "+92 kJ", "+184 kJ"], correct: 3, hint: "Jika reaksi dibalik, tanda ΔH berubah menjadi kebalikannya.", pembahasan: "Jika reaksi dibalik, maka tanda ΔH juga berubah. Semula ΔH = −92 kJ, setelah dibalik menjadi ΔH = +92 kJ." },
    { q: "Diketahui: H₂(g) + ½O₂(g) → H₂O(l) ΔH = −285,8 kJ\nJika koefisien reaksi dikalikan 2, maka nilai ΔH menjadi …", a: ["−571,6 kJ", "−285,8 kJ", "+285,8 kJ", "+571,6 kJ", "−142,9 kJ"], correct: 0, hint: "Jika seluruh koefisien reaksi dikalikan, maka ΔH juga ikut dikalikan dengan bilangan yang sama.", pembahasan: "Jika seluruh koefisien reaksi dikalikan 2, maka nilai ΔH juga dikalikan 2. ΔH = 2 × (−285,8) = −571,6 kJ." },
    { q: "Perhatikan data reaksi berikut.\nC(s) + O₂(g) → CO₂(g) ΔH = −393,5 kJ\nCO(g) + ½O₂(g) → CO₂(g) ΔH = −283 kJ\nNilai ΔH untuk reaksi: C(s) + ½O₂(g) → CO(g) adalah …", a: ["−676,5 kJ", "−110,5 kJ", "+110,5 kJ", "+676,5 kJ", "−283 kJ"], correct: 1, hint: "Reaksi mana yang perlu dibalik agar CO berada di ruas produk? Kemudian jumlahkan persamaan reaksinya.", pembahasan: "Reaksi 2 harus dibalik menjadi: CO₂(g) → CO(g) + ½O₂(g) ΔH = +283 kJ. Jumlahkan dengan reaksi 1: ΔH = −393,5 + 283 = −110,5 kJ." }
  ],
  s4: [
    { q: "Perhatikan data energi ikatan berikut.\nH\u2013H: 436 kJ/mol\nCl\u2013Cl: 242 kJ/mol\nH\u2013Cl: 431 kJ/mol\nTentukan \u0394H reaksi berikut: H2(g) + Cl2(g) \u2192 2HCl(g)", a: ["\u2212184 kJ", "\u2212242 kJ", "\u2212431 kJ", "+184 kJ", "+242 kJ"], correct: 0, hint: "Gunakan rumus \u0394H = energi ikatan diputus - energi ikatan dibentuk. Hitung total energi ikatan yang diputus dan dibentuk.", pembahasan: "Energi ikatan diputus = 436 + 242 = 678 kJ. Energi ikatan dibentuk = 2(431) = 862 kJ. \u0394H = 678 - 862 = -184 kJ. Karena \u0394H negatif, reaksi bersifat eksoterm." },
    { q: "Diketahui data \u0394H\u00B0f berikut.\nNH\u2083(g) = \u221246 kJ/mol\nNO(g) = +90 kJ/mol\nH\u2082O(l) = \u2212286 kJ/mol\nO\u2082(g) = 0 kJ/mol\nTentukan \u0394H reaksi berikut: 4NH\u2083(g) + 5O\u2082(g) \u2192 4NO(g) + 6H\u2082O(l)", a: ["\u2212905 kJ", "\u22121172 kJ", "\u22121260 kJ", "+905 kJ", "+1172 kJ"], correct: 1, hint: "Gunakan rumus \u0394H = \u03A3\u0394H\u00B0f produk - \u03A3\u0394H\u00B0f pereaksi. Jangan lupa kalikan dengan koefisien reaksi.", pembahasan: "Jumlah \u0394H\u00B0f produk: 4(90) + 6(\u2212286) = 360 - 1716 = -1356 kJ. Jumlah \u0394H\u00B0f pereaksi: 4(\u221246) + 5(0) = -184 kJ. \u0394H = (-1356) - (-184) = -1172 kJ." },
    { q: "Perhatikan reaksi berikut. N\u2082(g) + 3H\u2082(g) \u2192 2NH\u2083(g)\nPada reaksi tersebut, energi yang dilepaskan saat pembentukan ikatan N\u2013H lebih besar dibanding energi yang diperlukan untuk memutus ikatan pereaksi. Berdasarkan pernyataan tersebut, sifat reaksi yang terjadi adalah ....", a: ["endoterm", "netral", "eksoterm", "tidak memiliki \u0394H", "menyerap kalor"], correct: 2, hint: "Jika energi yang dilepaskan saat pembentukan ikatan lebih besar dari energi yang dibutuhkan untuk memutus ikatan, apa yang terjadi?", pembahasan: "Pada reaksi kimia: pemutusan ikatan membutuhkan energi, sedangkan pembentukan ikatan melepaskan energi. Jika energi yang dilepaskan saat pembentukan ikatan lebih besar dibanding energi yang dibutuhkan untuk memutus ikatan, maka reaksi akan melepaskan kalor ke lingkungan. Akibatnya: \u0394H bernilai negatif, dan reaksi bersifat eksoterm." },
    { q: "Diketahui data \u0394H\u00B0f berikut.\nCO\u2082(g) = \u2212394 kJ/mol\nH\u2082O(l) = \u2212286 kJ/mol\nC\u2082H\u2086(g) = \u221285 kJ/mol\nO\u2082(g) = 0 kJ/mol\nTentukan \u0394H pembakaran etana berikut: 2C\u2082H\u2086(g) + 7O\u2082(g) \u2192 4CO\u2082(g) + 6H\u2082O(l)", a: ["\u22123122 kJ", "\u22122854 kJ", "\u22121560 kJ", "+3122 kJ", "+2854 kJ"], correct: 0, hint: "Hitung dulu jumlah \u0394H\u00B0f semua produk dan pereaksi dengan mengalikan setiap nilai dengan koefisiennya.", pembahasan: "Jumlah \u0394H\u00B0f produk: 4(\u2212394) + 6(\u2212286) = -1576 - 1716 = -3292 kJ. Jumlah \u0394H\u00B0f pereaksi: 2(\u221285) + 7(0) = -170 kJ. Menentukan \u0394H reaksi: \u0394H = (-3292) - (-170) = -3122 kJ. Karena nilai \u0394H bernilai negatif, maka reaksi pembakaran etana bersifat eksoterm." },
    { q: "Perhatikan pernyataan berikut.\n1. Pemutusan ikatan membutuhkan energi.\n2. Pembentukan ikatan melepaskan energi.\n3. \u0394H negatif menunjukkan reaksi eksoterm.\n4. \u0394H reaksi dapat ditentukan menggunakan data energi ikatan.\nPernyataan yang benar adalah ....", a: ["1 dan 2", "1, 2, dan 3", "1, 3, dan 4", "2, 3, dan 4", "1, 2, 3, dan 4"], correct: 4, hint: "Periksa setiap pernyataan satu per satu. Semua pernyataan tentang konsep energi ikatan dan \u0394H.", pembahasan: "Pemutusan ikatan membutuhkan energi karena atom harus dipisahkan dari ikatannya. Pembentukan ikatan melepaskan energi karena atom menjadi lebih stabil saat membentuk ikatan baru. \u0394H negatif menunjukkan bahwa reaksi melepaskan kalor ke lingkungan sehingga bersifat eksoterm. \u0394H reaksi dapat dihitung menggunakan data energi ikatan dengan membandingkan energi ikatan pereaksi dan produk. Jadi seluruh pernyataan benar." }
  ],
  eval: [
    { q: "Perhatikan peristiwa berikut.\n1. Es mencair\n2. Pembakaran LPG\n3. Air membeku\n4. Fotosintesis\nPeristiwa yang termasuk reaksi eksoterm adalah ....", a: ["1 dan 2", "1 dan 4", "2 dan 3", "2 dan 4", "3 dan 4"], correct: 2, pembahasan: "Reaksi eksoterm adalah reaksi yang melepaskan kalor ke lingkungan. Pembakaran LPG → melepaskan kalor. Air membeku → melepaskan kalor. Sedangkan: es mencair, fotosintesis, termasuk endoterm karena menyerap energi." },
    { q: "Dalam percobaan kalorimeter, suhu larutan meningkat setelah reaksi berlangsung. Pernyataan yang tepat adalah ....", a: ["Sistem menyerap kalor", "Reaksi bersifat endoterm", "Reaksi melepaskan kalor", "Lingkungan menyerap kalor dari luar", "Tidak terjadi perpindahan kalor"], correct: 2, pembahasan: "Kenaikan suhu menunjukkan kalor dilepaskan oleh sistem ke lingkungan sehingga reaksi bersifat eksoterm." },
    { q: "Sebanyak 200 g larutan mengalami kenaikan suhu sebesar 4°C. Jika kalor jenis larutan 4,2 J/g°C, maka kalor yang diserap larutan adalah ....", a: ["420 J", "840 J", "1680 J", "3360 J", "4200 J"], correct: 3, pembahasan: "Gunakan rumus: q = m×c×ΔT = (200)(4.2)(4) = 3360 J" },
    { q: "Diketahui data reaksi berikut.\n2H2(g) + O2(g) → 2H2O(l) ΔH = −572 kJ\nBerdasarkan data tersebut, perubahan entalpi untuk reaksi berikut adalah ....\n2H2O(l) → 2H2(g) + O2(g)", a: ["−572 kJ", "+572 kJ", "−286 kJ", "+286 kJ", "0 kJ"], correct: 1, pembahasan: "Jika reaksi dibalik: tanda ΔH berubah menjadi kebalikannya. Maka: ΔH = +572 kJ. Reaksi menjadi endoterm karena menyerap energi." },
    { q: "Jika suatu reaksi memiliki ΔH positif, maka reaksi tersebut ....", a: ["melepaskan kalor", "bersifat eksoterm", "menyerap kalor", "menghasilkan suhu lebih tinggi", "tidak memerlukan energi"], correct: 2, pembahasan: "ΔH positif menunjukkan reaksi endoterm, yaitu reaksi yang menyerap kalor dari lingkungan." },
    { q: "Perhatikan data energi ikatan berikut.\nH–H : 436 kJ/mol\nBr–Br : 193 kJ/mol\nH–Br : 366 kJ/mol\nTentukan ΔH reaksi berikut.\nH2(g) + Br2(g) → 2HBr(g)", a: ["−103 kJ", "+103 kJ", "−366 kJ", "+366 kJ", "−193 kJ"], correct: 0, pembahasan: "Energi ikatan diputus: 436 + 193 = 629 kJ. Energi ikatan dibentuk: 2(366) = 732 kJ. ΔH = 629 − 732 = −103 kJ. Karena ΔH negatif, reaksi bersifat eksoterm." },
    { q: "Perhatikan pernyataan berikut.\n1. Pemutusan ikatan membutuhkan energi.\n2. Pembentukan ikatan melepaskan energi.\n3. ΔH negatif menunjukkan reaksi eksoterm.\n4. ΔH reaksi dapat dihitung menggunakan data energi ikatan.\nPernyataan yang benar adalah ....", a: ["1 dan 2", "1, 2, dan 3", "1, 3, dan 4", "2, 3, dan 4", "1, 2, 3, dan 4"], correct: 4, pembahasan: "Semua pernyataan benar sesuai konsep energi ikatan dan perubahan entalpi reaksi." },
    { q: "Diketahui data ΔH°f berikut.\nCO2(g) : −394 kJ/mol\nH2O(l) : −286 kJ/mol\nC2H5OH(l) : −278 kJ/mol\nO2(g) : 0 kJ/mol\nTentukan ΔH reaksi pembakaran etanol berikut.\nC2H5OH(l) + 3O2(g) → 2CO2(g) + 3H2O(l)", a: ["−1368 kJ", "+1368 kJ", "−958 kJ", "+958 kJ", "−394 kJ"], correct: 0, pembahasan: "Jumlah ΔH°f produk: 2(−394) + 3(−286) = −788 − 858 = −1646 kJ. Jumlah ΔH°f pereaksi: (−278) + 3(0) = −278 kJ. ΔH reaksi = (−1646) − (−278) = −1368 kJ." },
    { q: "Perhatikan reaksi pembakaran metana berikut.\nCH4(g) + 2O2(g) → CO2(g) + 2H2O(l)\nPada reaksi pembakaran tersebut: pemutusan ikatan pada pereaksi membutuhkan energi, sedangkan pembentukan ikatan pada produk melepaskan energi. Pembakaran bahan bakar menghasilkan kalor karena ....", a: ["semua reaksi kimia selalu menghasilkan kalor", "energi yang diperlukan untuk memutus ikatan lebih besar dibanding energi yang dilepaskan", "energi yang dilepaskan saat pembentukan ikatan lebih besar dibanding energi untuk memutus ikatan", "pemutusan ikatan menghasilkan energi ke lingkungan", "oksigen merupakan sumber utama kalor reaksi"], correct: 2, pembahasan: "Pada reaksi pembakaran: pemutusan ikatan pereaksi membutuhkan energi, sedangkan pembentukan ikatan produk melepaskan energi. Jika energi yang dilepaskan lebih besar, maka reaksi akan melepaskan kalor (eksoterm)." },
    { q: "Seorang siswa menghitung ΔH reaksi menggunakan data energi ikatan tetapi tidak memperhatikan jumlah ikatan yang terlibat dalam reaksi. Akibatnya ....", a: ["hasil ΔH tetap benar", "hasil ΔH menjadi lebih akurat", "hasil perhitungan ΔH menjadi salah", "energi ikatan tidak perlu dihitung", "koefisien reaksi tidak berpengaruh"], correct: 2, pembahasan: "Dalam perhitungan energi ikatan: jumlah ikatan harus diperhatikan, energi ikatan harus dikalikan dengan jumlah ikatan yang terlibat. Jika diabaikan, maka hasil ΔH menjadi tidak tepat." }
  ]
};
