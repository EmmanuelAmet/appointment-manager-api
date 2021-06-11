const express = require('express')
const router = express.Router()
const Slot = require('../model/slot')
const auth = require('../middleware/auth')

//Create time slot endpoint - only organization is permitted
router.post('/api/v1/create/slots', auth, async(req, res) => {
    try {
        const role = req.user.role.toLowerCase()
        if (role == 'client') {
            return res.status(403).send({ "Error": "Only an organization can create a time slot." })
        }
        const slot = new Slot({
            ...req.body,
            owner: req.user._id
        })
        await slot.save()
        res.status(201).send({ slot })
    } catch (e) {
        res.status(400).send(e)
    }
})

//Fetch or Get slots endpoint - Both organization and clients can view slots
router.get('/api/v1/slots', auth, async(req, res) => {
    try {
        const slot = await Slot.find({})
        if (!slot) {
            return res.status(404).send()
        }
        res.send(slot)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Update a slot
router.patch('/api/v1/slot/:id', auth, async(req, res) => {
    const role = req.user.role.toLowerCase()
    if (role == 'client') {
        return res.status(403).send({ "Error": "Only an organization can edit a time slot." })
    }

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'from', 'to', 'date', 'timeZone']

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if (!isValidOperation) {
        res.status(400).send({ 'Error': 'Invalide Update.' })
    }

    try {
        const _id = req.params.id
        const slot = await Slot.findOne({ _id: _id, owner: req.user._id })

        if (!slot) {
            return res.status(404).send()
        }
        updates.forEach((update) => {
            slot[update] = req.body[update]
        })
        await slot.save()
        res.send(slot)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Delete event
router.delete('/api/v1/slot/:id', auth, async(req, res) => {
    try {
        const role = req.user.role.toLowerCase()
        if (role == 'client') {
            return res.status(403).send({ "Error": "Only an organization can delete a time slot." })
        }
        const _id = req.params.id
        const slot = await Slot.findOneAndDelete({ _id: _id, owner: req.user._id })
        if (!slot) {
            return res.status(404).send()
        }
        res.send(slot)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router