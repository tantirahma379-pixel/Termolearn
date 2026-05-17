
/***********************
 * Stage Progress Logic
 ***********************/
const LS_STAGES_KEY = "thermolearn_stages_v1";
let _currentSubbabKey = null;

function loadStageProgress() {
    try {
        return JSON.parse(localStorage.getItem(LS_STAGES_KEY) || "{}");
    } catch (e) { return {}; }
}

function getUnlockedStage(subbabKey) {
    const progress = loadStageProgress();
    return progress[subbabKey] || 0;
}

function unlockNextStage(subbabKey) {
    const progress = loadStageProgress();
    const current = progress[subbabKey] || 0;
    progress[subbabKey] = current + 1;
    localStorage.setItem(LS_STAGES_KEY, JSON.stringify(progress));
    applyStageVisibility(subbabKey);
}

function applyStageVisibility(subbabKey) {
    const unlocked = getUnlockedStage(subbabKey);
    const stages = document.querySelectorAll(".content-stage");
    if (!stages.length) return;

    const totalStages = stages.length;

    stages.forEach(stage => {
        const stageNum = parseInt(stage.dataset.stage, 10);
        if (stageNum <= unlocked) {
            stage.classList.remove("stage-locked");
            stage.classList.add("stage-unlocked");
            // Remove any existing continue buttons from already-passed stages
            if (stageNum < unlocked) {
                const btn = stage.querySelector(".stage-continue-btn");
                if (btn) btn.remove();
            }
        } else {
            stage.classList.add("stage-locked");
            stage.classList.remove("stage-unlocked");
        }
    });

    // Add continue button to the current (latest unlocked) stage if needed
    const currentStage = document.querySelector(`.content-stage[data-stage="${unlocked}"]`);
    if (currentStage && !currentStage.querySelector(".stage-continue-btn")) {
        const type = currentStage.dataset.type;
        if (type === "video" || type === "activity" || type === "content") {
            const btn = document.createElement("button");
            btn.className = "btn btnPrimary stage-continue-btn";
            if (type === "video") {
                btn.textContent = "Saya sudah menonton video ini, lanjutkan ▶️";
            } else if (type === "activity") {
                btn.textContent = "Saya sudah mengerjakan, lanjutkan ▶️";
            } else {
                btn.textContent = "Lanjutkan ▶️";
            }
            btn.onclick = () => {
                unlockNextStage(subbabKey);
                toast("Konten berikutnya terbuka!");
                // Scroll to newly revealed stage
                setTimeout(() => {
                    const next = document.querySelector(`.content-stage[data-stage="${unlocked + 1}"]`);
                    if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            };
            currentStage.appendChild(btn);
        }
        // type === "quiz" handled by checkDragDropAnswer / checkTransferQuiz
    }

    // Show/hide the final quiz section based on all content stages being done
    const quizSection = document.getElementById("quizSection");
    if (quizSection) {
        if (unlocked >= totalStages) {
            quizSection.classList.remove("stage-locked");
            quizSection.classList.add("stage-unlocked");
        } else {
            quizSection.classList.add("stage-locked");
            quizSection.classList.remove("stage-unlocked");
        }
    }

    // Update progress bar
    updateProgressBar(unlocked, totalStages);
}

function updateProgressBar(unlocked, totalStages) {
    const container = document.getElementById("stageProgressBar");
    if (!container) return;

    // totalSteps includes all content stages + final quiz
    const totalSteps = totalStages + 1;
    // completed = number of content stages passed; cap at totalSteps
    const completed = Math.min(unlocked, totalSteps);
    const pct = Math.round((completed / totalSteps) * 100);

    const labelCurrent = completed >= totalSteps
        ? "Semua tahap selesai!"
        : `Tahap ${completed + 1} dari ${totalSteps}`;

    container.innerHTML = `
        <div class="progressWrap">
          <div class="progressHeader">
            <span class="progressLabel">${labelCurrent}</span>
            <span class="progressPct">${pct}%</span>
          </div>
          <div class="progressTrack">
            <div class="progressFill" style="width:${pct}%"></div>
          </div>
          <div class="progressDots">
            ${Array.from({ length: totalSteps }, (_, i) => {
                const done = i < completed;
                const active = i === completed && completed < totalSteps;
                const isQuiz = i === totalSteps - 1;
                const cls = done ? "dot done" : active ? "dot active" : "dot";
                const label = isQuiz ? "Kuis" : (i + 1);
                return `<div class="${cls}"><span>${label}</span></div>`;
            }).join("")}
          </div>
        </div>
    `;
}

function initStages(subbabKey) {
    _currentSubbabKey = subbabKey;
    const stages = document.querySelectorAll(".content-stage");
    if (!stages.length) return;
    applyStageVisibility(subbabKey);
}

/***********************
 * Quiz Logic
 ***********************/
function renderQuiz(key) {
    const area = $("#quizArea");
    const list = quizBank[key] || [];
    if (!area) return;

    if (!list.length) {
        area.innerHTML = `<div class="contentBox">Belum ada kuis untuk bagian ini.</div>`;
        return;
    }

    area.innerHTML = list.map((item, idx) => {
        const name = `q_${key}_${idx}`;
        return `
          <div class="quizQ">
            <strong>${idx + 1}. ${escapeHtml(item.q)}</strong>
            ${item.a.map((opt, oi) => `
              <label class="opt">
                <input type="radio" name="${name}" value="${oi}" />
                <span>${escapeHtml(opt)}</span>
              </label>
            `).join("")}
          </div>
        `;
    }).join("");
}

function submitQuiz(key) {
    const list = quizBank[key] || [];
    if (!list.length) {
        toast("Belum ada kuis untuk bagian ini.");
        return;
    }

    let correct = 0;
    for (let i = 0; i < list.length; i++) {
        const group = document.getElementsByName(`q_${key}_${i}`);
        let sel = null;
        group.forEach(r => { if (r.checked) sel = Number(r.value); });
        if (sel === null) {
            toast("Masih ada soal belum dijawab 🙂");
            return;
        }
        if (sel === list[i].correct) correct++;
    }

    const score = Math.round((correct / list.length) * 100);

    const already = hasDone(key);
    if (already) {
        toast(`Mode latihan: skor kamu ${score}. Nilai sudah terkunci, tidak berubah ✅`);
        render();
        return;
    }

    const partial = (key === "eval") ? { eval: score } : { [key]: score };
    const result = upsertResult(partial, { lockIfExists: true });

    if (result.changed) {
        toast(`Skor kamu: ${score} ✅ (Terkunci)`);
    } else {
        toast(`Nilai sudah terkunci, tidak berubah ✅`);
    }

    render();
}

function initDragDrop() {
    const draggables = document.querySelectorAll(".drag-item");
    const dropZones = document.querySelectorAll(".drop-zone");
    const dragSource = document.getElementById("drag_source");
    const dragSourceGroups = document.querySelectorAll(".drag-source-group");

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", () => {
            draggable.classList.add("dragging");
        });

        draggable.addEventListener("dragend", () => {
            draggable.classList.remove("dragging");
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener("dragover", e => {
            e.preventDefault();
            zone.classList.add("drag-over");
        });

        zone.addEventListener("dragleave", () => {
            zone.classList.remove("drag-over");
        });

        zone.addEventListener("drop", e => {
            e.preventDefault();
            zone.classList.remove("drag-over");
            const draggable = document.querySelector(".dragging");
            if (draggable) {
                zone.appendChild(draggable);
            }
        });
    });

    if (dragSource) {
        dragSource.addEventListener("dragover", e => {
            e.preventDefault();
        });
        dragSource.addEventListener("drop", e => {
            e.preventDefault();
            const draggable = document.querySelector(".dragging");
            if (draggable) {
                dragSource.appendChild(draggable);
            }
        });
    }

    dragSourceGroups.forEach(group => {
        group.addEventListener("dragover", e => {
            e.preventDefault();
        });
        group.addEventListener("drop", e => {
            e.preventDefault();
            const draggable = document.querySelector(".dragging");
            if (draggable) {
                group.appendChild(draggable);
            }
        });
    });
}

