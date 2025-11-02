import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, X, Save, Plus, Edit, Trash2, Award, Users, Calendar, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/footer';

// Mock background - replace with your actual image
const backgroundPattern = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

// Sample projects data
const sampleProjects = [
  {
    id: 1,
    title: 'AutoBuddys',
    description: 'AI-powered mobile application providing therapeutic activities, progress tracking, and personalized learning modules for children with autism spectrum disorder. Includes caregiver dashboards, behavioral analysis, and communication tools to support developmental milestones.',
    teamName: 'Autism Care Team',
    websiteLink: 'https://autobuddys.in',
    tags: ['Mobile App', 'AI', 'Healthcare', 'Machine Learning'],
    category: 'Mobile App',
    publications: [
      'AutoBuddys: An AI-Based Therapeutic Mobile Application for Children with Autism Spectrum Disorder - IEEE Conference 2023',
      'Behavioral Pattern Recognition in Autism Care Using Deep Learning - Journal of Medical AI 2024'
    ],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop',
    stats: { users: '500+', impact: 'High', year: '2023' }
  },
  {
    id: 2,
    title: 'IoT Elderly Monitoring System',
    description: 'Real-time health monitoring system using IoT sensors for elderly care. Tracks vital signs, detects falls, monitors medication adherence, and provides emergency alerts to caregivers and medical professionals. Includes predictive analytics for health deterioration.',
    teamName: 'Senior Care Innovation Lab',
    websiteLink: 'https://eldercare.techforsocial.com',
    tags: ['IoT', 'Healthcare', 'Emergency Response', 'Sensors'],
    category: 'IoT',
    publications: [
      'IoT-Based Fall Detection and Health Monitoring for Elderly Care - International Journal of IoT 2023',
      'Predictive Analytics in Elderly Healthcare Systems - Smart Health Conference 2024'
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop',
    stats: { users: '200+', impact: 'Critical', year: '2023' }
  },
  {
    id: 3,
    title: 'DermaLens',
    description: 'AI-powered skin disease detection system that predicts 30+ conditions using deep learning and computer vision. Connects patients with dermatologists through integrated telemedicine platform for remote consultations and treatment planning.',
    teamName: 'Medical AI Research Group',
    websiteLink: 'https://dermalens.techforsocial.com',
    tags: ['AI', 'Telemedicine', 'Computer Vision', 'Deep Learning'],
    category: 'Machine Learning',
    publications: [
      'Deep Learning Approaches for Skin Disease Classification - Medical Imaging Journal 2023',
      'Telemedicine Integration in AI-Powered Dermatology - Healthcare Technology Review 2024'
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop',
    stats: { users: '1000+', impact: 'High', year: '2023' }
  },
  {
    id: 4,
    title: 'Women Empowerment Platform',
    description: 'Digital platform providing skill development courses, entrepreneurship mentorship, financial literacy training, and networking opportunities. Includes job matching, micro-lending connections, safety features, and community support systems.',
    teamName: 'Social Impact Development Team',
    websiteLink: 'https://empower.techforsocial.com',
    tags: ['Web App', 'Education', 'Empowerment', 'Social Impact'],
    category: 'Web App',
    publications: [
      'Digital Platforms for Women Entrepreneurship Development - Social Innovation Journal 2024',
      'Technology-Enabled Financial Literacy Programs - Economic Empowerment Review 2023'
    ],
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
    stats: { users: '300+', impact: 'High', year: '2024' }
  },
  {
    id: 5,
    title: 'Smart Education Analytics',
    description: 'Data-driven learning management system with AI-powered personalized recommendations, student performance analytics, engagement tracking, and adaptive learning paths. Helps educators identify at-risk students early and provide targeted interventions.',
    teamName: 'EdTech Innovation Lab',
    websiteLink: 'https://eduanalytics.techforsocial.com',
    tags: ['EdTech', 'Analytics', 'AI', 'Machine Learning'],
    category: 'Machine Learning',
    publications: [
      'Predictive Analytics in Student Performance Management - Educational Technology Journal 2023',
      'AI-Driven Personalized Learning Systems - Learning Sciences Conference 2024'
    ],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=400&fit=crop',
    stats: { users: '20+ schools', impact: 'High', year: '2023' }
  },
  {
    id: 6,
    title: 'Community Health Tracker',
    description: 'Mobile health platform for rural communities enabling disease surveillance, vaccination tracking, maternal health monitoring, and health education. Works offline with periodic data synchronization for areas with limited connectivity.',
    teamName: 'Rural Healthcare Initiative',
    websiteLink: 'https://healthtracker.techforsocial.com',
    tags: ['Mobile', 'Public Health', 'Rural', 'Healthcare'],
    category: 'Mobile App',
    publications: [
      'Mobile Health Solutions for Rural Communities - Global Health Technology 2023',
      'Offline-First Healthcare Applications - mHealth Journal 2024'
    ],
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=400&fit=crop',
    stats: { users: '50+ villages', impact: 'Critical', year: '2023' }
  }
];

// Notification Component
const Notification = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      style={{
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        zIndex: 1001,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        fontSize: '0.95rem',
        fontWeight: '500',
        backdropFilter: 'blur(10px)'
      }}
    >
      {message}
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0' }}>
        <X size={18} />
      </button>
    </motion.div>
  );
};

