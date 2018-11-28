module.exports = function hendleErrors(error, req,res, next ) {
    res.status(error.status || 500).json({
        message: error.message || 'Try again later'
    })
}