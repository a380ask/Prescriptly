const nodemailer = require('nodemailer');
var cron = require('node-cron');
// let transport = nodemailer.createTransport(options[, defaults])

// var transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//         user: "b43e81ba8f57b6",
//         pass: "274c02c42067fd"
//     }
// });

// const message = {
//     from: 'elonmusk@tesla.com', // Sender address
//     to: 'to@email.com',         // List of recipients
//     subject: 'Design Your Model S | Tesla', // Subject line
//     text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
// };

var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'medicationstime@gmail.com',
        pass: 'Interlake2020'
    }
});

const message = {
    from: 'medicationstime@gmail.com', // Sender address
    to: 'smithcath74@gmail.com',         // List of recipients
    subject: 'Design Your Model S | Tesla', // Subject line
    text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
};

cron.schedule('* 55 22 5 2 *', () => {
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Email sent: ' + info);
        }
    });
})