
/***********************
 * Cover Page
 ***********************/
function renderCover(app) {
  setChatContext("Selamat datang! Login atau daftar untuk mulai.");

  app.innerHTML = `
        <section class="card">
          <div class="cardPad centerCol">
            <span class="badge"><i></i> THERMOLEARN • TERMOKIMIA INTERACTIVE</span>

            <h2 class="titleXL" style="margin-top:10px;">
              TERMOLEARN <span style="background:linear-gradient(90deg, var(--orange), var(--blue)); -webkit-background-clip:text; background-clip:text; color:transparent;">seru</span>
            </h2>
            <div class="coverMascot">
              <div class="mascotWrap" style="min-height:320px; padding:0;">
                <img class="mascot" src="https://cdn.jsdelivr.net/gh/tantirahma379-pixel/Termolearn@master/gambar/Maskot.png" alt="Maskot TermoLearn">
              </div>

            <div class="authTabs" style="display:flex; gap:0; max-width:520px; width:100%; margin-bottom:0;">
              <button id="tabLogin" class="btn authTab active" onclick="switchAuthTab('login')" style="flex:1; border-radius:18px 0 0 0; font-size:13px; padding:12px 10px;">Masuk</button>
              <button id="tabRegister" class="btn authTab" onclick="switchAuthTab('register')" style="flex:1; border-radius:0 18px 0 0; font-size:13px; padding:12px 10px;">Daftar</button>
            </div>

            <!-- LOGIN FORM -->
            <div id="formLogin" class="form" style="max-width:520px; width:100%; margin-top:0; border-top:none;">
              <div class="field">
                <label>Email</label>
                <input id="inpEmail" type="email" placeholder="Email@gmail.com..." autocomplete="email" />
              </div>
              <div class="field" style="margin-bottom: 5px;">
                <label>Password</label>
                <input id="inpPassword" type="password" placeholder="Password..." autocomplete="current-password" />
              </div>
              
              <div style="display:flex; justify-content:flex-end; margin-bottom:15px; width:100%;">
                <a href="javascript:void(0)" onclick="switchAuthTab('forgot')" style="font-size:12px; color:var(--orange); font-weight:600; text-decoration:none;">Lupa Password?</a>
              </div>

              <button id="btnLogin" class="btn btnPrimary" onclick="login()">Masuk</button>

              <div class="hint">
                Masukkan email dan password yang terdaftar untuk melanjutkan.
              </div>
            </div>

            <!-- REGISTER FORM -->
            <div id="formRegister" class="form" style="max-width:520px; width:100%; margin-top:0; display:none; border-top:none;">
              <div class="field">
                <label>Nama Lengkap</label>
                <input id="inpRegName" type="text" placeholder="Tulis Nama Kamu..." autocomplete="name" />
              </div>
              <div class="field">
                <label>Email</label>
                <input id="inpRegEmail" type="email" placeholder="Email@gmail.com..." autocomplete="email" />
              </div>
              <div class="field">
                <label>Password</label>
                <input id="inpRegPassword" type="password" placeholder="Buat Password..." autocomplete="new-password" />
              </div>

              <button id="btnRegister" class="btn btnPrimary" onclick="register()">Daftar</button>

              <div class="hint">
                Silakan isi semua data di atas untuk membuat akun baru.
              </div>
            </div>

            <!-- FORGOT PASSWORD FORM -->
            <div id="formForgot" class="form" style="max-width:520px; width:100%; margin-top:0; display:none; border-top:none;">
              <h3 style="font-weight:700; margin-bottom:10px; text-align:center; color:var(--dark); font-size: 18px;">Lupa Password</h3>
              <p style="font-size:13px; color:var(--muted); margin-bottom:20px; text-align:center; line-height:1.5;">
                Masukkan email Anda di bawah ini. Kami akan mengirimkan instruksi dan tautan untuk mereset password Anda.
              </p>
              <div class="field">
                <label>Email</label>
                <input id="inpForgotEmail" type="email" placeholder="Email@gmail.com..." autocomplete="email" />
              </div>

              <button id="btnForgotSubmit" class="btn btnPrimary" onclick="forgotPassword()">Kirim Link Reset</button>

              <div style="text-align:center; margin-top:15px;">
                <a href="javascript:void(0)" onclick="switchAuthTab('login')" style="font-size:13px; color:var(--blue); font-weight:600; text-decoration:none;">Kembali ke Halaman Masuk</a>
              </div>
            </div>

            <!-- RESET PASSWORD FORM -->
            <div id="formReset" class="form" style="max-width:520px; width:100%; margin-top:0; display:none; border-top:none;">
              <h3 style="font-weight:700; margin-bottom:10px; text-align:center; color:var(--dark); font-size: 18px;">Atur Ulang Password</h3>
              <p id="resetEmailText" style="font-size:13px; color:var(--muted); margin-bottom:20px; text-align:center; font-weight:600;"></p>
              
              <div class="field">
                <label>Password Baru</label>
                <input id="inpResetPassword" type="password" placeholder="Password baru..." autocomplete="new-password" />
              </div>
              <div class="field">
                <label>Konfirmasi Password Baru</label>
                <input id="inpResetConfirm" type="password" placeholder="Ulangi password baru..." autocomplete="new-password" />
              </div>

              <button id="btnResetSubmit" class="btn btnPrimary" onclick="resetPasswordSubmit()">Simpan Password</button>

              <div style="text-align:center; margin-top:15px;">
                <a href="javascript:void(0)" onclick="switchAuthTab('login')" style="font-size:13px; color:var(--blue); font-weight:600; text-decoration:none;">Batal & Masuk</a>
              </div>
            </div>

          </div>
        </section>
      `;

  // Deteksi jika tautan reset password diklik
  if (window.RESET_ACTION === "reset_password" && window.RESET_TOKEN && window.RESET_EMAIL) {
    setTimeout(() => {
      switchAuthTab("reset");
      const textEl = document.getElementById("resetEmailText");
      if (textEl) {
        textEl.textContent = "Mengatur ulang password untuk: " + window.RESET_EMAIL;
      }
    }, 50);
  }
}

