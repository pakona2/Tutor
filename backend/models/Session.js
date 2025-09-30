import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'approved', 'completed'], default: 'pending' },
  notes: String
}, { timestamps: true });

export default mongoose.model('Session', sessionSchema);
