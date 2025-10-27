const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Match, Job, User, Message } = require('../models');
const { Op } = require('sequelize');

// Get user notifications
router.get('/', auth, async (req, res) => {
  try {
    const notifications = [];

    if (req.user.userType === 'company') {
      // Recent matches for company
      const recentMatches = await Match.findAll({
        where: {
          matched: true,
          companyLiked: true
        },
        include: [
          {
            model: Job,
            as: 'job',
            where: { companyId: req.user.id }
          },
          {
            model: User,
            as: 'candidate',
            attributes: ['id', 'firstName', 'lastName']
          }
        ],
        order: [['matchedAt', 'DESC']],
        limit: 5
      });

      recentMatches.forEach(match => {
        notifications.push({
          id: match.id,
          type: 'match',
          message: `${match.candidate.firstName} ${match.candidate.lastName}`,
          fullMessage: `Novo match com ${match.candidate.firstName} ${match.candidate.lastName}`,
          time: getTimeAgo(match.matchedAt),
          read: false,
          jobId: match.jobId
        });
      });

      // Recent messages
      const recentMessages = await Message.findAll({
        where: {
          senderId: { [Op.ne]: req.user.id }
        },
        include: [
          {
            model: Match,
            as: 'match',
            include: [
              {
                model: Job,
                as: 'job',
                where: { companyId: req.user.id }
              }
            ]
          },
          {
            model: User,
            as: 'sender',
            attributes: ['id', 'firstName', 'lastName']
          }
        ],
        order: [['createdAt', 'DESC']],
        limit: 5
      });

      recentMessages.forEach(msg => {
        notifications.push({
          id: `msg_${msg.id}`,
          type: 'message',
          message: `${msg.sender.firstName}`,
          fullMessage: `Nova mensagem de ${msg.sender.firstName}`,
          time: getTimeAgo(msg.createdAt),
          read: msg.read,
          matchId: msg.matchId
        });
      });

    } else {
      // Recent matches for candidate
      const recentMatches = await Match.findAll({
        where: {
          candidateId: req.user.id,
          matched: true
        },
        include: [
          {
            model: Job,
            as: 'job',
            include: [{
              model: User,
              as: 'company',
              attributes: ['id', 'firstName', 'lastName']
            }]
          }
        ],
        order: [['matchedAt', 'DESC']],
        limit: 5
      });

      recentMatches.forEach(match => {
        notifications.push({
          id: match.id,
          type: 'match',
          message: `${match.job.companyName}`,
          fullMessage: `Você teve um match com ${match.job.companyName}`,
          time: getTimeAgo(match.matchedAt),
          read: false,
          jobId: match.jobId
        });
      });

      // Recent messages
      const recentMessages = await Message.findAll({
        where: {
          senderId: { [Op.ne]: req.user.id }
        },
        include: [
          {
            model: Match,
            as: 'match',
            where: { candidateId: req.user.id }
          },
          {
            model: User,
            as: 'sender',
            attributes: ['id', 'firstName', 'lastName']
          }
        ],
        order: [['createdAt', 'DESC']],
        limit: 5
      });

      recentMessages.forEach(msg => {
        notifications.push({
          id: `msg_${msg.id}`,
          type: 'message',
          message: `${msg.sender.firstName}`,
          fullMessage: `Nova mensagem de ${msg.sender.firstName}`,
          time: getTimeAgo(msg.createdAt),
          read: msg.read,
          matchId: msg.matchId
        });
      });
    }

    // Sort by time (most recent first)
    notifications.sort((a, b) => {
      const timeA = new Date(a.time).getTime();
      const timeB = new Date(b.time).getTime();
      return timeB - timeA;
    });

    res.json(notifications.slice(0, 10)); // Return top 10
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper function to get time ago
function getTimeAgo(date) {
  if (!date) return 'Há muito tempo';
  
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'Agora';
  if (minutes < 60) return `Há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  if (hours < 24) return `Há ${hours} hora${hours > 1 ? 's' : ''}`;
  return `Há ${days} dia${days > 1 ? 's' : ''}`;
}

module.exports = router;

