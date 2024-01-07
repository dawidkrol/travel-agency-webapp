const Travel = require('../models/travelModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../middleware/AppError');

exports.getAllTrips = catchAsync(async (req, res, next) => {
  const trips = await Travel.find();
  res.status(200).json(trips);
});

exports.getTrip = catchAsync(async (req, res, next) => {
  const trips = await Travel.findOne({ id: req.params.id });
  if (!trips) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json(trips);
});

exports.createTrip = catchAsync(async (req, res, next) => {
  const trips = await Travel.create(req.body);
  res.status(201).json(trips);
});

exports.deleteTrip = catchAsync(async (req, res, next) => {
  await Travel.findOneAndDelete({ id: req.params.id });
  res.status(204);
});
