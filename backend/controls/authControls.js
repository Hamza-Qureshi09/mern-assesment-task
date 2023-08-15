const catchAsyncError = require('../middleware/catchAsyncError');
const userModel = require('../src/models/user_model');
const sessionModel = require('../src/models/session');
const bcrypt = require('bcrypt')
const Joi = require('joi');
const jwtToken = require('../utils/tokens');
const cookie = require('../utils/cookies');
const { Responces, Messages } = require('../utils/responces/responses')
const sendMail = require('../utils/Sendmail')
const crypto = require('crypto') 

// @User
// @Mode :- Controller
// #POST /register
const Register = catchAsyncError(
    async (req, res, next) => {
        const { username, useremail, password, confirmPassword } = req.body;

        if (!username || !useremail || !password || !confirmPassword) {
            return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: Messages.INCOMPLETE_INFORMATION, status: Responces.INCOMPLETE_INFORMATION })
        }

        const schema = Joi.object({
            username: Joi.string().required(),
            useremail: Joi.string().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required()
                .valid(Joi.ref('password'))
                .messages({
                    'Confirm_Password': 'Password and Confirm Password must match',
                }),
        });

        const { error } = schema.validate(req.body);
        if (error) return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: `${error.name}\n${error.message}`, status: Responces.INCOMPLETE_INFORMATION })

        const findUserRec = await userModel.findOne({ useremail })
        if (findUserRec) {
            return res.status(Responces.CONFLICT_ERROR).json({ message: Messages.CONFLICT_ERROR, status: Responces.CONFLICT_ERROR })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = crypto.randomInt(1000, 9999)
        const time = 1000 * 60 * 5;
        const expireTime = Date.now() + time;
        const data = `${otp}.${expireTime}`
        const hash = crypto.createHmac('sha256', process.env.HASH_SECERET).update(data).digest('hex')

        const sendEmail = await sendMail(useremail, 'Mern Assesment OTP', otp)

        if (sendEmail) {
            await userModel({
                username,
                useremail,
                userpassword: hashedPassword,
            }).save();

            return res.status(Responces.CREATED).json({
                success: Messages.CREATED, user: {
                    email: useremail,
                    token: `${hash}.${expireTime}${otp}`
                }
            })
        } else {
            return res.status(Responces.FORBIDDEN).json({ message: Messages.FORBIDDEN, status: Responces.FORBIDDEN })
        }

    }

)


// @User 
// @Mode :- Controller
// #POST /verifyOtp
const VerifyOtp = catchAsyncError(async (req, res, next) => {

    const { hash, otp, email } = req.body;
    if (!hash || !otp || !email) {
        return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: Messages.INCOMPLETE_INFORMATION, status: Responces.INCOMPLETE_INFORMATION })
    }

    const schema = Joi.object({
        hash: Joi.string().required(),
        otp: Joi.string().required(),
        email: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: `${error.name}\n${error.message}`, status: Responces.INCOMPLETE_INFORMATION })

    const [hashToken, expire] = hash.split('.');
    const expTime = expire.slice(0, expire.length - 4)
    const actualOtp = expire.slice(expire.length - 4, expire.length)
    if (Date.now() > expTime) {
        return res.status(Responces.UNAUTHORIZED).json({ status: Responces.UNAUTHORIZED, message: Messages.UNAUTHORIZED })
    }
    if (otp !== actualOtp) {
        return res.status(Responces.UNAUTHORIZED).json({ status: Responces.UNAUTHORIZED, message: Messages.UNAUTHORIZED })
    }
 
    const data = `${actualOtp}.${expTime}`;
    const HashAgainforVerify = crypto.createHmac('sha256', process.env.HASH_SECERET).update(data).digest('hex');

    if (HashAgainforVerify === hashToken) {
        const userExist = await userModel.findOne({ useremail: email })
        if (userExist) {
   
            const acsT = jwtToken(userExist._id, process.env.Token_Secret, process.env.Token_Algorithum, process.env.TAuthAudience, process.env.issuer, process.env.Token_Expire);
            await sessionModel({
                userId: userExist._id,
                AccessToken: acsT,
                docExpire: new Date(Date.now() + 60 * 60 * 1000),
            }).save()
            cookie('access', `_hhq_${acsT}`, {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + 1000 * 60 * process.env.Cookie_Expiry),
                sameSite: 'None',
            }, res)
            const newUserRecord = await userModel.findOneAndUpdate(
                { _id: userExist._id },
                {
                    $set: {
                        expire: null,
                        verification: 'Complete'
                    }
                },
                { new: true }
            )
            const { createdAt, updatedAt, userpassword, ...userInfo } = newUserRecord._doc
            return res.status(Responces.SUCCESS).json({ message: Messages.SUCCESS, userInfo, authorization: true, activation: true })

        } else {
            return res.status(Responces.NOT_FOUND).json({ status: Responces.NOT_FOUND, message: Messages.NOT_FOUND })
        }
    } else {
        return res.status(Responces.NOT_FOUND).json({ status: Responces.NOT_FOUND, message: Messages.NOT_FOUND })
    }

})


