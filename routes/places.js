const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getVisitedPlaces, addNewPlace, ratePlace } = require('../controller/places');

router.get('/', getVisitedPlaces);
router.post('/', addNewPlace);
router.put('/:id/rate', authMiddleware.authenticateUser, ratePlace);
module.exports = router;