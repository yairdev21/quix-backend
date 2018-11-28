const hendleApi = {
    getTamplates(req, res, next) {
        res.status(200).json({
            message: 'getting data'
        });
    }    
}

module.exports = hendleApi