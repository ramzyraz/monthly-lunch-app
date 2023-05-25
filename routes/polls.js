const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getPolls, getPollById, getLatestPoll, createPoll, voteInPoll, deletePoll } = require('../controller/polls');

router.get('/', getPolls);
// router.get('/:id', getPollById);
router.get('/latest', getLatestPoll);
router.post('/', createPoll);
router.post('/:id/vote', authMiddleware.authenticateUser, voteInPoll);
router.delete('/:id', deletePoll);
module.exports = router;