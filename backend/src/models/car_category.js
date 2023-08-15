const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    carCategory: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true
    },
}, { timestamps: true })


const carCategories = new mongoose.model("carCategory", carSchema, 'carCategories');

module.exports = carCategories

