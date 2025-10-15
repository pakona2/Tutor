import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBook, FaMoneyBillWave, FaBolt } from 'react-icons/fa'; // FaBolt as app symbol

function Navbar({ role }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(() => localStorage.getItem('darkMode') === 'true');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [lang, setLang] = React.useState(localStorage.getItem('lang') || 'en');
  const [clickedLink, setClickedLink] = React.useState('');
  const [showAppName, setShowAppName] = React.useState(false);

  React.useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const toggleDarkMode = () => setDarkMode(dm => !dm);

  const handleLangChange = (e) => {
    setLang(e.target.value);
    localStorage.setItem('lang', e.target.value);
    window.location.reload();
  };

  const mobileLinks = [
    { icon: <FaBook />, label: 'Book Session', to: '/book-session' },
    { icon: <FaBook />, label: 'Tutorials', to: '/student-tutorials' },
    { icon: <FaMoneyBillWave />, label: 'Payment', to: '/payment' },
  ];

  const handleMobileClick = (label) => {
    setClickedLink(label);
    setTimeout(() => setClickedLink(''), 2000);
  };

  return (
    <nav style={navbarStyle}>
      {/* Logo as symbol */}
      <div
        style={logoStyle}
        onMouseEnter={() => setShowAppName(true)}
        onMouseLeave={() => setShowAppName(false)}
        onClick={() => setShowAppName(prev => !prev)}
      >
        <Link to={role === 'tutor' ? '/tutor-dashboard' : '/student-dashboard'} style={logoLinkStyle}>
          <FaBolt size={28} title="Pakachere App" />
        </Link>
        {showAppName && (
          <span style={appNameStyle}>Pakachere</span>
        )}
      </div>

      {/* Desktop Navbar */}
      <div className="desktop-menu" style={desktopMenuStyle}>
        {role === 'student' && (
          <>
            <Link to="/book-session" style={desktopLinkStyle}><FaBook /> Book Session</Link>
            <Link to="/student-tutorials" style={desktopLinkStyle}><FaBook /> Tutorials</Link>
            <Link to="/payment" style={desktopLinkStyle}><FaMoneyBillWave /> Payment</Link>
          </>
        )}
        <Link to="/referral" style={desktopLinkStyle}>Referral</Link>
        <Link to="/help" style={desktopLinkStyle}>Help Center</Link>
        <Link to="/student-profile" style={desktopLinkStyle}>Profile</Link>
        <select value={lang} onChange={handleLangChange} style={selectStyle}>
          <option value="en">EN</option>
          <option value="es">ES</option>
          <option value="fr">FR</option>
          <option value="de">DE</option>
          <option value="ny">Chic</option>
          <option value="sw">Swah</option>
        </select>
        <button onClick={toggleDarkMode} style={buttonStyle}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
        <button onClick={handleLogout} style={buttonStyle}>Logout</button>
      </div>

      {/* Mobile Navbar */}
      <div className="mobile-menu" style={mobileMenuStyle}>
        {mobileLinks.map(link => (
          <div key={link.label} style={mobileIconWrapper}>
            <Link
              to={link.to}
              onClick={() => handleMobileClick(link.label)}
              style={mobileLinkStyle}
            >
              {link.icon}
            </Link>
            <span
              style={{
                ...mobileLabelStyle,
                opacity: clickedLink === link.label ? 1 : 0,
                transform: clickedLink === link.label ? 'translateY(-28px)' : 'translateY(0)',
                transition: 'opacity 0.3s ease, transform 0.3s ease'
              }}
            >
              {link.label}
            </span>
          </div>
        ))}

        {/* Hamburger for hidden menu */}
        <button onClick={() => setMenuOpen(m => !m)} style={hamburgerStyle}>&#9776;</button>
        {menuOpen && (
          <div style={{ ...mobileDropdownStyle, background: darkMode ? '#1e293b' : '#fff' }}>
            <Link to="/referral" style={mobileDropdownLinkStyle(darkMode)} onClick={() => setMenuOpen(false)}>Referral</Link>
            <Link to="/help" style={mobileDropdownLinkStyle(darkMode)} onClick={() => setMenuOpen(false)}>Help Center</Link>
            <Link to="/student-profile" style={mobileDropdownLinkStyle(darkMode)} onClick={() => setMenuOpen(false)}>Profile</Link>
            <select value={lang} onChange={handleLangChange} style={selectStyle}>
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
              <option value="ny">Chic</option>
              <option value="sw">Swah</option>
            </select>
            <button onClick={toggleDarkMode} style={buttonStyle}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} style={buttonStyle}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ----- Styles ----- */
const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  background: '#f9fafb',
  borderBottom: '1px solid #e5e7eb',
  position: 'relative'
};

const logoStyle = {
  flex: 1,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
};
const logoLinkStyle = { textDecoration: 'none', color: '#2563eb', display: 'flex', alignItems: 'center' };
const appNameStyle = {
  position: 'absolute',
  top: '40px',
  left: '0',
  background: '#2563eb',
  color: '#fff',
  padding: '2px 6px',
  borderRadius: 4,
  fontSize: '0.85rem',
  whiteSpace: 'nowrap',
};

const desktopMenuStyle = { display: 'flex', alignItems: 'center', gap: '1rem' };
const desktopLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem',
  textDecoration: 'none',
  color: '#222',
  fontSize: '1rem',
  padding: '6px 10px',
  borderRadius: 6,
  transition: 'all 0.2s ease',
  cursor: 'pointer'
};

const mobileMenuStyle = { display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'nowrap' };
const mobileIconWrapper = { position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' };
const mobileLinkStyle = { fontSize: '1.8rem', color: '#2563eb', textDecoration: 'none', transition: 'transform 0.2s ease' };
const mobileLabelStyle = { position: 'absolute', top: '-28px', background: '#2563eb', color: '#fff', padding: '2px 6px', borderRadius: 4, fontSize: '0.75rem', whiteSpace: 'nowrap' };
const selectStyle = { padding: '4px 8px', borderRadius: 6, margin: '0.25rem 0', cursor: 'pointer' };
const buttonStyle = { padding: '6px 12px', borderRadius: 6, cursor: 'pointer', background: '#2563eb', color: '#fff', border: 'none', margin: '0.25rem 0', transition: 'all 0.2s ease' };
const hamburgerStyle = { fontSize: '2rem', background: 'none', border: 'none', cursor: 'pointer', color: '#2563eb' };
const mobileDropdownStyle = { position: 'absolute', top: '60px', right: '16px', minWidth: '200px', borderRadius: 8, padding: '12px 0', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 9999 };
const mobileDropdownLinkStyle = (darkMode) => ({ padding: '6px 12px', color: darkMode ? '#fff' : '#222', textDecoration: 'none', fontSize: '1rem', transition: 'background 0.2s' });

export default Navbar;
