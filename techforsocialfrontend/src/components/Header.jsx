import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header
      style={{
        padding: "1rem 5%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* Logo Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1.2rem",
          }}
        >
          T4S
        </div>
        <div
          style={{ fontSize: "1.15rem", fontWeight: 600, color: "#1a1a1a" }}
        >
          TechForSocial
        </div>
      </div>

      {/* Navigation Links */}
      <nav
        style={{
          display: "flex",
          gap: "2rem",
          fontSize: "0.9rem",
          alignItems: "center",
        }}
      >
        <motion.a href="/landingpage" whileHover={{ y: -2 }}>
          Home
        </motion.a>
        <motion.a href="/projectspage" whileHover={{ y: -2 }}>
          Projects
        </motion.a>
        <motion.a href="/Blogspage" whileHover={{ y: -2 }}>
          Blogs
        </motion.a>
        <motion.a href="/AboutUs" whileHover={{ y: -2 }}>
          Team
        </motion.a>
        <a
          href="/login"
          style={{
            padding: "0.5rem 1.25rem",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: 500,
            transition: "all 0.2s",
          }}
        >
          Login
        </a>
      </nav>
    </header>
  );
};

export default Header;
