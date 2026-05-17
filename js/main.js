/***********************
 * Main Entry Point
 ***********************/
async function init() {
    const app = $("#app");
    if(app) {
        app.innerHTML = `
        <div style="height:100vh; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:20px;">
           <div class="logoDot"></div>
           <div style="font-weight:700; color:var(--muted); letter-spacing:1px;">MEMUAT DATA...</div>
        </div>`;
    }

    // Await loading the state from backend and local session
    await loadAll();

    if (!location.hash) location.hash = "#/cover";

    if (!state.session && !location.hash.startsWith("#/cover")) {
        location.hash = "#/cover";
    }

    if (state.session) {
        updateChatVisibility();
        bootstrapChat();
    }

    document.addEventListener("click", (e) => {
        if (e.target && e.target.id === "chatToggle") {
            toggleChat(true);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && document.activeElement === $("#chatInput")) {
            sendChat();
        }
    });

    // Simple pseudo-eyes blink if elements exist (optional)
    setInterval(() => {
        const eyes = document.getElementById("eyes");
        if (!eyes) return;
        eyes.animate(
            [{ transform: "scaleY(1)", transformOrigin: "center" },
            { transform: "scaleY(0.15)", transformOrigin: "center" },
            { transform: "scaleY(1)", transformOrigin: "center" }],
            { duration: 160, easing: "ease-in-out" }
        );
    }, 2600);

    render();
}

window.addEventListener("hashchange", () => {
    state.route = location.hash || "#/cover";
    render();
});

function go(hash) { location.hash = hash; }

// Require Login is used by render functions so it should be global or imported
function requireLogin() {
    if (!state.session) {
        go("#/cover");
        return false;
    }
    return true;
}

init();