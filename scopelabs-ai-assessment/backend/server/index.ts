import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.warn('WARNING: MONGODB_URI is not defined in .env file.');
} else {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));
}

// ==========================================
// Mongoose Schemas & Models
// ==========================================

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  userInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    affiliation: { type: String, default: null },
    job: { type: String, default: null },
    task: { type: String, default: null },
    industry: { type: String, default: null },
    age: { type: String, default: null },
    marketing: { type: Boolean, default: false }
  },
  answers: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
  result: {
    categoryScores: [{
      category: String,
      score: Number,
      raw: Number,
      fullMark: Number
    }],
    totalScore: Number,
    level: String,
    comment: String,
    recommendations: {
      type: mongoose.Schema.Types.Mixed,
      default: []
    }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Mongoose `pre('save')` does not strictly require `next()` when passing an async function,
// but for a synchronous hook we'll just not type it or use async/await without next.
sessionSchema.pre('save', function () {
  this.updatedAt = new Date();
});

const Session = mongoose.model('Session', sessionSchema);

// ==========================================
// API Routes
// ==========================================

// 1. POST /api/diagnosis/submit
// Saves the entire assessment (userInfo, answers, and result) in one go
app.post('/api/diagnosis/submit', async (req, res) => {
  try {
    const { userInfo, answers, result_data } = req.body;

    if (!userInfo || !answers || !result_data) {
      return res.status(400).json({ error: 'Missing required data fields' });
    }

    // Generate a unique session ID
    const sessionId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Process optional fields to ensure they are null instead of undefined/empty string
    const processedUserInfo = {
      name: userInfo.name,
      email: userInfo.email,
      affiliation: userInfo.affiliation || null,
      job: userInfo.job || null,
      task: userInfo.task || null,
      industry: userInfo.industry || null,
      age: userInfo.age || null,
      marketing: userInfo.marketing || false
    };

    const session = new Session({
      sessionId,
      userInfo: processedUserInfo,
      answers,
      status: 'completed',
      result: result_data
    });

    await session.save();

    res.status(200).json({
      success: true,
      session_id: sessionId,
      data: session.result
    });
  } catch (error) {
    console.error('Error submitting diagnosis:', error);
    res.status(500).json({ error: 'Internal server error', details: error.toString() });
  }
});

// Start server
const HOST = '0.0.0.0';
app.listen(PORT as number, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});
