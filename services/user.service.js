const { User } = require('../modals');

const handleUser = {
    async signUp(req, res, next) {
        try {
            const user = await User.create(req.body);
            const { id, userName, email } = user;

            req.session.login({userName, email, id},req, next)

            res.status(200).json({
                userName, email, info: req.session.userInfo
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
            const { id, userName, email } = user;
            const isMatch = await user.comperePassword( req.body.password );

            if( isMatch ) {
                req.session.login({userName, email, id},req, next)
                
                res.status(200).json({
                    userName, email, id, session: req.session
                })
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