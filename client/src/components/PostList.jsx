import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]); // initialize as array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts'); // uses Vite proxy
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        // ensure posts is an array
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = Array.isArray(posts)
    ? posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (loading) return <div className="text-center mt-6">Loading posts...</div>;
  if (error) return <div className="text-red-500 mt-6">Error: {error}</div>;
  if (filteredPosts.length === 0) return <div className="mt-6">No posts found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Post
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search posts..."
        className="w-full p-2 border rounded mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid gap-6">
        {filteredPosts.map(post => (
          <div key={post._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">
              <Link to={`/posts/${post._id}`} className="hover:text-blue-600">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{post.content.substring(0, 200)}...</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
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
