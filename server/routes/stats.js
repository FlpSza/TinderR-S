const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Job, Match, User } = require('../models');
const { Op } = require('sequelize');

// Get company statistics
router.get('/company', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'company') {
      return res.status(403).json({ message: 'Only companies can access this' });
    }

    // Count active jobs
    const activeJobs = await Job.count({
      where: { 
        companyId: req.user.id,
        active: true 
      }
    });

    // Count total matches
    const matches = await Match.count({
      where: {
        matched: true
      },
      include: [{
        model: Job,
        as: 'job',
        where: { companyId: req.user.id }
      }]
    });

    // Count unique candidates who applied
    const candidates = await Match.count({
      where: {
        candidateLiked: true
      },
      include: [{
        model: Job,
        as: 'job',
        where: { companyId: req.user.id }
      }],
      distinct: true,
      col: 'candidateId'
    });

    res.json({
      activeJobs,
      matches,
      candidates
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

