const User = require("../models/user");

async function signIn(userId, inputPassword) {
  const user = await User.findOne({ userId: userId }); //find user

  const isPasswordValid = await bcrypt.compare(inputPassword, user.password); //check password

  if (isPasswordValid) {
    //check if the existing password is the same as the input password
    await User.updateOne({ userId: userId }, { password: newPassword });
    console.log("Login successfully!");
  } else {
    console.log("Password doesn't match");
  }
}

async function changePassword(userId, newPassword, confirmPassword) {
  const user = await User.findOne({ userId: userId }); //find user

  const isPasswordValid = await bcrypt.compare(confirmPassword, user.password); //check password

  if (isPasswordValid) {
    //check if the existing password is the same as the confirm password
    await User.updateOne({ userId: userId }, { password: newPassword });
    console.log("Password updated successfully!");
  } else {
    console.log("Password doesn't match");
  }
}

module.exports = {
  signIn,
  changePassword,
};
