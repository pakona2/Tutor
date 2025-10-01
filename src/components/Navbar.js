import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import logo from '../assets/image.png'; // Adjust the path if needed

function Navbar({ role }) {

  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(() => localStorage.getItem('darkMode') === 'true');

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const toggleDarkMode = () => setDarkMode(dm => !dm);

  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}> 
      <div className="navbar-left">
        <Link to={role === 'tutor' ? '/tutor-dashboard' : '/student-dashboard'} className="navbar-logo">MyTeacher App</Link>
      </div>
      <div className="navbar-right desktop-menu">
        <button onClick={toggleDarkMode} className="navbar-link" style={{marginRight:12}}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <Link to="/help" className="navbar-link" style={{marginRight:12}}>Help Center</Link>
        {role === 'tutor' && (
          <>
            <Link to={`/tutor-profile/${localStorage.getItem('tutor_id') || 'demo-tutor'}`} className="navbar-link">Profile</Link>
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
      <div className="navbar-mobile-menu">
        <button className="navbar-hamburger" onClick={() => setMenuOpen(m => !m)}>
          <span style={{fontSize:'2rem'}}>&#9776;</span>
        </button>
        {menuOpen && (
          <div className="navbar-dropdown">
            <button onClick={toggleDarkMode} className="navbar-link" style={{marginBottom:8}}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <Link to="/help" className="navbar-link" style={{marginBottom:8}} onClick={()=>setMenuOpen(false)}>Help Center</Link>
            {role === 'tutor' && (
              <Link to={`/tutor-profile/${localStorage.getItem('tutor_id') || 'demo-tutor'}`} className="navbar-link" style={{marginBottom:8}} onClick={()=>setMenuOpen(false)}>Profile</Link>
            )}
            {role === 'student' && (
              <Link to="/student-profile" className="navbar-link" style={{marginBottom:8}} onClick={()=>setMenuOpen(false)}>Profile</Link>
            )}
            <button onClick={() => {handleLogout(); setMenuOpen(false);}} className="navbar-logout">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
