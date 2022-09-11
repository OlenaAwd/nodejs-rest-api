const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../utils");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "User not found");
  }
  if (user.verify) {
    throw RequestError(400, "User already verified");
  }
  const mail = {
    to: email,
    subject: "Verify your email",
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Click here to verify your email </a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};
module.exports = resendVerifyEmail;
