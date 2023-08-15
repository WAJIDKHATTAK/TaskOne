const errorHandlerMiddleware = (err, req, res, next) => {

    const statusCode = err.statusCode || 500
    let error = { ...err }
    error.message = err.message

    //Handling mongoose Validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error = new Error(message)
    }
    //Wrong mongoose Object ID error
    if (err.name === 'CastError') {
        const message = `Resource not found. invalid ${err.path}`
        // error = message
        error = new Error(message)
    }

    //Handling mongoose Duplicate key error
    if (err.code === 11000) {
        const message = `${Object.keys(err.keyValue)} already exists`
        error = new Error(message)
    }

    res.status(statusCode).json({
        success: false,
        message: error.message || "Internal Server Error"     //we got error.message in return from Error(message)
    })

}

module.exports = errorHandlerMiddleware