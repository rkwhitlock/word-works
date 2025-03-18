import React, { useState } from "react";
import Login from "../Login";
import DatabaseEditor from "./DatabaseEditor";

// Main App Component
const LoginHandler = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <DatabaseEditor onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
};

export default LoginHandler;
