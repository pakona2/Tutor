import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/image.png';
import API from '../api';
import './pages.css';

function Register() {
  const [formData, setFormData] = useState({
    role: 'student',
    fullName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Simulate registration without backend
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({
      email: formData.email,
      password: formData.password,
      name: formData.fullName,
      role: formData.role
    });
    localStorage.setItem('users', JSON.stringify(users));
    setTimeout(() => {
      setError('');
      navigate('/login', { state: { registrationSuccess: true } });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <img src={logo} alt="App Logo" className="logo" />
        <h2 className="title">Create Account</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="input"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            className="input"
            value={formData.password}
            onChange={handleChange}
            minLength="6"
            required
          />

          <select
            name="role"
            className="input"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>

          <button type="submit" disabled={isSubmitting} className="button">
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p>
          Already have an account?{' '}
          <Link to="/Login" className="link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;