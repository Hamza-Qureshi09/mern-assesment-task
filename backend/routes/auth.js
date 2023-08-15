const router = require('express').Router();
const verifyTokenAndSession = require('../middleware/verifyTokenAndSession')
const { Register, VerifyOtp, Login, verifySession, Logout } = require('../controls/authControls')
const AuthLimiter = require('../middleware/authLimiter')


// @User 
// @Mode :-auth Route
// #POST /api/v1/login
router.post('/v1/register', AuthLimiter, Register)

// @User 
// @Mode :-auth Route
// #POST /api/v1/login
router.post('/v1/login', AuthLimiter, Login)

// @User 
// @Mode :-auth Route
// #POST /api/v1/otpverify
router.post('/v1/otpverify', AuthLimiter, VerifyOtp)

// @User 
// @Mode :- Route
// #GET /api/v1/verifyMe
router.get('/v1/verifySession', verifyTokenAndSession, verifySession)

// @User 
// @Mode :- Route
// #GET /api/v1/logout
router.get('/v1/logout', verifyTokenAndSession, Logout)

module.exports = router