import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePost } from '../context/PostContext';
import { postService } from '../services/api';

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

  useEffect(() => {
    if (id) {
      const post = state.posts.find(p => p._id === id);
      if (post) {
        setFormData({
          title: post.title,
          content: post.content,
          author: post.author
        });
      } else {
        // If post not in context, fetch it
        postService.getPost(id)
          .then(post => {
            setFormData({
              title: post.title,
              content: post.content,
              author: post.author
            });
          })
          
          .catch(err => setError('Failed to fetch post'));
      }
    }
  }, [id, state.posts]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
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
      console.error(err.message)
      setError('Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Post' : 'Create Post'}</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded h-40"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Saving...' : (id ? 'Update' : 'Create')}
        </button>
      </form>
    </div>
  );
};

export default PostForm;