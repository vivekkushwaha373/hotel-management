const Hotel = require('../models/Hotel');
const Destination = require('../models/Destination');

// Get all hotels with destination details
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate('destination').sort({ name: 1 });
    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get hotel by ID
const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('destination');
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    console.error('Error fetching hotel:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get hotels by destination
const getHotelsByDestination = async (req, res) => {
  try {
    const hotels = await Hotel.findByDestination(req.params.destinationId);
    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels by destination:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new hotel
const createHotel = async (req, res) => {
  try {
    // Validate that the destination exists
    const destination = await Destination.findById(req.body.destinationId);
    if (!destination) {
      return res.status(400).json({ message: 'Destination not found' });
    }

    const hotel = new Hotel(req.body);
    const savedHotel = await hotel.save();
    
    // Populate destination details before sending response
    const populatedHotel = await Hotel.findById(savedHotel._id).populate('destination');
    res.status(201).json(populatedHotel);
  } catch (error) {
    console.error('Error creating hotel:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update hotel
const updateHotel = async (req, res) => {
  try {
    // If destinationId is being updated, validate it exists
    if (req.body.destinationId) {
      const destination = await Destination.findById(req.body.destinationId);
      if (!destination) {
        return res.status(400).json({ message: 'Destination not found' });
      }
    }

    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('destination');

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    console.error('Error updating hotel:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete hotel
const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    console.error('Error deleting hotel:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get hotels by price range
const getHotelsByPriceRange = async (req, res) => {
  try {
    const minPrice = parseFloat(req.params.minPrice);
    const maxPrice = parseFloat(req.params.maxPrice);
    
    if (isNaN(minPrice) || isNaN(maxPrice)) {
      return res.status(400).json({ message: 'Invalid price range' });
    }

    const hotels = await Hotel.findByPriceRange(minPrice, maxPrice);
    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels by price range:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get hotels by star rating
const getHotelsByStars = async (req, res) => {
  try {
    const stars = parseInt(req.params.stars);
    
    if (isNaN(stars) || stars < 1 || stars > 5) {
      return res.status(400).json({ message: 'Invalid star rating' });
    }

    const hotels = await Hotel.findByStars(stars);
    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels by stars:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get hotels with advanced filtering
const filterHotels = async (req, res) => {
  try {
    const { 
      destinationId, 
      minPrice, 
      maxPrice, 
      minStars, 
      maxStars, 
      minRating 
    } = req.query;

    let query = {};

    // Add filters based on provided parameters
    if (destinationId) {
      query.destinationId = destinationId;
    }

    if (minPrice || maxPrice) {
      query.priceFrom = {};
      if (minPrice) query.priceFrom.$gte = parseFloat(minPrice);
      if (maxPrice) query.priceFrom.$lte = parseFloat(maxPrice);
    }

    if (minStars || maxStars) {
      query.stars = {};
      if (minStars) query.stars.$gte = parseInt(minStars);
      if (maxStars) query.stars.$lte = parseInt(maxStars);
    }

    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    const hotels = await Hotel.find(query).populate('destination').sort({ name: 1 });
    res.json(hotels);
  } catch (error) {
    console.error('Error filtering hotels:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllHotels,
  getHotelById,
  getHotelsByDestination,
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelsByPriceRange,
  getHotelsByStars,
  filterHotels
}; 