import React, { useState, useEffect } from 'react';
import { Heart, MessageSquare, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import '../styles/BlogPage.css';
import backgroundImage from '../assets/images/background.jpg';
import { getBlogs, likeBlog, replyBlog, createBlog, deleteReply } from '../services/api.ts';

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
            liking: false, // UI loading flag per post
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

    // optimistic update: keep a copy to rollback if needed
    const prevPosts = posts;
    const prevPost = prevPosts.find(p => p.id === id);
    if (!prevPost) return;

    // apply optimistic UI change
    setPosts(prev => prev.map(p => {
      if (p.id !== id) return p;
      const liked = !p.liked;
      const likes = liked ? p.likes + 1 : Math.max(0, p.likes - 1);
      return { ...p, liked, likes, liking: true };
    }));

    try {
      const updated = await likeBlog(id, token); // backend toggles like/unlike
      setPosts(prev => prev.map(p => p.id === id ? {
        ...p,
        likes: updated.likes,
        liked: !!updated.liked,
        liking: false
      } : p));
    } catch (err) {
      // rollback to previous post state
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

  // helper to get display name for current user
  const currentUsername = () => {
    const { user } = getAuth();
    return user?.first_name || user?.username || user?.email || null;
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
                disabled={post.liking}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: post.liking ? 'wait' : (post.liked ? 'default' : 'pointer')
                }}
                aria-pressed={!!post.liked}
              >
                <Heart size={16} style={{ color: (post.liked || post.liking) ? 'deeppink' : undefined, transition: 'color .15s' }} />
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
                  <div key={reply.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ margin: 0 }}><strong>{reply.user}:</strong> {reply.content}</p>
                    {reply.user === currentUsername() && (
                      <button
                        onClick={() => handleDeleteReply(post.id, reply.id)}
                        className="delete-reply-btn"
                        title="Delete your reply"
                      >
                        Delete
                      </button>
                    )}
                  </div>
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