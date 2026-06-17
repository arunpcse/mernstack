import { useState } from "react";
import { signup } from "../services/api";

function Signup({ setShowLogin }) {
  const [form, setForm] = useState({
    name: "",
    pin: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSignup = async () => {
    if (!form.name || !form.pin) {
      setError("Please fill in all fields");
      return;
    }

    if (form.pin.length < 4) {
      setError("PIN must be at least 4 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await signup(form);

      alert(
        `Account Created Successfully!\n\nYour Account Number: ${response.data.accountNumber}\n\nPlease save this number to login.`
      );

      setShowLogin(true);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Error creating account"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 mt-1">Open a new ATM account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <input
          className="w-full border border-gray-300 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <input
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="Create PIN (min 4 digits)"
          type="password"
          name="pin"
          value={form.pin}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white p-3 rounded-lg font-semibold transition cursor-pointer"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?
          <button
            className="text-indigo-600 hover:text-indigo-800 ml-2 font-semibold cursor-pointer"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;