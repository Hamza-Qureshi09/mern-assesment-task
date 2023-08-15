const mongoose = require("mongoose");
const validator = require("validator")

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    useremail: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: (val) => {
                return validator.isEmail(val)
            },
            message: props => `${props.value} is not a valid email address.`,
            errorCode: 400
        },
    },
    userpassword: {
        type: String,
        required: true,
        trim: true,
        select: false,
        minLength: 8,
        maxlength: 128,
        validate: {
            validator: (value) => {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)
            },
            message: props => `${props.value} is not a valid password. It should contain at least one uppercase letter, one lowercase letter, and one number.`,
            errorCode: 400
        }
    },
    expire: { type: Date, required: true, default: new Date(Date.now() + 5 * 60 * 1000) },
    verification: { type: String, required: true, default: 'Pending' }

}, { timestamps: true })


const Users = new mongoose.model("user", usersSchema, 'users');

Users.collection.createIndex({ expire: 1 }, { expireAfterSeconds: 0 })
module.exports = Users

