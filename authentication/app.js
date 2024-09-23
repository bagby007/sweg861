import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

// Initialize Express app
const app = express();
const JWT_TOKEN = "SECRETTOKEN12345";

// Set up CORS and JSON middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Home
app.get('/', (_req, res) => {});

// Authentication
app.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(401).json({ message: 'Invalid Password' });
    } else {
      const loginData = { email, signInTime: Date.now() };
      const token = jwt.sign(loginData, JWT_TOKEN);
      return res.status(200).json({ message: 'success', token });
    }
  } else {
    const hash = await bcrypt.hash(password, 10);
    user = new User({ email, password: hash });
    await user.save();

    const loginData = { email, signInTime: Date.now() };
    const token = jwt.sign(loginData, JWT_TOKEN);
    return res.status(200).json({ message: 'success', token });
  }
});

// Verification
app.post('/verify-token', (req, res) => {
  const tokenHeaderKey = 'jwt-token';
  const auth = req.headers[tokenHeaderKey];

  try {
    const verified = jwt.verify(auth, JWT_TOKEN);
    if (verified) {
      return res.status(200).json({ status: 'success', message: 'success' });
    } else {
      return res.status(401).json({ status: 'access denied', message: 'error' });
    }
  } catch (error) {
    return res.status(401).json({ status: 'access denied', message: 'error' });
  }
});

// Account Exist
app.post('/account-exists', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  res.status(200).json({
    status: user ? 'User exists' : 'User does not exist',
    userExists: !!user,
  });
});

// Server Listening on Port 3080
app.listen(3080, () => {
  console.log('Server running on port 3080');
});
