import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from '../components/footer';
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

    {/* Card 1 - What Our Website Does */}
    <motion.div className="info-card card-what-we-do">
      <h3>🚀 What Our Website Does</h3>
      <p>
        TechForSocial is a platform that bridges the gap between 
        research, technology, and society. We create real-world solutions 
        in healthcare, education, sustainability, and assistive technologies.
      </p>
      <p>
        From IoT-based elderly monitoring, autism detection apps, 
        and disease analysis to women empowerment projects — our 
        platform is about <b>turning innovation into impact</b>.
      </p>
    </motion.div>

    {/* Card 2 - Our Missions/Goals with horizontal sub-cards */}
    <motion.div className="info-card card-missions">
      <h3>🎯 Our Missions & Goals</h3>
      <div className="sub-cards">
        <div className="sub-card">
          <h4>🌍 Social Good</h4>
          <p>
            Use technology to solve pressing problems in healthcare, education, and sustainability.  
            Every project is designed to improve lives and empower communities.
          </p>
        </div>
        <div className="sub-card">
          <h4>💡 Innovation</h4>
          <p>
            Blend AI, IoT, and data science with social challenges for measurable, research-backed impact.  
            From prototypes to scalable solutions, we focus on usability.
          </p>
        </div>
        <div className="sub-card">
          <h4>🤝 Collaboration</h4>
          <p>
            Connect students, researchers, NGOs, and industry partners to co-create 
            impactful solutions that drive collective growth.
          </p>
        </div>
        <div className="sub-card">
          <h4>📈 Scalability</h4>
          <p>
            Ensure projects don’t just stay in labs — but scale to benefit 
            entire communities, cities, and beyond.
          </p>
        </div>
        <div className="sub-card">
          <h4>📚 Knowledge Sharing</h4>
          <p>
            Publish research, conduct workshops, and provide open resources 
            to spread awareness and build skills in tech-for-good.
          </p>
        </div>
        <div className="sub-card">
          <h4>🔗 Sustainability</h4>
          <p>
            Build long-term, eco-friendly, and financially sustainable 
            solutions that continue to create impact over time.
          </p>
        </div>
      </div>
    </motion.div>

    {/* Card 3 - What Users Say with horizontal sub-cards */}
    <motion.div className="info-card card-users">
     <h3>🗣️ What Users Say</h3>
<div className="sub-cards">
  <div className="sub-card">
    <p>
       “TechForSocial helped us build a low-cost autism detection tool 
      that made a real difference in our NGO.”  
    </p>
    <span>- NGO Partner 🤝</span>
  </div>
  <div className="sub-card">
    <p>
       “Through workshops and hackathons, I gained hands-on experience 
      in AI & IoT projects.”  
    </p>
    <span>- Student Innovator 🎓</span>
  </div>
  <div className="sub-card">
    <p>
      “Their research-backed solutions are not just concepts, but 
      scalable real-world projects.”  
    </p>
    <span>- Research Collaborator 📊 </span>
  </div>
  <div className="sub-card">
    <p>
       “The mentorship and guidance I received gave me clarity on how 
      to apply my skills to social problems.”  
    </p>
    <span>- Young Researcher 🌱</span>
  </div>
  <div className="sub-card">
    <p>
       “Their IoT-based health monitoring project has reduced 
      emergency response times significantly.”  
    </p>
    <span>- Healthcare Professional 🏥</span>
  </div>
  <div className="sub-card">
    <p>
       “I found new collaborators and mentors who helped 
      shape my startup idea into a real product.”  
    </p>
    <span>- Student Entrepreneur 🚀</span>
  </div>
</div>

    </motion.div>

  </div>
</section>

<Footer />  
    </div>
    
  );
}

export default LandingPage;
