const express = require('express');
const youtubeRoutes = require('./routes/youtube');

const app = express();

/* Middlewares */
app.use(express.json());

/* Routes */
app.use('/api/youtube', youtubeRoutes);

module.exports = app;
