const express = require('express');
const cors = require('cors');
const path = require("path");

const userRoutes = require('./routes/userRoutes');
const businessRoutes = require('./routes/businessRoutes');

function createApp() {
    const app = express();

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    app.use(express.json());
    // Use the business routes in the application
    app.use('/business', businessRoutes);
    app.use('/auth', userRoutes);

    return app;
}

module.exports = createApp;