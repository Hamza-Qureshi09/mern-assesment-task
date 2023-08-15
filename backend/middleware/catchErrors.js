const errorHandler = require('../utils/ErroHandler')

module.exports = (err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || 'Internal server error'



    // wrong mongodb id error 
    if (err.name === ('CaseError' || 'CastError')) {
        const message = `Resource not found, Invalid ${err.path}, ${err.message}`
        err = new errorHandler({ message, status: 400 })
    }

    res.status(err.status).json({
        success: false,
        message: err.message
    })
}