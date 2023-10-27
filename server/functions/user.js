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

async function removeFriend(userId, friendId) {
  if (userId === friendId) {
    console.log("Cannot add the same friend");
    return;
  }

  const user = await User.findOne({ userId: userId }); //find user

  const friend = await User.findOne({ userId: friendId }); //find friend

  if (friend) {
    User.updateOne(
      { userId: userId },
      { $pull: { friends: friendId } }, //delete friend
      (err, result) => {
        if (err) {
          console.log("Error removing friend:", err);
        } else {
          friend.updateOne(
            { userId: friendId },
            { $pull: { friends: userId } },
            (err, result) => {
              if (err) {
                console.log("Error removing friend:", err);
              } else {
                console.log("Remove friend successfully");
              }
            } //delete bidirectionally
          );
        }
      }
    );

    user.save();
    friend.save();
  }
}

async function addFriend(userId, friendId) {
  if (userId === friendId) {
    console.log("Cannot add the same friend");
    return;
  }

  const user = await User.findOne({ userId: userId }); //find user

  const friend = await User.findOne({ userId: friendId }); //find friend

  user.friends.push(friend._id);
  friend.friends.push(user._id); //add in two directions

  user
    .save()
    .then((user) => {
      friend
        .save()
        .then((user) => {
          console.log("Friend added successfully");
        })
        .catch((error) => {
          console.error("Error saving user:", error);
        });
    })
    .catch((error) => {
      console.error("Error saving user:", error);
    });
}

module.exports = {
  signIn,
  changePassword,
  addFriend,
  removeFriend,
};
