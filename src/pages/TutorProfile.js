
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Messages from './Messages';

function TutorProfile() {
  const { tutorId } = useParams();

  // Ratings state (localStorage per tutor)
  const [reviews, setReviews] = useState(() => {
    return JSON.parse(localStorage.getItem(`reviews_${tutorId}`) || '[]');
  });
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  // Add review
  const handleAddReview = () => {
    if (rating < 1 || rating > 5 || !reviewText.trim()) return;
    const updated = [...reviews, { rating, text: reviewText, date: new Date().toLocaleDateString() }];
    setReviews(updated);
    localStorage.setItem(`reviews_${tutorId}`, JSON.stringify(updated));
    setRating(0);
    setReviewText('');
  };

  // Average rating
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

          {/* Ratings and Reviews - always visible, fallback if empty */}
          <div style={{marginBottom:24, textAlign:'left', border:'2px solid #fbbf24', borderRadius:10, background:'#fffbe6', padding:'12px'}}>
            <h3 style={{fontWeight:'bold', color:'#fbbf24', marginBottom:8, fontSize:'1.2rem'}}>Ratings & Reviews</h3>
            <div style={{marginBottom:8}}>
              <span style={{fontWeight:'bold', fontSize:'1.1rem', color:'#fbbf24'}}>
                {avgRating ? `605 ${avgRating}/5` : 'No ratings yet'}
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

          <Messages tutorId={tutorId} />
        </div>
      </div>
    </div>
  );
}

export default TutorProfile;
