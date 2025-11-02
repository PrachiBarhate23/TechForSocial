import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/footer';

const ProfilePage = () => {
  const EmailIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );

  const WebsiteIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      backgroundColor: '#f8f9fb',
      color: '#1a1a1a',
      minHeight: '100vh',
    }}>
      {/* Subtle background pattern */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(37, 99, 235, 0.04) 1px, transparent 0)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Header */}
      <Header />
       {/* Blue Hero Section - ADD THIS */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '4rem 5% 3rem',
          color: '#fff',
          textAlign: 'center',
          borderRadius: '0 0 1.5rem 1.5rem',
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)',
            zIndex: 0,
          }}
        />

        {/* Blue Transparent Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(13, 123, 170, 0.65)',
            zIndex: 1,
          }}
        />

        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '500px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(60px)',
          zIndex: 1,
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '400px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          filter: 'blur(50px)',
          zIndex: 1,
        }} />

        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          position: 'relative', 
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: '25vh'
        }}>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: '800',
              color: '#ffffff',
              marginBottom: '0.75rem',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
            }}
          >
            Team
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: '1.15rem',
              color: 'rgba(255, 255, 255, 0.95)',
              maxWidth: '600px',
              lineHeight: '1.6',
            }}
          >
            Leading academic expert in technology innovation and social impact research
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 5%',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden',
            border: '1px solid #e5e5e5',
          }}
        >
          {/* Decorative top bar */}
          <div style={{
            height: '6px',
            background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 50%, #2563eb 100%)',
          }} />

          {/* Header section with image */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)',
            padding: '3rem 2rem 2rem',
            textAlign: 'center',
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                width: '180px',
                height: '180px',
                margin: '0 auto 2rem',
                borderRadius: '16px',
                background: '#ffffff',
                boxShadow: '0 8px 32px rgba(37, 99, 235, 0.2)',
                border: '4px solid #2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                DK
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: '0.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              Dr. DHANANJAY KALBANDE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                fontSize: '1.2rem',
                color: '#2563eb',
                fontWeight: 500,
              }}
            >
              Professor & Technology Expert
            </motion.p>
          </div>

          {/* Statistics bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '0',
            borderTop: '1px solid #e5e5e5',
            borderBottom: '1px solid #e5e5e5',
          }}>
            {[
              { number: '15+', label: 'Years Experience', color: '#2563eb' },
              { number: '4', label: 'Books Authored', color: '#7c3aed' },
              { number: '100+', label: 'Research Papers', color: '#059669' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                style={{
                  padding: '2rem 1rem',
                  textAlign: 'center',
                  borderRight: idx < 2 ? '1px solid #e5e5e5' : 'none',
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: stat.color,
                  marginBottom: '0.5rem',
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#525252',
                  fontWeight: 500,
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* About section */}
          <div style={{
            padding: '3rem 2rem',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: '1.5rem',
                textAlign: 'center',
                position: 'relative',
                paddingBottom: '1rem',
              }}>
                About
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                  borderRadius: '2px',
                }} />
              </h2>

              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.8',
                color: '#525252',
                textAlign: 'justify',
                maxWidth: '900px',
                margin: '0 auto 2.5rem',
              }}>
                Currently a Professor, Former Head (Computer Engineering) and Dean (Industry Relations) at Sardar Patel
                Institute of Technology. My interests include Soft computing (Artificial Neural Networks, Fuzzy Logic), Computer
                Network, Human Machine Interaction Decision making and business intelligence, Mobile application
                development for social cause, ICT for semi rural development for social cause. I have authored four books
                namely Graphical User Interface (Pareen Publications), MIS (Pareen Publications), Human Machine
                Interaction (Wiley Publications) and Digital Forensic (Wiley Publications). Skinzy is the brain-child of mine
                which has been turned into reality with the help of Dr. Uday Khopkar who is Dermatologist by profession.
                Skinzy's flagship product "Dermatans" is an AI based mobile application that is able to detect skin diseases
                and provide preliminary diagnosis and treatment suggestions.
              </p>

              {/* Social icons */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid #e5e5e5',
              }}>
                {[
                  { icon: <EmailIcon />, bg: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', label: 'Email' },
                  { icon: <WebsiteIcon />, bg: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', label: 'Website' },
                  { icon: <LinkedInIcon />, bg: 'linear-gradient(135deg, #059669 0%, #047857 100%)', label: 'LinkedIn' },
                ].map((social, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      background: social.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#ffffff',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {social.icon}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
               </motion.div>
      </main>

      <Footer />


     
    </div>
  );
};

export default ProfilePage;