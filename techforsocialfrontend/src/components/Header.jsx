import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
   const [dropdownOpen, setDropdownOpen] = useState(false);
  // Check login state on mount
  useEffect(() => {
    const user = localStorage.getItem("user"); // Replace with backend auth later
    if (user) {
      setIsLoggedIn(true);
      setUserName(JSON.parse(user).name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear login
    setIsLoggedIn(false);
    navigate("/landingpage");
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="nav-logo">
        <motion.div
          className="logo-circle"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src="../images/logo.png" 
            alt="TechForSocial Logo" 
            style={{ width: "65px", height: "65px", borderRadius: "50%" }}
          />
        </motion.div>
      </div>

      <div className="nav-links">
        <motion.a href="/landingpage" whileHover={{ y: -2 }}>Home</motion.a>
        <motion.a href="/projectspage" whileHover={{ y: -2 }}>Projects</motion.a>
        <motion.a href="/AboutUs" whileHover={{ y: -2 }}>Team</motion.a>
      {/* <motion.a href="/publications" whileHover={{ y: -2 }}>Publications</motion.a> */}

       {isLoggedIn ? (
  <div className="profile-dropdown" style={{ position: "relative", display: "inline-block" }}>
    <motion.button
      className="login-btn"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setDropdownOpen(!dropdownOpen)} // toggle dropdown
    >
      {userName || "Profile"} ▼
    </motion.button>

    {/* Dropdown menu */}
    {dropdownOpen && (
      <div
        className="dropdown-content"
        style={{
          position: "absolute",
          top: "100%",
          right: 0,
          backgroundColor: "#fff",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          zIndex: 1,
          minWidth: "150px",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <a href="/profile" style={{ display: "block", padding: "10px" }}>My Profile</a>
        <button
          onClick={() => { handleLogout(); setDropdownOpen(false); }}
          style={{ display: "block", padding: "10px", width: "100%", textAlign: "left", border: "none", background: "none" }}
        >
          Logout
        </button>
      </div>
    )}
  </div>
) : (
  <div className="login-dropdown">
    <motion.button
      className="login-btn"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/login')}
    >
      Login ▼
    </motion.button>
  </div>
)}


      </div>
    </motion.nav>
  );
};

export default Header;