const router = require('express').Router();
const verifyTokenAndSession = require('../middleware/verifyTokenAndSession')
const { AllUsers } = require('../controls/conversationController')


// @User 
// @Mode :-auth Route
// #GET /api/v1/allusers
router.get('/v1/allusers', verifyTokenAndSession, AllUsers)

module.exports = router