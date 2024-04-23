const mongoose = require('mongoose');
const config = require('./DB');

async function connectDB() {
    try {
        await mongoose.connect(config.DB);
        console.log('Database is connected');
    } catch (err) {
        console.error('Cannot connect to the database', err);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;