import { Hono } from "hono";
import { serve } from "bun";
import { serveStatic } from "hono/bun";
import postgres from "postgres";

const PORT = 3000;
const app = new Hono();

// Initialize Postgres connection
// Memastikan menggunakan .env
const sql = postgres(process.env.DATABASE_URI || "");

// =====================================
// API ROUTES
// =====================================

// 1. Register (Daftar)
app.post("/api/register", async (c) => {
  const { name, email, password } = await c.req.json();
  if (!name || !email || !password) {
    return c.json({ error: "Nama, email, dan password wajib diisi" }, 400);
  }
  if (password.length < 6) {
    return c.json({ error: "Password minimal 6 karakter" }, 400);
  }

  const role = email.toLowerCase() === "tantirahma379@gmail.com" ? "admin" : "visitor";

  try {
    // Cek apakah email sudah terdaftar
    const existing = await sql`SELECT email FROM users WHERE email = ${email}`;
    if (existing.length) {
      return c.json({ error: "Email sudah terdaftar. Silakan login." }, 409);
    }

    const passwordHash = await Bun.password.hash(password, { algorithm: "bcrypt", cost: 10 });

    await sql`
      INSERT INTO users (email, name, password_hash, role)
      VALUES (${email}, ${name}, ${passwordHash}, ${role})
    `;

    // Buat row results juga
    await sql`
      INSERT INTO results (email, name)
      VALUES (${email}, ${name})
      ON CONFLICT (email) DO NOTHING
    `;

    return c.json({ name, email, role, ts: new Date().toISOString() });
  } catch (error: any) {
    console.error("Register error:", error);
    return c.json({ error: error.message }, 500);
  }
});

// 2. Login
app.post("/api/login", async (c) => {
  const { email, password } = await c.req.json();
  if (!email || !password) {
    return c.json({ error: "Email dan password wajib diisi" }, 400);
  }

  try {
    const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (!rows.length) {
      return c.json({ error: "Email belum terdaftar. Silakan daftar dulu." }, 404);
    }

    const user = rows[0];
    const valid = await Bun.password.verify(password, user.password_hash);
    if (!valid) {
      return c.json({ error: "Password salah" }, 401);
    }

    return c.json({ name: user.name, email: user.email, role: user.role, ts: new Date().toISOString() });
  } catch (error: any) {
    console.error("Login error:", error);
    return c.json({ error: error.message }, 500);
  }
});

// 3. Ambil Semua Results (Untuk Admin)
app.get("/api/results", async (c) => {
  try {
    const results = await sql`
      SELECT * FROM results ORDER BY updated_at DESC
    `;
    return c.json(results);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// 4. Ambil Result berdasarkan Email (Untuk Current User)
app.get("/api/results/me", async (c) => {
  const email = c.req.query("email");
  if (!email) return c.json({ error: "Email required" }, 400);

  try {
    const result = await sql`SELECT * FROM results WHERE email = ${email}`;
    return c.json(result[0] || null);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// 5. Update Result / Score
app.post("/api/results/upsert", async (c) => {
  const body = await c.req.json();
  const { email, name, partial } = body;
  if (!email) return c.json({ error: "Email required" }, 400);

  try {
    const existing = await sql`SELECT * FROM results WHERE email = ${email}`;
    if (!existing.length) {
      return c.json({ error: "User result not found" }, 404);
    }

    const row = existing[0];

    // Check lock
    const blockedKeys = [];
    for (const k of Object.keys(partial)) {
      if (typeof row[k] === "number" && typeof partial[k] === "number") {
        blockedKeys.push(k);
      }
    }

    if (blockedKeys.length) {
      return c.json({ changed: false, row, blockedKeys });
    }

    // Prepare update object
    const updateObj = { ...partial, updated_at: sql`NOW()` };

    // Hitung total dan summary jika ada update score
    const scores = ['s1', 's2', 's3', 's4', 'eval'].map(k => partial[k] !== undefined ? partial[k] : row[k]);
    const valid = scores.filter(v => typeof v === 'number');

    if (valid.length) {
      const avg = Math.round(valid.reduce((a, b) => a + b, 0) / valid.length);
      updateObj.total = avg;

      let summary = "Semangat! Kita perbaiki konsep dasar dulu ya.\nMotivasi: kamu pasti bisa kalau rutin 🙌";
      if (avg >= 85) summary = "Luar biasa! Pemahaman kamu sangat kuat.\nMotivasi: pertahankan ya! 🚀";
      else if (avg >= 70) summary = "Bagus! Kamu sudah menguasai sebagian besar konsep.\nMotivasi: sedikit lagi menuju sempurna 💛";
      else if (avg >= 55) summary = "Cukup baik, tapi masih perlu latihan.\nMotivasi: pelan-pelan tapi konsisten ✅";

      updateObj.summary = summary;
    }

    const updated = await sql`
      UPDATE results SET ${sql(updateObj)}
      WHERE email = ${email}
      RETURNING *
    `;

    return c.json({ changed: true, row: updated[0], blockedKeys: [] });
  } catch (error: any) {
    console.error("Upsert error:", error);
    return c.json({ error: error.message }, 500);
  }
});

// =====================================
// STATIC FILES & FRONTEND ROUTING
// =====================================

// Catch-all untuk file statis
app.use("/*", serveStatic({ root: "./" }));

// Fallback untuk SPA (selalu serve index.html jika path tidak ditemukan/bukan file fisik)
app.get("/*", serveStatic({ path: "./index.html" }));

console.log(`🚀 Server berjalan di http://localhost:${PORT}`);

serve({
  fetch: app.fetch,
  port: PORT,
});
