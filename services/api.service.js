const { Site, User } = require('../modals');
const seed = require('../services/seed.json')

const hendleApi = {
<<<<<<< HEAD
    async getTemplates(req, res, next) {
        try {
            const templates = await Site.find();
=======
    async getTamplates(req, res, next) {
        try {            
            const tamplates = await Site.find();
>>>>>>> 6ad7bc010b5761f81215cefbda6e657c48869f23

            res.status(200).json({
                templates
            });

        } catch (err) {
            next(err)
        }
    },

    async getSingleTamplate(req, res, next) {
        try {
            const tamplate = await Site.findById(req.params.id);

            res.status(200).json({
                tamplate
            });

        } catch (err) {
            next(err)
        }
    },

    async addSite(req, res, next) {
        try {
            let site = await Site.create(req.body);

            if (req.params.id) {
                let foundUser = await User.findById(req.params.id);
                foundUser.sites.push(site.id);

                await foundUser.save();
                let foundSite = await Site.findById(site._id).populate("user", {
                    username: true,
                });
            }

            return res.status(200).json(site);
        } catch (err) {
            next(err)
        }
    }
}

module.exports = hendleApi