const express = require('express');
const router = express.Router();
const {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  getDestinationsByCountry
} = require('../controllers/destinationController');

// GET all destinations
router.get('/', getAllDestinations);

// GET destination by ID
router.get('/:id', getDestinationById);

// POST create new destination
router.post('/', createDestination);

// PUT update destination
router.put('/:id', updateDestination);

// DELETE destination
router.delete('/:id', deleteDestination);

// GET destinations by country
router.get('/country/:country', getDestinationsByCountry);

module.exports = router; 