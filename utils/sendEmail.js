const nodemailer = require("nodemailer");
const ejs = require("ejs");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.BULK_EMAIL,
        pass: process.env.BULK_PASSWORD,
    },
});

async function sendEmail(email, code, id, file) {
    // send mail with defined transport object
    ejs.renderFile(__dirname + file, { code, id }, async function (err, data) {
        if (err) {
            console.log(err);
        } else {
            transporter.sendMail({
                from: {
                    name: 'Dr Bulk',
                    address: process.env.BULK_EMAIL
                },
                to: email,
                subject: "Verify your Dr Bulk account ✔",
                // text: "Hello world?", // plain text body
                html: data,
            }, (error, result) => {
                if (error) return console.error(error);
                return console.log(result);
            });
            console.log('Email sent successfully')
        }
    })

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = sendEmail