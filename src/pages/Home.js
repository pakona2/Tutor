import React from 'react';
import { Link } from 'react-router-dom';
import './pages.css';



function Home() {
  return (
    <div className="landing-container">

      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584697964154-0d94d3f3a940?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="hero-content">
          <Link to="/Login">
            <button className="button" style={{marginBottom: '32px'}}>Get Started</button>
          </Link>
          <h1 className="hero-title">TutorConnect</h1>
          <p className="hero-subtitle">Find the perfect tutor or become one — in just a few clicks.</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-list">
          <FeatureCard
            image="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            title="Qualified Tutors"
            description="We handpick the best instructors across every subject."
          />
          <FeatureCard
            image="https://cdn-icons-png.flaticon.com/512/2920/2920277.png"
            title="Flexible Scheduling"
            description="Book sessions that fit your schedule, anytime."
          />
          <FeatureCard
            image="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            title="Secure Payments"
            description="Simple, secure payment options built into the platform."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-list">
          <StepCard
            image="https://images.unsplash.com/photo-1611974789857-9c7d53c74f88?auto=format&fit=crop&w=600&q=80"
            title="1. Sign Up"
            description="Create your free account as a student or tutor."
          />
          <StepCard
            image="https://images.unsplash.com/photo-1611974789857-9c7d53c74f88?auto=format&fit=crop&w=600&q=80"
            title="2. Match & Book"
            description="Get matched with tutors and book sessions instantly."
          />
          <StepCard
            image="https://images.unsplash.com/photo-1581093448793-25b9b1ed1573?auto=format&fit=crop&w=600&q=80"
            title="3. Start Learning"
            description="Join your session and learn with ease online."
          />
        </div>
      </section>

      {/* Teachers Section */}
      <section className="teachers-section">
        <h2 className="section-title">Meet Our Teachers</h2>
        <div className="teachers-list">
          <TeacherCard
            image="/src/assets/1.jpg"
            name="Ms. Jane Doe"
            subject="Mathematics"
            bio="Passionate about making math fun and accessible for all ages."
          />
          <TeacherCard
            image="/src/assets/image.png"
            name="Mr. John Smith"
            subject="English Literature"
            bio="Bringing stories to life and helping students find their voice."
          />
          <TeacherCard
            image="/src/assets/imag.png"
            name="Mrs. Emily Brown"
            subject="Science"
            bio="Exploring the wonders of the world through hands-on learning."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} TutorConnect. All rights reserved. Mr.BT
      </footer>
    </div>
  );
}

const FeatureCard = ({ image, title, description }) => (
  <div className="feature-card">
    <img src={image} alt={title} className="feature-photo" />
    <h3 className="feature-title">{title}</h3>
    <p className="feature-desc">{description}</p>
  </div>
);

const StepCard = ({ image, title, description }) => (
  <div className="step-card">
    <img src={image} alt={title} className="step-photo" />
    <h4 className="step-title">{title}</h4>
    <p className="step-desc">{description}</p>
  </div>
);

const TeacherCard = ({ image, name, subject, bio }) => (
  <div className="teacher-card">
    <img src={image} alt={name} className="teacher-photo" />
    <h3 className="teacher-name">{name}</h3>
    <p className="teacher-subject">{subject}</p>
    <p className="teacher-bio">{bio}</p>
  </div>
);

export default Home;
