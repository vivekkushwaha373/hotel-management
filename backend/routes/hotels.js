const express = require('express');
const router = express.Router();
const {
  getAllHotels,
  getHotelById,
  getHotelsByDestination,
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelsByPriceRange,
  getHotelsByStars,
  filterHotels
} = require('../controllers/hotelController');

// GET all hotels with destination details
router.get('/', getAllHotels);

// GET hotel by ID
router.get('/:id', getHotelById);

// GET hotels by destination
router.get('/destination/:destinationId', getHotelsByDestination);

// POST create new hotel
router.post('/', createHotel);

// PUT update hotel
router.put('/:id', updateHotel);

// DELETE hotel
router.delete('/:id', deleteHotel);

// GET hotels by price range
router.get('/price/:minPrice/:maxPrice', getHotelsByPriceRange);

// GET hotels by star rating
router.get('/stars/:stars', getHotelsByStars);

// GET hotels with advanced filtering
router.get('/search/filter', filterHotels);

module.exports = router; 