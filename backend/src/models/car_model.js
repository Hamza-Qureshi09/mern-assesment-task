const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    carCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'carCategory',
        required: true
    },
    carModal:{
        type:String,
        required:true
    },
    carRegno:{
        type:String,
        required:true,
        unique:true
    },
    carColor:{
        type:String,
        required:true
    },
}, { timestamps: true })


const car = new mongoose.model("car", carSchema, 'cars');

module.exports = car

