const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect( process.env.MONGOOSE_LOCALHOST , { useNewUrlParser: true, useCreateIndex: true });

mongoose.Promise = Promise;

module.exports.User = require('./user');
module.exports.Site = require('./site');