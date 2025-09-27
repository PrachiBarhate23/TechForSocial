import React, { useState } from 'react';
import { Heart, MessageSquare, Plus, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/footer';
import '../styles/BlogPage.css';
import backgroundImage from '../assets/images/background.jpg';

const mockUsers = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank'];

const getRandomUser = () => mockUsers[Math.floor(Math.random() * mockUsers.length)];

const initialPosts = [
  {
    id: 1,
    title: "My First Post",
    content: "Excited to join this community! Looking forward to learning and sharing.",
    likes: 3,
    replies: [
      { id: 11, content: "Welcome! Glad to have you here.", user: "Bob" },
      { id: 12, content: "Looking forward to your posts!", user: "Charlie" }
    ],
    showReplyBox: false,
    replyContent: '',
    user: "Alice"
  },
  {
    id: 2,
    title: "Tips for Online Learning",
    content: "I found that setting a schedule and taking short breaks helps a lot.",
    likes: 5,
    replies: [
      { id: 21, content: "Totally agree! Consistency is key.", user: "David" }
    ],
    showReplyBox: false,
    replyContent: '',
    user: "Eva"
  },
  {
    id: 3,
    title: "Favorite Coding Resources",
    content: "I love freeCodeCamp and YouTube tutorials for learning new languages.",
    likes: 2,
    replies: [],
    showReplyBox: false,
    replyContent: '',
    user: "Frank"
  }
];

const BlogPage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', user: getRandomUser() });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const addPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    const post = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      likes: 0,
      replies: [],
      showReplyBox: false,
      replyContent: '',
      user: newPost.user
    };
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', user: getRandomUser() });
    setShowNewPostForm(false);
  };

  const cancelPost = () => {
    setNewPost({ title: '', content: '', user: getRandomUser() });
    setShowNewPostForm(false);
  };

  const likePost = (id) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const toggleReplyBox = (id) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, showReplyBox: !p.showReplyBox } : p));
  };

  const handleReplyChange = (id, value) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, replyContent: value } : p));
  };

  const addReply = (id) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id && p.replyContent.trim()) {
        return {
          ...p,
          replies: [...p.replies, { id: Date.now(), content: p.replyContent, user: getRandomUser() }],
          replyContent: '',
          showReplyBox: false
        };
      }
      return p;
    }));
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
              <button className="like-btn" onClick={() => likePost(post.id)}>
                <Heart size={16} /> {post.likes}
              </button>
              <button className="reply-btn" onClick={() => toggleReplyBox(post.id)}>
                <MessageSquare size={16} /> Reply
              </button>
            </div>

            {post.showReplyBox && (
              <div className="reply-box">
                <textarea
                  rows={2}
                  value={post.replyContent}
                  onChange={(e) => handleReplyChange(post.id, e.target.value)}
                  placeholder="Write a reply..."
                />
                <div className="reply-actions">
                  <button className="cancel-btn" onClick={() => cancelReply(post.id)}><X size={16}/> Cancel</button>
                  <button className="submit-btn" onClick={() => addReply(post.id)}><Plus size={16}/> Reply</button>
                </div>
              </div>
            )}

            {post.replies.length > 0 && (
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
