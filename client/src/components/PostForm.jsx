import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePost } from '../context/PostContext';
import { postService } from '../services/api';
import './PostForm.css';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = usePost();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch existing post if editing
  useEffect(() => {
    let isMounted = true;

    const fetchPost = async () => {
      try {
        const existingPost = state.posts.find(p => p._id === id);
        if (existingPost && isMounted) {
          setFormData({
            title: existingPost.title,
            content: existingPost.content,
            author: existingPost.author
          });
        } else if (isMounted) {
          const post = await postService.getPost(id);
          setFormData({
            title: post.title,
            content: post.content,
            author: post.author
          });
        }
      } catch (err) {
        if (isMounted) setError('Failed to fetch post');
        console.error(err);
      }
    };

    if (id) fetchPost();

    return () => { isMounted = false; };
  }, [id, state.posts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Make sure token is present
      const token = localStorage.getItem('token');
      if (!token) throw new Error('You must be logged in to create/update posts');

      let savedPost;
      if (id) {
        savedPost = await postService.updatePost(id, formData);
        dispatch({ type: 'UPDATE_POST', payload: savedPost });
      } else {
        savedPost = await postService.createPost(formData);
        dispatch({ type: 'ADD_POST', payload: savedPost });
      }

      navigate('/');
    } catch (err) {
      console.error(err.message);
      setError(err.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pf-container">
      <h1 className="pf-title">{id ? 'Edit Post' : 'Create Post'}</h1>
      {error && <div className="pf-error">{error}</div>}
      <form onSubmit={handleSubmit} className="pf-form">
        <label>
          Title
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Author
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Content
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : (id ? 'Update Post' : 'Create Post')}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
