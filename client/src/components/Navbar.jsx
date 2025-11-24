import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">BlogApp</Link>
        <div>
          <Link to="/" className="mx-2 hover:underline">Home</Link>
          <Link to="/create" className="mx-2 hover:underline">Create Post</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;