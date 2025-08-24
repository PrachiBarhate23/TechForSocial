import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Company Info */}
          <div style={styles.column}>
            <h3 style={styles.heading}>TECHFORSOCIAL</h3>
            <p style={styles.description}>
              Founded in Dr Dhananjay Naahata, TechForSocial brings together research, innovation, and technology to create real-world impact.
            </p>
            <div style={styles.socialContainer}>
              <span style={styles.followText}>FOLLOW US:</span>
              <div style={styles.socialIcons}>
                <a href="#" style={styles.socialLink}>
                  <div style={styles.socialIcon}>
                    <svg style={styles.iconSvg} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </div>
                </a>
                <a href="#" style={styles.socialLink}>
                  <div style={styles.socialIcon}>
                    <svg style={styles.iconSvg} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                </a>
                <a href="#" style={styles.socialLink}>
                  <div style={styles.socialIcon}>
                    <svg style={styles.iconSvg} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div style={styles.column}>
            <h3 style={styles.heading}>Explore</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}><a href="#" style={styles.link}>About</a></li>
              <li style={styles.listItem}><a href="#" style={styles.link}>Careers</a></li>
              <li style={styles.listItem}><a href="#" style={styles.link}>contact</a></li>
              <li style={styles.listItem}><a href="#" style={styles.link}>FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div style={styles.column}>
            <h3 style={styles.heading}>Contact</h3>
            <div style={styles.contactInfo}>
              <div style={styles.address}>
                <span style={styles.addressLine}>Address: 2031, Sindhu Portal</span>
                <span style={styles.addressLine}>Institutional Technology,</span>
                <span style={styles.addressLine}>Naveen Campus, Nandini Nagar,</span>
                <span style={styles.addressLine}>Gwalior,</span>
                <span style={styles.addressLine}>Maharashtra 200001</span>
              </div>
              <div style={styles.contactDetail}>
                <span>Phone Number: +91 (73) 28074440</span>
              </div>
              <div style={styles.contactDetail}>
                <a href="#" style={styles.link}>Feedback</a>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div style={styles.column}>
            <h3 style={styles.heading}>Legal</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}><a href="#" style={styles.link}>Terms & Conditions</a></li>
              <li style={styles.listItem}><a href="#" style={styles.link}>Privacy Policy</a></li>
              <li style={styles.listItem}><a href="#" style={styles.link}>Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={styles.bottomSection}>
          <p style={styles.copyright}>
            Copyright © 2019 - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '40px 0 20px 0',
    fontFamily: 'Arial, sans-serif'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '30px'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  heading: {
    color: '#00d4aa',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '15px',
    letterSpacing: '0.5px'
  },
  description: {
    color: '#cccccc',
    fontSize: '13px',
    lineHeight: '1.5',
    marginBottom: '20px'
  },
  socialContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  followText: {
    color: '#cccccc',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  socialIcons: {
    display: 'flex',
    gap: '8px'
  },
  socialLink: {
    textDecoration: 'none'
  },
  socialIcon: {
    width: '24px',
    height: '24px',
    backgroundColor: '#00d4aa',
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease'
  },
  iconSvg: {
    width: '14px',
    height: '14px',
    color: 'white'
  },
  list: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  listItem: {
    marginBottom: '8px'
  },
  link: {
    color: '#cccccc',
    textDecoration: 'none',
    fontSize: '13px',
    transition: 'color 0.3s ease'
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  address: {
    display: 'flex',
    flexDirection: 'column'
  },
  addressLine: {
    color: '#cccccc',
    fontSize: '13px',
    lineHeight: '1.4'
  },
  contactDetail: {
    color: '#cccccc',
    fontSize: '13px'
  },
  bottomSection: {
    borderTop: '1px solid #333',
    paddingTop: '20px',
    textAlign: 'center'
  },
  copyright: {
    color: '#cccccc',
    fontSize: '12px',
    margin: '0'
  }
};

export default Footer;