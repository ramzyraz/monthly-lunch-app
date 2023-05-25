const Place = require('../models/places');
const { validateTokenExpiration } = require('../helpers/tokenHelper');

module.exports.getVisitedPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    if (places.length === 0) {
      res.status(404).json({ message: 'No places found' });
    } else {
      res.status(200).json(places);
    }
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Failed to fetch places' });
  }
}

module.exports.addNewPlace = async (req, res) => {
  try {
    const { name, description, rating, ratings, url } = req.body;
    // const token = req.headers.authorization?.replace('Bearer ', '');
    
    // if (!token) {
    //   return res.status(401).json({ error: 'No token provided' });
    // }
    
    // // Validate token expiration
    // const isTokenValid = validateTokenExpiration(token);
    
    // if (!isTokenValid) {
    //   return res.status(401).json({ error: 'Token has expired' });
    // }
    
    const newPlace = new Place({ name, description, rating, ratings, url });
    // Save the new place
    const savedPlace = await newPlace.save();
    res.status(201).json({ message: 'Added to the places visited list', body: savedPlace });
  } catch (error) {
    console.error('Error adding place:', error);
    res.status(500).json({ error: 'Failed to add place' });
  }
}

module.exports.ratePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    // const token = req.headers.authorization?.replace('Bearer ', '');

    // if (!token) {
    //   return res.status(401).json({ error: 'No token provided' });
    // }

    // // Validate token expiration
    // const isTokenValid = validateTokenExpiration(token);

    // if (!isTokenValid) {
    //   return res.status(401).json({ error: 'Token has expired' });
    // }

    // Validate the rating value
    if (rating < 0 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating value' });
    }

    const place = await Place.findById(id);

    // Check if the place exists
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }

    // Check if the user has already rated this place
    const existingRatingIndex = place.ratings.findIndex((rating) => rating.userId === req.user._id);

    if (existingRatingIndex !== -1) {
      // Update the existing rating
      place.ratings[existingRatingIndex].rating = rating;
    } else {
      // Add a new rating for the user
      place.ratings.push({ userId: req.user._id, rating });
    }

    // Calculate the new average rating based on all the ratings
    const totalRatings = place.ratings.length;
    const sumOfRatings = place.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const newRating = sumOfRatings / totalRatings;

    // Update the overall rating of the place
    place.rating = newRating;

    // Save the updated place
    const updatedPlace = await place.save();
    res.status(200).json({ message: 'Rating of place updated', body: updatedPlace });
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({ error: 'Failed to update rating' });
  }
}