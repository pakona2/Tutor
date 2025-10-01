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
      <Navbar role="student" />
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
