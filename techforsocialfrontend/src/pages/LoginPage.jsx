import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    userType: 'user' // 'user' or 'admin'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUserTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      userType: type
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
    
    // Simple authentication check
    let isValidLogin = false;
    
    if (formData.userType === 'admin') {
      // Admin credentials
      isValidLogin = formData.email === 'admin@example.com' && formData.password === 'admin123';
    } else {
      // User credentials (you can customize this)
      isValidLogin = formData.email && formData.password; // Any email/password for demo
    }
    
    if (isValidLogin) {
      // Store user info in localStorage (uncomment for real app)
      // localStorage.setItem('userAuth', JSON.stringify({
      //   isLoggedIn: true,
      //   userType: formData.userType,
      //   email: formData.email
      // }));
      localStorage.setItem('user', JSON.stringify({
    name: formData.userType === 'admin' ? 'Admin' : formData.email,
    role: formData.userType
  }));
      // Navigate to landing page
      navigate('/landingpage'); // This will navigate to landingpage.jsx
      console.log('Login successful! Redirecting to landing page...');
      alert(`Login successful as ${formData.userType}! Redirecting to landing page...`);
    } else {
      alert(formData.userType === 'admin' 
        ? 'Invalid admin credentials. Use: admin@example.com / admin123'
        : 'Invalid credentials'
      );
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#fee7e8ff',
      padding: '2rem',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainCard: {
      display: 'flex',
      width: '100%',
      maxWidth: '1000px',
      borderRadius: '24px',
      height: '100%',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(6, 66, 50, 0.3)',
      backdropFilter: 'blur(20px)',
      background: 'rgba(255, 255, 255, 1)',
      border: '1px solid rgba(255, 245, 242, 0.2)',
    },
    leftPanel: {
      flex: '0.8',
      background: 'linear-gradient(135deg, rgba(6, 90, 52, 0.9) 0%, rgba(13, 100, 64, 0.9) 50%, rgba(9, 100, 88, 0.9) 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '4rem',
      position: 'relative',
      overflow: 'hidden'
    },
    decorativeElements: {
      position: 'absolute',
      top: '2rem',
      left: '2rem',
      color: 'rgba(255, 245, 242, 0.3)',
      fontSize: '2rem'
    },
    decorativeShape: {
      position: 'absolute',
      bottom: '3rem',
      right: '3rem',
      width: '150px',
      height: '150px',
      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
      background: 'rgba(255, 245, 242, 0.1)',
      animation: 'float 6s ease-in-out infinite'
    },
    welcomeTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#FFF5F2',
      marginBottom: '1rem',
      lineHeight: '1.2'
    },
    welcomeSubtitle: {
      color: 'rgba(255, 245, 242, 0.8)',
      fontSize: '1.1rem',
      lineHeight: '1.6',
      marginBottom: '2rem'
    },
    rightPanel: {
      flex: '1.4',
      background: 'rgba(255, 245, 242, 0.95)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      width: '1000px',
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(86, 143, 135, 0.1)',
      borderRadius: '20px',
      padding: '2.5rem',
      width: '100%',
      maxWidth: '900px',
      height: '100%',
      maxheight: '500px',
      boxShadow: '0 8px 32px rgba(6, 66, 50, 0.1)',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#065a34ff',
      marginBottom: '0.5rem',
      textAlign: 'center'
    },
    userTypeSelector: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.5rem',
      justifyContent: 'center'
    },
    userTypeButton: {
      padding: '0.75rem 2rem',
      borderRadius: '25px',
      border: '2px solid rgba(86, 143, 135, 0.3)',
      background: 'rgba(255, 245, 242, 0.5)',
      color: '#064232',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      flex: 1,
      textAlign: 'center'
    },
    userTypeButtonActive: {
      background: 'linear-gradient(135deg, #F5BABB, #F5BABB)',
      border: '2px solid #F5BABB',
      color: '#064232',
      fontWeight: '600'
    },
    formContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      marginTop: '1.5rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      color: '#0c0300ff',
      fontSize: '0.9rem',
      fontWeight: '500'
    },
    input: {
      padding: '1rem',
      borderRadius: '12px',
      border: '2px solid rgba(86, 143, 135, 0.3)',
      background: 'rgba(255, 245, 242, 0.5)',
      color: '#0d6440ff',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '0.5rem 0'
    },
    checkboxGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    checkbox: {
      width: '18px',
      height: '18px',
      accentColor: '#096458ff'
    },
    checkboxLabel: {
      color: 'rgba(15, 67, 7, 0.8)',
      fontSize: '0.9rem',
      cursor: 'pointer'
    },
    forgotPassword: {
      color: '#0a492bff',
      textDecoration: 'none',
      fontSize: '0.9rem',
      cursor: 'pointer'
    },
    button: {
      background: 'linear-gradient(135deg, #F5BABB, #F5BABB)',
      color: '#064232',
      border: 'none',
      padding: '1rem',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '1rem'
    },
    credentialsHint: {
      background: 'rgba(86, 143, 135, 0.1)',
      border: '1px solid rgba(86, 143, 135, 0.2)',
      borderRadius: '8px',
      padding: '0.75rem',
      fontSize: '0.85rem',
      color: '#064232',
      marginBottom: '1rem'
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      margin: '1.5rem 0',
      color: 'rgba(5, 60, 16, 0.6)'
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: 'rgba(7, 63, 24, 0.2)'
    },
    dividerText: {
      padding: '0 1rem',
      fontSize: '0.9rem'
    },
    socialIcons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    socialIcon: {
      width: '45px',
      height: '45px',
      borderRadius: '12px',
      background: 'rgba(255, 245, 242, 0.5)',
      border: '1px solid rgba(86, 143, 135, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    signupLink: {
      textAlign: 'center',
      color: 'rgba(7, 95, 46, 0.8)',
      fontSize: '0.9rem'
    },
    signupLinkAnchor: {
      color: '#F5BABB',
      textDecoration: 'none',
      fontWeight: '500',
      cursor: 'pointer'
    }
  };

  const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  return (
    <div style={styles.container}>
      <div style={styles.mainCard}>
        {/* Left Panel - Welcome Section */}
        <div style={styles.leftPanel}>
          <div style={styles.decorativeElements}>
            + ○ ⋮⋮⋮
          </div>
          <div style={styles.decorativeShape}></div>
          
          <div>
            <h1 style={styles.welcomeTitle}>Welcome back!</h1>
            <p style={styles.welcomeSubtitle}>
              Sign in as {formData.userType === 'admin' ? 'Administrator' : 'User'} to access your account and manage your portfolio.
            </p>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div style={styles.rightPanel}>
          <div style={styles.formContainer}>
            <h2 style={styles.title}>Sign In</h2>
            
            {/* User Type Selector */}
            <div style={styles.userTypeSelector}>
              <button
                type="button"
                style={{
                  ...styles.userTypeButton,
                  ...(formData.userType === 'user' ? styles.userTypeButtonActive : {})
                }}
                onClick={() => handleUserTypeChange('user')}
              >
                👤 User Login
              </button>
              <button
                type="button"
                style={{
                  ...styles.userTypeButton,
                  ...(formData.userType === 'admin' ? styles.userTypeButtonActive : {})
                }}
                onClick={() => handleUserTypeChange('admin')}
              >
                🛡️ Admin Login
              </button>
            </div>

            {/* Credentials Hint */}
            {formData.userType === 'admin' && (
              <div style={styles.credentialsHint}>
                <strong>Admin Demo Credentials:</strong><br />
                Email: admin@example.com<br />
                Password: admin123
              </div>
            )}
            
            <div onSubmit={handleSubmit}>
              <div style={styles.formContent}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder={formData.userType === 'admin' ? "admin@example.com" : "Enter your email"}
                    required
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder={formData.userType === 'admin' ? "admin123" : "Enter your password"}
                    required
                  />
                </div>
                
                <div style={styles.checkboxContainer}>
                  <div style={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      style={styles.checkbox}
                    />
                    <label htmlFor="rememberMe" style={styles.checkboxLabel}>
                      Remember me
                    </label>
                  </div>
                  <span style={styles.forgotPassword}>
                    Forgot password?
                  </span>
                </div>
                
                <button 
                  type="submit" 
                  style={styles.button}
                  onClick={handleSubmit}
                >
                  Sign In as {formData.userType === 'admin' ? 'Admin' : 'User'}
                </button>
              </div>
            </div>
            
            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>Or sign in with</span>
              <div style={styles.dividerLine}></div>
            </div>
            
            <div style={styles.socialIcons}>
              <div style={styles.socialIcon}>
                <GoogleIcon />
              </div>
              <div style={styles.socialIcon}>
                <FacebookIcon />
              </div>
              <div style={styles.socialIcon}>
                <LinkedInIcon />
              </div>
            </div>
            
            <div style={styles.signupLink}>
              New here?{' '}
              <span
                style={styles.signupLinkAnchor}
                onClick={() => navigate('/SignUp')}
              >
                Create an account
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .user-type-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(86, 143, 135, 0.2);
        }
        
        input:focus {
          border-color: #F5BABB !important;
          box-shadow: 0 0 0 3px rgba(245, 186, 187, 0.1) !important;
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(245, 186, 187, 0.3);
        }
      `}</style>
    </div>
  );
};
export default LoginPage;