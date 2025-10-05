import React, { useEffect } from 'react';
//import socket from './socket'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import ReferralProgram from './pages/ReferralProgram';
import StudentTutorials from './pages/tutorials/StudentTutorials';
import TutorUpload from './pages/tutorials/TutorUpload';
import HelpCenter from './pages/help/HelpCenter';
import TermsAndConditions from './pages/help/TermsAndConditions';
import Login from './pages/Login';
import TutorDashboard from './pages/TutorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import TutorProfile from './pages/TutorProfile';
import StudentProfile from './pages/StudentProfile';
import BookSession from './pages/BookSession';
import TutorSessions from './pages/TutorSessions';
import ResetPassword from './pages/ResetPassword';
import Payment from './pages/Payment';
import Messages from './pages/Messages';
import Home from './pages/Home';
import TutorSearch from './pages/TutorSearch';

function App() {
  useEffect(() => {
    // Handle socket connection
    /* socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('message', (data) => {
      console.log('Message received:', data);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Cleanup socket listeners on unmount
    return () => {
      socket.off('connect');
      socket.off('message');
      socket.off('disconnect');
    };*/
  }, []);

  // Helper for back arrow

 function App() {
  const userRole = localStorage.getItem('role'); // or however you're managing roles

  return (
    <BrowserRouter>
      <Navbar role={userRole} />
      <Routes>
        <Route path="/tutor-dashboard" element={<TutorDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        {/* other routes */}
      </Routes>
    </BrowserRouter>
  );
}

  const BackArrow = () => (
    <div style={{padding:'16px'}}>
      <button onClick={() => window.history.back()} style={{fontSize:'1.5rem',background:'none',border:'none',cursor:'pointer'}}>&larr; Back</button>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student-dashboard" element={<><Navbar role="student" /><StudentDashboard /></>} />
        <Route path="/tutor-dashboard" element={<><Navbar role="tutor" /><TutorDashboard /></>} />}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-profile" element={<><BackArrow /><StudentProfile /></>} />
        <Route path="/tutor-profile/:tutorId" element={<><BackArrow /><TutorProfile /></>} />
        <Route path="/payment" element={<><BackArrow /><Payment /></>} />
        <Route path="/messages" element={<><BackArrow /><Messages /></>} />
        <Route path="/book-session" element={<><BackArrow /><BookSession /></>} />
        <Route path="/tutor-sessions" element={<><BackArrow /><TutorSessions /></>} />
        <Route path="/reset-password" element={<><BackArrow /><ResetPassword /></>} />
        <Route path="/tutor-search" element={<><BackArrow /><TutorSearch /></>} />
        <Route path="/help" element={<><BackArrow /><HelpCenter /></>} />
        <Route path="/terms" element={<><BackArrow /><TermsAndConditions /></>} />
        <Route path="/student-tutorials" element={<StudentTutorials />} />
        <Route path="/tutor-upload" element={<><BackArrow /><TutorUpload /></>} />
        <Route path="/referral" element={<><BackArrow /><ReferralProgram /></>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




