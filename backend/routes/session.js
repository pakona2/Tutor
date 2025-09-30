import express from 'express';
import Session from '../models/Session.js';

const router = express.Router();

// Book a session
router.post('/sessions', async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get sessions for a user
router.get('/sessions/:userId', async (req, res) => {
  try {
    const sessions = await Session.find({ $or: [ { tutor: req.params.userId }, { student: req.params.userId } ] }).populate('tutor student', 'name email');
    res.json(sessions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update session status
router.put('/sessions/:id', async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(session);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
