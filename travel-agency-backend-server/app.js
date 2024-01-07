const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const tripsRouter = require('./routes/tripsRouter');
const errorHandling = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

app.use('/api/trips', tripsRouter);
app.use(errorHandling);

module.exports = app;
