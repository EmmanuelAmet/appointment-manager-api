const express = require('express')
const router = express.Router()
const User = require('../model/user')
const auth = require('../middleware/auth')

//Create account || User/Cleint registration endpoint
router.post('/api/v1/register/users', async(req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//User login endpoint
router.post('/api/v1/login/users', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password, req.body.role)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//View user details endpoint
router.get('/api/v1/users/me', auth, async(req, res) => {
    try {
        await res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//user logout endpoint
router.post('/api/v1/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

//Logout from all accounts endpoint
router.post('/api/v1/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router