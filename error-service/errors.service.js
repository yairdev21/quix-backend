module.exports = function errorHandler(error, req, res, next ) {
    console.log('error', error.message);
    
    res.status(error.status || 500).json({
        message: error.message || 'Try again later'
    })
}