
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
                // Pastikan item tidak dimasukkan ke dalam item lain,
                // tapi langsung ke container drop-zone nya
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
    } else {
        toast("Ada jawaban yang kurang tepat, periksa baris yang berwarna merah ya! 💪");
    }
}

