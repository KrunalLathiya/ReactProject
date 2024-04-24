const mongoose = require('mongoose');
const DB = 'mongodb://localhost:27017/reactcrud'

async function connectDB() {
    try {
        await mongoose.connect(DB);
        console.log('Database is connected');
    } catch (err) {
        console.error('Cannot connect to the database', err);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;