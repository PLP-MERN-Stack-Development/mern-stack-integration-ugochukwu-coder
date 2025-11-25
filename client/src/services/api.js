const API_BASE = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // store your JWT after login
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const postService = {
  // Get all posts (public)
  getPosts: async () => {
    const response = await fetch(`${API_BASE}/posts`);
    return response.json();
  },

  // Get single post (public)
  getPost: async (id) => {
    const response = await fetch(`${API_BASE}/posts/${id}`);
    return response.json();
  },

  // Create post (requires auth)
  createPost: async (postData) => {
    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(postData)
    });
    if (!response.ok) throw new Error('Unauthorized or failed to create post');
    return response.json();
  },

  // Update post (requires auth)
  updatePost: async (id, postData) => {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(postData)
    });
    if (!response.ok) throw new Error('Unauthorized or failed to update post');
    return response.json();
  },

  // Delete post (requires auth)
  deletePost: async (id) => {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Unauthorized or failed to delete post');
    return response.json();
  }
};
