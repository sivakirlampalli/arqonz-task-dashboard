const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');

router.get('/', async (req, res) => {
  const mentors = await Mentor.find();
  res.json(mentors);
});

// Update (toggle) follow status
router.put('/:id/follow', async (req, res) => {
  try {
    const { followed } = req.body;
    const mentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      { followed },
      { new: true }
    );
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });
    res.json(mentor);
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e });
  }
});
module.exports = router;
