import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Tag, Search, Filter, Heart, MessageSquare, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getBlogs, likeBlog, replyBlog, createBlog, deleteReply } from '../services/api.ts';
import Header from '../components/Header';
import Footer from '../components/footer';

const BlogsPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Healthcare', 'Technology', 'Social Impact', 'Research', 'Success Stories'];

  const getAuth = () => {
    let user = null;
    try { user = JSON.parse(localStorage.getItem('user')); } catch (e) { user = null; }
    const token = localStorage.getItem('access') || localStorage.getItem('token') || null;
    return { user, token };
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getBlogs();
        if (!mounted) return;
        setPosts(
          (data || []).map(b => ({
            id: b.id,
            title: b.title,
            content: b.content,
            likes: b.likes || 0,
            replies: b.replies || [],
            liked: !!b.liked,
            liking: false,
            showReplyBox: false,
            replyContent: '',
            user: b.user || 'Unknown',
            category: b.category || 'General',
            date: b.date || new Date().toLocaleDateString(),
            readTime: b.readTime || '5 min read',
          }))
        );
      } catch (err) {
        console.error('Failed to load blogs:', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleNewPostClick = () => {
    const { token } = getAuth();
    if (!token) {
      if (window.confirm('You must be logged in to create a post. Go to login page?')) {
        navigate('/login');
      }
      return;
    }
    setShowNewPostForm(!showNewPostForm);
  };

  const addPost = async () => {
    const { user, token } = getAuth();
    if (!token) {
      if (window.confirm('You must be logged in to post. Go to login?')) navigate('/login');
      return;
    }
    const author = user?.first_name || user?.username || user?.email || 'Anonymous';
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    try {
      const created = await createBlog({ title: newPost.title, content: newPost.content, user: author }, token);
      setPosts(prev => [{ 
        id: created.id,
        title: created.title,
        content: created.content,
        likes: created.likes || 0,
        replies: created.replies || [],
        liked: !!created.liked,
        liking: false,
        showReplyBox: false,
        replyContent: '',
        user: created.user || author,
        category: created.category || 'General',
        date: created.date || new Date().toLocaleDateString(),
        readTime: created.readTime || '5 min read',
      }, ...prev]);
      setNewPost({ title: '', content: '' });
      setShowNewPostForm(false);
    } catch (err) {
      console.error('Create post failed', err);
      alert('Failed to create post');
    }
  };

  const handleLike = async (id) => {
    const { token } = getAuth();
    if (!token) {
      if (window.confirm('You must be logged in to like a post. Go to login?')) navigate('/login');
      return;
    }

    const prevPosts = posts;
    const prevPost = prevPosts.find(p => p.id === id);
    if (!prevPost) return;

    setPosts(prev => prev.map(p => {
      if (p.id !== id) return p;
      const liked = !p.liked;
      const likes = liked ? p.likes + 1 : Math.max(0, p.likes - 1);
      return { ...p, liked, likes, liking: true };
    }));

    try {
      const updated = await likeBlog(id, token);
      setPosts(prev => prev.map(p => p.id === id ? {
        ...p,
        likes: updated.likes,
        liked: !!updated.liked,
        liking: false
      } : p));
    } catch (err) {
      setPosts(prev => prev.map(p => p.id === id ? { ...prevPost, liking: false } : p));
      if (err?.response?.status === 400) {
        alert(err?.response?.data?.detail || 'You have already liked this post');
        return;
      }
      console.error('Like failed', err);
      alert('Failed to like/unlike post');
    }
  };

  const toggleReplyBox = (id) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, showReplyBox: !p.showReplyBox } : p));
  };

  const handleReplyChange = (id, value) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, replyContent: value } : p));
  };

  const handleReplySubmit = async (id) => {
    const { token } = getAuth();
    if (!token) {
      if (window.confirm('You must be logged in to reply. Go to login?')) navigate('/login');
      return;
    }
    const post = posts.find(p => p.id === id);
    const content = (post?.replyContent || '').trim();
    if (!content) return alert('Reply cannot be empty');

    try {
      const updated = await replyBlog(id, content, token);
      setPosts(prev => prev.map(p => p.id === id ? {
        ...p,
        replies: updated.replies || p.replies,
        replyContent: '',
        showReplyBox: false
      } : p));
    } catch (err) {
      console.error('Reply failed', err);
      alert('Failed to send reply');
    }
  };

  const handleDeleteReply = async (blogId, replyId) => {
    const { token } = getAuth();
    if (!token) {
      if (window.confirm('You must be logged in to delete a reply. Go to login?')) navigate('/login');
      return;
    }
    try {
      const updated = await deleteReply(blogId, replyId, token);
      setPosts(prev => prev.map(p => p.id === blogId ? {
        ...p,
        replies: updated.replies || p.replies
      } : p));
    } catch (err) {
      console.error('Delete reply failed', err);
      alert(err?.response?.data?.detail || 'Failed to delete reply');
    }
  };

  const cancelPost = () => {
    setNewPost({ title: '', content: '' });
    setShowNewPostForm(false);
  };

  const cancelReply = (id) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, replyContent: '', showReplyBox: false } : p));
  };

  const currentUsername = () => {
    const { user } = getAuth();
    return user?.first_name || user?.username || user?.email || null;
  };

  const filteredBlogs = posts.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Healthcare': '#7c3aed',
      'Technology': '#dc2626',
      'Research': '#ea580c',
      'Success Stories': '#8b5cf6',
      'Social Impact': '#059669',
      'General': '#2563eb',
    };
    return colors[category] || '#2563eb';
  };

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      backgroundColor: '#f8f9fb',
      minHeight: '100vh',
      position: 'relative',
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(37, 99, 235, 0.04) 1px, transparent 0)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Header */}
      <Header/> 
      
      {/* Hero Section with Blue Background */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '4rem 5% 3rem',
          color: '#fff',
          textAlign: 'center',
          borderRadius: '0 0 1.5rem 1.5rem',
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)',
            zIndex: 0,
          }}
        />

        {/* Blue Transparent Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(23, 171, 201, 0.6)',
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
          filter: 'blur(60px)',
          zIndex: 1,
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '400px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          filter: 'blur(50px)',
          zIndex: 1,
        }} />

        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          position: 'relative', 
          zIndex: 2,
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
              marginBottom: '0.75rem',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
            }}
          >
            Community Forum
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: '1.15rem',
              color: 'rgba(255, 255, 255, 0.95)',
              maxWidth: '600px',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}
          >
            Share your experiences, like posts, and reply to others in our vibrant community
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNewPostClick}
            style={{
              backgroundColor: '#ffffff',
              color: '#2563eb',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease'
            }}
          >
            <Plus size={20} />
            New Post
          </motion.button>
        </div>
      </motion.div>

      {/* Content Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 5% 2rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* New Post Form */}
          {showNewPostForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e5e7eb',
                marginBottom: '2rem',
                textAlign: 'left',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '1.5rem' }}>
                Create New Post
              </h3>
              <input
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
                placeholder="Post Title"
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  fontSize: '0.95rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontFamily: 'inherit',
                  marginBottom: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <textarea
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
                rows={4}
                placeholder="Share your experience..."
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  fontSize: '0.95rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontFamily: 'inherit',
                  marginBottom: '1rem',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={cancelPost}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s',
                  }}
                >
                  <X size={16}/> Cancel
                </button>
                <button
                  onClick={addPost}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                  }}
                >
                  <Plus size={16}/> Post
                </button>
              </div>
            </motion.div>
          )}

          {/* Search and Filter Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e5e7eb'
            }}
          >
            {/* Search Bar */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ position: 'relative', maxWidth: '500px' }}>
                <Search size={20} style={{
                  position: 'absolute',
                  left: '1.25rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8',
                }} />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '3.5rem',
                    paddingRight: '1.25rem',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    fontSize: '0.95rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '14px',
                    fontFamily: 'inherit',
                    outline: 'none',
                    backgroundColor: '#f8fafc',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Filter by Category
              </div>
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
              }}>
                {categories.map(category => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      backgroundColor: selectedCategory === category ? '#2563eb' : '#f1f5f9',
                      color: selectedCategory === category ? '#ffffff' : '#475569',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: selectedCategory === category ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none',
                    }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 5% 4rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '2rem',
        }}>
          {filteredBlogs.map((post, idx) => {
            const color = getCategoryColor(post.category);
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #e5e5e5',
                  transition: 'all 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                whileHover={{
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Blog Header */}
                <div style={{
                  height: '120px',
                  background: `linear-gradient(135deg, ${color}20 0%, ${color}40 100%)`,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    padding: '0.4rem 0.875rem',
                    backgroundColor: color,
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {post.category}
                  </div>
                </div>

                {/* Blog Content */}
                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    marginBottom: '0.875rem',
                    lineHeight: 1.3,
                  }}>
                    {post.title}
                  </h3>

                  <p style={{
                    fontSize: '0.95rem',
                    color: '#525252',
                    lineHeight: 1.7,
                    marginBottom: '1.25rem',
                  }}>
                    {post.content}
                  </p>

                  <p style={{
                    fontSize: '0.85rem',
                    color: '#737373',
                    marginBottom: '1rem',
                  }}>
                    Posted by: <strong>{post.user}</strong>
                  </p>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #f0f0f0',
                    marginBottom: '1rem',
                  }}>
                    <button
                      onClick={() => handleLike(post.id)}
                      disabled={post.liking}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        fontSize: '0.9rem',
                        backgroundColor: post.liked ? '#fee2e2' : '#f8f9fb',
                        color: post.liked ? '#dc2626' : '#525252',
                        border: '1px solid',
                        borderColor: post.liked ? '#fca5a5' : '#e5e5e5',
                        borderRadius: '6px',
                        cursor: post.liking ? 'wait' : 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <Heart size={16} style={{ color: post.liked ? '#dc2626' : undefined, fill: post.liked ? '#dc2626' : 'none' }} />
                      <span>{post.likes}</span>
                    </button>

                    <button
                      onClick={() => toggleReplyBox(post.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        fontSize: '0.9rem',
                        backgroundColor: '#f8f9fb',
                        color: '#525252',
                        border: '1px solid #e5e5e5',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <MessageSquare size={16} /> Reply
                    </button>
                  </div>

                  {/* Reply Box */}
                  {post.showReplyBox && (
                    <div style={{
                      marginBottom: '1rem',
                      padding: '1rem',
                      backgroundColor: '#f8f9fb',
                      borderRadius: '8px',
                    }}>
                      <textarea
                        rows={2}
                        value={post.replyContent || ''}
                        onChange={(e) => handleReplyChange(post.id, e.target.value)}
                        placeholder="Write a reply..."
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          fontSize: '0.9rem',
                          border: '1.5px solid #e5e5e5',
                          borderRadius: '6px',
                          fontFamily: 'inherit',
                          marginBottom: '0.75rem',
                          outline: 'none',
                          resize: 'vertical',
                        }}
                      />
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => cancelReply(post.id)}
                          style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.85rem',
                            backgroundColor: '#e5e5e5',
                            color: '#525252',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                          }}
                        >
                          <X size={14}/> Cancel
                        </button>
                        <button
                          onClick={() => handleReplySubmit(post.id)}
                          style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.85rem',
                            backgroundColor: '#2563eb',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                          }}
                        >
                          <Plus size={14}/> Reply
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {post.replies && post.replies.length > 0 && (
                    <div style={{
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #f0f0f0',
                    }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#525252', marginBottom: '0.75rem' }}>
                        Replies ({post.replies.length})
                      </p>
                      {post.replies.map(reply => (
                        <div
                          key={reply.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            padding: '0.75rem',
                            backgroundColor: '#f8f9fb',
                            borderRadius: '6px',
                            marginBottom: '0.5rem',
                          }}
                        >
                          <p style={{ margin: 0, fontSize: '0.9rem', color: '#525252', flex: 1 }}>
                            <strong style={{ color: '#1a1a1a' }}>{reply.user}:</strong> {reply.content}
                          </p>
                          {reply.user === currentUsername() && (
                            <button
                              onClick={() => handleDeleteReply(post.id, reply.id)}
                              style={{
                                padding: '0.25rem 0.75rem',
                                fontSize: '0.8rem',
                                backgroundColor: '#fee2e2',
                                color: '#dc2626',
                                border: '1px solid #fca5a5',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginLeft: '0.75rem',
                              }}
                              title="Delete your reply"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Meta Info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    marginTop: 'auto',
                    fontSize: '0.85rem',
                    color: '#737373',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Calendar size={14} />
                        {post.date}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock size={14} />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            }}
          >
            <Search size={48} style={{ color: '#d4d4d4', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: '#525252', marginBottom: '0.5rem', fontWeight: '600' }}>
              No posts found
            </h3>
            <p style={{ color: '#737373' }}>
              Try adjusting your search or filter criteria, or be the first to post!
            </p>
          </motion.div>
        )}
      </section>
      
      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default BlogsPage;