const express = require('express');
const router = express.Router();
const placesRoutes = require('./places');
const placesToVisit = require('./placesToVisit');
const userRoutes = require('./user');
const pollRoutes = require('./polls');

// Default Route
router.get('/', (req, res) => res.send('Monthly Lunch API'));
// Define routes using imported route files
router.use('/places', placesRoutes);
router.use('/placesToVisit', placesToVisit);
router.use('/users', userRoutes);
router.use('/polls', pollRoutes);

module.exports = router;