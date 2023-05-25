const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Signup 
module.exports.signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirmation } = req.body;

    // Check if the password meets the minimum length requirement
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Check if the password and password confirmation match
    if (password !== passwordConfirmation) {
      return res.status(400).json({ error: 'Password and password confirmation do not match' });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Create a new user
    const newUser = new User({ name, email, password });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'Signup successful', user: savedUser._id });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Failed to signup' });
  }
}

// Login 
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if the password meets the minimum length requirement
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Check if the password is correct
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, userId: user._id });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Failed to login' });
  }
}

// Logout
module.exports.logout = (req, res) => {
  // Send a success response
  res.status(200).json({ message: 'Logout successful' });
}

// Get user profile
module.exports.getProfile = async (req, res) => {
    try {
      // Retrieve the user from the request object (assuming it's set during authentication)
      const user = req.user;

      // Return the user profile
      res.status(200).json({ profile: user.profile });
    } catch (error) {
      console.error('Error getting user profile:', error);
      res.status(500).json({ error: 'Failed to get user profile' });
    }
}

// Update user profile
module.exports.updateProfile = async (req, res) => {
    try {
      // Retrieve the user from the request object (assuming it's set during authentication)
      const user = req.user;
  
      // Update the user profile with the provided data
      user.profile = req.body.profile;
      await user.save();
  
      res.json({ message: 'Profile updated successfully', profile: user.profile });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Failed to update user profile' });
    }
}

// Delete user profile
module.exports.deleteProfile = async (req, res) => {
    try {
      // Retrieve the user from the request object (assuming it's set during authentication)
      const user = req.user;
  
      // Delete the user account
      await user.remove();
  
      res.json({ message: 'User account deleted successfully' });
    } catch (error) {
      console.error('Error deleting user account:', error);
      res.status(500).json({ error: 'Failed to delete user account' });
    }
}