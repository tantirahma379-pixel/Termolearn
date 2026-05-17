/***********************
 * State & Core Logic
 ***********************/
const state = {
    route: "#/cover",
    session: null,
    users: [],      // Tidak terpakai lagi kecuali admin ingin lihat semua data, di-fetch via API
    results: [],    // Tidak terpakai lagi kecuali admin ingin lihat semua data, di-fetch via API
    content: null,
    currentUserResult: null // Menyimpan result user saat ini (di-fetch dari API)
};

// Fungsi bantuan untuk delay (jika diperlukan)
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function loadAll() {
    try {
        // Load session dari local storage (hanya untuk mengingat login di browser)
        state.session = JSON.parse(localStorage.getItem(LS_KEYS.session) || "null");
    } catch (e) {
        console.warn("Session load error:", e);
    }

    try {
        // Karena konten tidak lagi disimpan di database, kita gunakan konten default
        state.content = defaultContent();
    } catch (error) {
         console.warn("Gagal inisialisasi konten:", error);
         state.content = defaultContent();
    }

    // Pastikan fallback konten jika database kosong
    if (!state.content || Object.keys(state.content).length === 0) {
        state.content = defaultContent();
    }

    // Jika user punya session, fetch juga nilai terakhirnya dari DB
    if (state.session && state.session.email) {
        await refreshCurrentUserResult();
    }

    const y = $("#year");
    if (y) y.textContent = year();
}

function saveSession() {
    localStorage.setItem(LS_KEYS.session, JSON.stringify(state.session));
}

// Tidak diperlukan lagi karena tersimpan di DB
function saveUsers() { /* no-op */ }
function saveResults() { /* no-op */ }
function saveContent() { /* no-op, digantikan API */ }

// Mengambil result user login yang sudah di-fetch
function currentUserResult() {
    return state.currentUserResult || null;
}

// Refresh result current user dari API
async function refreshCurrentUserResult() {
    if (!state.session || !state.session.email) return;
    try {
        const res = await fetch(`/api/results/me?email=${encodeURIComponent(state.session.email)}`);
        if (res.ok) {
            state.currentUserResult = await res.json();
        }
    } catch (error) {
        console.error("Gagal mengambil data result user:", error);
    }
}

function hasDone(key) {
    const r = currentUserResult();
    return !!r && typeof r[key] === "number";
}

function allSubbabDone() {
    return hasDone("s1") && hasDone("s2") && hasDone("s3") && hasDone("s4");
}

function canOpen(routeHash) {
    if (routeHash.startsWith("#/cover")) return true;
    if (!state.session) return false;

    if (routeHash.startsWith("#/admin")) return state.session.role === "admin";
    if (routeHash.startsWith("#/landing")) return true;
    if (routeHash.startsWith("#/materi")) return true;

    if (routeHash.startsWith("#/s1")) return true;
    if (routeHash.startsWith("#/s2")) return hasDone("s1");
    if (routeHash.startsWith("#/s3")) return hasDone("s1") && hasDone("s2");
    if (routeHash.startsWith("#/s4")) return hasDone("s1") && hasDone("s2") && hasDone("s3");

    if (routeHash.startsWith("#/eval")) return allSubbabDone();
    if (routeHash.startsWith("#/final")) return hasDone("eval");

    return false;
}

function guardRoute() {
    if (!canOpen(state.route)) {
        toast("Bagian ini masih terkunci. Kerjakan tahap sebelumnya dulu ya 🙂");
        go(state.session ? "#/landing" : "#/cover");
        return false;
    }
    return true;
}

