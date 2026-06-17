const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/atm_app").then(async () => {
  const db = mongoose.connection.db;
  const accounts = await db.collection("accounts").find({}).toArray();

  console.log("=== Stored Accounts in MongoDB ===\n");

  if (accounts.length === 0) {
    console.log("No accounts found.");
  } else {
    accounts.forEach((a, i) => {
      console.log("Account " + (i + 1) + ":");
      console.log("  Name:           " + a.name);
      console.log("  Account Number: " + a.accountNumber);
      console.log("  Balance:        " + a.balance);
      console.log("  PIN (hashed):   " + a.pin);
      console.log("  Created:        " + a.createdAt);
      console.log("");
    });
  }

  console.log("Total accounts: " + accounts.length);
  await mongoose.disconnect();
});
