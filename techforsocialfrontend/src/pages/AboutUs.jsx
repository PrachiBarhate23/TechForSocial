import React from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import backgroundImage from '../assets/images/background.jpg';

const ProfilePage = () => {
  const styles = {
    container: {
  minHeight: '100vh',
  padding: '2rem 1rem',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  
  // Gradient + image
   backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh'
}
,
    profileCard: {
      maxWidth: '900px',
      margin: '0 auto',
      background: 'rgba(255, 245, 242, 0.95)',
      borderRadius: '24px',
      boxShadow: '0 25px 60px rgba(6, 66, 50, 0.15)',
      overflow: 'hidden',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(245, 186, 187, 0.3)',
      position: 'relative',
    },
    decorativeTop: {
      height: '8px',
      background: 'linear-gradient(90deg, #F5BABB, #568F87, #064232)',
    },
    header: {
      textAlign: 'center',
      padding: '3rem 2rem 2rem',
      background: 'linear-gradient(135deg, rgba(245, 186, 187, 0.1) 0%, rgba(86, 143, 135, 0.1) 100%)',
      position: 'relative',
    },
    profileImageContainer: {
      width: '200px',
      height: '250px',
      margin: '0 auto 2rem',
      background: '#FFF5F2',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(245, 186, 187, 0.4)',
      border: '3px solid rgba(245, 186, 187, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1rem',
      color: '#568F87',
      position: 'relative',
      overflow: 'hidden',
    },
    profileImagePlaceholder: {
      fontSize: '0.9rem',
      color: '#568F87',
      textAlign: 'center',
      padding: '1rem',
    },
    name: {
      fontSize: '2.2rem',
      fontWeight: '700',
      color: '#064232',
      marginBottom: '0.5rem',
      letterSpacing: '-0.5px',
    },
    title: {
      fontSize: '1.1rem',
      color: '#568F87',
      fontWeight: '500',
      marginBottom: '1rem',
    },
    contentSection: {
      padding: '0 3rem 3rem',
    },
    aboutTitle: {
      fontSize: '1.4rem',
      fontWeight: '600',
      color: '#064232',
      marginBottom: '1.5rem',
      textAlign: 'center',
      position: 'relative',
    },
    aboutTitleUnderline: {
      position: 'absolute',
      bottom: '-8px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '3px',
      background: 'linear-gradient(90deg, #F5BABB, #568F87)',
      borderRadius: '2px',
    },
    description: {
      fontSize: '1rem',
      lineHeight: '1.7',
      color: '#064232',
      textAlign: 'justify',
      marginBottom: '2.5rem',
      padding: '0 1rem',
    },
    socialContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      paddingTop: '1rem',
      borderTop: '1px solid rgba(245, 186, 187, 0.3)',
    },
    socialIcon: {
      width: '60px',
      height: '60px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 20px rgba(245, 186, 187, 0.3)',
      position: 'relative',
      overflow: 'hidden',
    },
    socialIconEmail: {
      background: 'linear-gradient(135deg, #568F87 0%, #064232 100%)',
    },
    socialIconWebsite: {
      background: 'linear-gradient(135deg, #F5BABB 0%, #568F87 100%)',
    },
    socialIconLinkedIn: {
      background: 'linear-gradient(135deg, #064232 0%, #568F87 100%)',
    },
    floatingElement: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(245, 186, 187, 0.1)',
      animation: 'float 6s ease-in-out infinite',
    },
    floatingElement1: {
      top: '20px',
      right: '20px',
      width: '80px',
      height: '80px',
    },
    floatingElement2: {
      bottom: '20px',
      left: '20px',
      width: '60px',
      height: '60px',
      animationDelay: '3s',
    },
    statisticsBar: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '2rem 1rem',
      background: 'rgba(245, 186, 187, 0.08)',
      margin: '0 -3rem',
      borderTop: '1px solid rgba(245, 186, 187, 0.2)',
      borderBottom: '1px solid rgba(245, 186, 187, 0.2)',
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#568F87',
      display: 'block',
    },
    statLabel: {
      fontSize: '0.9rem',
      color: '#064232',
      marginTop: '0.25rem',
    },
  };

  const EmailIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );

  const WebsiteIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.profileCard}>
          {/* Decorative top bar */}
          <div style={styles.decorativeTop}></div>
          
          {/* Floating elements */}
          <div style={{...styles.floatingElement, ...styles.floatingElement1}}></div>
          <div style={{...styles.floatingElement, ...styles.floatingElement2}}></div>
          
          {/* Header section */}
          <div style={styles.header}>
            <div style={styles.profileImageContainer}>
              <div style={styles.profileImagePlaceholder}>
                Profile Photo
                <br />
                Placeholder
              </div>
            </div>
            <h1 style={styles.name}>Dr. DHANANJAY KALBANDE</h1>
            <p style={styles.title}>Professor & Technology Expert</p>
          </div>

          {/* Statistics bar */}
          <div style={styles.statisticsBar}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>15+</span>
              <span style={styles.statLabel}>Years Experience</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>4</span>
              <span style={styles.statLabel}>Books Authored</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>100+</span>
              <span style={styles.statLabel}>Research Papers</span>
            </div>
          </div>

          {/* Content section */}
          <div style={styles.contentSection}>
            <h2 style={styles.aboutTitle}>
              About
              <div style={styles.aboutTitleUnderline}></div>
            </h2>
            
            <p style={styles.description}>
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
            <div style={styles.socialContainer}>
              <div style={{...styles.socialIcon, ...styles.socialIconEmail}}>
                <EmailIcon />
              </div>
              <div style={{...styles.socialIcon, ...styles.socialIconWebsite}}>
                <WebsiteIcon />
              </div>
              <div style={{...styles.socialIcon, ...styles.socialIconLinkedIn}}>
                <LinkedInIcon />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.7;
            }
            50% { 
              transform: translateY(-20px) rotate(5deg); 
              opacity: 1;
            }
          }
          
          .social-icon:hover {
            transform: translateY(-5px) scale(1.1);
            box-shadow: 0 8px 25px rgba(245, 186, 187, 0.4);
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;