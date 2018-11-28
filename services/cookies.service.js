const mongoose = require('mongoose');

const session = require('express-session');
const mongoStoreFactory = require('connect-mongo');
 
module.exports = function sessionManagementConfig(app) {
 
    const MongoStore = mongoStoreFactory(session);
 
    app.use(session({
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        }),
        secret: process.env.SECRET_SESSION_KEY,
        saveUninitialized: true,
        resave: false,
        cookie: {
            // secure: false
            path: "/",
        },
        name: 'id'
    }));
 
    session.Session.prototype.login = function(user,req, next){
        req.session.regenerate(function(err){
            if (err){
                next(err);
            }
        });
        
        req.session.userInfo = user;
    };
}