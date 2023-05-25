const mongoose = require('mongoose');

const placeToVisitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const PlaceToVisit = mongoose.model('PlaceToVisit', placeToVisitSchema);
module.exports = PlaceToVisit;