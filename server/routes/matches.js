const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Match, Job, User, Message } = require('../models');

// Swipe/Like a job (candidate) or candidate (company)
router.post('/swipe', auth, async (req, res) => {
  try {
    const { jobId, liked } = req.body;

    if (req.user.userType === 'candidate') {
      // Candidate swiping on a job
      const [match, created] = await Match.findOrCreate({
        where: {
          candidateId: req.user.id,
          jobId: jobId
        },
        defaults: {
          candidateId: req.user.id,
          jobId: jobId,
          candidateLiked: liked
        }
      });

      if (!created) {
        match.candidateLiked = liked;
        await match.save();
      }

      // Check if company already liked this candidate
      if (liked && match.companyLiked) {
        match.matched = true;
        match.matchedAt = new Date();
        await match.save();
      }

      res.json(match);
    } else {
      // Company swiping on a candidate (they see candidate's profile from job's matches)
      const { candidateId } = req.body;
      
      const [match, created] = await Match.findOrCreate({
        where: {
          candidateId: candidateId,
          jobId: jobId
        },
        defaults: {
          candidateId: candidateId,
          jobId: jobId,
          companyLiked: liked
        }
      });

      if (!created) {
        match.companyLiked = liked;
        await match.save();
      }

      // Check if candidate already liked this job
      if (liked && match.candidateLiked) {
        match.matched = true;
        match.matchedAt = new Date();
        await match.save();
      }

      res.json(match);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get matches for current user
router.get('/', auth, async (req, res) => {
  try {
    let matches;

    if (req.user.userType === 'candidate') {
      matches = await Match.findAll({
        where: {
          candidateId: req.user.id,
          matched: true
        },
        include: [{
          model: Job,
          as: 'job',
          include: [{
            model: User,
            as: 'company',
            attributes: ['id', 'firstName', 'lastName', 'photo']
          }]
        }]
      });
    } else {
      // Company sees candidates who matched
      matches = await Match.findAll({
        where: {
          matched: true
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
            attributes: ['id', 'firstName', 'lastName', 'photo', 'bio']
          }
        ]
      });
    }

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get candidates for a specific job (company view)
router.get('/job/:jobId/candidates', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'company') {
      return res.status(403).json({ message: 'Only companies can access this' });
    }

    const matches = await Match.findAll({
      where: {
        jobId: req.params.jobId
      },
      include: [{
        model: User,
        as: 'candidate',
        attributes: ['id', 'firstName', 'lastName', 'photo', 'bio', 'location']
      }]
    });

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

