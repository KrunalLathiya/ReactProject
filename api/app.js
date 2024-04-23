const express = require('express');
const cors = require('cors');
const businessRoutes = require('./businessRoutes');
const path = require("path");

function createApp() {
    const app = express();

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    app.use(express.json());
    // Use the business routes in the application
    app.use('/business', businessRoutes);

    return app;
}

module.exports = createApp;