function switchAuthTab(tab) {
  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");
  const authTabs = document.querySelector(".authTabs");
  const formLogin = document.getElementById("formLogin");
  const formRegister = document.getElementById("formRegister");
  const formForgot = document.getElementById("formForgot");
  const formReset = document.getElementById("formReset");

  if (tab === "login") {
    if (authTabs) authTabs.style.display = "flex";
    if (tabLogin) tabLogin.classList.add("active");
    if (tabRegister) tabRegister.classList.remove("active");
    if (formLogin) formLogin.style.display = "";
    if (formRegister) formRegister.style.display = "none";
    if (formForgot) formForgot.style.display = "none";
    if (formReset) formReset.style.display = "none";
  } else if (tab === "register") {
    if (authTabs) authTabs.style.display = "flex";
    if (tabRegister) tabRegister.classList.add("active");
    if (tabLogin) tabLogin.classList.remove("active");
    if (formRegister) formRegister.style.display = "";
    if (formLogin) formLogin.style.display = "none";
    if (formForgot) formForgot.style.display = "none";
    if (formReset) formReset.style.display = "none";
  } else if (tab === "forgot") {
    if (authTabs) authTabs.style.display = "none";
    if (formLogin) formLogin.style.display = "none";
    if (formRegister) formRegister.style.display = "none";
    if (formForgot) formForgot.style.display = "";
    if (formReset) formReset.style.display = "none";
  } else if (tab === "reset") {
    if (authTabs) authTabs.style.display = "none";
    if (formLogin) formLogin.style.display = "none";
    if (formRegister) formRegister.style.display = "none";
    if (formForgot) formForgot.style.display = "none";
    if (formReset) formReset.style.display = "";
  }
}
