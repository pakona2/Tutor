{/*import React, { useState } from 'react';

function StudentProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('');
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [notifications, setNotifications] = useState(true);
  const [profilePic, setProfilePic] = useState(null);

  const handleSave = () => {
    alert('Profile saved successfully!');
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    localStorage.setItem('lang', e.target.value);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 sm:p-10">
      <div className="max-w-3x mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-10">
        <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300 text-center">Student Profile</h1>

        {/* Profile Picture 
        <div className="mb-6 text-center">
          <label className="block font-medium mb-2">Profile Picture</label>
          <input type="file" onChange={handlePicUpload} className="block mx-auto" />
          {profilePic && <p className="mt-2 text-sm text-green-500">File selected: {profilePic.name}</p>}
        </div>

        {/* Personal Info 
        <div className="space-y-4 mb-8">
          <div>
            <label className="block font-medium mb-1">Your Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 rounded-md border dark:bg-gray-700" />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 rounded-md border dark:bg-gray-700" />
          </div>
          <div>
            <label className="block font-medium mb-1">Learning Goal</label>
            <textarea value={goal} onChange={e => setGoal(e.target.value)} className="w-full p-2 rounded-md border dark:bg-gray-700" rows={3} />
          </div>
        </div>

        {/* Settings 
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Settings</h2>

          <div className="flex items-center justify-between">
            <label className="font-medium">Dark Mode</label>
            <button onClick={toggleDarkMode} className="px-3 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600">
              {darkMode ? 'Disable' : 'Enable'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">Language</label>
            <select value={language} onChange={handleLanguageChange} className="p-2 rounded border dark:bg-gray-700">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ny">Chichewa</option>
              <option value="sw">Swahili</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">Email Notifications</label>
            <input type="checkbox" checked={notifications} onChange={() => setNotifications(n => !n)} />
          </div>
        </div>

        {/* Save Button *
        <div className="mt-8 text-center">
          <button onClick={handleSave} className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
*/}


import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function StudentProfile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    goals: '',
  });
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert('Profile saved! (You can connect to backend here)');
    // TODO: Send profile data to backend API
  };

  return (
    <div>
      {/*<Navbar role="student" />*/}
      <div className="min-h-screen bg-blue-50 p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

        <div className="profile-form">
          <div style={{textAlign:'center', marginBottom:18}}>
            <img
              src={avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(profile.name)}
              alt="Avatar"
              style={{width:80, height:80, borderRadius:'50%', objectFit:'cover', boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}
            />
            <div>
              <input type="file" accept="image/*" onChange={handleAvatarChange} style={{marginTop:8}} />
            </div>
          </div>
          <label> Your Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />

          <label>What do you want to learn?</label>
          <textarea
            name="goals"
            value={profile.goals}
            onChange={handleChange}
            rows={4}
          />

          <button onClick={handleSave}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
