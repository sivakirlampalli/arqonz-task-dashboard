const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages (optionally filter by user)
router.get('/', async (req, res) => {
  const { from, to } = req.query;
  let filter = {};
  if (from) filter.from = from;
  if (to) filter.to = to;

  const messages = await Message.find(filter).sort({ timestamp: 1 });
  res.json(messages);
});

// Create a new message
router.post('/', async (req, res) => {
  const newMessage = new Message(req.body);
  await newMessage.save();
  res.json(newMessage);
});

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
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
