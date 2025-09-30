import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import sessionRoutes from './routes/session.js';
import messageRoutes from './routes/message.js';

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', sessionRoutes);
app.use('/api', messageRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tutor-app';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
