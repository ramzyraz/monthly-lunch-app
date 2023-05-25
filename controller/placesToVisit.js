const PlaceToVisit = require('../models/placesToVisit');
const { validateTokenExpiration } = require('../helpers/tokenHelper');

module.exports.getToVisitPlaces = async (req, res) => {
  try {
    const places = await PlaceToVisit.find();
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

module.exports.createNewPlace = async (req, res) => {
  try {
    const { name, description, url } = req.body;
    const newPlace = new PlaceToVisit({ name, description, url });
    // const token = req.headers.authorization?.replace('Bearer ', '');

    // if (!token) {
    //   return res.status(401).json({ error: 'No token provided' });
    // }

    // // Validate token expiration
    // const isTokenValid = validateTokenExpiration(token);

    // if (!isTokenValid) {
    //   return res.status(401).json({ error: 'Token has expired' });
    // }

    // Save the new place
    const savedPlace = await newPlace.save();
    res.status(201).json({ message: 'New place created and stored', body: savedPlace });
  } catch (error) {
    console.error('Error adding place:', error);
    res.status(500).json({ error: 'Failed to add place' });
  }
}
 
module.exports.deletePlace = async (req, res) => {
  try {
    const { id } = req.params;
    // const token = req.headers.authorization?.replace('Bearer ', '');

    // if (!token) {
    //   return res.status(401).json({ error: 'No token provided' });
    // }

    // // Validate token expiration
    // const isTokenValid = validateTokenExpiration(token);

    // if (!isTokenValid) {
    //   return res.status(401).json({ error: 'Token has expired' });
    // }

    // Find the place by ID
    const place = await PlaceToVisit.findById(id);
  
    // Check if the place exists
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }

    // Delete the place
    await place.remove();

    res.status(200).json({ message: 'Place deleted successfully' });
  } catch (error) {
    console.error('Error deleting place:', error);
    res.status(500).json({ error: 'Failed to delete place' });
  }
}