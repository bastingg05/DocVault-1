const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { issueTokenCookie, requireAuth } = require('../middleware/auth');

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
    if ((req.headers['content-type'] || '').includes('application/x-www-form-urlencoded')) {
      issueTokenCookie(res, token);
      return res.redirect('/documents.html');
    }
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
    if ((req.headers['content-type'] || '').includes('application/x-www-form-urlencoded')) {
      issueTokenCookie(res, token);
      return res.redirect('/documents.html');
    }
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
});

router.post('/logout', (req, res) => {
  res.setHeader('Set-Cookie', 'dv_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax');
  res.redirect('/login.html');
});

router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load profile' });
  }
});

module.exports = router;


