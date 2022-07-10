const User = require("../models/user");
const createError = require("../helpers/createError");
const createResponse = require("../helpers/createResponse");
const sendEmail = require("../helpers/sendEmail");

async function resendingEmail(req, res, next) {
  const { email } = req.body;
  const { verificationToken } = req.params;

  try {
    if (!email) createError(400, "Missing required field email");

    const user = await User.findOne({ verificationToken });

    if (user) throw createError(400, "Verification has already been passed");

    const mail = {
      to: email,
      subject: "Email confirmation",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Email confirmation</a>`,
    };

    await sendEmail(mail);
    createResponse(200, res, {
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = resendingEmail;
