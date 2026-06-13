
/***********************
 * Router (Main Render Dispatcher)
 ***********************/
function render() {
    updateTopbarVisibility();
    renderNav();
    updateChatVisibility();

    const app = $("#app");
    if (!app) return;

    const r = state.route || "#/cover";
    if (!state.session && !r.startsWith("#/cover")) {
        go("#/cover");
        return;
    }

    if (!r.startsWith("#/cover") && !guardRoute()) return;

    if (r.startsWith("#/cover")) return renderCover(app);
    if (r.startsWith("#/landing")) { requireLogin() && renderLanding(app); restoreAnswers(); return; }
    if (r.startsWith("#/materi")) { requireLogin() && renderMateri(app); restoreAnswers(); return; }
    if (r.startsWith("#/s1")) { requireLogin() && renderSubbab1(app); restoreAnswers(); return; }
    if (r.startsWith("#/s2")) { requireLogin() && renderSubbab2(app); restoreAnswers(); return; }
    if (r.startsWith("#/s3")) { requireLogin() && renderSubbab3(app); restoreAnswers(); return; }
    if (r.startsWith("#/s4")) { requireLogin() && renderSubbab4(app); restoreAnswers(); return; }
    if (r.startsWith("#/eval")) { requireLogin() && renderEvaluasi(app); restoreAnswers(); return; }
    if (r.startsWith("#/final")) { requireLogin() && renderFinal(app); restoreAnswers(); return; }
    if (r.startsWith("#/admin")) { requireLogin() && renderAdmin(app); restoreAnswers(); return; }

    go("#/cover");
}

function restoreAnswers() {
    if (!state.answers) return;
    for (const [id, value] of Object.entries(state.answers)) {
        const el = document.getElementById(id);
        if (el && (el.tagName === "TEXTAREA" || el.tagName === "INPUT")) {
            el.value = value;
        }
    }
}
