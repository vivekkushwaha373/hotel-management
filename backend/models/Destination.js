const mongoose = require('mongoose');

// Define the base schema with required fields
const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  coordinates: {
    lat: {
      type: Number,
      required: true
    },
    lon: {
      type: Number,
      required: true
    }
  }
}, {
  timestamps: true,
  strict: false // This allows additional fields not defined in the schema
});


module.exports = mongoose.model('Destination', destinationSchema); 