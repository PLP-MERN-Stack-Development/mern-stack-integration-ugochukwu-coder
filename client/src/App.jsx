import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PostProvider } from './context/PostContext';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <PostProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/create" element={<PostForm />} />
              <Route path="/edit/:id" element={<PostForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Routes>
          </div>
        </div>
      </Router>
    </PostProvider>
  );
}

export default App;
