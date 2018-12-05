const {
    Site,
    User
} = require('../modals');

const hendleApi = {
    async getTemplates(req, res, next) {
        try {
            console.log('in');
            
            const templates = await Site.find();

            res.status(200).json({
                templates
            });

        } catch (err) {
            next(err)
        }
    },

    async getSingleTamplate(req, res, next) {
        console.log('inside getByID', {params: req.params})
        try {
            const tamplate = await Site.findById(req.params.id);

            res.status(200).json({
                tamplate
            });

        } catch (err) {
            next(err)
        }
    },

    async getSingleTamplateByName(req, res, next) {
        console.log('inside getByName', {params: req.params})
        try {
            const tamplate = await Site.findOne({name: req.params.siteName});

            res.status(200).json({
                tamplate
            });

        } catch (err) {
            next(err)
        }
    },

    async addSite(req, res, next) {
        try {
            const site = await Site.create(req.body);
            const foundUser = await User.findById(site.user);
            foundUser.sites.push(site.id);

            await foundUser.save();

            const foundSite = await Site.findById(site._id).populate("user", {
                email: true,
            });

            return res.status(200).json(foundSite);
        } catch (err) {
            next(err)
        }
    },

    async updateTamplate(req, res, next) {
<<<<<<< HEAD
        try {
            const tamplate = await Site.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
=======
        try {            
            const tamplate = await Site.findByIdAndUpdate(req.params.id, req.body, {new: true});

>>>>>>> a
            return res.status(200).json(tamplate);
        } catch (err) {
            next(err)
        }
    }
}

module.exports = hendleApi