require("dotenv").config();
const express = require('express');
const app = express();

// const key_gm = process.env.PASS_GM;
// const user_gm = process.env.USER_GM;

// const key_gm = 'sddu nfma inyh luzh';
// const user_gm = 'floppybytesoft@gmail.com';

const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname, '/public/index.html')
});

app.post('/', (req, res) => {
    console.log(req.body);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'floppybytesoft@gmail.com',
            pass: 'sddu nfma inyh luzh'
        }
    });

    // const mailOptions = {
    //     from: req.body.email,
    //     to: 'floppybytesoft@gmail.com',
    //     subject: `Message from ${req.body.email}: ${req.body.subject}`,
    //     text: req.body.message
    // }

    // transporter.sendEmail(mailOptions, (error, info) => {
    //     if(error) {
    //         console.log(error);
    //         res.send('error');
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //         res.send('success');
    //     }
    // });

    transporter.sendMail({
        from: req.body.email,
        to: 'floppybytesoft@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }, (error, info) => {
        if(error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    });
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})