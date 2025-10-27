const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Job, User, Match } = require('../models');

// Create job (companies only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'company') {
      return res.status(403).json({ message: 'Only companies can create jobs' });
    }

    const job = await Job.create({
      ...req.body,
      companyId: req.user.id,
      companyName: req.user.firstName
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all jobs for candidates
router.get('/', auth, async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { active: true },
      include: [{
        model: User,
        as: 'company',
        attributes: ['id', 'firstName', 'lastName', 'photo']
      }]
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get job by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'company',
        attributes: ['id', 'firstName', 'lastName', 'photo', 'bio']
      }]
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get company's jobs
router.get('/company/my-jobs', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'company') {
      return res.status(403).json({ message: 'Only companies can access this' });
    }

    const jobs = await Job.findAll({
      where: { companyId: req.user.id },
      include: [{
        model: Match,
        as: 'matches',
        include: [{
          model: User,
          as: 'candidate',
          attributes: ['id', 'firstName', 'lastName', 'photo']
        }]
      }]
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update job
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.companyId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await job.update(req.body);
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete job
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.companyId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await job.destroy();
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

