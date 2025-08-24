import React from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import backgroundImage from '../assets/images/background.jpg';

const PublicationsPage = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    pageTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#023a28ff',
      textAlign: 'center',
      marginBottom: '1rem',
      textShadow: '2px 2px 4px rgba(6, 66, 50, 0.3)',
      letterSpacing: '2px',
    },
    publicationsContainer: {
      maxWidth: '1000px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    },
    yearSection: {
      background: 'rgba(254, 240, 236, 0.95)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 20px 50px rgba(6, 66, 50, 0.15)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(245, 186, 187, 0.3)',
      position: 'relative',
      overflow: 'hidden',
    },
    yearHeader: {
      fontSize: '1.8rem',
      fontWeight: '600',
      color: '#064232',
      textAlign: 'center',
      marginBottom: '2rem',
      padding: '1rem',
      background: 'linear-gradient(135deg, rgba(245, 186, 187, 0.57) 25%, rgba(3, 48, 42, 0.24) 75%)',
      borderRadius: '12px',
      position: 'relative',
    },
    yearHeaderUnderline: {
      position: 'absolute',
      bottom: '8px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80px',
      height: '3px',
      background: 'linear-gradient(90deg, #ffb3b5ff, #02312bff)',
      borderRadius: '2px',
    },
    publicationsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    publicationItem: {
      padding: '1.5rem',
      background: 'rgba(255, 245, 242, 0.8)',
      borderRadius: '12px',
      border: '1px solid rgba(245, 186, 187, 0.4)',
      boxShadow: '0 4px 15px rgba(86, 143, 135, 0.1)',
      transition: 'all 0.3s ease',
      position: 'relative',
    },
    publicationItemHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(86, 143, 135, 0.2)',
    },
    publicationText: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: '#064232',
      marginTop: '0.5rem',
    },
    authorHighlight: {
      fontWeight: '600',
      color: '#568F87',
    },
  };

  const publications = {
    2018: [
      "Kalbande D.S., Kanawade A., Varvedkar S. (2020) Comparative Analysis of Methods for Monitoring Activities of Daily Living for the Elderly People. In: Vasudevan H., Deshmath A., Ray K. (eds) Proceedings of International Conference on Wireless Communication. Lecture Notes on Data Engineering and Communications Technologies, vol 19. Springer, Singapore",
      "T. Hamblia, M. Dhond, V. Patel and D. R. Kalbande, \"Design of an intelligent system for autism,\" 2018 International Conference on Communication information and Computing Technology (ICCICT), Mumbai, 2018, pp. 1-8"
    ],
    2017: [
      "F. Britto and D. R. Kalbande, \"Analysis of technological advances in Autism,\" 2017 International Conference on Inventive Computing and Informatics (ICICI), Coimbatore, 2017, pp. 776-781",
      "S. Iyer, R. S. Mishra, S. P. Kulkarni and D. Kalbande, \"Assess autism level while playing games,\" 2017 2nd International Conference on Communication Systems, Computing and IT Applications (CSCITA), Mumbai, 2017, pp. 42-47"
    ],
    2013: [
      "U. Nagarsekar, A. Mhapsekar, P. Kulkarni and D. R. Kalbande, \"Emotion detection from the SMS of the internet,\" 2013 IEEE Recent Advances in Intelligent Computational Systems (RAICS), Trivandrum, 2013, pp. 316-321"
    ]
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>PUBLICATIONS</h1>
        
        <div style={styles.publicationsContainer}>
          {Object.entries(publications).map(([year, yearPublications]) => (
            <div key={year} style={styles.yearSection}>
              
              <h2 style={styles.yearHeader}>
                {year}
                <div style={styles.yearHeaderUnderline}></div>
              </h2>
              
              <div style={styles.publicationsList}>
                {yearPublications.map((publication, index) => (
                  <div 
                    key={index}
                    style={styles.publicationItem}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(86, 143, 135, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(86, 143, 135, 0.1)';
                    }}
                  >
                    <div style={styles.publicationText}>
                      {publication.split('D. R. Kalbande').map((part, i) => 
                        i === 0 ? part : (
                          <span key={i}>
                            <span style={styles.authorHighlight}>D. R. Kalbande</span>
                            {part}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.7;
            }
            50% { 
              transform: translateY(-10px) rotate(2deg); 
              opacity: 1;
            }
          }
          
          .decorative-element {
            animation: float 8s ease-in-out infinite;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default PublicationsPage;