const express = require('express');
const travelController = require('../controllers/travelController');

const router = express.Router();
router
  .route('/')
  .get(travelController.getAllTrips)
  .post(travelController.createTrip);
router
  .route('/:id')
  .get(travelController.getTrip)
  .delete(travelController.deleteTrip);

module.exports = router;
