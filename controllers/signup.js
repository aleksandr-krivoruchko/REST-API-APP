const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const nanoid = require("nanoid");
const User = require("../models/user");
const createError = require("../helpers/createError");
const createUserResponse = require("../helpers/createResponse");
const { userSchema } = require("../validation/schema");
const sendEmail = require("../helpers/sendEmail");

async function signup(req, res, next) {
  const { email, password } = req.body;
  try {
    const { error } = userSchema.validate(req.body);
    if (error) throw createError(400, error.message);

    const user = await User.findOne({ email });

    if (user) throw createError(409, "Email in use");

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const verificationToken = nanoid();
    const avatarURL = gravatar.url(email);
    const mail = {
      to: email,
      subject: "Email confirmation",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Email confirmation</a>`,
    };

    await sendEmail(mail);

    const result = await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    createUserResponse(201, res, { user: result });
  } catch (error) {
    next(error);
  }
}

module.exports = signup;
