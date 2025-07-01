import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await API.post('/users/login', { email, password });
      setApiKey(res.data.apiKey);
      localStorage.setItem('apiKey', res.data.apiKey);
      navigate('/products');
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: err.response?.data?.error || 'Login failed',
      });
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login Form</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account?</span>
          <button
            onClick={goToRegister}
            className="ml-2 text-blue-600 hover:underline font-medium"
            type="button"
          >
            Register
          </button>
        </div>

        {apiKey && (
          <div className="mt-6 bg-green-50 text-green-700 p-4 rounded-md text-sm">
            Your API Key:
            <pre className="mt-1 text-xs break-words">{apiKey}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
