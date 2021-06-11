const mongoose = require('mongoose')
const validator = require('validator')

//Model for time slot
const timeSlotSchema = mongoose.Schema({
    date: {
        type: String,
        trim: true,
        required: true
    },
    from: {
        type: String,
        required: true,
        trim: true
    },
    to: {
        type: String,
        required: true,
        trim: true
    },
    timeZone: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        maxlength: 11,
        unique: true,
        required: true,
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


//Delete slot from many
timeSlotSchema.pre('remove', async function(next) {
    const slot = this
    await Slot.deleteMany({ owner: user._id })

    next()
})

const Slot = new mongoose.model('Slot', timeSlotSchema)

module.exports = Slot