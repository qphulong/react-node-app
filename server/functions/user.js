const User = require("../models/user");
const bcrypt = require("bcrypt");

async function signIn(userId, inputPassword) {
  const user = await User.findOne({ userId: userId }); //find user

  const isPasswordValid = await bcrypt.compare(inputPassword, user.password); //check password

  if (isPasswordValid) {
    //check if the existing password is the same as the input password
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt); //hash password next

    await User.updateOne({ userId: userId }, { password: hashedPassword });
    console.log("Password updated successfully!");
  } else {
    console.log("Password doesn't match");
  }
}

async function addFriend(userId, friendId) {
  if (userId === friendId) {
    console.log("Cannot add the same friend");
    return;
  }

  const user = await User.findOne({ userId: userId }); //find user

  //find friend
  User.findOne({ userId: friendId }, (err, userB) => {
    if (err) {
      console.log("Error when adding friend");
    } else {
      user.friends.push(userB._id);

      user.save((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("New friend added");
        }
      });
    }
  });
}

module.exports = {
  signIn,
  changePassword,
  addFriend,
};
