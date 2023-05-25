require("dotenv").config();
const cors = require('cors');
const morgan = require("morgan");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Routes
const routes = require('./routes/index');

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: 'https://monthly-lunch-app.vercel.app/'})); 

// MongoDB database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// Route Middleware
app.use('/', routes);

//Connect to the database before listening
const port = process.env.PORT || 5000;
connectDB().then(() => app.listen(port, () => console.log("listening for requests")));