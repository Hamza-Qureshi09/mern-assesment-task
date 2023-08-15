const router = require('express').Router();
const verifyTokenAndSession = require('../middleware/verifyTokenAndSession')
const { CreateCarCategory, ReadCarCategory, UpdateCarCategory, DeleteCarCategory, createCar, readCars, updateCars, deleteCars } = require('../controls/carControls')


// @User 
// @Mode :-auth Route
// #POST /api/v1/createcarcategory
router.post('/v1/createcarcategory', verifyTokenAndSession, CreateCarCategory)

// @User 
// @Mode :-auth Route
// #GET /api/v1/readcarcategories
router.get('/v1/readcarcategories', ReadCarCategory)

// @User 
// @Mode :-auth Route
// #PUT /api/v1/updatecarcategory
router.put('/v1/updatecarcategory', verifyTokenAndSession, UpdateCarCategory)

// @User 
// @Mode :- Route
// #DELETE /api/v1/deletecarcategory
router.delete('/v1/deletecarcategory', verifyTokenAndSession, DeleteCarCategory)

// @User 
// @Mode :-auth Route
// #POST /api/v1/createcar
router.post('/v1/createcar', verifyTokenAndSession, createCar)

// @User 
// @Mode :-auth Route
// #GET /api/v1/readcars
router.get('/v1/readcars', readCars)

// @User 
// @Mode :-auth Route
// #PUT /api/v1/updatecar
router.put('/v1/updatecar', verifyTokenAndSession, updateCars)

// @User 
// @Mode :- Route
// #DELETE /api/v1/deletecar
router.delete('/v1/deletecar', verifyTokenAndSession, deleteCars)

module.exports = router