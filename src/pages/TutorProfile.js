import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Messages from './Messages';

function TutorProfile() {
  const { tutorId } = useParams();
  // For demo, just show tutorId and a message box
  return (
    <div>
      <Navbar role="tutor" />
      <div className="min-h-screen bg-gray-100 p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tutor Profile</h1>
        <div className="profile-form bg-white p-6 rounded shadow-md">
          <div style={{ textAlign: 'center', marginBottom: 18 }}>
            <img
              src={'https://ui-avatars.com/api/?name=Tutor+' + tutorId}
              alt="Avatar"
              style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
            />
          </div>
          <div style={{marginBottom: 18}}>
            <strong>Tutor ID:</strong> {tutorId}
          </div>
          <Messages tutorId={tutorId} />
        </div>
      </div>
    </div>
  );
}

export default TutorProfile;
