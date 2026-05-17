
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
            <div class="contentBox">
              <h4 style="margin:0 0 8px;">👀 Ayo Perhatikan di Sekitarmu</h4>
              <div class="videoWrap" style="margin-bottom:20px; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
             <iframe width="560" height="315" src="https://www.youtube.com/embed/5NUCyiLjpFE?si=B5VBCA69zvi1FvB4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
              <p style="margin:0; color:#6b7280; font-weight:650;">
                Pernahkah kamu merasa hangat saat menyalakan api atau dingin saat es mencair?
              </p>
              <p style="margin:0; color:#6b7280; font-weight:650;">
                Peristiwa ini berkaitan dengan energi dalam reaksi kimia.
              </p>
              <br/>
              <p style="margin:0; margin-top: 10px; color:#6b7280; font-weight:650;"> 
                🤔 Yuk, kita cari tahu bersama
              </p>
              <p style="margin:0; color:#6b7280; font-weight:650;">
              Ke mana energi berpindah saat reaksi terjadi?
              </p>
              <p style="margin:0; color:#6b7280; font-weight:650;">
              Apa yang berperan dalam perpindahan energi tersebut?
              </p>
              <br/>
              <p style="margin:0; color:#6b7280; font-weight:650;"> 
                🔍 Apa yang sedang terjadi?
              </p>
              <div class="videoWrap" style="margin-bottom:20px; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/ZtMzVgSr85g?si=-cYM1pFMrwy1PPT1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
              <p style="margin:0; color:#6b7280; font-weight:650;"> 
                Perhatikan gambar berikut!
              </p>
              <div class="imgWrap" style="margin-bottom:20px; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                <img src="gambar/EnergiKeluarMasuk.png" alt="Energi Keluar Masuk" style="width:100%; display:block;">
              </div>
              <div class="contentBox" style="margin-top: 20px; border: 1px solid rgba(17, 24, 39, 0.15);">
                <p style="margin:0 0 12px; color:#111827; font-weight:750; font-size: 15px;">
                  📝 Pilihlah jawaban yang sesuai dengan pengamatanmu pada video!
                </p>
                <div style="overflow-x: auto;">
                  <table style="width:100%; border-collapse: collapse; min-width: 400px; font-size: 13.5px;">
                    <thead>
                      <tr style="background: rgba(255, 106, 0, 0.05);">
                        <th style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px; text-align: center; font-weight: 800; color: #111827;">Peristiwa</th>
                        <th style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px; text-align: center; font-weight: 800; color: #111827;">Di sekitarnya terasa</th>
                        <th style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px; text-align: center; font-weight: 800; color: #111827;">Energi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px; font-weight: 600;">Es mencair dalam gelas</td>
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px;">
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 6px;">
                            <input type="radio" name="obs1_temp" value="hangat"> Hangat
                          </label>
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="radio" name="obs1_temp" value="dingin"> Dingin
                          </label>
                        </td>
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px;">
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 6px;">
                            <input type="radio" name="obs1_energy" value="masuk"> Masuk
                          </label>
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="radio" name="obs1_energy" value="keluar"> Keluar
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px; font-weight: 600;">Pembakaran lilin</td>
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px;">
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 6px;">
                            <input type="radio" name="obs2_temp" value="hangat"> Hangat
                          </label>
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="radio" name="obs2_temp" value="dingin"> Dingin
                          </label>
                        </td>
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px;">
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 6px;">
                            <input type="radio" name="obs2_energy" value="masuk"> Masuk
                          </label>
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="radio" name="obs2_energy" value="keluar"> Keluar
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
               <br/>
              <p style="margin:0; color:#6b7280; font-weight:650;"> 
                🧪 Bagian mana yang akan kita pelajari?
                Perhatikan video berikut !
              </p>
              <div class="videoWrap" style="margin-bottom:20px; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/gzhTD6HgcE0?si=5K72LsIUt_x83cPU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
              <div class="contentBox" style="margin-top: 20px; border: 1px solid rgba(17, 24, 39, 0.15);">
                <p style="margin:0 0 8px; color:#111827; font-weight:750; font-size: 15px;">
                  📋 Aktivitas siswa:
                </p>
                <p style="margin:0 0 12px; color:#6b7280; font-size: 13.5px; font-weight: 600;">
                  Setelah menonton video di atas, isilah sesuai pengamatanmu!
                  <br/><strong>Petunjuk:</strong> Seret jawaban yang tersedia ke kolom yang tepat, bisa lebih dari satu jawaban.
                </p>

                <div style="overflow-x: auto; margin-bottom: 20px;">
                  <table style="width:100%; border-collapse: collapse; min-width: 500px; font-size: 13.5px;">
                    <thead>
                      <tr style="background: rgba(47, 107, 255, 0.05);">
                        <th style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px; text-align: center; font-weight: 800; color: #111827; width: 30%;">Peristiwa</th>
                        <th style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px; text-align: center; font-weight: 800; color: #111827; width: 35%;">Bagian yang dikaji (Sistem)</th>
                        <th style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px; text-align: center; font-weight: 800; color: #111827; width: 35%;">Bagian yang menjadi sekitarnya (Lingkungan)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px; font-weight: 600; text-align: center;">Es mencair dalam gelas</td>
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 8px; vertical-align: top;">
                          <div class="drop-zone" id="dz_sistem" data-accept="es_batu"></div>
                        </td>
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 8px; vertical-align: top;">
                          <div class="drop-zone" id="dz_lingkungan" data-accept="gelas,udara_sekitar"></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style="background: rgba(255, 255, 255, 0.5); border: 1px dashed rgba(17, 24, 39, 0.2); border-radius: 12px; padding: 12px;">
                  <p style="margin:0 0 10px; font-weight: 800; font-size: 13px; color: #2f6bff;">▼ Pilihan Jawaban (Drag Items)</p>
                  <div id="drag_source" style="display: flex; flex-wrap: wrap; gap: 8px;">
                    <div class="drag-item" draggable="true" id="item_1" data-id="es_batu">Es batu</div>
                    <div class="drag-item" draggable="true" id="item_2" data-id="air_lelehan">Air hasil lelehan es</div>
                    <div class="drag-item" draggable="true" id="item_3" data-id="gelas">Gelas</div>
                    <div class="drag-item" draggable="true" id="item_4" data-id="udara_sekitar">Udara sekitar</div>
                    <div class="drag-item" draggable="true" id="item_5" data-id="meja_kursi">Meja dan kursi</div>
                  </div>
                </div>

                <div style="margin-top: 15px; text-align: right;">
                  <button class="btn btnPrimary" onclick="checkDragDropAnswer()" style="padding: 10px 20px; font-size: 12px;">Periksa Jawaban 🔍</button>
                </div>
              </div>
               <br/>
              <p style="margin:0; color:#6b7280; font-weight:650;"> 
                🔄 Apakah semuanya bisa bertukar, mari simak video berikut!
              </p>
              <div class="videoWrap" style="margin-bottom:20px; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/0UiHRLO-Gc4?si=O5S53u2K52MzaTYi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
              <div>
              <br/>
              <div class="contentBox" style="margin-top: 20px; border: 1px solid rgba(17, 24, 39, 0.15);">
                <p style="margin:0 0 12px; color:#111827; font-weight:750; font-size: 15px;">
                  📋 Berikan tanda centang yang menurutmu sesuai !
                </p>
                <div style="overflow-x: auto;">
                  <table style="width:100%; border-collapse: collapse; min-width: 500px; font-size: 13.5px;">
                    <thead>
                      <tr style="background: rgba(255, 106, 0, 0.05); text-align: center;">
                        <th rowspan="2" style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px; font-weight: 800; color: #111827; width: 34%;">Peristiwa</th>
                        <th colspan="2" style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px; font-weight: 800; color: #111827;">Terjadi perpindahan</th>
                      </tr>
                      <tr style="background: rgba(255, 106, 0, 0.05); text-align: center;">
                        <th style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px; font-weight: 800; color: #111827; width: 33%;">Materi</th>
                        <th style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px; font-weight: 800; color: #111827; width: 33%;">Energi</th>
                      </tr>
                    </thead>
                    <tbody id="transfer_quiz_body">
                      <tr data-row="0">
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px; font-weight: 600;">Memanaskan air dalam panci terbuka</td>
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px;">
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 6px;">
                            <input type="radio" name="tr0_materi" value="iya"> Iya
                          </label>
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="radio" name="tr0_materi" value="tidak"> Tidak
                          </label>
                        </td>
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px;">
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 6px;">
                            <input type="radio" name="tr0_energi" value="iya"> Iya
                          </label>
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="radio" name="tr0_energi" value="tidak"> Tidak
                          </label>
                        </td>
                      </tr>
                      <tr data-row="1">
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px; font-weight: 600;">Menyimpan air panas dalam termos</td>
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px;">
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 6px;">
                            <input type="radio" name="tr1_materi" value="iya"> Iya
                          </label>
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="radio" name="tr1_materi" value="tidak"> Tidak
                          </label>
                        </td>
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px;">
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 6px;">
                            <input type="radio" name="tr1_energi" value="iya"> Iya
                          </label>
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="radio" name="tr1_energi" value="tidak"> Tidak
                          </label>
                        </td>
                      </tr>
                      <tr data-row="2">
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px; font-weight: 600;">Menyuguhkan kopi panas dengan cangkir tertutup rapat</td>
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px;">
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 6px;">
                            <input type="radio" name="tr2_materi" value="iya"> Iya
                          </label>
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="radio" name="tr2_materi" value="tidak"> Tidak
                          </label>
                        </td>
                        <td style="border: 1px solid rgba(17, 24, 39, 0.1); padding: 12px;">
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 6px;">
                            <input type="radio" name="tr2_energi" value="iya"> Iya
                          </label>
                          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="radio" name="tr2_energi" value="tidak"> Tidak
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style="margin-top: 15px; text-align: right;">
                    <button class="btn btnPrimary" onclick="checkTransferQuiz()" style="padding: 10px 20px; font-size: 12px;">Periksa Jawaban 🔍</button>
                </div>
              </div>
              <br/>
              <p style="margin:0; color:#6b7280; font-weight:650;"> 
                Perhatikan dua peristiwa berikut dengan seksama 
                Amati perubahan yang terjadi pada sistem dan lingkungan di sekitarnya!
              </p>
              <div class="imgWrap" style="margin-bottom:20px; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                <img src="gambar/GambarPeristiwaAdanB.png" alt="Energi Keluar Masuk" style="width:100%; display:block;">
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
    { q: "Reaksi eksoterm adalah reaksi yang...", a: ["menyerap kalor dari lingkungan", "melepaskan kalor ke lingkungan", "tidak melibatkan kalor", "selalu terjadi pada 0°C"], correct: 1 },
    { q: "Sistem dalam termokimia adalah...", a: ["segala sesuatu di luar reaksi", "bagian yang dikaji (reaksi/larutan) saja", "udara di ruangan", "alat ukur saja"], correct: 1 },
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
