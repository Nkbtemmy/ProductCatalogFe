import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Products from './pages/Products';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <Router>
      <div className="bg-blue-700 text-white p-4 flex justify-center gap-6">
        <Link to="/" className="hover:underline">Home page</Link>
        <Link to="/register" className="hover:underline">Register</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/categories" className="hover:underline">Categories</Link>
        <Link to="/products" className="hover:underline">Products</Link>
      </div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/categories/:id" element={<CategoryPage />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
