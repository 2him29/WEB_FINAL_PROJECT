const express = require("express");
const router = express.Router();
const db = require("../db");
const isAuthenticated = require("../middleware/auth");

// SHOW PROFILE PAGE
router.get("/profile", isAuthenticated, (req, res) => {
  const userId = req.session.userId;

  const sql = "SELECT * FROM user_profiles WHERE user_id = ?";
  db.query(sql, [userId], (err, rows) => {
    if (err) return res.send(err);

    if (rows.length > 0) {
      res.render("profile", { profile: rows[0], success: false });
    } else {
      res.render("profile", { profile: null, success: false });
    }
  });
});

// SAVE PROFILE DATA (MATCHES YOUR FORM)
router.post("/profile/save", isAuthenticated, (req, res) => {
  const { full_name, phone, address, wilaya, city } = req.body;
  const userId = req.session.userId;

  const sqlCheck = "SELECT * FROM user_profiles WHERE user_id = ?";

  db.query(sqlCheck, [userId], (err, rows) => {
    if (err) return res.send(err);

    if (rows.length > 0) {
      // UPDATE
      const sqlUpdate = `
        UPDATE user_profiles
        SET full_name=?, phone=?, address=?, wilaya=?, city=?, updated_at=NOW()
        WHERE user_id=?
      `;
      db.query(sqlUpdate, [full_name, phone, address, wilaya, city, userId], (err2) => {
        if (err2) return res.send(err2);

        res.redirect("/profile?success=1");
      });

    } else {
      // INSERT
      const sqlInsert = `
        INSERT INTO user_profiles (user_id, full_name, phone, address, wilaya, city, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;
      db.query(sqlInsert, [userId, full_name, phone, address, wilaya, city], (err2) => {
        if (err2) return res.send(err2);

        res.redirect("/profile?success=1");
      });
    }
  });
});

module.exports = router;
