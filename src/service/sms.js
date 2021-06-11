const axios = require('axios')

//Api Key
const smsApiKey = process.env.SMS_Api_KEY

//SEND SMS 
const sendSMS = (contact, firstname) => {
    console.log(smsApiKey)
    axios.get(`https://sms.arkesel.com/sms/api?action=send-sms&api_key=${smsApiKey}&to=${contact}&from=ArkeselLtd&sms=Hello ${firstname}, Congratulation you have successfully booked an appointment with Arkesel organization.`)
        .then(response => console.log(response))
        .catch(error => console.log(error))
}

//SCHEDULE SMS
scheduleSMS = (contact, firstname, scheduleDateTime) => {
    axios.get(`https://sms.arkesel.com/sms/api?action=send-sms&api_key=${smsApiKey}&to=${contact}&from=ArkeselLtd&sms=Hello ${firstname}, this is to inform you that your appointment with Arkesel Ltd will start in 15 minutes from now. Remeber to put on your face mask. Thank you!&schedule=${scheduleDateTime}`) //10-06-2021 02:51 PM
        .then(response => console.log(response))
        .catch(error => console.log(error))
}

module.exports = { sendSMS, scheduleSMS }