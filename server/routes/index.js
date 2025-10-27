const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./users');
const jobRoutes = require('./jobs');
const matchRoutes = require('./matches');
const messageRoutes = require('./messages');
const statsRoutes = require('./stats');
const notificationRoutes = require('./notifications');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);
router.use('/matches', matchRoutes);
router.use('/messages', messageRoutes);
router.use('/stats', statsRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;

