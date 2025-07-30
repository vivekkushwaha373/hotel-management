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

// // Add indexes for better query performance
// destinationSchema.index({ name: 1, country: 1 });
// destinationSchema.index({ 'coordinates.lat': 1, 'coordinates.lon': 1 });

// // Add a method to get full location name
// destinationSchema.methods.getFullLocation = function() {
//   return `${this.name}, ${this.country}`;
// };

// // Add a static method to find destinations by country
// destinationSchema.statics.findByCountry = function(country) {
//   return this.find({ country: new RegExp(country, 'i') });
// };

module.exports = mongoose.model('Destination', destinationSchema); 