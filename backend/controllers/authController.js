const Account = require("../models/Account");
const jwt = require("jsonwebtoken");
const generateAccountNumber = require("../utils/accountGenerator");

// @desc    Register / Create a new account
// @route   POST /api/atm/signup
exports.signup = async (req, res) => {
  try {
    const { name, pin } = req.body;

    if (!name || !pin) {
      return res.status(400).json({ message: "Name and PIN are required" });
    }

    if (pin.length < 4) {
      return res
        .status(400)
        .json({ message: "PIN must be at least 4 digits" });
    }

    // Generate a unique account number
    let accountNumber;
    let exists = true;
    while (exists) {
      accountNumber = generateAccountNumber();
      exists = await Account.findOne({ accountNumber });
    }

    const account = await Account.create({
      name,
      accountNumber,
      pin,
    });

    res.status(201).json({
      message: "Account created successfully",
      accountNumber: account.accountNumber,
      name: account.name,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// @desc    Login to an existing account
// @route   POST /api/atm/login
exports.login = async (req, res) => {
  try {
    const { accountNumber, pin } = req.body;

    if (!accountNumber || !pin) {
      return res
        .status(400)
        .json({ message: "Account number and PIN are required" });
    }

    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const isMatch = await account.comparePin(pin);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid PIN" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: account._id, accountNumber: account.accountNumber },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: account.name,
        accountNumber: account.accountNumber,
        balance: account.balance,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
