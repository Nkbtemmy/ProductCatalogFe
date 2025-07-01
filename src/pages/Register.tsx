import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await API.post('/users/register', { name, email, password });
      setApiKey(res.data.apiKey);
      localStorage.setItem('apiKey', res.data.apiKey);
      navigate('/products');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account?</span>
          <button
            onClick={() => navigate('/login')}
            className="ml-2 text-blue-600 hover:underline font-medium"
            type="button"
          >
            Login
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

export default Register;
