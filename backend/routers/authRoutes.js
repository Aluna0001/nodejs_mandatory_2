import { Router } from "express";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail, findUserById } from "../db/database.js";

const router = Router();

// Signup
router.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password is needed" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password needs to be at least 6 characters" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(email, hashedPassword);

    console.log("Email sent: ", email);
    console.log("Welcome");

    req.session.userId = newUser.id;

    res.status(201).json({
      message: "User created",
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Error" });
  }
});

// Login
router.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password is needed" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Wrong email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Wrong email or password" });
    }

    console.log("Email sent to: ", email);
    console.log("Subject: New login");

    req.session.userId = user.id;

    res.json({
      message: "Login succesfully",
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Error" });
  }
});

// Logout
router.post("/api/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error" });
    }
    res.json({ message: "Logged out" });
  });
});

// GET current user (protected)
router.get("/api/auth/me", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Couldn't log in" });
  }

  const user = await findUserById(req.session.userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ user: { id: user.id, email: user.email, role: user.role } });
});

export default router;
