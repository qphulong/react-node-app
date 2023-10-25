const User = require("../models/user");

async function changePassword(userId, newPassword) {
  await User.updateOne({ userId: userId }, { password: newPassword });
}
