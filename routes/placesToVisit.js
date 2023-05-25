const express = require('express');
const router = express.Router();
const { createNewPlace, getToVisitPlaces, deletePlace } = require('../controller/placesToVisit');

router.post('/', createNewPlace);
router.get('/', getToVisitPlaces);
router.delete('/:id', deletePlace);
module.exports = router;