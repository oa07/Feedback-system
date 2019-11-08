const nodemailer = require("nodemailer");
const config = require("./config");

// For Gmail, you need to Allow less secure apps to access account setting in your google account - by default this settings is off and you simply turn it on.
// https://stackoverflow.com/a/45479968

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.emailID,
    pass: config.emailPassword
  }
});

const { port } = config;
const host = `http://localhost:${port}`;

module.exports.sendEmailForResetPassword = async (username, emailID, token) => {
  const link = `${host}/auth/forgetPassword/${token}`;
  const mailOptions = {
    from: config.emailID,
    to: emailID,
    subject: "Generated Token For Reset Password",
    html: `
      <h1> Hi ${username}, </h1>
      <h2> Copy This Link and paste it into POSTMAN </h2>
      <a href="${link}"> ${link} </a>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports.sendEmailForVerifyAccount = async (username, emailID, token) => {
  const link = `${host}/auth/verifyAccount/${token}`;
  const mailOptions = {
    from: config.emailID,
    to: emailID,
    subject: "Generated Token For Account Verification",
    html: `
      <h1> Hi ${username}, </h1>
      <h2> Copy This Link and paste it into POSTMAN </h2>
      <a href="${link}"> ${link} </a>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports.promotionalMailByAdminToAllUsers = async (
  username,
  emailID,
  message
) => {
  const mailOptions = {
    from: config.emailID,
    to: emailID,
    subject: "A promotional mail",
    html: `
      <h1> Hi ${username}, </h1>
      <p> ${message} </p>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports.thankYouMsgFromResearcherToAudience = async (
  researcherMailID,
  AudienceMailID,
  AudienceName
) => {
  const mailOptions = {
    from: researcherMailID,
    to: AudienceMailID,
    subject: "Greetings",
    html: `
      <h1> Hi ${AudienceName}, </h1>
      <p> Thank you for completing the survey </p>
    `
  };

  return transporter.sendMail(mailOptions);
};
