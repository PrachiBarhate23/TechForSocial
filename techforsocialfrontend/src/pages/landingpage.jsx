import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SplashCursor from './SplashCursor'; 
import Footer from '../components/footer';

const TrueFocus = ({
  sentence = "TechForSocial",
  manualMode = false,
  blurAmount = 3,
  animationDuration = 0.6,
  pauseBetweenAnimations = 2.5,
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
    <div style={{ position: 'relative', display: 'inline-block' }} ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            style={{
              display: 'inline-block',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              opacity: isActive ? 1 : 0.4,
              transition: `filter ${animationDuration}s ease, opacity ${animationDuration}s ease`,
              cursor: manualMode ? 'pointer' : 'default',
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

function LandingPage() {
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
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(37, 99, 235, 0.04) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Header */}
      <header style={{
        padding: '1rem 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '1.2rem',
          }}>
            T4S
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 600, color: '#1a1a1a' }}>
            TechForSocial
          </div>
        </div>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', alignItems: 'center' }}>
          <motion.a href="/landingpage" whileHover={{ y: -2 }}>Home</motion.a>
                 <motion.a href="/projectspage" whileHover={{ y: -2 }}>Projects</motion.a>
                 <motion.a href="/Blogspage" whileHover={{ y: -2 }}>Blogs</motion.a>
                 <motion.a href="/AboutUs" whileHover={{ y: -2 }}>Team</motion.a>
          <a href="#login" style={{
            padding: '0.5rem 1.25rem',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 500,
            transition: 'all 0.2s',
          }}>Login</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main id="home" style={{
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '4.5rem 5% 3.5rem',
  textAlign: 'center',
  position: 'relative',
  zIndex: 1,
  overflow: 'hidden', // Add this
}}>
  {/* Add the fluid effect */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    pointerEvents: 'auto', // Change from 'none' to allow interaction
  }}>
    <SplashCursor
      DENSITY_DISSIPATION={2}
      VELOCITY_DISSIPATION={1.5}
      PRESSURE={0.05}
      CURL={5}
      SPLAT_RADIUS={0.3}
      SPLAT_FORCE={4000}
      COLOR_UPDATE_SPEED={5}
      TRANSPARENT={true}
      SHADING={false}
    />
  </div>

  {/* Your existing hero content with increased zIndex */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    style={{ position: 'relative', zIndex: 1 }} // Add this
  >
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            marginBottom: '1.25rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            <TrueFocus sentence="TechForSocial" />
          </h1>
          
          <motion.h2
            style={{
              fontSize: 'clamp(1.15rem, 3vw, 1.5rem)',
              fontWeight: 400,
              color: '#525252',
              marginBottom: '1.5rem',
              letterSpacing: '-0.01em',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Innovating for a Better Tomorrow
          </motion.h2>

          <motion.p
            style={{
              fontSize: '1.05rem',
              color: '#737373',
              maxWidth: '720px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Founded by Dr. Dhananjay Kalbande, TechForSocial brings together
            research, innovation, and technology to create real-world impact.
          </motion.p>

          <motion.div
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.button
              style={{
                padding: '0.875rem 2rem',
                fontSize: '0.95rem',
                fontWeight: 500,
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              whileHover={{
                backgroundColor: '#1d4ed8',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Projects
            </motion.button>
            <motion.button
              style={{
                padding: '0.875rem 2rem',
                fontSize: '0.95rem',
                fontWeight: 500,
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                border: '1.5px solid #d4d4d4',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              whileHover={{
                borderColor: '#2563eb',
                color: '#2563eb',
                transform: 'translateY(-2px)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              Register
            </motion.button>
          </motion.div>
        </motion.div>
      </main>

      {/* Impact Stats */}
      <section style={{
        backgroundColor: '#ffffff',
        padding: '2.5rem 5%',
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid #e5e5e5',
        borderBottom: '1px solid #e5e5e5',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
        }}>
          {[
            { number: '50+', label: 'Active Projects', color: '#2563eb' },
            { number: '1000+', label: 'Lives Impacted', color: '#059669' },
            { number: '30+', label: 'NGO Partners', color: '#7c3aed' },
            { number: '500+', label: 'Student Contributors', color: '#dc2626' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div style={{
                fontSize: '2.25rem',
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
      </section>

      {/* Mission Statement */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3.5rem 5%',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: '#ffffff',
            padding: '3rem',
            borderRadius: '12px',
            border: '1px solid #e5e5e5',
            textAlign: 'center',
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            fontWeight: 700,
            marginBottom: '1.5rem',
            color: '#1a1a1a',
          }}>
            Our Mission
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#525252',
            maxWidth: '900px',
            margin: '0 auto 2rem',
            lineHeight: 1.8,
          }}>
            TechForSocial bridges the gap between academic research and real-world social impact. 
            We leverage cutting-edge technologies—AI, IoT, Machine Learning, and Data Science—to develop 
            innovative solutions for healthcare accessibility, education quality, elderly care, autism support, 
            women empowerment, and community welfare. Every project is designed with sustainability, 
            scalability, and measurable social impact at its core.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {['Research-Driven', 'Community-Focused', 'Technology-Enabled', 'Impact-Measured'].map((tag, idx) => (
              <span
                key={idx}
                style={{
                  padding: '0.6rem 1.25rem',
                  backgroundColor: '#f8f9fb',
                  color: '#2563eb',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  borderRadius: '6px',
                  border: '1px solid #e5e5e5',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section id="projects" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3.5rem 5%',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2.5rem', textAlign: 'center' }}
        >
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#1a1a1a',
          }}>
            Featured Projects
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#737373',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Real-world technology solutions addressing critical social challenges
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem',
        }}>
          {[
            {
              title: 'AutoBuddys',
              category: 'Autism Support',
              desc: 'AI-powered mobile application providing therapeutic activities, progress tracking, and personalized learning modules for children with autism spectrum disorder. Includes caregiver dashboards, behavioral analysis, and communication tools.',
              impact: 'Supporting 500+ children',
              tags: ['Mobile App', 'AI', 'Healthcare'],
              color: '#7c3aed',
              link: 'autobuddys.in'
            },
            {
              title: 'IoT Elderly Monitoring',
              category: 'Healthcare',
              desc: 'Real-time health monitoring system using IoT sensors for elderly care. Tracks vital signs, detects falls, monitors medication adherence, and provides emergency alerts to caregivers and medical professionals.',
              impact: '200+ seniors monitored',
              tags: ['IoT', 'Healthcare', 'Emergency Response'],
              color: '#dc2626',
              link: 'Active Deployment'
            },
            {
              title: 'DermaLens',
              category: 'Telemedicine',
              desc: 'AI-powered skin disease detection system that predicts 30+ conditions using deep learning and computer vision. Connects patients with dermatologists through integrated telemedicine platform for remote consultations.',
              impact: '1000+ diagnoses performed',
              tags: ['AI', 'Telemedicine', 'Computer Vision'],
              color: '#ea580c',
              link: 'Clinical Trials'
            },
            {
              title: 'Women Empowerment Platform',
              category: 'Social Welfare',
              desc: 'Digital platform providing skill development courses, entrepreneurship mentorship, financial literacy training, and networking opportunities. Includes job matching, micro-lending connections, and safety features.',
              impact: '300+ women trained',
              tags: ['Education', 'Empowerment', 'Platform'],
              color: '#8b5cf6',
              link: 'Community Impact'
            },
            {
              title: 'Smart Education Analytics',
              category: 'Education Technology',
              desc: 'Data-driven learning management system with AI-powered personalized recommendations, student performance analytics, engagement tracking, and adaptive learning paths. Helps educators identify at-risk students early.',
              impact: '20+ schools implemented',
              tags: ['EdTech', 'Analytics', 'AI'],
              color: '#2563eb',
              link: 'Pilot Program'
            },
            {
              title: 'Community Health Tracker',
              category: 'Public Health',
              desc: 'Mobile health platform for rural communities enabling disease surveillance, vaccination tracking, maternal health monitoring, and health education. Works offline with periodic data synchronization.',
              impact: '50+ villages covered',
              tags: ['Mobile', 'Public Health', 'Rural'],
              color: '#059669',
              link: 'Field Deployment'
            },
          ].map((project, idx) => (
            <motion.div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #e5e5e5',
                transition: 'all 0.3s',
                position: 'relative',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                transform: 'translateY(-4px)',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${project.color} 0%, ${project.color}80 100%)`,
              }} />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem',
              }}>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: project.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {project.category}
                </div>
                <div style={{
                  padding: '0.35rem 0.75rem',
                  backgroundColor: `${project.color}15`,
                  color: project.color,
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}>
                  {project.link}
                </div>
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: '#1a1a1a',
              }}>
                {project.title}
              </h3>
              <p style={{
                color: '#525252',
                lineHeight: 1.7,
                fontSize: '0.95rem',
                marginBottom: '1.25rem',
              }}>
                {project.desc}
              </p>
              <div style={{
                padding: '0.75rem',
                backgroundColor: '#f8f9fb',
                borderRadius: '6px',
                marginBottom: '1.25rem',
                borderLeft: `3px solid ${project.color}`,
              }}>
                <div style={{
                  fontSize: '0.85rem',
                  color: '#737373',
                  marginBottom: '0.25rem',
                }}>
                  Impact Metric
                </div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: project.color,
                }}>
                  {project.impact}
                </div>
              </div>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}>
                {project.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    style={{
                      padding: '0.4rem 0.75rem',
                      backgroundColor: '#f8f9fb',
                      color: '#525252',
                      fontSize: '0.8rem',
                      borderRadius: '4px',
                      border: '1px solid #e5e5e5',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Focus Areas */}
      <section style={{
        backgroundColor: '#ffffff',
        padding: '3.5rem 5%',
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid #e5e5e5',
        borderBottom: '1px solid #e5e5e5',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '2.5rem', textAlign: 'center' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: 700,
              marginBottom: '1rem',
              color: '#1a1a1a',
            }}>
              Social Impact Areas
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: '#737373',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              Creating technology-driven solutions across multiple domains for maximum social benefit
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              {
                icon: '🏥',
                title: 'Healthcare Innovation',
                desc: 'AI-powered diagnostic tools, telemedicine platforms, disease prediction models, patient monitoring systems, and assistive technologies for improved healthcare accessibility and quality.',
                projects: '15+ Active Projects',
                color: '#dc2626'
              },
              {
                icon: '👨‍👩‍👧',
                title: 'Autism & Special Needs',
                desc: 'Therapeutic mobile applications, behavioral analysis tools, communication aids, progress tracking systems, and caregiver support platforms for children with developmental disorders.',
                projects: '8+ Solutions Deployed',
                color: '#7c3aed'
              },
              {
                icon: '👴',
                title: 'Elderly Care',
                desc: 'IoT-based health monitoring, fall detection systems, medication reminders, emergency response coordination, and companion applications for senior citizen wellness and safety.',
                projects: '6+ Monitoring Systems',
                color: '#059669'
              },
              {
                icon: '👩‍💼',
                title: 'Women Empowerment',
                desc: 'Skill development platforms, entrepreneurship mentorship programs, safety applications, financial literacy tools, and networking opportunities for women in technology and business.',
                projects: '10+ Programs Running',
                color: '#8b5cf6'
              },
              {
                icon: '📚',
                title: 'Education Technology',
                desc: 'Adaptive learning systems, student analytics, performance prediction, personalized recommendations, virtual labs, and tools to improve learning outcomes and reduce dropout rates.',
                projects: '12+ EdTech Solutions',
                color: '#2563eb'
              },
              {
                icon: '🌍',
                title: 'Community Welfare',
                desc: 'NGO management systems, disaster response coordination, resource optimization, volunteer matching, impact measurement tools, and platforms connecting communities with services.',
                projects: '20+ NGO Partnerships',
                color: '#ea580c'
              },
            ].map((area, idx) => (
              <motion.div
                key={idx}
                style={{
                  backgroundColor: '#f8f9fb',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e5e5e5',
                  transition: 'all 0.3s',
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{
                  backgroundColor: '#ffffff',
                  boxShadow: `0 6px 20px ${area.color}20`,
                  borderColor: area.color,
                  transform: 'translateY(-4px)',
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1rem',
                }}>
                  {area.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: area.color,
                  marginBottom: '0.75rem',
                }}>
                  {area.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#525252',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                }}>
                  {area.desc}
                </p>
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  backgroundColor: `${area.color}15`,
                  color: area.color,
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}>
                  {area.projects}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3.5rem 5%',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2.5rem', textAlign: 'center' }}
        >
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#1a1a1a',
          }}>
            Technologies We Use
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#737373',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Leveraging cutting-edge technologies to build scalable, impactful solutions
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
        }}>
          {[
            { tech: 'Artificial Intelligence & ML', color: '#2563eb' },
            { tech: 'Internet of Things (IoT)', color: '#059669' },
            { tech: 'Deep Learning & Neural Networks', color: '#7c3aed' },
            { tech: 'Computer Vision', color: '#dc2626' },
            { tech: 'Natural Language Processing', color: '#ea580c' },
            { tech: 'Data Analytics & Big Data', color: '#0891b2' },
            { tech: 'Mobile App Development', color: '#8b5cf6' },
            { tech: 'Cloud Computing', color: '#06b6d4' },
            { tech: 'Blockchain for Healthcare', color: '#10b981' },
            { tech: 'Edge Computing', color: '#f59e0b' },
            { tech: 'Predictive Analytics', color: '#ec4899' },
            { tech: 'Human-Computer Interaction', color: '#6366f1' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                padding: '1.5rem',
                borderRadius: '10px',
                border: '1px solid #e5e5e5',
                borderLeft: `4px solid ${item.color}`,
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                transform: 'translateX(4px)',
                borderLeftWidth: '6px',
              }}
            >
              <h4 style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: '#1a1a1a',
              }}>
                {item.tech}
              </h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section style={{
        backgroundColor: '#ffffff',
        padding: '3.5rem 5%',
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid #e5e5e5',
        borderBottom: '1px solid #e5e5e5',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '2.5rem', textAlign: 'center' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: 700,
              marginBottom: '1rem',
              color: '#1a1a1a',
            }}>
              Our Approach
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: '#737373',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              A systematic methodology ensuring every project delivers measurable social impact
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem',
          }}>
            {[
              {
                step: '01',
                title: 'Research & Identify',
                desc: 'Conduct field studies, interview stakeholders, and analyze data to identify real social problems that technology can address effectively.',
                color: '#2563eb'
              },
              {
                step: '02',
                title: 'Design & Prototype',
                desc: 'Create user-centered designs, develop prototypes, and iterate based on feedback from target communities and domain experts.',
                color: '#7c3aed'
              },
              {
                step: '03',
                title: 'Develop & Test',
                desc: 'Build robust solutions using best practices, conduct rigorous testing, and validate with pilot deployments in controlled environments.',
                color: '#059669'
              },
              {
                step: '04',
                title: 'Deploy & Scale',
                desc: 'Roll out solutions to target communities, monitor performance, gather feedback, and scale to reach maximum beneficiaries.',
                color: '#ea580c'
              },
              {
                step: '05',
                title: 'Measure Impact',
                desc: 'Track key metrics, analyze outcomes, document learnings, and publish results to contribute to the broader social innovation ecosystem.',
                color: '#dc2626'
              },
              {
                step: '06',
                title: 'Sustain & Improve',
                desc: 'Ensure long-term sustainability through training, capacity building, continuous improvement, and community ownership.',
                color: '#0891b2'
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                style={{
                  backgroundColor: '#f8f9fb',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e5e5e5',
                  position: 'relative',
                  transition: 'all 0.3s',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{
                  backgroundColor: '#ffffff',
                  boxShadow: `0 6px 20px ${item.color}20`,
                  transform: 'translateY(-4px)',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '20px',
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  backgroundColor: item.color,
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  boxShadow: `0 4px 12px ${item.color}40`,
                }}>
                  {item.step}
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  marginTop: '1.5rem',
                  marginBottom: '0.75rem',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#525252',
                  lineHeight: 1.7,
                }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3.5rem 5%',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2.5rem', textAlign: 'center' }}
        >
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#1a1a1a',
          }}>
            Success Stories & Impact
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#737373',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Real stories of transformation and positive change from our community partners
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem',
        }}>
          {[
            {
              story: 'Our autism detection tool helped identify early signs in 200+ children, enabling timely intervention and therapy. Parents report 70% improvement in developmental milestones.',
              metric: '200+ Children Screened',
              partner: 'Special Education NGO, Mumbai',
              color: '#7c3aed'
            },
            {
              story: 'IoT elderly monitoring system reduced emergency response time from 45 minutes to 8 minutes, preventing 15 critical incidents in our pilot community.',
              metric: '40% Faster Response',
              partner: 'Senior Care Facility, Pune',
              color: '#dc2626'
            },
            {
              story: 'Women empowerment platform helped 150 women complete skill training, with 85 securing employment or starting businesses within 6 months.',
              metric: '85 Women Employed',
              partner: 'Women Development Trust',
              color: '#8b5cf6'
            },
            {
              story: 'Education analytics reduced student dropout rates by 35% by identifying at-risk students early and providing targeted interventions.',
              metric: '35% Dropout Reduction',
              partner: 'Municipal Schools Network',
              color: '#2563eb'
            },
            {
              story: 'Community health tracker enabled vaccination coverage of 95% in remote villages, up from 60%, through better tracking and follow-ups.',
              metric: '95% Vaccination Rate',
              partner: 'Rural Health Initiative',
              color: '#059669'
            },
            {
              story: 'Telemedicine platform connected 500+ rural patients with specialists, saving 80% in travel costs and time while improving diagnosis accuracy.',
              metric: '500+ Remote Consultations',
              partner: 'Primary Health Centers',
              color: '#ea580c'
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #e5e5e5',
                borderTop: `4px solid ${item.color}`,
                transition: 'all 0.3s',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                transform: 'translateY(-4px)',
              }}
            >
              <p style={{
                fontSize: '0.95rem',
                color: '#525252',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}>
                {item.story}
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8f9fb',
                borderRadius: '8px',
                borderLeft: `3px solid ${item.color}`,
                marginBottom: '1rem',
              }}>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#737373',
                  marginBottom: '0.25rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Key Metric
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: item.color,
                }}>
                  {item.metric}
                </div>
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: '#737373',
                fontStyle: 'italic',
              }}>
                — {item.partner}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partner Organizations */}
      <section style={{
        backgroundColor: '#ffffff',
        padding: '3.5rem 5%',
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid #e5e5e5',
        borderBottom: '1px solid #e5e5e5',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '2.5rem', textAlign: 'center' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: 700,
              marginBottom: '1rem',
              color: '#1a1a1a',
            }}>
              Collaboration Network
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: '#737373',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              Working together with diverse organizations to maximize social impact
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              {
                type: 'NGO Partners',
                count: '30+',
                desc: 'Social welfare organizations, healthcare NGOs, and community groups',
                icon: '🤝',
                color: '#7c3aed'
              },
              {
                type: 'Academic Institutions',
                count: '15+',
                desc: 'Universities, research labs, and educational institutions',
                icon: '🎓',
                color: '#2563eb'
              },
              {
                type: 'Healthcare Facilities',
                count: '25+',
                desc: 'Hospitals, clinics, and primary health centers',
                icon: '🏥',
                color: '#dc2626'
              },
              {
                type: 'Corporate Partners',
                count: '10+',
                desc: 'Technology companies and CSR initiatives',
                icon: '🏢',
                color: '#059669'
              },
              {
                type: 'Government Bodies',
                count: '8+',
                desc: 'Municipal corporations and state departments',
                icon: '🏛️',
                color: '#ea580c'
              },
              {
                type: 'Community Centers',
                count: '40+',
                desc: 'Local communities and grassroots organizations',
                icon: '🏘️',
                color: '#0891b2'
              },
            ].map((partner, idx) => (
              <motion.div
                key={idx}
                style={{
                  backgroundColor: '#f8f9fb',
                  padding: '1.75rem',
                  borderRadius: '10px',
                  border: '1px solid #e5e5e5',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{
                  backgroundColor: '#ffffff',
                  boxShadow: `0 6px 20px ${partner.color}20`,
                  borderColor: partner.color,
                  transform: 'translateY(-4px)',
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.75rem',
                }}>
                  {partner.icon}
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: partner.color,
                  marginBottom: '0.5rem',
                }}>
                  {partner.count}
                </div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  marginBottom: '0.5rem',
                }}>
                  {partner.type}
                </h4>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#737373',
                  lineHeight: 1.6,
                }}>
                  {partner.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3.5rem 5%',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2.5rem', textAlign: 'center' }}
        >
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#1a1a1a',
          }}>
            Get Involved
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#737373',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Multiple ways to contribute to technology-driven social innovation
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {[
            {
              title: 'Student Internships',
              desc: 'Gain hands-on experience in AI, IoT, and ML projects. Work on real-world problems, receive mentorship, and contribute to impactful solutions.',
              cta: 'Apply Now',
              color: '#2563eb'
            },
            {
              title: 'Research Collaboration',
              desc: 'Partner on research projects, co-author publications, and advance the field of technology for social good. Open to faculty and PhD scholars.',
              cta: 'Collaborate',
              color: '#7c3aed'
            },
            {
              title: 'NGO Partnerships',
              desc: 'Bring technology to your organization. We help NGOs leverage tech solutions to increase impact, improve efficiency, and serve more beneficiaries.',
              cta: 'Partner With Us',
              color: '#059669'
            },
            {
              title: 'Corporate CSR',
              desc: 'Align your CSR initiatives with impactful tech projects. Provide funding, expertise, or resources to scale solutions that matter.',
              cta: 'Explore CSR',
              color: '#ea580c'
            },
            {
              title: 'Volunteer Contributors',
              desc: 'Developers, designers, and domain experts can contribute skills to ongoing projects. Join our community of change-makers.',
              cta: 'Join Community',
              color: '#8b5cf6'
            },
            {
              title: 'Project Proposals',
              desc: 'Have an idea for social impact? Submit project proposals. We provide guidance, resources, and support to bring ideas to life.',
              cta: 'Submit Idea',
              color: '#0891b2'
            },
          ].map((opportunity, idx) => (
            <motion.div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #e5e5e5',
                transition: 'all 0.3s',
                display: 'flex',
                flexDirection: 'column',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                transform: 'translateY(-4px)',
                borderColor: opportunity.color,
              }}
            >
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: '1rem',
              }}>
                {opportunity.title}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#525252',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
                flexGrow: 1,
              }}>
                {opportunity.desc}
              </p>
              <button style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: opportunity.color,
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.95rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
                {opportunity.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        color: '#ffffff',
        padding: '4rem 5%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          <motion.h2
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 700,
              marginBottom: '1.25rem',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Join the Movement for Technology-Driven Social Change
          </motion.h2>
          <motion.p
            style={{
              fontSize: '1.05rem',
              color: '#a3a3a3',
              marginBottom: '2rem',
              lineHeight: 1.7,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Together, we can create technology solutions that address real challenges and improve lives. 
            Whether you're a student, researcher, organization, or individual, there's a place for you in our mission.
          </motion.p>
          <motion.div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              style={{
                padding: '0.875rem 2rem',
                fontSize: '1rem',
                fontWeight: 500,
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              whileHover={{
                backgroundColor: '#f5f5f5',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              Start Contributing
            </motion.button>
            <motion.button
              style={{
                padding: '0.875rem 2rem',
                fontSize: '1rem',
                fontWeight: 500,
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1.5px solid #525252',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              whileHover={{
                borderColor: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateY(-2px)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
       {/* Footer Component */}
      <Footer />
    </div>
  );
}
  
export default LandingPage;