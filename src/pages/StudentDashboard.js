import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import API from '../api';
import {Link} from 'react-router-dom';
import './pages.css';
import NotificationBar from '../components/NotificationBar';

function StudentDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('Welcome to your dashboard!');

  useEffect(() => {
    API.get('/tutors')
      .then((res) => {
        setTutors(res.data);
        setLoading(false);
      })
      .catch(() => {
        setTutors([]);
        setLoading(false);
      });
  }, []);

  const filteredTutors = tutors.filter((tutor) =>
    `${tutor.name} ${tutor.subject || ''}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar role="student" />
      <NotificationBar message={notification} type="info" onClose={() => setNotification('')} />
      <div className="dashboard">
        <header className="dashboard-header">
          Student Dashboard
        </header>
        <input
          type="text"
          placeholder="Search tutors by name or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <div className="cards-grid">
          <div className="card">
            <h2>Upcoming Sessions</h2>
            <p>You have 2 sessions scheduled this week.</p>
          </div>
          <div className="card">
            <h2>Available Tutors</h2>
            {loading ? (
              <p>Loading tutors...</p>
            ) : filteredTutors.length > 0 ? (
              filteredTutors.map((tutor) => (
                <div key={tutor.id} style={{marginBottom:8}}>
                  <strong>{tutor.name}</strong>
                  <div style={{color:'#888', fontSize:'0.95rem'}}>{tutor.subject || 'No subject listed'}</div>
                </div>
              ))
            ) : (
              <p>No tutors match your search.</p>
            )}
          </div>
          <div className="card">
            <h2>My Progress</h2>
            <p>Track your learning and goals.</p>
          </div>
          <div className="card">
            <h2>Session History</h2>
            <div style={{textAlign:'left', width:'100%'}}>
              {[{id:1, tutor:'Ms. Jane Doe', date:'2025-09-20', topic:'Algebra'}, {id:2, tutor:'Mr. John Smith', date:'2025-09-15', topic:'Essay Writing'}].map(session => (
                <div key={session.id} style={{marginBottom:8, borderBottom:'1px solid #eee', paddingBottom:6}}>
                  <strong>{session.tutor}</strong> <span style={{color:'#888'}}>{session.date}</span>
                  <div style={{fontSize:'0.95rem', color:'#2563eb'}}>{session.topic}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
