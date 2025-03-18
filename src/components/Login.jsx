import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call with timeout
    setTimeout(() => {
      // This would be replaced with actual authentication logic
      if (password === "teacher123") {
        onLogin();
      } else {
        setError("Incorrect password");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen bg-green-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">Word Works</h1>
          <p className="text-gray-600 mt-2">Spelling Practice Tool</p>
          <p className="text-lg font-medium mt-4">Welcome, Mr. DeMesa!</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 text-gray-600 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              placeholder="Enter your password"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:bg-green-300 text-lg"
          >
            {isLoading ? "Logging in..." : "Start Word Works"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Having trouble? Ask for help from Ms. Reese :)</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