async function login() {
    const email = ($("#inpEmail")?.value || "").trim();
    const password = ($("#inpPassword")?.value || "").trim();

    if (!email || !email.includes("@")) {
        toast("Isi email yang valid ya");
        return;
    }
    if (!password) {
        toast("Isi password ya");
        return;
    }

    try {
        const btn = document.querySelector("#btnLogin");
        if(btn) {
            btn.innerHTML = "Memuat...";
            btn.disabled = true;
        }

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            toast(data.error || "Gagal login");
            if(btn) {
                btn.innerHTML = "Masuk";
                btn.disabled = false;
            }
            return;
        }

        state.session = data;
        saveSession();

        await refreshCurrentUserResult();

        updateChatVisibility();
        bootstrapChat();

        go(data.role === "admin" ? "#/admin" : "#/landing");
        toast(data.role === "admin" ? "Masuk sebagai Admin" : "Selamat belajar!");
    } catch (error) {
        toast("Terjadi kesalahan saat masuk. Coba lagi.");
        console.error(error);
        const btn = document.querySelector("#btnLogin");
        if(btn) {
            btn.innerHTML = "Masuk";
            btn.disabled = false;
        }
    }
}

async function register() {
    const name = ($("#inpRegName")?.value || "").trim();
    const email = ($("#inpRegEmail")?.value || "").trim();
    const password = ($("#inpRegPassword")?.value || "").trim();
    const password2 = ($("#inpRegPassword2")?.value || "").trim();

    if (!name) {
        toast("Isi nama ya");
        return;
    }
    if (!email || !email.includes("@")) {
        toast("Isi email yang valid ya");
        return;
    }
    if (!password || password.length < 6) {
        toast("Password minimal 6 karakter");
        return;
    }
    if (password !== password2) {
        toast("Konfirmasi password tidak cocok");
        return;
    }

    try {
        const btn = document.querySelector("#btnRegister");
        if(btn) {
            btn.innerHTML = "Memuat...";
            btn.disabled = true;
        }

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            toast(data.error || "Gagal mendaftar");
            if(btn) {
                btn.innerHTML = "Daftar";
                btn.disabled = false;
            }
            return;
        }

        state.session = data;
        saveSession();

        await refreshCurrentUserResult();

        updateChatVisibility();
        bootstrapChat();

        go(data.role === "admin" ? "#/admin" : "#/landing");
        toast("Pendaftaran berhasil! Selamat belajar!");
    } catch (error) {
        toast("Terjadi kesalahan saat mendaftar. Coba lagi.");
        console.error(error);
        const btn = document.querySelector("#btnRegister");
        if(btn) {
            btn.innerHTML = "Daftar";
            btn.disabled = false;
        }
    }
}

function logout() {
    state.session = null;
    state.currentUserResult = null;
    saveSession();
    toggleChat(false);
    updateChatVisibility();
    go("#/cover");
    toast("Kamu sudah keluar.");
}

async function upsertResult(partial, options = { lockIfExists: true }) {
    if (!state.session || !state.session.email) return { changed: false, row: null };

    // Update optimistik lokal dulu
    if (state.currentUserResult) {
        if (options.lockIfExists) {
            const blockedKeys = [];
            for (const k of Object.keys(partial || {})) {
                if (typeof state.currentUserResult[k] === "number" && typeof partial[k] === "number") {
                    blockedKeys.push(k);
                }
            }
            if (blockedKeys.length) {
                return { changed: false, row: state.currentUserResult, blockedKeys };
            }
        }
        // Asumsi lokal sbg fallback sementara menunggu DB
        Object.assign(state.currentUserResult, partial);
    }

    try {
        const res = await fetch("/api/results/upsert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: state.session.email,
                name: state.session.name,
                partial
            })
        });

        const data = await res.json();
        if (data.changed && data.row) {
            state.currentUserResult = data.row;
        }
        return data;
    } catch (error) {
        console.error("Gagal menyimpan hasil ke database:", error);
        return { changed: false, row: state.currentUserResult };
    }
}

function buildSummary(row) {
    const avg = row.total ?? 0;
    if (avg >= 85) return "Luar biasa! Pemahaman kamu sangat kuat.\nMotivasi: pertahankan ya! 🚀";
    if (avg >= 70) return "Bagus! Kamu sudah menguasai sebagian besar konsep.\nMotivasi: sedikit lagi menuju sempurna 💛";
    if (avg >= 55) return "Cukup baik, tapi masih perlu latihan.\nMotivasi: pelan-pelan tapi konsisten ✅";
    return "Semangat! Kita perbaiki konsep dasar dulu ya.\nMotivasi: kamu pasti bisa kalau rutin 🙌";
}
