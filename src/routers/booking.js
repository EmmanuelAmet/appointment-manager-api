const express = require('express')
const router = express.Router()
const Book = require('../model/book')
const auth = require('../middleware/auth')
const { sendSMS, scheduleSMS } = require('../service/sms')

//Book a time slot or appointment endpoint
router.post('/api/v1/book/slot', auth, async(req, res) => {
    try {
        const role = req.user.role.toLowerCase()
        if (role == 'organization') {
            return res.status(403).send({ "Error": "Only a client can create an appointment with organization." })
        }

        const book = new Book({
            ...req.body,
            email: req.user.email,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            contact: req.user.contact,
            owner: req.user._id
        })
        await book.save()
        sendSMS(req.user.contact, req.user.firstname)

        const currentDate = new Date();
        const scheduleDateTime = new Date(currentDate.getTime() - 15 * 60000);
        const time = '10-06-2021 04:46 PM'
        scheduleSMS(req.user.contact, req.user.firstname, time)
        res.status(201).send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Fetch or Get appointments created by users endpoint - organization
router.get('/api/v1/bookings/all', auth, async(req, res) => {
    try {
        const bookings = await Book.find({})
        if (!bookings) {
            return res.status(404).send()
        }
        res.send(bookings)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Fetch time slots or appointment booked or created by a particular client endpoint
router.get('/api/v1/book/slot/me', auth, async(req, res) => {
    try {
        const bookings = await Book.find({ owner: req.user._id })
        if (!bookings) {
            res.send({ "message": "No Slot found, please, try booking a slot." })
        }

        res.send(bookings)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router