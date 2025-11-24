import { useParams, Link } from 'react-router-dom';
import useApi from '../hooks/useApi';

const PostDetail = () => {
  const { id } = useParams();
  const { data: post, loading, error } = useApi(`/api/posts/${id}`);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
      <div className="text-gray-500 mb-4">
        By {post?.author} on {new Date(post?.createdAt).toLocaleDateString()}
      </div>
      <p className="text-gray-700 whitespace-pre-wrap">{post?.content}</p>
      <div className="mt-6">
        <Link to="/" className="text-blue-500 hover:underline">Back to Posts</Link>
      </div>
    </div>
  );
};

export default PostDetail;