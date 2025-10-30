import React, { useState, useEffect } from 'react';
import { Heart, MessageSquare, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import '../styles/BlogPage.css';
import backgroundImage from '../assets/images/background.jpg';
import { getBlogs, likeBlog, replyBlog } from '../services/api.ts';

const BlogPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

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
            showReplyBox: false,
            replyContent: '',
            user: b.user || 'Unknown',
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

  const addPost = async () => {
    const { user } = getAuth();
    const author = user?.username || user?.email || 'Anonymous';
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    const post = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      likes: 0,
      replies: [],
      showReplyBox: false,
      replyContent: '',
      user: author,
    };
    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '' });
    setShowNewPostForm(false);
  };

  const cancelPost = () => {
    setNewPost({ title: '', content: '' });
    setShowNewPostForm(false);
  };

  const handleLike = async (id) => {
    const { token } = getAuth();
    if (!token) {
      if (window.confirm('You must be logged in to like a post. Go to login?')) navigate('/login');
      return;
    }
    try {
      const updated = await likeBlog(id, token);
      setPosts(prev => prev.map(p => p.id === id ? {
        ...p,
        likes: updated.likes,
        liked: true
      } : p));
    } catch (err) {
      if (err?.response?.status === 400) {
        // already liked
        setPosts(prev => prev.map(p => p.id === id ? { ...p, liked: true } : p));
        alert(err?.response?.data?.detail || 'You have already liked this post');
        return;
      }
      console.error('Like failed', err);
      alert('Failed to like post');
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

  const cancelReply = (id) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, replyContent: '', showReplyBox: false } : p));
  };

  return (
    <div className="blog-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Header />
      <div className="blog-container">
        <div className="blog-header">
          <h1>Community Forum</h1>
          <p>Share your experiences, like posts, and reply to others!</p>
          <button className="new-post-btn" onClick={() => setShowNewPostForm(!showNewPostForm)}>
            <Plus size={16} /> New Post
          </button>
        </div>

        {showNewPostForm && (
          <div className="new-post-form">
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              placeholder="Post Title"
            />
            <textarea
              name="content"
              value={newPost.content}
              onChange={handleInputChange}
              rows={4}
              placeholder="Share your experience..."
            />
            <div className="form-actions">
              <button className="cancel-btn" onClick={cancelPost}><X size={16}/> Cancel</button>
              <button className="submit-btn" onClick={addPost}><Plus size={16}/> Post</button>
            </div>
          </div>
        )}

        {posts.map(post => (
          <div className="blog-card" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p className="post-user">Posted by: {post.user}</p>

            <div className="post-actions">
              <button
                className="like-btn"
                onClick={() => handleLike(post.id)}
                disabled={!!post.liked}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: post.liked ? 'default' : 'pointer' }}
                aria-pressed={!!post.liked}
              >
                <Heart size={16} style={{ color: post.liked ? 'deeppink' : undefined }} />
                <span>{post.likes}</span>
              </button>

              <button className="reply-btn" onClick={() => toggleReplyBox(post.id)}>
                <MessageSquare size={16} /> Reply
              </button>
            </div>

            {post.showReplyBox && (
              <div className="reply-box">
                <textarea
                  rows={2}
                  value={post.replyContent || ''}
                  onChange={(e) => handleReplyChange(post.id, e.target.value)}
                  placeholder="Write a reply..."
                />
                <div className="reply-actions">
                  <button className="cancel-btn" onClick={() => cancelReply(post.id)}><X size={16}/> Cancel</button>
                  <button className="submit-btn" onClick={() => handleReplySubmit(post.id)}><Plus size={16}/> Reply</button>
                </div>
              </div>
            )}

            {post.replies && post.replies.length > 0 && (
              <div className="replies">
                {post.replies.map(reply => (
                  <p key={reply.id}><strong>{reply.user}:</strong> {reply.content}</p>
                ))}
              </div>
            )}
          </div>
        ))}

        {posts.length === 0 && (
          <p className="no-posts">No posts yet. Be the first to share your experience!</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;    