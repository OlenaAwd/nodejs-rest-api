const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../utils");

const signup = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Verify your email",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Click here to verify your email </a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    status: "created",
    code: 201,
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = signup;
