import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Code, Brain, Car, Bug, Hand, Gamepad2, MessageSquare, Users, Heart, Calendar, MapPin, Plus, Edit, Trash2, X, Save } from 'lucide-react';
import backgroundImage from '../assets/images/background.jpg';
// Mock Header and Footer components (you'll replace these with your actual components)
import autobuddysImg from '../assets/images/autobuddys.png';
import autismStudyImg from '../assets/images/autism-study.png';
import trackOnParkImg from '../assets/images/track-on-park.png';
import mosquitoImg from '../assets/images/mosquito.png';
import skinImg from '../assets/images/skin.png';
import signLangImg from '../assets/images/sign-language.png';
import quizImg from '../assets/images/quiz.png';
import tarangImg from '../assets/images/tarang.png';
import clixImg from '../assets/images/clix.png';
import elderlyImg from '../assets/images/elderly.png';
import physiotherapyImg from '../assets/images/physiotherapy.png';
import emotionImg from '../assets/images/quiz.png';
import autismGameImg from '../assets/images/quiz.png';

import Header from '../components/Header';
import Footer from '../components/footer';

// Project Details Modal Component
const ProjectDetailsModal = ({ isOpen, onClose, project, userRole, onEdit, onDelete }) => {
  if (!isOpen || !project) return null;

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem'
  };

  const modalContentStyle = {
    backgroundColor: 'rgba(255, 245, 242, 0.98)',
    borderRadius: '20px',
    padding: '2rem',
    width: '100%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 60px rgba(6, 66, 50, 0.3)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(245, 186, 187, 0.3)',
    position: 'relative'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    borderBottom: '2px solid rgba(245, 186, 187, 0.3)',
    paddingBottom: '1rem'
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#064232',
    margin: 0
  };

  const sectionStyle = {
    marginBottom: '1.5rem'
  };

  const sectionTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#064232',
    marginBottom: '0.5rem',
    borderLeft: '4px solid #F5BABB',
    paddingLeft: '1rem'
  };

  const contentStyle = {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: 'rgba(6, 66, 50, 0.8)',
    marginBottom: '1rem'
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        {/* Header with title and close button */}
        <div style={headerStyle}>
          <h2 style={titleStyle}>{project.title}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {userRole === 'admin' && (
              <>
                <button
                  onClick={() => {
                    onEdit(project);
                    onClose();
                  }}
                  style={{
                    background: 'rgba(86, 143, 135, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(project.id);
                    onClose();
                  }}
                  style={{
                    background: 'rgba(239, 68, 68, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'rgba(245, 186, 187, 0.8)',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem',
                cursor: 'pointer',
                color: '#064232'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Project Image */}
        <div style={sectionStyle}>
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '20px',
            overflow: 'hidden',
            margin: '0 auto 1rem',
            boxShadow: '0 8px 25px rgba(6, 66, 50, 0.15)',
            border: '3px solid rgba(245, 186, 187, 0.4)'
          }}>
            <img 
              src={project.image} 
              alt={project.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        </div>

        {/* Description */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Description</h3>
          <p style={contentStyle}>{project.description}</p>
        </div>

        {/* Team Information */}
        {project.teamName && (
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Team</h3>
            <p style={contentStyle}>{project.teamName}</p>
          </div>
        )}

        {/* Category */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Category</h3>
          <span style={{
            backgroundColor: 'rgba(86, 143, 135, 0.8)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            {project.category}
          </span>
        </div>

        {/* Technologies/Tags */}
        {project.tags && project.tags.length > 0 && (
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Technologies</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: 'rgba(49, 108, 100, 0.8)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '15px',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Website Link */}
        {project.websiteLink && (
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Website</h3>
            <a
              href={project.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#568F87',
                textDecoration: 'none',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500'
              }}
            >
              <ExternalLink size={16} />
              {project.websiteLink}
            </a>
          </div>
        )}

        {/* Publications */}
        {project.publications && project.publications.length > 0 && (
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Publications ({project.publications.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {project.publications.map((publication, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '1rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(86, 143, 135, 0.2)',
                    boxShadow: '0 2px 8px rgba(6, 66, 50, 0.1)'
                  }}
                >
                  <p style={{
                    margin: 0,
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    color: '#064232'
                  }}>
                    {publication}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Project Form Modal Component (for Add/Edit)
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addPublication = () => {
    if (newPublication.trim()) {
      setFormData(prev => ({
        ...prev,
        publications: [...prev.publications, newPublication.trim()]
      }));
      setNewPublication('');
    }
  };

  const removePublication = (index) => {
    setFormData(prev => ({
      ...prev,
      publications: prev.publications.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  const modalStyle = {
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
    padding: '1rem'
  };

  const modalContentStyle = {
    backgroundColor: 'rgba(255, 245, 242, 0.98)',
    borderRadius: '20px',
    padding: '2rem',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 60px rgba(6, 66, 50, 0.3)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(245, 186, 187, 0.3)'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '10px',
    border: '1px solid rgba(86, 143, 135, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: '#064232',
    fontSize: '1rem',
    outline: 'none',
    marginBottom: '1rem'
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#568F87',
    color: 'white'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'rgba(245, 186, 187, 0.8)',
    color: '#064232'
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#064232', margin: 0 }}>
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#064232',
              padding: '0.5rem'
            }}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#064232', fontWeight: '500' }}>
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

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#064232', fontWeight: '500' }}>
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
              required
              placeholder="Enter project description"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#064232', fontWeight: '500' }}>
                Team Name
              </label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Enter team name"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#064232', fontWeight: '500' }}>
                Category
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

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#064232', fontWeight: '500' }}>
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

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#064232', fontWeight: '500' }}>
              Tags
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                style={secondaryButtonStyle}
              >
                Add
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: 'rgba(86, 143, 135, 0.8)',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '15px',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      padding: '0',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#064232', fontWeight: '500' }}>
              Publications
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="text"
                value={newPublication}
                onChange={(e) => setNewPublication(e.target.value)}
                style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                placeholder="Add publication citation"
              />
              <button
                type="button"
                onClick={addPublication}
                style={secondaryButtonStyle}
              >
                Add
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {formData.publications.map((publication, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(86, 143, 135, 0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '0.5rem'
                  }}
                >
                  <span style={{ fontSize: '0.9rem', color: '#064232', lineHeight: '1.4', flex: 1 }}>
                    {publication}
                  </span>
                  <button
                    type="button"
                    onClick={() => removePublication(index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#064232',
                      cursor: 'pointer',
                      padding: '0.25rem'
                    }}
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
              style={secondaryButtonStyle}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={primaryButtonStyle}
            >
              <Save size={16} style={{ marginRight: '0.5rem' }} />
              {isEditing ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Notification Component
const Notification = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const notificationStyle = {
    position: 'fixed',
    top: '2rem',
    right: '2rem',
    padding: '1rem 1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(6, 66, 50, 0.2)',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)',
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: '500'
  };

  return (
    <div style={notificationStyle}>
      {message}
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          padding: '0'
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
};

// Simple Project Card Component - Only name and image
const ProjectCard = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    backgroundColor: 'rgba(251, 210, 212, 0.61)',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(6, 66, 50, 0.08)',
    border: '1px solid rgba(245, 186, 187, 0.4)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    height: '280px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)'
  };

  const cardHoverStyle = {
    ...cardStyle,
    backgroundColor: 'rgba(245, 186, 187, 0.5)',
    boxShadow: '0 8px 25px rgba(6, 66, 50, 0.15)',
    transform: 'translateY(-5px)',
    border: '1px solid rgba(245, 186, 187, 0.6)'
  };

  return (
    <div 
      style={isHovered ? cardHoverStyle : cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(project)}
    >
      {/* Image Container */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: '120px',
        height: '120px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        border: '2px solid rgba(86, 143, 135, 0.2)',
        boxShadow: '0 2px 8px rgba(6, 66, 50, 0.1)',
        overflow: 'hidden'
      }}>
        <img 
          src={project.image} 
          alt={project.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
      
      <h3 style={{
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '0',
        color: '#064232',
        lineHeight: '1.3',
        textAlign: 'center',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical'
      }}>
        {project.title}
      </h3>
    </div>
  );
};

// Main Projects Page Component
const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [projects, setProjects] = useState([]);
  const [userRole, setUserRole] = useState('user'); // This should come from your auth system
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '', isVisible: false });
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Web App', 'Machine Learning', 'IoT', 'Mobile App', 'Research', 'Tools', 'Game'];

  // Mock projects data - replace with API call
  const mockProjects = [
    {
      id: 1,
      title: 'AutoBuddys',
      description: 'Smart automotive assistant application for vehicle maintenance and diagnostics. This comprehensive platform helps users track their vehicle maintenance schedules, diagnose common issues, and connect with certified mechanics in their area.',
      tags: ['React', 'Node.js', 'MongoDB'],
      category: 'Web App',
      teamName: 'Tech Innovators',
      websiteLink: 'https://autobuddys.example.com',
      image: autobuddysImg,
      publications: [
        'AutoBuddys: A Smart Automotive Assistant. Journal of Automotive Technology, 2023.',
        'Vehicle Diagnostics Using IoT and Machine Learning. IEEE Conference on Automotive Systems, 2023.'
      ]
    },
    {
      id: 2,
      title: 'Analytical Study of Autism',
      description: 'Data analysis and research project on autism spectrum disorders with diagnostic tools. This research focuses on identifying patterns in autism spectrum disorders through advanced data analytics and machine learning techniques.',
      tags: ['Python', 'Data Science', 'Research'],
      category: 'Research',
      teamName: 'Healthcare AI Lab',
      websiteLink: '',
      image: autismStudyImg ,
      publications: [
        'F. Britto and D. R. Kalbande, "Analysis of technological advances in Autism," 2017 International Conference on Inventive Computing and Informatics (ICICI), Coimbatore, 2017, pp. 776-781'
      ]
    },
    {
      id: 3,
      title: 'Track-On-Park',
      description: 'Smart parking management system with real-time tracking and reservations. This IoT-based solution helps users find available parking spots in real-time and allows advance booking for hassle-free parking.',
      tags: ['IoT', 'React', 'Firebase'],
      category: 'IoT',
      teamName: 'Smart City Solutions',
      websiteLink: 'https://trackonpark.example.com',
      image: trackOnParkImg,
      publications: []
    },
    {
      id: 4,
      title: 'Mosquito Disease Analysis',
      description: 'Machine learning model for analyzing mosquito-borne disease patterns and prevention strategies.',
      tags: ['ML', 'Python', 'Healthcare'],
      category: 'Machine Learning',
      teamName: 'Health Analytics Team',
      websiteLink: '',
      image:  mosquitoImg,
      publications: []
    },
    {
      id: 5,
      title: 'Skin Disease Detection',
      description: 'AI-powered dermatological condition detection using computer vision and deep learning.',
      tags: ['AI', 'Computer Vision', 'Healthcare'],
      category: 'Machine Learning',
      teamName: 'Medical AI Lab',
      websiteLink: '',
      image: skinImg,
      publications: []
    },
    {
      id: 6,
      title: 'Sign Language App',
      description: 'Android application for real-time sign language recognition and translation using machine learning.',
      tags: ['Android', 'ML', 'Accessibility'],
      category: 'Mobile App',
      teamName: 'Accessibility Team',
      websiteLink: '',
      image: signLangImg,
      publications: []
    }
  ];

  // Simulate fetching user role and projects
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get user role from localStorage or JWT
       // Read from the same "user" object set by LoginTestPage
const storedUser = JSON.parse(localStorage.getItem('user'));
setUserRole(storedUser?.role || 'user'); // role is "admin" or "user"

        
        // Fetch projects from API
        setProjects(mockProjects);
      } catch (error) {
        showNotification('Failed to load projects', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setProjects(prev => prev.filter(p => p.id !== projectId));
        showNotification('Project deleted successfully', 'success');
      } catch (error) {
        showNotification('Failed to delete project', 'error');
      }
    }
  };

  const handleSaveProject = async (projectData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingProject) {
        // Update existing project
        setProjects(prev => 
          prev.map(p => p.id === editingProject.id ? { ...projectData, id: editingProject.id, image: editingProject.image } : p)
        );
        showNotification('Project updated successfully', 'success');
      } else {
        // Add new project
        const newProject = { ...projectData, id: Date.now(), image: 'https://via.placeholder.com/150' }; // Placeholder image
        setProjects(prev => [...prev, newProject]);
        showNotification('Project created successfully', 'success');
      }
      
      setIsFormModalOpen(false);
    } catch (error) {
      showNotification('Failed to save project', 'error');
    }
  };

  const pageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  const mainStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 16px'
  };

  if (loading) {
    return (
      <div style={pageStyle}>
        <Header />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          fontSize: '1.2rem',
          color: '#064232'
        }}>
          Loading projects...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <Header />
      <main style={mainStyle}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ flex: 1 }} />
            <h1 style={{ 
              fontSize: '42px', 
              fontWeight: 'bold', 
              color: '#064232', 
              textShadow: '0 1px 2px rgba(6, 66, 50, 0.1)',
              margin: 0
            }}>
              Projects Portfolio
            </h1>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              {userRole === 'admin' && (
                <button
                  onClick={handleAddProject}
                  style={{
                    backgroundColor: '#568F87',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 15px rgba(86, 143, 135, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(86, 143, 135, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(86, 143, 135, 0.3)';
                  }}
                >
                  <Plus size={16} />
                  Add Project
                </button>
              )}
            </div>
          </div>
          <p style={{ 
            fontSize: '16px', 
            color: 'rgba(6, 66, 50, 0.7)', 
            maxWidth: '500px', 
            margin: '0 auto', 
            lineHeight: '1.5' 
          }}>
            Discover innovative solutions across web development, machine learning, IoT, and healthcare technology.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', justifyContent: 'center' }}>
            {/* Search Bar */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(6, 66, 50, 0.5)' }} size={18} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  borderRadius: '25px',
                  border: '1px solid rgba(86, 143, 135, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  outline: 'none',
                  boxShadow: '0 2px 8px rgba(6, 66, 50, 0.08)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            {/* Category Filter */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: selectedCategory === category 
                      ? 'rgba(86, 143, 135, 0.9)' 
                      : 'rgba(245, 186, 187, 0.4)',
                    color: selectedCategory === category ? 'white' : '#064232',
                    boxShadow: selectedCategory === category 
                      ? '0 2px 8px rgba(86, 143, 135, 0.3)' 
                      : '0 1px 3px rgba(6, 66, 50, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={handleCardClick}
            />
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontSize: '18px', color: 'rgba(6, 66, 50, 0.6)', marginBottom: '8px' }}>No projects found</p>
            <p style={{ color: 'rgba(6, 66, 50, 0.4)', fontSize: '14px' }}>Try adjusting your search terms or filters</p>
          </div>
        )}
      </main>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        project={selectedProject}
        userRole={userRole}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
      />

      {/* Project Form Modal */}
      <ProjectFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        project={editingProject}
        onSave={handleSaveProject}
        isEditing={!!editingProject}
      />

      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />

      <Footer />
    </div>
  );
};

export default ProjectsPage;