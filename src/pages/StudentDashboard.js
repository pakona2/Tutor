import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import API from '../api';
import { Link, useNavigate } from 'react-router-dom';
import './pages.css';
import NotificationBar from '../components/NotificationBar';

function StudentDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState('Welcome to your dashboard!');
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  // Progress tracker state
  const [goals, setGoals] = useState(() => {
    // Load from localStorage or use default
    return JSON.parse(localStorage.getItem('student_goals') || '[]');
  });
  const [goalInput, setGoalInput] = useState('');

  // Sample tutors list
  const sampleTutors = [
    { id: 1, name: 'Ms. Jane Doe', subject: 'Mathematics' },
    { id: 2, name: 'Mr. John Smith', subject: 'English Literature' },
    { id: 3, name: 'Mrs. Emily Brown', subject: 'Science' },
    { id: 4, name: 'Dr. Alex Kim', subject: 'Physics' },
    { id: 5, name: 'Prof. Sara Lee', subject: 'Poetry' }
  ];

  const filteredTutors = sampleTutors.filter((tutor) =>
    `${tutor.name} ${tutor.subject}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Upcoming sessions sample
  const upcomingSessions = [
    {id:1, tutor:'Ms. Jane Doe', date:'2025-10-03', time:'10:00', topic:'Algebra', attended: false},
    {id:2, tutor:'Mr. John Smith', date:'2025-10-05', time:'14:00', topic:'Essay Writing', attended: false}
  ];

  // Add a new goal
  const handleAddGoal = () => {
    if (!goalInput.trim()) return;
    const updated = [...goals, { text: goalInput, completed: false }];
    setGoals(updated);
    localStorage.setItem('student_goals', JSON.stringify(updated));
    setGoalInput('');
  };

  // Mark goal as completed
  const handleToggleGoal = idx => {
    const updated = goals.map((g, i) => i === idx ? { ...g, completed: !g.completed } : g);
    setGoals(updated);
    localStorage.setItem('student_goals', JSON.stringify(updated));
  };

  // Notification for upcoming sessions within 24 hours
  useEffect(() => {
    const now = new Date();
    const soonSession = upcomingSessions.find(s => {
      const sessionDate = new Date(`${s.date}T${s.time}`);
      return sessionDate - now < 24*60*60*1000 && sessionDate - now > 0;
    });
    if (soonSession) {
      setNotification(`Reminder: You have a session with ${soonSession.tutor} on ${soonSession.date} at ${soonSession.time}`);
      setPopup(`Upcoming session: ${soonSession.topic} with ${soonSession.tutor} at ${soonSession.time}`);
      setTimeout(() => setPopup(null), 6000);
    }
  }, []);

  // Notification for new messages (demo: show popup if there are messages in localStorage)
  useEffect(() => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('messages_'));
    let newMsg = false;
    keys.forEach(k => {
      const msgs = JSON.parse(localStorage.getItem(k) || '[]');
      if (msgs.length > 0) newMsg = true;
    });
    if (newMsg) {
      setPopup('You have new messages!');
      setTimeout(() => setPopup(null), 6000);
    }
  }, []);

  return (
    <div>
      <Navbar role="student" />
      {/* NotificationBar always visible, fallback message if none */}
      <NotificationBar message={notification || 'No reminders at this time.'} type="info" onClose={() => setNotification('')} />
      {/* Persistent popup for reminders */}
      {popup && (
        <div style={{position:'fixed', top:80, right:24, zIndex:9999, background:'#fffbe6', color:'#fbbf24', border:'2px solid #fbbf24', borderRadius:10, padding:'16px 24px', fontWeight:'bold', fontSize:'1.1rem', boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
          {popup}
        </div>
      )}
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
        <button type="submit" className="button" style={{marginTop:8, marginBottom:16}}>Search</button>
        <div className="cards-grid">
          <div className="card">
            <h2>Upcoming Sessions</h2>
            {/* Interactive upcoming sessions list */}
            <div style={{width:'100%', textAlign:'left'}}>
              {[
                {id:1, tutor:'Ms. Jane Doe', date:'2025-10-03', time:'10:00', topic:'Algebra', attended: false},
                {id:2, tutor:'Mr. John Smith', date:'2025-10-05', time:'14:00', topic:'Essay Writing', attended: false}
              ].map((session, idx) => (
                <div key={session.id} style={{marginBottom:12, borderBottom:'1px solid #eee', paddingBottom:8, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <div>
                    <strong>{session.tutor}</strong> <span style={{color:'#888'}}>{session.date} {session.time}</span>
                    <div style={{fontSize:'0.95rem', color:'#2563eb'}}>{session.topic}</div>
                  </div>
                  <button
                    className="button"
                    style={{padding:'6px 12px', fontSize:'0.95rem', background:'#22c55e', color:'#fff', borderRadius:6, marginLeft:8}}
                    disabled={session.attended}
                  >
                    {session.attended ? 'Attended' : 'Mark Attended'}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h2>Available Tutors</h2>
            <button
              className="button"
              style={{width:'100%', padding:'12px', fontSize:'1rem'}}
              onClick={() => navigate('/tutor-search')}
            >
              Find Tutors
            </button>
          </div>
          <div className="card">
            <h2>My Progress</h2>
            {/* Progress Bar Visualization */}
            <div style={{width:'100%', marginBottom:12}}>
              {goals.length > 0 && (
                <div style={{marginBottom:8}}>
                  <div style={{height:18, background:'#e5e7eb', borderRadius:10, overflow:'hidden', position:'relative'}}>
                    <div style={{
                      width: `${Math.round(100 * goals.filter(g => g.completed).length / goals.length)}%`,
                      background:'#2563eb',
                      height:'100%',
                      borderRadius:10,
                      transition:'width 0.3s'
                    }}></div>
                    <span style={{position:'absolute', left:'50%', top:0, transform:'translateX(-50%)', color:'#fff', fontWeight:'bold', fontSize:'0.95rem'}}>
                      {Math.round(100 * goals.filter(g => g.completed).length / goals.length)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div style={{width:'100%', textAlign:'left'}}>
              <ul style={{marginBottom:12, paddingLeft:0}}>
                {goals.length === 0 ? (
                  <li style={{color:'#888'}}>No goals yet.</li>
                ) : (
                  goals.map((goal, idx) => (
                    <li key={idx} style={{marginBottom:8, display:'flex', alignItems:'center'}}>
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() => handleToggleGoal(idx)}
                        style={{marginRight:8}}
                      />
                      <span style={{textDecoration: goal.completed ? 'line-through' : 'none', color: goal.completed ? '#888' : '#222'}}>{goal.text}</span>
                    </li>
                  ))
                )}
              </ul>
              <div style={{display:'flex', gap:8}}>
                <input
                  type="text"
                  value={goalInput}
                  onChange={e => setGoalInput(e.target.value)}
                  placeholder="Add a new goal..."
                  style={{flex:1, padding:'8px', borderRadius:8, border:'1px solid #cbd5e1'}}
                />
                <button className="button" style={{padding:'8px 16px', width:'auto'}} onClick={handleAddGoal}>Add</button>
              </div>
            </div>
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
        {/* Removed direct Messages chat from dashboard. Messaging is now per tutor profile. */}
      </div>
    </div>
  );
}

export default StudentDashboard;
