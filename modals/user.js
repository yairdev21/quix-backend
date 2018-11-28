const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcript = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator:  isEmail,
            message: 'invalid email'
        },
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },

    userName: {
        type: String,
        trim: true,
        minlength: 2
    },
    
    sites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Site'
        }
    ]
});

userSchema.pre('save', async function( next ) {
    try {
        if(!this.isModified('password')) {
            return next()
        }

        let hash = await bcript.hash(this.password, 10);
        this.password = hash;

        return next();

    } catch (err) {
        return next(err)
    }
})

userSchema.methods.comperePassword = async function(givenPassword, next) {
    try {
        let isMatch = bcript.compare(givenPassword, this.password);
        
        return isMatch;
    } catch (err) {
        return next(err);
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;