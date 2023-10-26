const User = require("../models/user");

async function changePassword(userId, newPassword, confirmPassword) {
  const existingPassword = await getPasswordByUserId(userId); //retrieve the current password

  if (existingPassword) {
    if (existingPassword === confirmPassword) {
      //check if the existing password is the same as the confirm password
      await User.updateOne({ userId: userId }, { password: newPassword });
      console.log("Password updated successfully!");
    } else {
      console.log("Password doesn't match with the current one.");
    }
  } else {
    console.log("User not found with the given userId.");
  }
}

module.exports = {
  changePassword,
};
