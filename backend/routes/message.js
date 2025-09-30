import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// Send a message
router.post('/messages', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get messages for a user
router.get('/messages/:userId', async (req, res) => {
  try {
    const messages = await Message.find({ $or: [ { sender: req.params.userId }, { receiver: req.params.userId } ] }).populate('sender receiver', 'name email');
    res.json(messages);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
