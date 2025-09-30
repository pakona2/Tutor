# Tutor Backend

This is the backend for the Tutor app. It provides RESTful API endpoints for user authentication, profile management, session booking, and messaging.

## Features
- User registration and login (JWT authentication)
- Role-based access (student/tutor)
- Profile management
- Session booking and management
- Messaging between users

## Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)
- JWT for authentication

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up MongoDB (local or Atlas) and update `MONGO_URI` in `server.js` or set as environment variable.
3. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints
- `POST /api/register` — Register a new user
- `POST /api/login` — Login and get JWT token
- `GET /api/profile/:id` — Get user profile
- `PUT /api/profile/:id` — Update user profile
- `POST /api/sessions` — Book a session
- `GET /api/sessions/:userId` — Get sessions for a user
- `PUT /api/sessions/:id` — Update session status
- `POST /api/messages` — Send a message
- `GET /api/messages/:userId` — Get messages for a user

## Environment Variables
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Secret for JWT signing

---

For any questions or issues, please contact the project maintainer.
