const Poll = require('../models/polls');
const { validateTokenExpiration } = require('../helpers/tokenHelper');

module.exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;
    // const token = req.headers.authorization?.replace('Bearer ', '');

    // if (!token) {
    //   return res.status(401).json({ error: 'No token provided' });
    // }

    // // Validate token expiration
    // const isTokenValid = validateTokenExpiration(token);

    // if (!isTokenValid) {
    //   return res.status(401).json({ error: 'Token has expired' });
    // }

    // Create a new poll
    const poll = new Poll({
      question,
      options,
      votes: []
    });

    // Save the poll to the database
    const createdPoll = await poll.save();

    res.status(201).json({ message: 'Poll created successfully', poll: createdPoll });
  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).json({ error: 'Failed to create poll' });
  }
}

module.exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    if (polls.length === 0) {
      res.status(404).json({ message: 'No polls found' });
    } else {
      res.status(200).json(polls);
    }
  } catch (error) {
    console.error('Error fetching polls:', error);
    res.status(500).json({ error: 'Failed to fetch polls' });
  }
}

module.exports.getPollById = async (req, res) => {
  try {
      const { id } = req.params;
  
      // Find the poll by ID
      const poll = await Poll.findById(id);
  
      if (!poll) {
        return res.status(404).json({ error: 'Poll not found' });
      }
  
      res.status(200).json({ poll });
  } catch (error) {
      console.error('Error getting poll:', error);
      res.status(500).json({ error: 'Failed to get poll' });
  }
}

module.exports.getLatestPoll = async (req, res) => {
  try {
    const latestPoll = await Poll.findOne().sort({ createdAt: -1 });

    if (!latestPoll) {
      return res.status(404).json({ error: 'No poll found' });
    }

    res.status(200).json(latestPoll);
  } catch (error) {
    console.error('Error fetching latest poll:', error);
    res.status(500).json({ error: 'Failed to fetch latest poll' });
  }
}
  
module.exports.voteInPoll = async (req, res) => {
  try {
      const { id } = req.params;
      const { optionId } = req.body;
      const userId = req.user._id;
      // const token = req.headers.authorization?.replace('Bearer ', '');

      // console.log(token);

      // if (!token) {
      //   return res.status(401).json({ error: 'No token provided' });
      // }

      // // Validate token expiration
      // const isTokenValid = validateTokenExpiration(token);
      // console.log(isTokenValid);

      // if (!isTokenValid) {
      //   return res.status(401).json({ error: 'Token has expired' });
      // }
  
      // Find the poll by ID
      const poll = await Poll.findById(id);
  
      if (!poll) {
        return res.status(404).json({ error: 'Poll not found' });
      }
  
      // Check if the user has already voted
      if (poll.votes.some(vote => vote.userId.equals(userId))) {
        return res.status(400).json({ error: 'You have already voted on this poll' });
      }
  
      // Check if the option index is valid
      if (optionId < 0 || optionId >= poll.options.length) {
        return res.status(400).json({ error: 'Invalid option index' });
      }
  
      // Increment the vote count for the selected option
      poll.options[optionId].votes += 1;
  
      // Add the user's vote to the poll
      poll.votes.push({ userId, votedOptionId: optionId });
  
      // Save the updated poll
      const updatedPoll = await poll.save();
  
      // Return the updated poll
      res.status(200).json({ poll: updatedPoll });
  } catch (error) {
      console.error('Error voting for poll:', error);
      res.status(500).json({ error: 'Failed to vote for poll' });
  }
}

module.exports.deletePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Validate token expiration
    const isTokenValid = validateTokenExpiration(token);

    if (!isTokenValid) {
      return res.status(401).json({ error: 'Token has expired' });
    }

    // Find the poll by ID
    const poll = await Poll.findById(id);

    // Check if the poll exists
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Delete the poll
    await poll.remove();

    res.status(200).json({ message: 'Poll deleted successfully' });
  } catch (error) {
    console.error('Error deleting poll:', error);
    res.status(500).json({ error: 'Failed to delete poll' });
  }
}