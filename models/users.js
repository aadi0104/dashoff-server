const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    score: [
        {
            wpm: {
                type: String,
                required: true,
            },
            accuracy: {
                type: String,
                required: true,
            },
            time: {
                type: String,
                required: true,
            },
            timedetails: {
                type: String,
                required: true,
            },
        }
    ],
}, { timestamps: true });

const Users = mongoose.model("users", userSchema);

module.exports = { Users };