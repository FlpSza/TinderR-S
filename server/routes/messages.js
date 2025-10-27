const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Message, Match, User } = require('../models');

// Get messages for a match
router.get('/match/:matchId', auth, async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.matchId);
    
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    const messages = await Message.findAll({
      where: { matchId: req.params.matchId },
      include: [{
        model: User,
        as: 'sender',
        attributes: ['id', 'firstName', 'lastName', 'photo']
      }],
      order: [['createdAt', 'ASC']]
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send a message
router.post('/', auth, async (req, res) => {
  try {
    const { matchId, content } = req.body;

    const match = await Match.findByPk(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    const message = await Message.create({
      matchId,
      senderId: req.user.id,
      content
    });

    const messageWithSender = await Message.findByPk(message.id, {
      include: [{
        model: User,
        as: 'sender',
        attributes: ['id', 'firstName', 'lastName', 'photo']
      }]
    });

    res.status(201).json(messageWithSender);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

