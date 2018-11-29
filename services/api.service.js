const { Site, User } = require('../modals');
const seed = require('./seed');

const hendleApi = {
    getTamplates(req, res, next) {
        res.status(200).json({
            message: 'getting data'
        });
    },

    async addSite(req, res, next) {
        try {
            let site = await Site.create( seed );

              if(req.params.id) {
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