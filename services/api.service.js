const { Site, User } = require('../modals');
const seed = require('../services/seed.json');

const hendleApi = {
    async getTamplates(req, res, next) {
        try {            
            const tamplates = await Site.find();

            res.status(200).json({
                tamplates
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

    // async addSite(req, res, next) {
    //     try {
    //         let site = await Site.create( req.body );

    //           if(req.params.id) {
    //             let foundUser = await User.findById(req.params.id);
    //             foundUser.sites.push(site.id);

    //             await foundUser.save();
    //             let foundSite = await Site.findById(site._id).populate("user", {
    //               username: true,
    //             });
    //           }

    //           return res.status(200).json(site);
    //     } catch (err) {
    //         next(err)
    //     }
    // }
    async addSite(req, res, next) {
        const sites = seed.sites.map(site => site).forEach(async (site) => {
            try {
                await Site.create( site );
    
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
        });
        
    }
}

module.exports = hendleApi