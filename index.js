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
app.use(cors({origin: 'http://127.0.0.1:5173'})); 

// MongoDB database
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Route Middleware
app.use('/', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));