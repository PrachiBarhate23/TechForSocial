import React from "react";
import { useNavigate } from "react-router-dom";

const LoginTestPage = () => {
  const navigate = useNavigate();

  const handleLoginAsUser = () => {
    // Simulate normal user login
    const user = { name: "Prachi", role: "user" };
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/landingpage");
  };

  const handleLoginAsAdmin = () => {
    // Simulate admin login
    const user = { name: "Admin", role: "admin" };
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/landingpage");
  };

  const handleLogout = () => {
    // Clear user
    localStorage.removeItem("user");
    navigate("/landingpage");
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Login Test Page</h2>
      <p>Click below to simulate login/logout and see the header + projects page update:</p>

      <button
        onClick={handleLoginAsUser}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Simulate User Login (Prachi)
      </button>

      <button
        onClick={handleLoginAsAdmin}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Simulate Admin Login
      </button>

      <button
        onClick={handleLogout}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Simulate Logout
      </button>
    </div>
  );
};

export default LoginTestPage;
