/*
Developer: Emmanuel Ametepee
Profile: https://www.linkedin.com/in/emmanuel-ametepee-052264175/
Project Name: Appointment System Api
*/

const express = require('express')
require('./db/connection')
const userRouter = require('./routers/user')
const slotRouter = require('./routers/slot')
const bookSlotRouter = require('./routers/booking')

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

app.use(userRouter)
app.use(slotRouter)
app.use(bookSlotRouter)


app.listen(port, () => {
    console.log('Server is up and running on port: ' + port)
})