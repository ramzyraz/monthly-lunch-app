require("dotenv").config();
const mongoose = require('mongoose');
const Place = require('../models/places');
const PlaceToVisit = require('../models/placesToVisit');

const visited = [
  {
    name: "Wasabi",
    description: "Japanese and East Asian",
    rating: 0.0,
    ratings: [],
    url: "https://www.instagram.com/wasabipakistan/?hl=en"
  },
  {
    name: "P.F. Chang's",
    description: "Asian Cuisine and Chinese",
    rating: 0.0,
    ratings: [],
    url: "https://www.pfchangspk.com/"
  },
  {
    name: "14th Street Pizza",
    description: "Normal Pizzas but they good",
    rating: 0.0,
    ratings: [],
    url: "https://www.14thstreetpizza.com/"
  },
  {
    name: "The Cheese Factor",
    description: "Deep Dish and Normal Pizzas",
    rating: 0.0,
    ratings: [],
    url: "https://thecheesefactor.com/"
  },
  {
    name: "Cheesious",
    description: "Pizzas with some local touch",
    rating: 0.0,
    ratings: [],
    url: "https://www.cheezious.com/"
  },
  {
    name: "La Mexicana Kitchen",
    description: "Mexican",
    rating: 0.0,
    ratings: [],
    url: "https://www.instagram.com/lamexicanakitchendha/?hl=en"
  },
]

const placesToVisit = [
  {
    name: 'DanDan',
    description: 'Contemporary Chinese (Hotpots)',
    url: 'https://www.instagram.com/dandan.pk/?hl=en',
  },
  {
    name: "Paolo",
    description: "Italian",
    url: "https://www.instagram.com/cosanostra_paolas/?hl=en"
  },
  {
    name: 'Sumo',
    description: 'Japanese',
    url: 'https://sumo.pk/',
  },
  {
    name: 'Rare Steakhouse',
    description: 'Steaks and Continental',
    url: 'https://www.instagram.com/rarepakistan/?hl=en',
  },
  {
    name: 'Koya',
    description: 'Continental',
    url: 'https://www.instagram.com/koyarestaurantpk/?hl=en',
  },
  {
    name: 'For the Table',
    description: 'Pastas and Continental',
    url: 'https://www.instagram.com/forthetablepk/',
  },
  {
    name: 'Pasta La Vista',
    description: 'Italian (Pastas and Pizza)',
    url: 'https://www.instagram.com/pastalavistalhr/?hl=en',
  },
  {
    name: 'Hungry Bare',
    description: 'Burgers (Known for Beef)',
    url: 'https://www.instagram.com/barethehungry/?hl=en',
  },
  {
    name: 'Rinas Kitchnette',
    description: 'Has a mixture of everything',
    url: 'https://rinas.pk/',
  },
  {
    name: 'Veera5',
    description: 'Thai',
    url: 'https://www.instagram.com/veera_5/',
  },
  {
    name: 'Fuchsia',
    description: 'Pan-Asian cuisines (Thai, Chinese, Vietnamese and Korean).',
    url: 'https://fuchsiapk.com/',
  },
  {
    name: 'Costa Coffee',
    description: 'Coffee place to chill',
    url: 'https://www.facebook.com/cafecosta.lhr/',
  },
]

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function insertData() {
  try {
    // Save the array of worker documents to the database
    const response = await Place.insertMany(visited);
    console.log('Data inserted successfully:', response);
  } catch (error) {
    console.error(error);
  } finally {
    // Disconnect from the database after saving the documents
    mongoose.disconnect();
  }
}

insertData();
