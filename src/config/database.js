const mongoose = require("mongoose");

async function connectToDB() {

    await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to the database');
        })
        .catch((err) => {
            console.error('Connection error:', err.message); 
        });

}

module.exports = connectToDB;