const { Site, User } = require('../modals');

const hendleApi = {
    async getTemplates(req, res, next) {
        try {
            const templates = await Site.find();

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
    },

    async updateTamplate(req, res, next) {
        try {
            console.log( 'body',req.body);
            
            const tamplate = await Site.findByIdAndUpdate(req.params.id, req.body, {new: true});
            // console.log( tamplate );

            return res.status(200).json(tamplate);
        } catch (err) {
            next(err)
        }
    }
}

module.exports = hendleApi