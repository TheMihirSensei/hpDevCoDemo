const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
// const msg = {
//   to: "mihirsidhdhapura41@gmail.com", // Change to your recipient
//   from: "mihirsidhdhapura41@gmail.com", // Change to your verified sender
//   subject: "Forget Password Mail",
//   text: "here",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

const sendOtpMailToUser = (to, otp) => {
  return new Promise(async (res, rej) => {
    try {
      await sgMail.send({
        from: {
          email: "mihirsidhdhapura41@gmail.com",
          name: "mihir",
        },
        to: to,
        subject: "Authentication",
        html: `<strong>Dear User</strong><br>Your OTP is: <strong>${otp}</strong> <br> Please do not share with other. If you didnt' request OTP then please ignore this email! `,
      });
      res("mail sent");
    } catch (err) {
      rej(err?.message);
    }
  });
};

module.exports = { sendOtpMailToUser };
