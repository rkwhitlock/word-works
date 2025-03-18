import React from "react";

const LogoutButton = ({ onLogout, isLoggingOut = false, className = "" }) => {
  const handleLogout = async () => {
    // Prevent multiple clicks
    if (isLoggingOut) return;

    try {
      // Call the provided logout handler
      await onLogout();
    } catch (error) {
      console.error("Logout failed:", error);
      // You might want to handle errors or display a notification here
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700 
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
        transition-colors duration-150 ease-in-out
        flex items-center ${
          isLoggingOut ? "opacity-75 cursor-not-allowed" : ""
        } ${className}`}
      aria-label="Logout"
    >
      {isLoggingOut ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Logging out...
        </>
      ) : (
        <>
          <svg
            className="-ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </>
      )}
    </button>
  );
};

export default LogoutButton;
