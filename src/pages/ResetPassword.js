import React, { useState } from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      setError('Please enter your email');
      return;
    }

    try {
      await API.post('/reset-password', { email });
      setMessage(`If an account with ${email} exists, a password reset link has been sent.`);
      setError('');
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link.');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Reset Password</h1>
        <p className="mb-6 text-gray-600 text-center">Enter your email address below and we'll send you a link to reset your password.</p>
        <form onSubmit={handleSubmit} className="w-full">
          <label className="block mb-2 font-semibold text-gray-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 mb-4 transition"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-6 text-green-700 font-semibold text-center">{message}</p>}
        {error && <p className="mt-6 text-red-700 font-semibold text-center">{error}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