// @User 
// @Mode :- Controller
// #POST /login
const Login = catchAsyncError(async (req, res, next) => {
    const { useremail, password } = req.body;
    if (!useremail || !password) {
        return res.status(Responces.INCOMPLETE_INFORMATION).json({ status: Responces.INCOMPLETE_INFORMATION, message: Messages.INCOMPLETE_INFORMATION })
    }
    const schema = Joi.object({
        useremail: Joi.string().required(),
        password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: `${error.name}\n${error.message}`, status: Responces.INCOMPLETE_INFORMATION })
    const userExist = await userModel.findOne({ useremail }).select('+userpassword');

    if (userExist) {
        if (userExist.verification === 'Pending') return res.status(Responces.FORBIDDEN).json({ status: Responces.FORBIDDEN, message: 'Account verification is incomplete!' })
        const matchPass = await bcrypt.compare(password, userExist.userpassword)
        if (matchPass) {

            const acsT = jwtToken(userExist._id, process.env.Token_Secret, process.env.Token_Algorithum, process.env.TAuthAudience, process.env.issuer, process.env.Token_Expire);
            await sessionModel({
                userId: userExist._id,
                AccessToken: acsT,
                docExpire: new Date(Date.now() + 60 * 60 * 1000),
            }).save()
            cookie('access', `_hhq_${acsT}`, {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + 1000 * 60 * process.env.Cookie_Expiry),
                sameSite: 'None',
            }, res)
            const { createdAt, updatedAt, userpassword, ...userInfo } = userExist._doc
            return res.status(Responces.SUCCESS).json({ message: Messages.SUCCESS, userInfo, authorization: true, activation: true })
        } else {
            return res.status(Responces.FORBIDDEN).json({ status: Responces.FORBIDDEN, message: Messages.BAD_REQUEST })
        }
    } else {
        return res.status(Responces.NOT_FOUND).json({ status: Responces.NOT_FOUND, message: Messages.NOT_FOUND })
    }
})


// @User 
// @Mode :- Controller
// #GET /verifyMe
const verifySession = catchAsyncError(async (req, res, next) => {
    const userInfo = req.userInfo;

    return res.status(200).json({ message: Messages.SUCCESS, userInfo, authorization: true, activation: true })
})


// @User 
// @Mode :- Controller
// #GET /logout
const Logout = catchAsyncError(async (req, res, next) => {
    const userInfo = req.userInfo;
    await sessionModel.findOneAndDelete({ userId: userInfo._id })
    res.clearCookie('access')
    return res.status(200).json({ message: Messages.SUCCESS })
})


module.exports = { Register, VerifyOtp, Login, verifySession, Logout }