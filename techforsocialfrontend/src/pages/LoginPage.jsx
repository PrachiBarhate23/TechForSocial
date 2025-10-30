import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email, password: formData.password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    const data = await response.json();
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert(`Welcome ${data.user.first_name || data.user.username || data.user.email}!`);
    navigate("/landingpage");
  } catch (err) {
    console.error("Login error:", err);
    alert("Invalid credentials. Please try again.");
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      padding: '2.5rem',
      width: '100%',
      maxWidth: '900px',
      boxShadow: '0 8px 32px rgba(6, 66, 50, 0.1)',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#065a34ff',
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    formContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
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
      outline: 'none'
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
      marginTop: '1rem'
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
      cursor: 'pointer'
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
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );

  return (
    <div style={styles.container}>
      <div style={styles.mainCard}>
        <div style={styles.leftPanel}>
          <div style={styles.decorativeElements}>+ ○ ⋮⋮⋮</div>
          <div style={styles.decorativeShape}></div>
          <div>
            <h1 style={styles.welcomeTitle}>Welcome back!</h1>
            <p style={styles.welcomeSubtitle}>
              Sign in to access your account and manage your portfolio.
            </p>
          </div>
        </div>

        <div style={styles.rightPanel}>
          <div style={styles.formContainer}>
            <h2 style={styles.title}>Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.formContent}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
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
                  <span style={styles.forgotPassword}>Forgot password?</span>
                </div>
                <button type="submit" style={styles.button}>Sign In</button>
              </div>
            </form>

            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>Or sign in with</span>
              <div style={styles.dividerLine}></div>
            </div>

            <div style={styles.socialIcons}>
              <div style={styles.socialIcon}>
                <GoogleIcon />
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
