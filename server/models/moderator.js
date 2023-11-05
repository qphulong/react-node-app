const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const moderatorSchema = new mongoose.Schema({
    moderatorId: {
        type: String,
        required: true,
    },

    profilePic: {
        type: String, // to store url of profile picture
    },

    password: {
        type: String,
        required: true,
    },

});