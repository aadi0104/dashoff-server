const mongoose = require("mongoose");

const connectToMongoDB = async (url) => {
    await mongoose.connect(url)
        .then(() => console.log("MongoDB connected successfully!"))
        .catch((error) => console.log("Error: ", error));
};

module.exports = { connectToMongoDB };