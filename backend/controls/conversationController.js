const catchAsyncError = require('../middleware/catchAsyncError');
const userModel = require('../src/models/user_model');
const sessionModel = require('../src/models/session');
const Joi = require('joi');
const { Responces, Messages } = require('../utils/responces/responses')


// @User
// @Mode :- Controller
// #GET /allusers
const AllUsers = catchAsyncError(
    async (req, res, next) => {
        const loggedUser = req.userInfo
        const { username } = req.query

        const findAllusers = await userModel.find({
            $and: [{
                _id: { $ne: loggedUser._id }
            }, {
                username: { $regex: new RegExp(`^${username}`, 'i') }
            }]
        }).select('username useremail _id').lean().exec();

        return res.status(Responces.SUCCESS).json({ message: Messages.SUCCESS, users: findAllusers })
    }

)

module.exports = { AllUsers }