import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import "../styles/App.css"; // ✅ This will use your updated green-pink theme CSS
import { Link } from "react-router-dom";

const TrueFocus = ({
  sentence = "TechForSocial",
  manualMode = false,
  blurAmount = 5,
  borderColor = "#00aa77", // ✅ green accent
  glowColor = "rgba(255, 105, 180, 0.6)", // ✅ soft pink glow
  animationDuration = 0.5,
  pauseBetweenAnimations = 2,
}) => {
  const words = sentence.match(/[A-Z][a-z]*/g) || [sentence];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!manualMode && words.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);
      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  return (
    <div className="focus-container" ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            className={`focus-word ${manualMode ? "manual" : ""} ${
              isActive && !manualMode ? "active" : ""
            }`}
            style={{
              filter: isActive ? `blur(0px)` : `blur(${blurAmount}px)`,
              "--border-color": borderColor,
              "--glow-color": glowColor,
              transition: `filter ${animationDuration}s ease, color ${animationDuration}s ease, transform ${animationDuration}s ease`,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}
      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 && words.length > 1 ? 1 : 0,
        }}
        transition={{ duration: animationDuration, ease: "easeInOut" }}
        style={{
          "--border-color": borderColor,
          "--glow-color": glowColor,
        }}
      >
        <span className="corner top-left"></span>
        <span className="corner top-right"></span>
        <span className="corner bottom-left"></span>
        <span className="corner bottom-right"></span>
      </motion.div>
    </div>
  );
};

function LandingPage() {
  return (
    <div className="App">
      {/* ✅ Removed TechnicalBackground */}
      <Header />

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          {/* Hero Title */}
          <motion.div
            className="hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <TrueFocus
              sentence="TechForSocial"
              borderColor="#00aa77"
              glowColor="rgba(255, 105, 180, 0.6)"
            />
            <motion.div
              className="hero-separator"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              —
            </motion.div>
            <motion.h2
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Innovating for a Better Tomorrow
            </motion.h2>
          </motion.div>

          {/* Hero Description */}
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Founded by Dr. Dhananjay Kalbande, TechForSocial brings together
            research, innovation, and technology to create real-world impact.
          </motion.p>

          {/* Hero Buttons */}
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <Link to="/projects">
              <motion.button
                className="btn-primary"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(0, 170, 119, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Projects
              </motion.button>
            </Link>
            <motion.button
              className="btn-secondary"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 105, 180, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Register
            </motion.button>
          </motion.div>
        </div>
      </main>

      {/* Cards Section */}
      <section className="cards-section">
        <div className="cards-container">
          <motion.div className="info-card">
            <h3>🌍 Social Impact</h3>
            <p>
              Driving change through technology by solving real-world challenges
              in healthcare, education, and sustainability.
            </p>
            <p>
              Our initiatives include low-cost health monitoring devices,
              AI-powered educational tools, and community-driven green
              technologies that empower underprivileged sections of society.
            </p>
            <p>
              By working closely with NGOs and government bodies, we ensure our
              solutions are scalable and reach the people who need them most.
            </p>
          </motion.div>

          <motion.div className="info-card">
            <h3>💡 Innovation & Research</h3>
            <p>
              Combining cutting-edge research with practical innovations to
              create solutions that drive measurable impact.
            </p>
            <p>
              Our team works on AI, IoT, blockchain, and sustainable tech to
              design products that address pressing challenges in developing
              economies.
            </p>
            <p>
              We publish research papers, mentor students, and collaborate with
              industry experts to stay ahead of the curve.
            </p>
          </motion.div>

          <motion.div className="info-card">
            <h3>🤝 Collaboration</h3>
            <p>
              We believe collaboration is key to solving society’s biggest
              problems. That’s why we bring together students, researchers,
              startups, and organizations to work collectively.
            </p>
            <p>
              Our open innovation model allows participants to share resources,
              co-develop ideas, and scale impact beyond geographical boundaries.
            </p>
            <p>
              Through hackathons, workshops, and global partnerships, we are
              building a vibrant ecosystem of changemakers.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