function checkDragDropAnswer() {
    const dzSistem = document.getElementById("dz_sistem");
    const dzLingkungan = document.getElementById("dz_lingkungan");

    if (!dzSistem || !dzLingkungan) return;

    const correctSistem = dzSistem.dataset.accept.split(",");
    const correctLingkungan = dzLingkungan.dataset.accept.split(",");

    const currentSistem = Array.from(dzSistem.children).map(c => c.dataset.id);
    const currentLingkungan = Array.from(dzLingkungan.children).map(c => c.dataset.id);

    // Filter to check if all correct answers are present and no wrong answers
    const isSistemCorrect = correctSistem.every(id => currentSistem.includes(id)) &&
        currentSistem.every(id => correctSistem.includes(id));

    const isLingkunganCorrect = correctLingkungan.every(id => currentLingkungan.includes(id)) &&
        currentLingkungan.every(id => correctLingkungan.includes(id));

    if (isSistemCorrect && isLingkunganCorrect) {
        toast("Luar biasa! Jawabanmu benar semua 🌟");
        // Highlight success
        dzSistem.style.borderColor = "#10b981";
        dzLingkungan.style.borderColor = "#10b981";
        // Unlock next stage
        if (_currentSubbabKey) {
            const stage = dzSistem.closest(".content-stage");
            if (stage) {
                const stageNum = parseInt(stage.dataset.stage, 10);
                const unlocked = getUnlockedStage(_currentSubbabKey);
                if (stageNum === unlocked) {
                    unlockNextStage(_currentSubbabKey);
                    setTimeout(() => {
                        const next = document.querySelector(`.content-stage[data-stage="${stageNum + 1}"]`);
                        if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 300);
                }
            }
        }
    } else {
        toast("Hmm, sepertinya masih ada yang kurang tepat. Coba lagi ya! 💪");
        // Highlight error
        if (!isSistemCorrect) dzSistem.style.borderColor = "#ef4444";
        else dzSistem.style.borderColor = "rgba(17, 24, 39, 0.1)";

        if (!isLingkunganCorrect) dzLingkungan.style.borderColor = "#ef4444";
        else dzLingkungan.style.borderColor = "rgba(17, 24, 39, 0.1)";
    }
}

function checkTransferQuiz() {
    const answers = [
        { materi: "iya", energi: "iya" },    // Row 1
        { materi: "tidak", energi: "tidak" }, // Row 2
        { materi: "tidak", energi: "iya" }   // Row 3
    ];

    let allCorrect = true;
    let anyEmpty = false;

    for (let i = 0; i < answers.length; i++) {
        const materiRadios = document.getElementsByName(`tr${i}_materi`);
        const energiRadios = document.getElementsByName(`tr${i}_energi`);

        let selMateri = null;
        let selEnergi = null;

        materiRadios.forEach(r => { if (r.checked) selMateri = r.value; });
        energiRadios.forEach(r => { if (r.checked) selEnergi = r.value; });

        const rowElement = document.querySelector(`#transfer_quiz_body tr[data-row="${i}"]`);

        if (selMateri === null || selEnergi === null) {
            anyEmpty = true;
            if (rowElement) rowElement.style.background = "";
            continue;
        }

        const isRowCorrect = (selMateri === answers[i].materi && selEnergi === answers[i].energi);

        if (isRowCorrect) {
            if (rowElement) rowElement.style.background = "rgba(16, 185, 129, 0.1)"; // Soft green
        } else {
            allCorrect = false;
            if (rowElement) rowElement.style.background = "rgba(239, 68, 68, 0.1)"; // Soft red
        }
    }

    if (anyEmpty) {
        toast("Masih ada yang belum dijawab 🙂");
        return;
    }

    if (allCorrect) {
        toast("Hebat! Jawabanmu benar semua 🌟");
        // Unlock next stage
        if (_currentSubbabKey) {
            const quizBody = document.getElementById("transfer_quiz_body");
            if (quizBody) {
                const stage = quizBody.closest(".content-stage");
                if (stage) {
                    const stageNum = parseInt(stage.dataset.stage, 10);
                    const unlocked = getUnlockedStage(_currentSubbabKey);
                    if (stageNum === unlocked) {
                        unlockNextStage(_currentSubbabKey);
                        setTimeout(() => {
                            const next = document.querySelector(`.content-stage[data-stage="${stageNum + 1}"]`);
                            if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 300);
                    }
                }
            }
        }
    } else {
        toast("Ada jawaban yang kurang tepat, periksa baris yang berwarna merah ya! 💪");
    }
}

/***********************
 * Aktivitas 1: Sistem & Lingkungan (3 peristiwa bertahap)
 ***********************/
const _akt1Pembahasan = {
    p1: "Kayu yang terbakar merupakan sistem karena menjadi pusat perhatian pada proses pembakaran. Sementara itu, udara dan lingkungan sekitar termasuk lingkungan karena berada di luar sistem serta menerima kalor yang dilepaskan selama proses pembakaran berlangsung.",
    p2: "Es batu merupakan sistem karena menjadi pusat perhatian pada proses mencair. Meja dan lingkungan sekitar termasuk lingkungan karena memberikan kalor kepada sistem sehingga es dapat mencair.",
    p3: "Sistem merupakan bagian yang menjadi pusat perhatian pada suatu proses, yaitu air yang sedang dipanaskan. Sementara itu, panci, api, dan lingkungan sekitar termasuk lingkungan karena berada di luar sistem dan dapat berinteraksi dengan sistem."
};
const _akt1Sequence = ["p1", "p2", "p3"];
const _akt1Done = { p1: false, p2: false, p3: false };

function _checkDropZonePair(sistemId, lingkunganId) {
    const dzSistem = document.getElementById(sistemId);
    const dzLingkungan = document.getElementById(lingkunganId);
    if (!dzSistem || !dzLingkungan) return false;

    const correctSistem = dzSistem.dataset.accept.split(",");
    const correctLingkungan = dzLingkungan.dataset.accept.split(",");
    const currentSistem = Array.from(dzSistem.children).map(c => c.dataset.id);
    const currentLingkungan = Array.from(dzLingkungan.children).map(c => c.dataset.id);

    const isSistemOk = correctSistem.every(id => currentSistem.includes(id)) &&
        currentSistem.every(id => correctSistem.includes(id));
    const isLingkunganOk = correctLingkungan.every(id => currentLingkungan.includes(id)) &&
        currentLingkungan.every(id => correctLingkungan.includes(id));

    if (isSistemOk) dzSistem.style.borderColor = "#10b981";
    else dzSistem.style.borderColor = "#ef4444";
    if (isLingkunganOk) dzLingkungan.style.borderColor = "#10b981";
    else dzLingkungan.style.borderColor = "#ef4444";

    return isSistemOk && isLingkunganOk;
}

function checkAktivitas1Peristiwa(pid) {
    const ok = _checkDropZonePair("dz_akt1_" + pid + "_sistem", "dz_akt1_" + pid + "_lingkungan");
    const fb = document.getElementById("feedback_akt1_" + pid);

    if (ok) {
        toast("Tepat! Sistem merupakan bagian yang menjadi pusat perhatian pada suatu proses.");
        _akt1Done[pid] = true;
        if (fb) {
            fb.style.display = "block";
            fb.innerHTML = '<div style="padding:10px; background:rgba(16,185,129,0.08); border-radius:8px; font-size:13px;">' +
                '<strong style="color:#065f46;">✅ Benar!</strong><br>' +
                '<span style="color:#6b7280;">' + _akt1Pembahasan[pid] + '</span></div>';
        }
        const idx = _akt1Sequence.indexOf(pid);
        if (idx < _akt1Sequence.length - 1) {
            const nextPid = _akt1Sequence[idx + 1];
            const nextEl = document.getElementById("akt1_" + nextPid);
            if (nextEl) {
                nextEl.style.display = "block";
                initDragDrop();
                setTimeout(() => nextEl.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
            }
        }
        if (_akt1Done.p1 && _akt1Done.p2 && _akt1Done.p3) {
            if (_currentSubbabKey) {
                const stage = document.getElementById("akt1_p1").closest(".content-stage");
                if (stage) {
                    const stageNum = parseInt(stage.dataset.stage, 10);
                    const unlocked = getUnlockedStage(_currentSubbabKey);
                    if (stageNum === unlocked) {
                        unlockNextStage(_currentSubbabKey);
                        setTimeout(() => {
                            const next = document.querySelector(`.content-stage[data-stage="${stageNum + 1}"]`);
                            if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 500);
                    }
                }
            }
        }
    } else {
        toast("Coba perhatikan kembali bagian yang mengalami perubahan utama pada peristiwa tersebut. 💪");
        if (fb) {
            fb.style.display = "block";
            fb.innerHTML = '<div style="padding:10px; background:rgba(239,68,68,0.08); border-radius:8px; font-size:13px;">' +
                '<strong style="color:#991b1b;">❌ Belum tepat.</strong> Coba perhatikan kembali bagian yang mengalami perubahan utama pada peristiwa tersebut.</div>';
        }
    }
}

/***********************
 * Aktivitas 2: Eksoterm & Endoterm
 ***********************/
function checkAktivitas2() {
    const dzEkso = document.getElementById("dz_eksoterm");
    const dzEndo = document.getElementById("dz_endoterm");
    if (!dzEkso || !dzEndo) return;

    const correctEkso = dzEkso.dataset.accept.split(",");
    const correctEndo = dzEndo.dataset.accept.split(",");
    const currentEkso = Array.from(dzEkso.children).map(c => c.dataset.id);
    const currentEndo = Array.from(dzEndo.children).map(c => c.dataset.id);

    const isEksoOk = correctEkso.every(id => currentEkso.includes(id)) &&
        currentEkso.every(id => correctEkso.includes(id));
    const isEndoOk = correctEndo.every(id => currentEndo.includes(id)) &&
        currentEndo.every(id => correctEndo.includes(id));

    const fb = document.getElementById("feedback_akt2");

    if (isEksoOk && isEndoOk) {
        toast("Hebat! Kamu berhasil mengelompokkan peristiwa dengan tepat. 🌟");
        dzEkso.style.borderColor = "#10b981";
        dzEndo.style.borderColor = "#10b981";
        if (fb) {
            fb.style.display = "block";
            fb.innerHTML = '<div style="padding:10px; background:rgba(16,185,129,0.08); border-radius:8px; font-size:13px;">' +
                '<strong style="color:#065f46;">✅ Benar!</strong><br>' +
                '<span style="color:#6b7280;">Reaksi eksoterm merupakan reaksi yang melepaskan kalor ke lingkungan, sedangkan reaksi endoterm merupakan reaksi yang menyerap kalor dari lingkungan.</span></div>';
        }
        if (_currentSubbabKey) {
            const stage = dzEkso.closest(".content-stage");
            if (stage) {
                const stageNum = parseInt(stage.dataset.stage, 10);
                const unlocked = getUnlockedStage(_currentSubbabKey);
                if (stageNum === unlocked) {
                    unlockNextStage(_currentSubbabKey);
                    setTimeout(() => {
                        const next = document.querySelector(`.content-stage[data-stage="${stageNum + 1}"]`);
                        if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 300);
                }
            }
        }
    } else {
        toast("Perhatikan kembali arah perpindahan kalor pada setiap peristiwa. 💪");
        if (!isEksoOk) dzEkso.style.borderColor = "#ef4444";
        else dzEkso.style.borderColor = "#10b981";
        if (!isEndoOk) dzEndo.style.borderColor = "#ef4444";
        else dzEndo.style.borderColor = "#10b981";
        if (fb) {
            fb.style.display = "block";
            fb.innerHTML = '<div style="padding:10px; background:rgba(239,68,68,0.08); border-radius:8px; font-size:13px;">' +
                '<strong style="color:#991b1b;">❌ Belum tepat.</strong> Perhatikan kembali arah perpindahan kalor pada setiap peristiwa.</div>';
        }
    }
}

/***********************
 * Aktivitas 3: Analisis Perpindahan Kalor
 ***********************/
function checkAktivitas3() {
    const answers = {
        akt3_q1: "sistem_ke_lingkungan",
        akt3_q2: "negatif",
        akt3_q3: "eksoterm"
    };

    let allCorrect = true;
    let anyEmpty = false;

    for (const [name, correct] of Object.entries(answers)) {
        const radios = document.getElementsByName(name);
        let sel = null;
        radios.forEach(r => { if (r.checked) sel = r.value; });
        if (sel === null) { anyEmpty = true; continue; }

        const labels = document.querySelectorAll(`input[name="${name}"]`);
        labels.forEach(r => {
            const label = r.closest("label");
            if (!label) return;
            if (r.value === correct) {
                label.style.background = "rgba(16,185,129,0.1)";
                label.style.borderRadius = "6px";
            } else if (r.checked && r.value !== correct) {
                label.style.background = "rgba(239,68,68,0.1)";
                label.style.borderRadius = "6px";
                allCorrect = false;
            }
        });
    }

    if (anyEmpty) {
        toast("Masih ada yang belum dijawab 🙂");
        return;
    }

    const fb = document.getElementById("feedback_akt3");

    if (allCorrect) {
        toast("Hebat! Jawabanmu benar semua! 🌟");
        if (fb) {
            fb.style.display = "block";
            fb.innerHTML = '<div style="padding:10px; background:rgba(16,185,129,0.08); border-radius:8px; font-size:13px;">' +
                '<strong style="color:#065f46;">✅ Hebat! Jawabanmu benar semua.</strong><br>' +
                '<span style="color:#6b7280;">Pada ilustrasi tersebut, kalor berpindah dari sistem ke lingkungan sehingga suhu lingkungan meningkat. Peristiwa ini menunjukkan bahwa sistem melepaskan kalor, sehingga reaksi termasuk eksoterm dan memiliki nilai ΔH negatif.</span></div>';
        }
        if (_currentSubbabKey) {
            const stage = document.getElementById("feedback_akt3").closest(".content-stage");
            if (stage) {
                const stageNum = parseInt(stage.dataset.stage, 10);
                const unlocked = getUnlockedStage(_currentSubbabKey);
                if (stageNum === unlocked) {
                    unlockNextStage(_currentSubbabKey);
                    setTimeout(() => {
                        const next = document.querySelector(`.content-stage[data-stage="${stageNum + 1}"]`);
                        if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 300);
                }
            }
        }
    } else {
        toast("Jawaban kamu ada yang kurang tepat, perhatikan kembali ilustrasi. 💪");
        if (fb) {
            fb.style.display = "block";
            fb.innerHTML = '<div style="padding:10px; background:rgba(239,68,68,0.08); border-radius:8px; font-size:13px;">' +
                '<strong style="color:#991b1b;">❌ Jawaban kamu ada yang kurang tepat.</strong> Perhatikan kembali ilustrasi perpindahan kalor.</div>';
        }
    }
}
