const mongoose = require('mongoose');
const User = require('./user');

const siteSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },

    thumb: {
        type: String
    },
    name: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    sections: [
        {
            data: {
                type: Object,
                required: true
            },

            name: {
                type: String,
                required: true
            },

            type: {
                type: String,
                required: true
            },

            style: {
                type: Object,
            },

            elements: [
                {
                    name: {
                        type: String,
                        required: true
                    },
        
                    type: {
                        type: String,
                        required: true
                    },

                    data: {
                        type: Object,
                        required: true
                    },

                    style: {
                        type: Object,
                    }

                }
            ]
        }
    ]
});

const Site = mongoose.model('site', siteSchema);

module.exports = Site;