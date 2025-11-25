import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold mb-2 sm:mb-0">
          BlogApp
        </Link>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/" className="hover:underline transition">
            Home
          </Link>
          <Link to="/create" className="hover:underline transition">
            Create Post
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
