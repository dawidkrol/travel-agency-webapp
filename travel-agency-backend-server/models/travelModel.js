const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'A user must have a name'],
  },
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  country: {
    type: String,
    required: [true],
  },
  startDate: {
    type: Date,
    required: [true],
  },
  endDate: {
    type: Date,
    required: [true],
  },
  unitPrice: {
    type: Number,
    required: [true],
  },
  description: {
    type: String,
    required: [true],
  },
  maximumNumberOfSpots: {
    type: Number,
    required: [true],
  },
  avaliableNumberOfSpots: {
    type: Number,
    required: [true],
  },
  photoLink: {
    type: String,
    required: [true],
  },
});

const Travel = mongoose.model('Travel', travelSchema);
module.exports = Travel;
