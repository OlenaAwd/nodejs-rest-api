const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./current");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  signup,
  login,
  logout,
  currentUser,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
