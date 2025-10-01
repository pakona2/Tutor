import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Messages from './Messages';

function TutorProfile() {
  const { tutorId } = useParams();
  const [reviews, setReviews] = useState(() => {
    return JSON.parse(localStorage.getItem(`reviews_${tutorId}`) || '[]');
  });
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleAddReview = () => {
    if (rating < 1 || rating > 5 || !reviewText.trim()) return;
    const updated = [...reviews, { rating, text: reviewText, date: new Date().toLocaleDateString() }];
    setReviews(updated);
    localStorage.setItem(`reviews_${tutorId}`, JSON.stringify(updated));
    setRating(0);
    setReviewText('');
  };

  const avgRating = reviews.length > 0 ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : null;

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
          {/* Editable Tutor Information */}
          <TutorInfoForm tutorId={tutorId} />
          {/* Ratings and Reviews - always visible, fallback if empty */}
          <div style={{marginBottom:24, textAlign:'left', border:'2px solid #fbbf24', borderRadius:10, background:'#fffbe6', padding:'12px'}}>
            <h3 style={{fontWeight:'bold', color:'#fbbf24', marginBottom:8, fontSize:'1.2rem'}}>Ratings & Reviews</h3>
            <div style={{marginBottom:8}}>
              <span style={{fontWeight:'bold', fontSize:'1.1rem', color:'#fbbf24'}}>
                {avgRating ? `${avgRating}/5` : 'No ratings yet'}
              </span>
              <span style={{marginLeft:12, color:'#888'}}>{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:8}}>
              {[1,2,3,4,5].map(star => (
                <span
                  key={star}
                  style={{fontSize:'1.5rem', color: rating >= star ? '#fbbf24' : '#e5e7eb', cursor:'pointer'}}
                  onClick={() => setRating(star)}
                >&#9733;</span>
              ))}
              <input
                type="text"
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Write a review..."
                style={{flex:1, padding:'8px', borderRadius:8, border:'1px solid #cbd5e1', marginLeft:8}}
              />
              <button className="button" style={{padding:'8px 16px', width:'auto'}} onClick={handleAddReview}>Submit</button>
            </div>
            <div style={{marginTop:8}}>
              {reviews.length === 0 ? (
                <div style={{color:'#888', fontWeight:'bold', fontSize:'1.05rem'}}>No reviews yet. Be the first to review this tutor!</div>
              ) : (
                reviews.map((r, idx) => (
                  <div key={idx} style={{marginBottom:12, background:'#f3f4f6', borderRadius:8, padding:'10px 14px'}}>
                    <span style={{color:'#fbbf24', fontWeight:'bold', fontSize:'1.1rem'}}>&#9733; {r.rating}</span>
                    <span style={{marginLeft:8}}>{r.text}</span>
                    <span style={{float:'right', color:'#888', fontSize:'0.95rem'}}>{r.date}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorProfile;

function TutorInfoForm({ tutorId }) {
  const defaultForm = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    subject: 'Mathematics, Physics',
    bio: 'Experienced tutor passionate about helping students succeed.',
    experience: '5',
    qualifications: 'MSc in Mathematics',
    hourlyRate: '30',
  };
  const [info, setInfo] = useState(() => {
    const stored = localStorage.getItem(`tutor_info_${tutorId}`);
    return stored ? JSON.parse(stored) : defaultForm;
  });
  const [editing, setEditing] = useState(() => {
    const stored = localStorage.getItem(`tutor_info_${tutorId}`);
    return !stored;
  });
  const [form, setForm] = useState({
    name: info.name || defaultForm.name,
    email: info.email || defaultForm.email,
    subject: info.subject || defaultForm.subject,
    bio: info.bio || defaultForm.bio,
    experience: info.experience || defaultForm.experience,
    qualifications: info.qualifications || defaultForm.qualifications,
    hourlyRate: info.hourlyRate || defaultForm.hourlyRate,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setInfo(form);
    localStorage.setItem(`tutor_info_${tutorId}`, JSON.stringify(form));
    setEditing(false);
  };

  return (
    <div style={{marginBottom:32}}>
      <h3 style={{fontWeight:'bold', color:'#2563eb', marginBottom:8}}>Tutor Information</h3>
      {editing ? (
        <form onSubmit={handleSave} style={{display:'flex', flexDirection:'column', gap:12}}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="input" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" required />
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject(s)" className="input" required />
          <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Short Bio" className="input" rows={2} />
          <input name="experience" value={form.experience} onChange={handleChange} placeholder="Experience (years)" className="input" />
          <input name="qualifications" value={form.qualifications} onChange={handleChange} placeholder="Qualifications" className="input" />
          <input name="hourlyRate" value={form.hourlyRate} onChange={handleChange} placeholder="Hourly Rate ($)" className="input" />
          <button className="button" type="submit">Save</button>
        </form>
      ) : (
        <div style={{background:'#f3f4f6', borderRadius:8, padding:'16px 18px'}}>
          <div><strong>Name:</strong> {info.name || <span style={{color:'#888'}}>Not set</span>}</div>
          <div><strong>Email:</strong> {info.email || <span style={{color:'#888'}}>Not set</span>}</div>
          <div><strong>Subject(s):</strong> {info.subject || <span style={{color:'#888'}}>Not set</span>}</div>
          <div><strong>Bio:</strong> {info.bio || <span style={{color:'#888'}}>Not set</span>}</div>
          <div><strong>Experience:</strong> {info.experience || <span style={{color:'#888'}}>Not set</span>}</div>
          <div><strong>Qualifications:</strong> {info.qualifications || <span style={{color:'#888'}}>Not set</span>}</div>
          <div><strong>Hourly Rate:</strong> {info.hourlyRate ? `$${info.hourlyRate}` : <span style={{color:'#888'}}>Not set</span>}</div>
          <button className="button" style={{marginTop:12}} onClick={() => setEditing(true)}>Edit Info</button>
        </div>
      )}
    </div>
  );
}
             