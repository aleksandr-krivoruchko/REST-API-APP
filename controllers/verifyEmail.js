const User = require("../models/user");
const createError = require("../helpers/createError");
const createUserResponse = require("../helpers/createResponse");

async function verifyEmail(req, res, next) {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) throw createError(404, "User not found");

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  createUserResponse(200, res, { message: "Verification successful" });
}

module.exports = verifyEmail;
