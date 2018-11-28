const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
    date: new Date(),
    name: {
        type: String,
        required: true
    },
    sections: [
        {
            col: {
                type: Number,
                required: true
            },

            elements: [
                {
                    

                }
            ]
        }
    ]
})