import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePost } from '../context/PostContext';
import './PostList.css';

const PostList = () => {
  const { state } = usePost(); // directly use posts from context
  const [searchTerm, setSearchTerm] = useState('');

  const posts = state.posts || [];

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!posts.length) return <div className="pl-no-posts">No posts found.</div>;

  return (
    <div className="pl-container">
      <div className="pl-header">
        <h1 className="pl-title">Blog Posts</h1>
        <Link to="/create" className="pl-create-btn">Create Post</Link>
      </div>

      <input
        type="text"
        placeholder="Search posts..."
        className="pl-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="pl-grid">
        {filteredPosts.map(post => (
          <div key={post._id} className="pl-card">
            <h2 className="pl-card-title">
              <Link to={`/posts/${post._id}`} className="pl-card-link">{post.title}</Link>
            </h2>
            <p className="pl-card-content">{post.content.substring(0, 200)}...</p>
            <div className="pl-card-footer">
              <span>By {post.author}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
