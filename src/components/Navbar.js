import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import logo from '../assets/image.png'; // Adjust the path if needed

function Navbar({ role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to={role === 'tutor' ? '/tutor-dashboard' : '/student-dashboard'} className="navbar-logo">My Teacher App</Link>
      </div>
      <div className="navbar-right">
        {role === 'tutor' && (
          <>
            <Link to="/tutor-profile" className="navbar-link">Profile</Link>
            <Link to="/tutor-sessions" className="navbar-link">My Sessions</Link>
          </>
        )}
        {role === 'student' && (
          <>
            <Link to="/student-profile" className="navbar-link">Profile</Link>
            <Link to="/book-session" className="navbar-link">Book Session</Link>
          </>
        )}
        <button onClick={handleLogout} className="navbar-logout">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
