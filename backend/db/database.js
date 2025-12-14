import db from "./connection.js";
import bcrypt from "bcrypt";

// Create users tabel
await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'USER' CHECK(role IN ('ADMIN', 'USER')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// See if there is any users
const result = await db.get("SELECT COUNT(*) as count FROM users");

// Creste admin if db is empthy
if (result.count === 0) {
  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  await db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [
    "admin@test.dk",
    adminPasswordHash,
    "ADMIN",
  ]);
  console.log("Admin user created");
}

// Database functions
export async function createUser(email, hashedPassword) {
  const result = await db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword]
  );

  return {
    id: result.lastID,
    email: email,
    role: "USER",
  };
}

export async function findUserByEmail(email) {
  return await db.get("SELECT * FROM users WHERE email = ?", [email]);
}

export async function findUserById(id) {
  return await db.get("SELECT * FROM users WHERE id = ?", [id]);
}
