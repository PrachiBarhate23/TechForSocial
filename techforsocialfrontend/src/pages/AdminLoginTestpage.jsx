// AdminLoginTestPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginTestPage = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    // Simulate a logged-in admin
    const admin = { name: "Admin", role: "admin" };
    localStorage.setItem("user", JSON.stringify(admin));

    // Redirect to admin projects page
    navigate("/projects"); // Make sure your admin projects page route is /projects
  };

  const handleLogout = () => {
    // Clear user
    localStorage.removeItem("user");
    navigate("/landingpage"); // Redirect to normal landing page
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Admin Login Test Page</h2>
      <p>Click below to simulate admin login/logout and see the header update:</p>
      <button onClick={handleAdminLogin} style={{ margin: "10px", padding: "10px 20px" }}>
        Simulate Admin Login
      </button>
      <button onClick={handleLogout} style={{ margin: "10px", padding: "10px 20px" }}>
        Simulate Logout
      </button>
    </div>
  );
};

export default AdminLoginTestPage;