// Project Details Modal
const ProjectDetailsModal = ({ isOpen, onClose, project, userRole, onEdit, onDelete }) => {
  if (!isOpen || !project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        backdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(226, 232, 240, 0.8)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.5rem', lineHeight: '1.2' }}>
              {project.title}
            </h2>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ 
                padding: '0.4rem 1rem', 
                backgroundColor: '#2563eb', 
                color: 'white', 
                borderRadius: '20px', 
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                {project.category}
              </span>
              {project.stats && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.9rem' }}>
                    <Users size={16} />
                    <span>{project.stats.users}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.9rem' }}>
                    <Calendar size={16} />
                    <span>{project.stats.year}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.9rem', fontWeight: '600' }}>
                    <TrendingUp size={16} />
                    <span>{project.stats.impact} Impact</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
            {userRole === 'admin' && (
              <>
                <button
                  onClick={() => { onEdit(project); onClose(); }}
                  style={{
                    padding: '0.6rem 1rem',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => { onDelete(project.id); onClose(); }}
                  style={{
                    padding: '0.6rem 1rem',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </>
            )}
            <button onClick={onClose} style={{ padding: '0.6rem', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '10px', cursor: 'pointer', color: '#475569' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Project Image */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            width: '100%',
            height: '300px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '4px', height: '24px', backgroundColor: '#2563eb', borderRadius: '2px' }} />
            About the Project
          </h3>
          <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#475569' }}>
            {project.description}
          </p>
        </div>

        {/* Team & Website */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {project.teamName && (
            <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Team
              </div>
              <div style={{ fontSize: '1rem', color: '#1a1a1a', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={18} color="#2563eb" />
                {project.teamName}
              </div>
            </div>
          )}
          {project.websiteLink && (
            <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Website
              </div>
              <a
                href={project.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '1rem',
                  color: '#2563eb',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
              >
                <ExternalLink size={18} />
                Visit Project
              </a>
            </div>
          )}
        </div>

        {/* Technologies */}
        {project.tags && project.tags.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '4px', height: '24px', backgroundColor: '#2563eb', borderRadius: '2px' }} />
              Technologies Used
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    padding: '0.6rem 1.25rem',
                    backgroundColor: '#eff6ff',
                    color: '#1e40af',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: '1px solid #bfdbfe'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Publications */}
        {project.publications && project.publications.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '4px', height: '24px', backgroundColor: '#2563eb', borderRadius: '2px' }} />
              Publications ({project.publications.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {project.publications.map((publication, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#f8fafc',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    borderLeft: '4px solid #2563eb'
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Award size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6', color: '#334155' }}>
                      {publication}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Project Form Modal
const ProjectFormModal = ({ isOpen, onClose, project, onSave, isEditing }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    teamName: '',
    websiteLink: '',
    tags: [],
    category: 'Web App',
    publications: []
  });
  const [newTag, setNewTag] = useState('');
  const [newPublication, setNewPublication] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        teamName: project.teamName || '',
        websiteLink: project.websiteLink || '',
        tags: project.tags || [],
        category: project.category || 'Web App',
        publications: project.publications || []
      });
    } else {
      setFormData({
        title: '',
        description: '',
        teamName: '',
        websiteLink: '',
        tags: [],
        category: 'Web App',
        publications: []
      });
    }
  }, [project]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const addPublication = () => {
    if (newPublication.trim()) {
      setFormData(prev => ({ ...prev, publications: [...prev.publications, newPublication.trim()] }));
      setNewPublication('');
    }
  };

  const removePublication = (index) => {
    setFormData(prev => ({ ...prev, publications: prev.publications.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  const inputStyle = {
    width: '100%',
    padding: '0.875rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        backdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '700px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '0.5rem' }}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1a1a1a', fontWeight: '600', fontSize: '0.9rem' }}>
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              style={inputStyle}
              required
              placeholder="Enter project title"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1a1a1a', fontWeight: '600', fontSize: '0.9rem' }}>
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
              required
              placeholder="Describe your project in detail"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1a1a1a', fontWeight: '600', fontSize: '0.9rem' }}>
                Team Name
              </label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Your team name"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1a1a1a', fontWeight: '600', fontSize: '0.9rem' }}>
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={inputStyle}
              >
                <option value="Web App">Web App</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="IoT">IoT</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Research">Research</option>
                <option value="Tools">Tools</option>
                <option value="Game">Game</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1a1a1a', fontWeight: '600', fontSize: '0.9rem' }}>
              Website Link
            </label>
            <input
              type="url"
              name="websiteLink"
              value={formData.websiteLink}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="https://example.com"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1a1a1a', fontWeight: '600', fontSize: '0.9rem' }}>
              Technologies / Tags
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
                placeholder="Add a technology"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                style={{
                  padding: '0.875rem 1.5rem',
                  backgroundColor: '#f1f5f9',
                  color: '#1a1a1a',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s'
                }}
              >
                Add
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: '#eff6ff',
                    color: '#1e40af',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    border: '1px solid #bfdbfe'
                  }}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    style={{ background: 'none', border: 'none', color: '#1e40af', cursor: 'pointer', padding: '0', display: 'flex' }}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1a1a1a', fontWeight: '600', fontSize: '0.9rem' }}>
              Publications & Research Papers
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                type="text"
                value={newPublication}
                onChange={(e) => setNewPublication(e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
                placeholder="Add publication citation"
              />
              <button
                type="button"
                onClick={addPublication}
                style={{
                  padding: '0.875rem 1.5rem',
                  backgroundColor: '#f1f5f9',
                  color: '#1a1a1a',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s'
                }}
              >
                Add
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {formData.publications.map((publication, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#f8fafc',
                    padding: '0.875rem',
                    borderRadius: '10px',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '0.75rem'
                  }}
                >
                  <span style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.5', flex: 1 }}>
                    {publication}
                  </span>
                  <button
                    type="button"
                    onClick={() => removePublication(index)}
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '0.25rem' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.875rem 1.75rem',
                backgroundColor: '#f1f5f9',
                color: '#1a1a1a',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.95rem',
                transition: 'all 0.2s'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '0.875rem 1.75rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
              }}
            >
              <Save size={18} />
              {isEditing ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Project Card
const ProjectCard = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(project)}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: isHovered ? '0 20px 40px rgba(0, 0, 0, 0.12)' : '0 4px 12px rgba(0, 0, 0, 0.08)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Image Section */}
      <div style={{
        width: '100%',
        height: '200px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#f8fafc'
      }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.3s ease'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'rgba(37, 99, 235, 0.95)',
          color: 'white',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: '600',
          backdropFilter: 'blur(10px)'
        }}>
          {project.category}
        </div>
      </div>

      {/* Content Section */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{
          fontSize: '1.35rem',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: '0.75rem',
          lineHeight: '1.3',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: '0.95rem',
          color: '#64748b',
          lineHeight: '1.6',
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flexGrow: 1
        }}>
          {project.description}
        </p>

        {/* Stats */}
        {project.stats && (
          <div style={{
            display: 'flex',
            gap: '1rem',
            padding: '0.875rem',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            marginBottom: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#64748b' }}>
              <Users size={16} color="#2563eb" />
              <span style={{ fontWeight: '600' }}>{project.stats.users}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#64748b' }}>
              <Calendar size={16} color="#2563eb" />
              <span style={{ fontWeight: '600' }}>{project.stats.year}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#10b981', fontWeight: '600' }}>
              <TrendingUp size={16} />
              <span>{project.stats.impact}</span>
            </div>
          </div>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {project.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                style={{
                  padding: '0.4rem 0.75rem',
                  backgroundColor: '#eff6ff',
                  color: '#1e40af',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  border: '1px solid #bfdbfe'
                }}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span style={{
                padding: '0.4rem 0.75rem',
                backgroundColor: '#f1f5f9',
                color: '#64748b',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          {project.teamName && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>
              <Users size={16} />
              <span>{project.teamName}</span>
            </div>
          )}
          {project.websiteLink && (
            <a
              href={project.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                color: '#25b6ebff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
            >
              Visit
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Main Projects Page
const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [projects, setProjects] = useState(sampleProjects);
  const [userRole, setUserRole] = useState('user');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '', isVisible: false });

  const categories = ['All', 'Web App', 'Machine Learning', 'IoT', 'Mobile App', 'Research', 'Tools', 'Game'];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUserRole(storedUser?.role || 'user');
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type, isVisible: true });
  };

  const hideNotification = () => {
    setNotification({ ...notification, isVisible: false });
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsFormModalOpen(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsFormModalOpen(true);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
      showNotification('Project deleted successfully', 'success');
    }
  };

  const handleSaveProject = (projectData) => {
    if (editingProject) {
      setProjects(prev =>
        prev.map(p => p.id === editingProject.id ? { ...projectData, id: editingProject.id, image: editingProject.image, stats: editingProject.stats } : p)
      );
      showNotification('Project updated successfully', 'success');
    } else {
      const newProject = {
        ...projectData,
        id: Date.now(),
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
        stats: { users: 'New', impact: 'Medium', year: new Date().getFullYear().toString() }
      };
      setProjects(prev => [...prev, newProject]);
      showNotification('Project created successfully', 'success');
    }
    setIsFormModalOpen(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fb',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Header Component */}
      <Header />
      
     {/* Header Section */}
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  style={{
    position: "relative",
    overflow: "hidden",
    padding: "4rem 5% 3rem",
    color: "#fff",
    textAlign: "center",
    borderRadius: "0 0 1.5rem 1.5rem",
  }}
>
  {/* 🌆 Background Image */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage:
        "url('https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1600&q=80')", // Unsplash: people doing social work
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "brightness(0.6)", // subtle darkening
      zIndex: 0,
    }}
  />

  {/* 💙 Blue Transparent Overlay */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "rgba(0, 129, 165, 0.55)", // translucent blue overlay
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
  filter: 'blur(60px)'
}} />
<div style={{
  position: 'absolute',
  bottom: '-30%',
  left: '-5%',
  width: '400px',
  height: '200px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.08)',
  filter: 'blur(50px)'
}} />

<div style={{ 
  maxWidth: '1280px', 
  margin: '0 auto', 
  position: 'relative', 
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  minHeight: '30vh'
}}>
  <motion.h1
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    style={{
      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
      fontWeight: '800',
      color: '#ffffff',
      marginBottom: '0.15rem',
      letterSpacing: '-0.02em',
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
    }}
  >
    Projects
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    style={{
      fontSize: '1.15rem',
      color: 'rgba(255, 255, 255, 0.9)',
      maxWidth: '600px',
      lineHeight: '1.6',
      marginBottom: '1rem'
    }}
  >
    Discover cutting-edge technology solutions creating measurable social impact across healthcare, education, and community welfare
  </motion.p>

  {userRole === 'admin' && (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleAddProject}
      style={{
        backgroundColor: '#ffffff',
        color: '#000000ff',
        border: 'none',
        borderRadius: '5px',
        padding: '1rem 1rem',
        fontSize: '1rem',
        fontWeight: '700',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.15rem',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease'
      }}
    >
      <Plus size={20} />
      Add New Project
    </motion.button>
  )}
  </div>
</motion.div>


      {/* Main Content */}
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '3rem 5%',
        backgroundImage: backgroundPattern
      }}>
        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '3rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e5e7eb'
          }}
        >
          {/* Search Bar */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative', maxWidth: '500px' }}>
              <Search
                style={{
                  position: 'absolute',
                  left: '1.25rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8'
                }}
                size={20}
              />
              <input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '3.5rem',
                  paddingRight: '1.25rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  borderRadius: '14px',
                  border: '2px solid #e5e7eb',
                  backgroundColor: '#f8fafc',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Filter by Category
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backgroundColor: selectedCategory === category ? '#2563eb' : '#f1f5f9',
                    color: selectedCategory === category ? 'white' : '#475569',
                    boxShadow: selectedCategory === category ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none'
                  }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          {[
            { label: 'Total Projects', value: projects.length, color: '#2563eb' },
            { label: 'Active Research', value: projects.filter(p => p.category === 'Research').length, color: '#7c3aed' },
            { label: 'AI/ML Projects', value: projects.filter(p => p.category === 'Machine Learning').length, color: '#059669' },
            { label: 'Live Deployments', value: projects.filter(p => p.websiteLink).length, color: '#ea580c' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              style={{
                backgroundColor: '#ffffff',
                padding: '1.5rem',
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e5e7eb',
                borderLeft: `4px solid ${stat.color}`
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: stat.color }}>
                {stat.value}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem'
          }}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={handleCardClick} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>
              No Projects Found
            </h3>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>
              Try adjusting your search terms or filters
            </p>
          </motion.div>
       )}
      </div>

      {/* Footer Component */}
      <Footer />

      {/* Modals and Notifications */}

      {/* Modals and Notifications */}
      <ProjectDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        project={selectedProject}
        userRole={userRole}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
      />

      <ProjectFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        project={editingProject}
        onSave={handleSaveProject}
        isEditing={!!editingProject}
      />

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  );
};

export default ProjectsPage;