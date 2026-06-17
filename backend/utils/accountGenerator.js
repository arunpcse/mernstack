/**
 * Generate a random 10-digit account number
 * @returns {string} A 10-digit account number string
 */
function generateAccountNumber() {
  const min = 1000000000; // 10 digits min
  const max = 9999999999; // 10 digits max
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

module.exports = generateAccountNumber;
