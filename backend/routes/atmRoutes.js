const express = require("express");
const router = express.Router();
const { getBalance, deposit, withdraw } = require("../controllers/atmController");
const { signup, login } = require("../controllers/authController");

// Auth routes
router.post("/signup", signup);
router.post("/login", login);

// ATM operation routes
router.get("/balance/:accountNumber", getBalance);
router.put("/deposit", deposit);
router.put("/withdraw", withdraw);

module.exports = router;
