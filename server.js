const express = require("express")
require('dotenv').config({path : './envFolder/.env'})
const cors = require("cors")
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(cookieParser())

app.get('/', (req,res) => res.send('home'))

app.post('/appointment', (req,res) => {
    let {name, email, subject, message} = req.body
    let transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth : {
            user : process.env.MAIL_ID,
            pass : process.env.MAIL_PSWD
        }
    })
    let mailOptions = {
        from : process.env.MAIL_ID,
        to : 'pradyumnarutvik@gmail.com',
        subject : 'Mail From Flamingo',
        html : `<div>
                    <p>${name}</p>
                    <p>${email}</p>
                    <p>${subject}</p>
                    <p>${message}</p>
                </div>`
    }
    transporter.sendMail(mailOptions)
    .then( info => console.log(info.response))
    .catch( err => next(err) )
    console.log("booked")
    res.send('Check Your Email for Verification Process.')
})

app.listen(5000, console.log(`http://localhost:`+port))