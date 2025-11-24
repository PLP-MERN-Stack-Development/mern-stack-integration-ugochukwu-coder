import { useState } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';

const PostList = () => {
  const { data: posts, loading, error } = useApi('/api/posts');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Post
        </Link>
      </div>
      
      <input
        type="text"
        placeholder="Search posts..."
        className="w-full p-2 border rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid gap-6">
        {filteredPosts?.map(post => (
          <div key={post._id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">
              <Link to={`/posts/${post._id}`} className="hover:text-blue-600">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">
              {post.content.substring(0, 200)}...
            </p>
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