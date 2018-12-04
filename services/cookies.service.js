const mongoose = require('mongoose');

const session = require('express-session');
const mongoStoreFactory = require('connect-mongo');
const cookieParser = require('cookie-parser');

 
module.exports = function sessionManagementConfig(app) {
 
    const MongoStore = mongoStoreFactory(session);
    
    app.use(cookieParser());
    app.use(session({
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        }),
        secret: process.env.SECRET_SESSION_KEY,
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 1000* 60 * 60 *24 * 365,
            secure: true,
        },
        name: 'user'
    }));
 
    session.Session.prototype.login = ( user, req, res, next) => {
        req.session.regenerate(function(err){
            if (err){
                next(err);
            }
        });
        
        req.session.user = user;
    }
}