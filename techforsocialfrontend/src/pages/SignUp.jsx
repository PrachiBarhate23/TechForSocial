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
    role: 'user', // Default to user
    adminCode: '', // For admin verification
    agreeToTerms: false
  });
  const [showAdminCode, setShowAdminCode] = useState(false);
  const [errors, setErrors] = useState({});

  // Admin verification code (in real app, this would be validated server-side)
  const ADMIN_CODE = 'ADMIN2024';

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      role: role,
      adminCode: role === 'user' ? '' : prev.adminCode
    }));
    setShowAdminCode(role === 'admin');
    
    // Clear admin code error if switching back to user
    if (role === 'user' && errors.adminCode) {
      setErrors(prev => ({
        ...prev,
        adminCode: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Admin code validation
    if (formData.role === 'admin' && formData.adminCode !== ADMIN_CODE) {
      newErrors.adminCode = 'Invalid admin verification code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Simulate successful signup
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      role: formData.role,
      id: Date.now(), // Simple ID generation
      isVerified: true
    };

    // Store user data (in real app, this would be handled by backend)
    sessionStorage.setItem('userData', JSON.stringify(userData));

    console.log('Signup form submitted:', userData);
    
    // Redirect based on role
    if (formData.role === 'admin') {
      navigate('/dashboard'); // Admin goes to dashboard
    } else {
      navigate('/landingpage'); // Regular user goes to landing page
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
      boxShadow: '0 8px 32px rgba(6, 66, 50, 0.1)',
      overflow: 'auto'
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#065a34ff',
      marginBottom: '0.5rem',
      textAlign: 'center'
    },
    roleSelector: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.5rem',
      padding: '0.5rem',
      background: 'rgba(255, 245, 242, 0.3)',
      borderRadius: '12px'
    },
    roleOption: {
      flex: 1,
      padding: '0.75rem',
      textAlign: 'center',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '500'
    },
    roleOptionActive: {
      background: 'linear-gradient(135deg, #F5BABB, #F5BABB)',
      color: '#064232',
      boxShadow: '0 2px 8px rgba(6, 66, 50, 0.2)'
    },
    roleOptionInactive: {
      background: 'transparent',
      color: '#065a34'
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
    inputError: {
      borderColor: '#dc2626'
    },
    errorMessage: {
      color: '#dc2626',
      fontSize: '0.8rem',
      marginTop: '0.25rem'
    },
    adminCodeContainer: {
      background: 'rgba(249, 250, 251, 0.8)',
      border: '1px solid rgba(6, 90, 52, 0.2)',
      borderRadius: '12px',
      padding: '1rem',
      marginTop: '0.5rem'
    },
    adminCodeNote: {
      fontSize: '0.8rem',
      color: '#065a34',
      marginBottom: '0.5rem',
      fontStyle: 'italic'
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      margin: '0.5rem 0'
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
            Create your account to get started. Choose between user or admin access.
          </p>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <div style={styles.formContainer}>
            <h2 style={styles.title}>Sign Up</h2>
            
            {/* Role Selector */}
            <div style={styles.roleSelector}>
              <div 
                style={{
                  ...styles.roleOption,
                  ...(formData.role === 'user' ? styles.roleOptionActive : styles.roleOptionInactive)
                }}
                onClick={() => handleRoleChange('user')}
              >
                👤 User Account
              </div>
              <div 
                style={{
                  ...styles.roleOption,
                  ...(formData.role === 'admin' ? styles.roleOptionActive : styles.roleOptionInactive)
                }}
                onClick={() => handleRoleChange('admin')}
              >
                👑 Admin Account
              </div>
            </div>

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
                  placeholder="Password (minimum 6 characters)"
                  required
                />
                {errors.password && (
                  <div style={styles.errorMessage}>{errors.password}</div>
                )}
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
                  placeholder="Confirm Password"
                  required
                />
                {errors.confirmPassword && (
                  <div style={styles.errorMessage}>{errors.confirmPassword}</div>
                )}
              </div>

              {/* Admin Code Field */}
              {showAdminCode && (
                <div style={styles.adminCodeContainer}>
                  <div style={styles.adminCodeNote}>
                    💡 Admin verification required. Enter the admin code to continue.
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Admin Verification Code</label>
                    <input
                      type="password"
                      name="adminCode"
                      value={formData.adminCode}
                      onChange={handleInputChange}
                      style={{
                        ...styles.input,
                        ...(errors.adminCode ? styles.inputError : {})
                      }}
                      placeholder="Enter admin verification code"
                      required
                    />
                    {errors.adminCode && (
                      <div style={styles.errorMessage}>{errors.adminCode}</div>
                    )}
                  </div>
                </div>
              )}

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
                Create {formData.role === 'admin' ? 'Admin' : 'User'} Account
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