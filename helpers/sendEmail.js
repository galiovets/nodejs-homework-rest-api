const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const msg = { ...data, from: "m.galiovets@gmail.com" };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;

//   const msg = {
//     to: "botopo9810@nifect.com", // Change to your recipient
//     from: "m.galiovets@gmail.com", // Change to your verified sender
//     subject: "Sending with SendGrid is Fun",
//     text: "and easy to do anywhere, even with Node.js",
//     html: "<strong>and easy to do anywhere, even with Node.js</strong>",
//   };

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// {
//     "user": {
//         "email": "botopo9810@nifect.com",
//         "subscription": "starter",
//         "avatarURL": "//www.gravatar.com/avatar/cd96a9d4ec88984335a1a4ab6d10e99e",
//         "verificationToken": "bMkYXPi7mCAsy_I_24GvB"
//     }
// }
