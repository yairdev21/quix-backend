const { User } = require('../modals');

const handleUser = {
    async signUp(req, res, next) {
        try {
            const user = await User.create(req.body);
            const { userName, email, image } = user;

            req.session.login({userName, email, image},req, next)

            res.status(200).json({
                info: req.session.userInfo
            })

        } catch (err) {
            if (err.code === 11000) {
                err.message = "Sorry, that username and/or email is taken";
            }

            return next({
            status: 400,
            message: err.message
            });
        }
    },

    async signIn(req, res, next) {        
        try {       
            const user = await User.findOne({ email: req.body.email });

            const { userName, email, image, id } = user;
            const isMatch = await user.comperePassword( req.body.password );

            if( isMatch ) {
                req.session.login({ userName, email, image, id },req, next)
                
                res.status(200).json(req.session.userInfo)
            } else {                
                next({
                    status: 400,
                    message: 'invalid email and/or password'
                })
            }
        } catch (err) {
            next({
                status: 400,
                message: 'invalid email and/or password'
            })
        }
    },

    logOut() {
        req.session.login({},req, next)
    }
}

module.exports = handleUser