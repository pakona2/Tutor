import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TutorSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Sample tutors list
  const sampleTutors = [
    { id: 1, name: 'Ms. Jane Doe', subject: 'Mathematics' },
    { id: 2, name: 'Mr. John Smith', subject: 'English Literature' },
    { id: 3, name: 'Mrs. Emily Brown', subject: 'Science' },
    { id: 4, name: 'Dr. Alex Kim', subject: 'Physics' },
    { id: 5, name: 'Prof. Sara Lee', subject: 'Poetry' }
  ];

  const filteredTutors = sampleTutors.filter((tutor) =>
    `${tutor.name} ${tutor.subject}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Find a Tutor</h1>
      <input
        type="text"
        placeholder="Search by name or subject"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{marginBottom:16, padding:8, borderRadius:8, border:'1px solid #ccc', width:'100%', maxWidth:400}}
      />
      <div>
        {filteredTutors.length > 0 ? (
          filteredTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="tutor-card"
              style={{marginBottom:16, cursor:'pointer', padding: '16px', borderRadius: '12px', boxShadow:'0 2px 12px rgba(0,0,0,0.08)', background:'#fff'}}
              onClick={() => navigate(`/messages`)}
            >
              <h2 style={{color:'#2563eb'}}>{tutor.name}</h2>
              <p style={{color:'#888'}}>Subject: {tutor.subject}</p>
              <span style={{color:'#2563eb', fontSize:'0.95rem', textDecoration:'underline'}}>Message</span>
            </div>
          ))
        ) : (
          <p>No tutors found.</p>
        )}
      </div>
    </div>
  );
};

export default TutorSearch;