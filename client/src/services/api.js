const API_BASE = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const postService = {
  getPosts: async () => (await fetch(`${API_BASE}/posts`)).json(),
  getPost: async (id) => (await fetch(`${API_BASE}/posts/${id}`)).json(),

  createPost: async (postData) => {
    const res = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(postData),
    });
    if (!res.ok) throw new Error('Unauthorized or failed to create post');
    return res.json();
  },

  updatePost: async (id, postData) => {
    const res = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(postData),
    });
    if (!res.ok) throw new Error('Unauthorized or failed to update post');
    return res.json();
  },
  
  deletePost: async (id) => {
    const res = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Unauthorized or failed to delete post');
    return res.json();
  },
};
