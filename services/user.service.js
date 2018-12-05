const jwt = require('jsonwebtoken');
const { User } = require('../modals');

const handleUser = {
    async isAuthorize(req, res, next) {
        try {         
            const token = req.headers.authorization.split(' ')[1];
            console.log("token", token);

            jwt.verify(token, process.env.SECRET_TOKEN_KEY, function(err, decoded) {
                if (decoded) {

                    res.status(200).json({...decoded});
    
                } else {
                    return next({
                        status: 401,
                        message: 'Please log in first'
                    });
                }
            });
    
        } catch (err) {
            console.log('error', err);
    
            return next({
                status: 401,
                message: 'Please log in first'
            });
        }
    },
    // async getUser(req, res, next) {
    //     try {
    //         res.status(200).json(
    //             req.session.get('user')
    //         );

    //     } catch (err) {
    //         next(err)
    //     }
    // },

    async signUp(req, res, next) {
        try {
            const user = await User.create(req.body);
            const { userName, email, image, id } = user;

            const token = jwt.sign({
                email,
                userName,
                image,
                id
            }, process.env.SECRET_TOKEN_KEY);

            res.status(200).json( { userName, email, image, id, token } )

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
                const token = jwt.sign({
                    email,
                    userName,
                    image,
                    id
                }, process.env.SECRET_TOKEN_KEY);

            res.status(200).json( { userName, email, image, id, token } )
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
    }
}

module.exports = handleUser