const catchAsyncError = require('../middleware/catchAsyncError');
const carCategoryModel = require('../src/models/car_category');
const carModel = require('../src/models/car_model');
const Joi = require('joi');
const { Responces, Messages } = require('../utils/responces/responses')

// @User
// @Mode :- Controller
// #POST /createcarcategory
const CreateCarCategory = catchAsyncError(
    async (req, res, next) => {
        const userInfo = req.userInfo;
        const { carCategory } = req.body
        if (!carCategory || !userInfo) {
            return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: Messages.INCOMPLETE_INFORMATION, status: Responces.INCOMPLETE_INFORMATION })
        }
        const schema = Joi.object({
            carCategory: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: `${error.name}\n${error.message}`, status: Responces.INCOMPLETE_INFORMATION })

        const carcategory = await carCategoryModel.findOne({ carCategory })
        if (carcategory) return res.status(Responces.CONFLICT_ERROR).json({ message: Messages.CONFLICT_ERROR, status: Responces.CONFLICT_ERROR })

        await carCategoryModel({
            carCategory
        }).save()
        return res.status(Responces.CREATED).json({ status: Responces.CREATED, message: Messages.CREATED })
    }

)


// @User 
// @Mode :- Controller
// #GET /readcars
const ReadCarCategory = catchAsyncError(async (req, res, next) => {
    const findAllCategories = await carCategoryModel.find({}).lean().exec()
    return res.status(Responces.SUCCESS).json({ message: Messages.SUCCESS, status: Responces.SUCCESS, carCategories: findAllCategories })
})


// @User 
// @Mode :- Controller
// #PUT /updatecar
const UpdateCarCategory = catchAsyncError(async (req, res, next) => {
    const userInfo = req.userInfo;
    const { carCategoryId, carCategory } = req.body
    if (!carCategory || !userInfo || !carCategoryId) {
        return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: Messages.INCOMPLETE_INFORMATION, status: Responces.INCOMPLETE_INFORMATION })
    }
    const schema = Joi.object({
        carCategory: Joi.string().required(),
        carCategoryId: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: `${error.name}\n${error.message}`, status: Responces.INCOMPLETE_INFORMATION })

    await carCategoryModel.findOneAndUpdate(
        { _id: carCategoryId },
        {
            $set: { carCategory }
        },
        { new: true }).lean().exec()
    return res.status(Responces.SUCCESS).json({ message: Messages.SUCCESS, status: Responces.SUCCESS })
})


// @User 
// @Mode :- Controller
// #DELETE /deletecar
const DeleteCarCategory = catchAsyncError(async (req, res, next) => {
    const userInfo = req.userInfo;
    const { carCategoryId } = req.query
    if (!userInfo || !carCategoryId) {
        return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: Messages.INCOMPLETE_INFORMATION, status: Responces.INCOMPLETE_INFORMATION })
    }
    const schema = Joi.object({
        carCategoryId: Joi.string().required(),
    });
    const { error } = schema.validate(req.query);
    if (error) return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: `${error.name}\n${error.message}`, status: Responces.INCOMPLETE_INFORMATION })

    await carCategoryModel.findOneAndDelete({ _id: carCategoryId }).lean().exec()
    return res.status(Responces.SUCCESS).json({ message: Messages.SUCCESS, status: Responces.SUCCESS })
})


// @User 
// @Mode :- Controller
// #POST /createcar
const createCar = catchAsyncError(async (req, res, next) => {
    const userInfo = req.userInfo;
    const { carCategory, carModal, carRegno, carColor } = req.body
    if (!carCategory || !userInfo || !carModal || !carRegno || !carColor) {
        return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: Messages.INCOMPLETE_INFORMATION, status: Responces.INCOMPLETE_INFORMATION })
    }

    const schema = Joi.object({
        carCategory: Joi.string().required(),
        carModal: Joi.string().required(),
        carRegno: Joi.string().required(),
        carColor: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: `${error.name}\n${error.message}`, status: Responces.INCOMPLETE_INFORMATION })

    const carExist = await carModel.findOne({ carRegno })
    if (carExist) return res.status(Responces.CONFLICT_ERROR).json({ message: Messages.CONFLICT_ERROR, status: Responces.CONFLICT_ERROR })

    const findCategory = await carCategoryModel.findOne({ carCategory })
    if (!findCategory) return res.status(Responces.CONFLICT_ERROR).json({ message: 'No car category exist!', status: Responces.CONFLICT_ERROR })

    await carModel({
        carCategory: findCategory._id, carModal, carRegno, carColor
    }).save()
    return res.status(Responces.CREATED).json({ status: Responces.CREATED, message: Messages.CREATED })
})


// @User 
// @Mode :- Controller
// #GET /readcars
const readCars = catchAsyncError(async (req, res, next) => {
    const findAllCars = await carModel.find({}).populate({
        path: 'carCategory',
        modal: 'carCategory',
    }).lean().exec()
    return res.status(Responces.SUCCESS).json({ message: Messages.SUCCESS, status: Responces.SUCCESS, allCars: findAllCars })
})


// @User 
// @Mode :- Controller
// #PUT /updateCars
const updateCars = catchAsyncError(async (req, res, next) => {
    const userInfo = req.userInfo;
    const { carId, carCategory, carModal, carRegno, carColor } = req.body
    if (!carCategory || !userInfo || !carModal || !carRegno || !carColor || !carId) {
        return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: Messages.INCOMPLETE_INFORMATION, status: Responces.INCOMPLETE_INFORMATION })
    }
    const schema = Joi.object({
        carCategory: Joi.string().required(),
        carModal: Joi.string().required(),
        carRegno: Joi.string().required(),
        carColor: Joi.string().required(),
        carId: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: `${error.name}\n${error.message}`, status: Responces.INCOMPLETE_INFORMATION })

    await carModel.findOneAndUpdate(
        { _id: carId },
        {
            $set: {
                carModal,
                carRegno,
                carColor
            }
        },
        { new: true }).lean().exec()
    return res.status(Responces.SUCCESS).json({ message: Messages.SUCCESS, status: Responces.SUCCESS })
})


// @User 
// @Mode :- Controller
// #DELETE /deletecars
const deleteCars = catchAsyncError(async (req, res, next) => {
    const userInfo = req.userInfo;
    const { carId } = req.query
    if (!userInfo || !carId) {
        return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: Messages.INCOMPLETE_INFORMATION, status: Responces.INCOMPLETE_INFORMATION })
    }
    const schema = Joi.object({
        carId: Joi.string().required(),
    });
    const { error } = schema.validate(req.query);
    if (error) return res.status(Responces.INCOMPLETE_INFORMATION).json({ message: `${error.name}\n${error.message}`, status: Responces.INCOMPLETE_INFORMATION })

    await carModel.findOneAndDelete({ _id: carId }).lean().exec()
    return res.status(Responces.SUCCESS).json({ message: Messages.SUCCESS, status: Responces.SUCCESS })
})

module.exports = { CreateCarCategory, ReadCarCategory, UpdateCarCategory, DeleteCarCategory, createCar, readCars, updateCars, deleteCars }