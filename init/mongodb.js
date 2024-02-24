const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URL);
        console.log('Connected to database');
    } catch (error) {
        console.log('Error connecting to database', error.message);
        process.exit(1);
    }
}

module.exports = connectMongoDb;