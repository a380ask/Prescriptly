const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');
const users = require('./users');
const Medication = require('./medication');
const PastMedication = require('./pastMedication');
const Reminders = require('./reminders.js');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://user:user2020@cluster0.mp5uy.mongodb.net/impactHack?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/putSigninData', (req, res) => {
  let data = new users();

  const { id, name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({
      success: false,
      error: 'ALL VALUES REQUIRED',
    })
  }

  data.id = id;
  data.name = name;
  data.email = email;
  data.password = password;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/putMedicationData', (req, res) => {
  let data = new Medication();

  const { id, name, type, prescribedMonth, prescribedDay, prescribedYear, instructions } = req.body;

  if (!name || !type || !prescribedMonth || !prescribedDay || !prescribedYear || !instructions) {
    return res.json({
      success: false,
      error: 'ALL VALUES REQUIRED',
    })
  }

  data.id = id;
  data.name = name;
  data.type = type;
  data.prescribedMonth = prescribedMonth;
  data.prescribedDay = prescribedDay;
  data.prescribedYear = prescribedYear;
  data.instructions = instructions;

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.get('/getMedicationData', (req, res) => {
  Medication.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.delete('/deleteMedicationData', (req, res) => {
  const { id } = req.body;
  Medication.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post('/updateMedicationData', (req, res) => {
  const { id, update } = req.body;
  Medication.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/putPastMedicationData', (req, res) => {
  let data = new PastMedication();

  const { id, name, type, prescribedMonth, prescribedDay, prescribedYear, instructions } = req.body;

  if (!name || !type || !prescribedMonth || !prescribedDay || !prescribedYear || !instructions) {
    return res.json({
      success: false,
      error: 'ALL VALUES REQUIRED',
    })
  }

  data.id = id;
  data.name = name;
  data.type = type;
  data.prescribedMonth = prescribedMonth;
  data.prescribedDay = prescribedDay;
  data.prescribedYear = prescribedYear;
  data.instructions = instructions;

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.get('/getPastMedicationData', (req, res) => {
  PastMedication.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.delete('/deletePastMedicationData', (req, res) => {
  const { id } = req.body;
  PastMedication.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.get('/getUserData', (req, res) => {
  users.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post('/postReminders', (req, res) => {
  let data = new Reminders();

  const { userid, hours, min, medname, useremail } = req.body;

  if (!userid || !hours || !min || !medname || !useremail) {
    return res.json({
      success: false,
      error: 'ALL VALUES REQUIRED',
    })
  }

  data.userid = userid;
  data.hours = hours;
  data.min = min;
  data.useremail = useremail;
  data.medname = medname;

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
  remindP2(medname, hours, min, useremail);
});


const nodemailer = require('nodemailer');
var cron = require('node-cron');
const schedule = require('node-schedule');
// const { callbackPromise } = require('nodemailer/lib/shared');

// async function remindP1() {
//   // Reminders.find((err) => {
//   //   if (err) return res.json({ success: false, error: err });
//   //   else {
//   //     console.log("received: ");
//   //   }
//   // });
//   let dateCurrent = new Date();
//   const findResult = await Reminders.find({
//     hours: dateCurrent.getHours(),
//     min: dateCurrent.getMinutes(),
//   });
//   return findResult;
// }
// var data = [];
// getData = () => {
//   fetch(remindP1)
//   .then((data) => data.json())
//   .then((res) => this.setState({ data: res.data }));
// }

async function remindP2(name, hours, min, email) {
  // console.log(data);
  console.log("reminder created: ");
  var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'medicationstime@gmail.com',
      pass: 'Interlake2020'
    }
  });
  const message = {
    from: 'medicationstime@gmail.com', // Sender address
    to: email,         // List of recipients
    subject: 'Med time!', // Subject line
    text: name + ": time to take this!" // Plain text body
  };
  var rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
  rule.hour = hours;
  rule.minute = min;
  schedule.scheduleJob(rule, () => {
    transport.sendMail(message, function (err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log('Email sent: ' + info);
      }
    });
  })
}

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));