const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/facelink');
        console.log(' MongoDB forbundet succesfuldt');
    } catch (error) {
        console.error(' MongoDB forbindelsesfejl:', error);
        process.exit(1);
    }
};

module.exports = connectDB;