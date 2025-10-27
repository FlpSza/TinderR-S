const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./users');
const jobRoutes = require('./jobs');
const matchRoutes = require('./matches');
const messageRoutes = require('./messages');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);
router.use('/matches', matchRoutes);
router.use('/messages', messageRoutes);

module.exports = router;

