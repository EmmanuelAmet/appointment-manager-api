const mongoose = require('mongoose')
const validator = require('validator')

//Model for booking time slot
const bookSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    email: {
        required: true,
        type: String,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email.')
            }
        },
        ref: 'User'
    },
    contact: {
        required: true,
        type: String,
        maxlength: 13,
        minlength: 10,
        trim: true,
        ref: 'User'
    },
    firstname: {
        type: String,
        trim: true,
        ref: 'User'
    },
    lastname: {
        type: String,
        trim: true,
        ref: 'User'
    },
    slot: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

}, {
    timestamps: true
})

const Book = new mongoose.model('Bookings', bookSchema)

module.exports = Book