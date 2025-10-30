import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User registered:", data);
        sessionStorage.setItem("userData", JSON.stringify(data.user));
        navigate("/login");
      } else {
        console.error("Registration failed:", data);
        setErrors(data);
      }
    } catch (err) {
      console.error("Error:", err);
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
      background: 'rgba(255, 255, 255, 1)',
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
      marginBottom: '1rem',
      textAlign: 'center'
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
    inputError: { borderColor: '#dc2626' },
    errorMessage: { color: '#dc2626', fontSize: '0.8rem', marginTop: '0.25rem' },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      margin: '0.5rem 0'
    },
    checkbox: { width: '18px', height: '18px', accentColor: '#096458ff' },
    checkboxLabel: { color: 'rgba(15, 67, 7, 0.8)', fontSize: '0.9rem' },
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
    loginLink: {
      textAlign: 'center',
      marginTop: '1.5rem',
      color: 'rgba(7, 95, 46, 0.8)',
      fontSize: '0.9rem'
    },
    loginLinkAnchor: {
      color: '#F5BABB',
      textDecoration: 'none',
      fontWeight: '500',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainCard}>
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <div style={styles.decorativeElements}>+ ○ ⋮⋮⋮</div>
          <div style={styles.decorativeShape}></div>
          <h1 style={styles.welcomeTitle}>Join us!</h1>
          <p style={styles.welcomeSubtitle}>
            Create your account to get started.
          </p>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <div style={styles.formContainer}>
            <h2 style={styles.title}>Sign Up</h2>

            <form style={styles.formContent} onSubmit={handleSubmit}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="First name"
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Email"
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
                  style={{
                    ...styles.input,
                    ...(errors.password ? styles.inputError : {})
                  }}
                  placeholder="Password (min 6 characters)"
                  required
                />
                {errors.password && <div style={styles.errorMessage}>{errors.password}</div>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.confirmPassword ? styles.inputError : {})
                  }}
                  placeholder="Confirm password"
                  required
                />
                {errors.confirmPassword && (
                  <div style={styles.errorMessage}>{errors.confirmPassword}</div>
                )}
              </div>

              <div style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  style={styles.checkbox}
                  required
                />
                <label style={styles.checkboxLabel}>
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>

              <button type="submit" style={styles.button}>
                Create Account
              </button>
            </form>

            <div style={styles.loginLink}>
              Already have an account?{' '}
              <span
                style={styles.loginLinkAnchor}
                onClick={() => navigate('/login')}
              >
                Sign in here
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default SignupPage;
