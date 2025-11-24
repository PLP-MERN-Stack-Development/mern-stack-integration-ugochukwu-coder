const API_BASE = '/api';

export const postService = {
  // Get all posts
  getPosts: async () => {
    const response = await fetch(`${API_BASE}/posts`);
    return response.json();
  },

  // Get single post
  getPost: async (id) => {
    const response = await fetch(`${API_BASE}/posts/${id}`);
    return response.json();
  },

  // Create post
  createPost: async (postData) => {
    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
    return response.json();
  },

  // Update post
  updatePost: async (id, postData) => {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
    return response.json();
  },

  // Delete post
  deletePost: async (id) => {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};