const nodemailer = require('nodemailer');

const emailConfig = {
  service: 'Gmail',
  auth: {
    user: 'kevin@paradeigm.com',
    pass: 'SWkotor13243!',
  },
};

const transporter = nodemailer.createTransport(emailConfig);

const sendMail = ({email,message,name,subject}) => {
  transporter.sendMail({
    from: email,
    to: "kevin@paradeigm.com",
    subject,
    html:`
    FROM:<b>${email}</b>, <b>${name}<b/>
    ${message}
    `
  })
}


module.exports = {
  sendMail
}
