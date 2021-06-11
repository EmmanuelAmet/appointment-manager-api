const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//Creaing model for users (both organization and client) endpoint - users are differentiated by their roles
const userSchema = mongoose.Schema({
    firstname: {
        required: true,
        type: String,
        trim: true
    },
    lastname: {
        required: true,
        type: String,
        trim: true
    },
    contact: {
        required: true,
        type: String,
        maxlength: 12,
        minlength: 12,
        trim: true
    },
    role: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    email: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email.')
            }
        }
    },
    password: {
        required: true,
        trim: true,
        type: String,
        minlength: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password must not contain password.')
            }
        }
    },
    tokens: [{
        token: {
            required: true,
            type: String
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual('slot', {
    ref: 'Slot',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('contactBooking', {
    ref: 'Book',
    localField: 'contact',
    foreignField: 'contact'
})

userSchema.virtual('firstnameBooking', {
    ref: 'Book',
    localField: 'firstname',
    foreignField: 'firstname'
})

userSchema.virtual('lastnameBooking', {
    ref: 'Book',
    localField: 'lastname',
    foreignField: 'lastname'
})

//Generating user token before saving user data
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    return token
}

//prevent exposing some data (password and token) to the response body, i.e encrypted password and tokens.
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//Checking if the password entered by user matches the encrypted saved password.
userSchema.statics.findByCredentials = async(email, password, role) => {
    const user = await User.findOne({ email, role })
    if (!user) {
        throw new Error('Unable to login!')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login!')
    }
    return user
}

//Hashing user password before saving user password
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = new mongoose.model('User', userSchema)

module.exports = User