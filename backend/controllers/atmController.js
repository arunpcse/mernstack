const Account = require("../models/Account");

// @desc    Get account balance
// @route   GET /api/atm/balance/:accountNumber
exports.getBalance = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({
      balance: account.balance,
      name: account.name,
      accountNumber: account.accountNumber,
    });
  } catch (error) {
    console.error("Get Balance Error:", error);
    res.status(500).json({ message: "Server error fetching balance" });
  }
};

// @desc    Deposit money into account
// @route   PUT /api/atm/deposit
exports.deposit = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    if (!accountNumber || !amount) {
      return res
        .status(400)
        .json({ message: "Account number and amount are required" });
    }

    if (amount <= 0) {
      return res
        .status(400)
        .json({ message: "Deposit amount must be greater than 0" });
    }

    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    account.balance += amount;
    await account.save();

    res.status(200).json({
      message: `₹${amount} deposited successfully`,
      balance: account.balance,
    });
  } catch (error) {
    console.error("Deposit Error:", error);
    res.status(500).json({ message: "Server error during deposit" });
  }
};

// @desc    Withdraw money from account
// @route   PUT /api/atm/withdraw
exports.withdraw = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    if (!accountNumber || !amount) {
      return res
        .status(400)
        .json({ message: "Account number and amount are required" });
    }

    if (amount <= 0) {
      return res
        .status(400)
        .json({ message: "Withdrawal amount must be greater than 0" });
    }

    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (account.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    account.balance -= amount;
    await account.save();

    res.status(200).json({
      message: `₹${amount} withdrawn successfully`,
      balance: account.balance,
    });
  } catch (error) {
    console.error("Withdraw Error:", error);
    res.status(500).json({ message: "Server error during withdrawal" });
  }
};
