const catchAsyncError = require('./catchAsyncError')
const jwt = require('jsonwebtoken')
const { Responces, Messages } = require('../utils/responces/responses')
const sessionModel = require('../src/models/session')
const userModel = require('../src/models/user_model')



module.exports = catchAsyncError(
    async (req, res, next) => {
        const { access } = req.cookies
        // cookie exist or not
        if (!access) {
            return res.status(Responces.UNAUTHORIZED).json({ status: Responces.UNAUTHORIZED, message: Messages.UNAUTHORIZED })
        }

        const acsToken = access?.split('_hhq_')[1]

        try {
            const decodedToken = jwt.verify(acsToken, process.env.Token_Secret);

            if (decodedToken.exp * 1000 < Date.now()) {
                return res.status(Responces.UNAUTHORIZED).json({ status: Responces.UNAUTHORIZED, message: Messages.UNAUTHORIZED })
            }

            if (decodedToken._id) {
                const userSession = await sessionModel.findOne({ userId: decodedToken._id }).lean().exec()

                if (userSession) {
                    const userDetails = await userModel.findOne({ _id: userSession.userId }).select('+userpassword');
                    const { createdAt, updatedAt, userpassword, ...userInfo } = userDetails._doc
                    // success
                    req.userInfo = userInfo,
                        next()

                } else {
                    // session expired
                    return res.status(Responces.UNAUTHORIZED).json({ status: Responces.UNAUTHORIZED, message: Messages.UNAUTHORIZED })
                }
            } else {
                return res.status(Responces.UNAUTHORIZED).json({ status: Responces.UNAUTHORIZED, message: Messages.UNAUTHORIZED })
            }
        } catch (error) {
            return res.status(Responces.UNAUTHORIZED).json({ status: Responces.UNAUTHORIZED, message: Messages.UNAUTHORIZED })
        }
    }
)

