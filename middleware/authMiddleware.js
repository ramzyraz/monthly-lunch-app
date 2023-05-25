const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to authenticate user based on JWT
const authenticateUser = async (req, res, next) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on the decoded token
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      console.log("IN TOKEN");
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Set the user object on the request for further use
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ error: 'Failed to authenticate' });
  }
};

module.exports = { authenticateUser };
