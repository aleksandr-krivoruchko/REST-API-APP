const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SG_TOKEN } = process.env;

sgMail.setApiKey(SG_TOKEN);

async function sendEmail(data) {
  const email = { ...data, from: "krivouzis1985@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = sendEmail;
