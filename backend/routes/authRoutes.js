const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");

// SHOW LOGIN PAGE
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// SHOW REGISTER PAGE
router.get("/register", (req, res) => {
  res.render("register");
});

// REGISTER USER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO users (username, email, password, created_at)
    VALUES (?, ?, ?, NOW())
  `;

  db.query(sql, [username, email, hashedPassword], (err) => {
    if (err) return res.send(err);
    // after register go to login (with /auth prefix)
    res.redirect("/auth/login");
  });
});

// LOGIN USER
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, rows) => {
    if (err) return res.render("login", { error: "Server error, please try again." });
    if (rows.length === 0) return res.render("login", { error: "User not found." });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.render("login", { error: "Incorrect password." });

    req.session.userId = user.id;
    req.session.username = user.username;
    res.redirect("/profile");
  });
});

// LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    // back to login with /auth prefix
    res.redirect("/auth/login");
  });
});

module.exports = router;
