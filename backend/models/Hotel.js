const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  facilities: [{
    type: String,
    trim: true
  }]
}, { _id: false });

const nearbyAttractionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  distance: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: false });

const photoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: false });


const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  priceFrom: {
    type: Number,
    required: true,
    min: 0
  },
  roomTypes: [roomTypeSchema],
  nearbyAttractions: [nearbyAttractionSchema],
  photos: [photoSchema],
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  }
}, {
  timestamps: true,
  strict: false 
});




hotelSchema.virtual('destination', {
  ref: 'Destination',
  localField: 'destinationId',
  foreignField: '_id',
  justOne: true
});



// Add instance methods
hotelSchema.methods.getAverageRoomPrice = function() {
  if (!this.roomTypes || this.roomTypes.length === 0) {
    return this.priceFrom;
  }
  const totalPrice = this.roomTypes.reduce((sum, room) => sum + room.price, 0);
  return totalPrice / this.roomTypes.length;
};

hotelSchema.methods.getFacilitiesList = function() {
  const allFacilities = new Set();
  this.roomTypes.forEach(room => {
    room.facilities.forEach(facility => allFacilities.add(facility));
  });
  return Array.from(allFacilities);
};

// Add static methods
hotelSchema.statics.findByDestination = function(destinationId) {
  return this.find({ destinationId }).populate('destination');
};

hotelSchema.statics.findByPriceRange = function(minPrice, maxPrice) {
  return this.find({
    priceFrom: { $gte: minPrice, $lte: maxPrice }
  }).populate('destination');
};

hotelSchema.statics.findByStars = function(stars) {
  return this.find({ stars }).populate('destination');
};

// Pre-save middleware to validate destination exists
hotelSchema.pre('save', async function(next) {
  if (this.isModified('destinationId')) {
    const Destination = mongoose.model('Destination');
    const destination = await Destination.findById(this.destinationId);
    if (!destination) {
      return next(new Error('Destination not found'));
    }
  }
  next();
});

module.exports = mongoose.model('Hotel', hotelSchema); 