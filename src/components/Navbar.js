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
  const [lang, setLang] = React.useState(localStorage.getItem('lang') || 'en');
  const handleLangChange = (e) => {
    setLang(e.target.value);
    localStorage.setItem('lang', e.target.value);
    window.location.reload();
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}> 
      <div className="navbar-left">
        <Link to={role === 'tutor' ? '/tutor-dashboard' : '/student-dashboard'} className="navbar-logo">Home</Link>
        {role === 'tutor' && (
          <>
            <Link to="/tutor-sessions" className="navbar-link">Sessions</Link>
            <Link to="/tutor-upload" className="navbar-link">Tutorials</Link>
          </>
        )}
        {role === 'student' && (
          <>
          <Link to="/book-session" className="navbar-link">Book Session</Link>
          <Link to="/student-tutorials" className="navbar-link">Tutorials</Link>
          </>
        )}
      </div>
     {/*<div className="navbar-right desktop-menu">
        <button onClick={toggleDarkMode} className="navbar-link" style={{marginRight:12}}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <Link to="/help" className="navbar-link" style={{marginRight:12}}>Help</Link>
        {role === 'tutor' && (
          <>
            <Link to={`/tutor-profile/${localStorage.getItem('tutor_id') || 'demo-tutor'}`} className="navbar-link">Profile</Link>
          </>
        )}
        {role === 'student' && (
          <>
            <Link to="/student-profile" className="navbar-link">Profile</Link>
          </>
        )}
        <button onClick={handleLogout} className="navbar-logout">Logout</button>
      </div>*/}
        <div className="navbar-right desktop-menu">
          <select value={lang} onChange={handleLangChange} className="navbar-link" style={{marginRight:12,padding:'4px 8px',borderRadius:6}}>
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
            <option value="ny">Chichewa</option>
            <option value="sw">Swahili</option>
          </select>
          <Link to="/referral" className="navbar-link" style={{marginRight:12}}>Referral Program</Link>
          <button onClick={toggleDarkMode} className="navbar-link" style={{marginRight:12}}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <Link to="/help" className="navbar-link" style={{marginRight:12}}>Help Center</Link>
          {role === 'tutor' && (
            <>
              <Link to={`/tutor-profile/${localStorage.getItem('tutor_id') || 'demo-tutor'}`} className="navbar-link">Profile</Link>
            </>
          )}
          {role === 'student' && (
            <>
              <Link to="/student-profile" className="navbar-link">Profile</Link>
            </>
          )}
          <button onClick={handleLogout} className="navbar-logout">Logout</button>
        </div>
      <div className="navbar-mobile-menu">
        
        
        <button className="navbar-hamburger" onClick={() => setMenuOpen(m => !m)}>
          <span style={{fontSize:'2rem'}}>&#9776;</span>
        </button>
        {menuOpen && (
          <div className="navbar-dropdown" style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,41,59,0.98)',zIndex:9999,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <Link to="/help" className="navbar-link" style={{marginBottom:16,fontSize:'1.2rem',color:'#fff'}} onClick={()=>setMenuOpen(false)}>Help Center</Link>
            <Link to="/referral" className="navbar-link" style={{marginBottom:16,fontSize:'1.2rem',color:'#fff'}} onClick={()=>setMenuOpen(false)}>Referral Program</Link>
            {role === 'tutor' && (
              <Link to={`/tutor-profile/${localStorage.getItem('tutor_id') || 'demo-tutor'}`} className="navbar-link" style={{marginBottom:16,fontSize:'1.2rem',color:'#fff'}} onClick={()=>setMenuOpen(false)}>Profile</Link>
            )}
            {role === 'student' && (
              <Link to="/student-profile" className="navbar-link" style={{marginBottom:16,fontSize:'1.2rem',color:'#fff'}} onClick={()=>setMenuOpen(false)}>Profile</Link>
            )}
            <select value={lang} onChange={handleLangChange} className="navbar-link" style={{marginBottom:16,padding:'8px 16px',borderRadius:8,fontSize:'1.1rem'}}>
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
              <option value="ny">Chichewa</option>
              <option value="sw">Swahili</option>
            </select>
            <button onClick={toggleDarkMode} className="navbar-link" style={{marginBottom:16,fontSize:'1.2rem',color:'#fff'}}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button onClick={() => {handleLogout(); setMenuOpen(false);}} className="navbar-logout" style={{marginBottom:16,fontSize:'1.2rem',color:'#fff'}}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
