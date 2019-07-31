const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rp = require('request-promise');

admin.initializeApp();

//check Recaptcha
exports.checkRecaptcha = functions.https.onRequest((req, res) => {
    const response = req.query.response
    cors((req, res) => {
        console.log("recaptcha response", response)
        rp({
            uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
            method: 'POST',
            formData: {
                secret: functions.config().recaptcha.secretkey,
                response: response
            },
            json: true
        }).then(result => {
            console.log("recaptcha result", result)
            if (result.success) {
                console.log(success)
                console.log('You are a human')
                return null
            }
            else {
                return res.send("Recaptcha verification failed. Are you a robot?")
            }
        }).catch(reason => {
            console.log("Recaptcha request failure", reason)
            return res.send("Recaptcha request failed.")
        });
    });

})


//Send enail after data is created in the database
var sendMail = function (name, email, message) {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: functions.config().google.email,
            pass: functions.config().google.pass
        }
    });

    const mailOptions = {
        from: `${email}`,
        to: functions.config().google.email,
        subject: `Hello this is ${name}`,
        html: `${message}`
    };


    const getDeliveryStatus = function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log("Email Send");

    };

    transporter.sendMail(mailOptions, getDeliveryStatus);
};

//Trigger senMail funtion when new data is submitted and retrieve the data
exports.onDataAdded = functions.database.ref("/Users/{userId}/{messages}/").onCreate((snap, context) => {

    const createdData = snap.val();
    var email = createdData.email;
    var message = createdData.message;
    var name = createdData.name;

    sendMail(name, email, message);
    return null;
});

