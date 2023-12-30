const User = require("../models/user");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

async function signIn(currentUser, userId, inputPassword, res) {
  const user = await User.findOne({ userId: userId });

  const isPasswordValid = await bcrypt.compare(inputPassword, user.password); //check password

  if (isPasswordValid) {
    //check if the existing password is the same as the input password
    currentUser.set(user.userId, user.isContentModerator); //set currentUser to this id
    res.send("Sign in successfully");
  } else {
    res.status(400).send("Password is incorrect");
  }
}

async function changePassword(userId, newPassword, confirmPassword, res) {
  const user = await User.findOne({ userId: userId }); //find user

  console.log("user" + user.password);

  const isPasswordValid = await bcrypt.compare(confirmPassword, user.password); //check password

  console.log("isPasswordValid" + isPasswordValid);

  if (isPasswordValid) {
    //check if the existing password is the same as the confirm password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt); //hash password next

    await User.updateOne({ userId: userId }, { password: hashedPassword });
    res.send("Password updated successfully!");
  } else {
    res.status(400).send("Password doesn't match");
  }
}

async function removeFriend(userId, friendId, res) {
  if (userId === friendId) {
    console.log("Cannot add the same friend");
    return;
  }

  const user = await User.findOne({ userId: userId }); //find user

  const friend = await User.findOne({ userId: friendId }); //find friend

  if (friend) {
    user.friends.pull(friend._id);
    friend.friends.pull(user._id);

    user
      .save()
      .then((user) => {
        friend
          .save()
          .then((user) => {
            res.send("Friend removed successfully");
          })
          .catch((error) => {
            res.status(400).send("Error saving user:", error);
          });
      })
      .catch((error) => {
        res.status(400).send("Error saving user:", error);
      });
  } else {
    res.status(400).send("Friend does not exists");
  }
}

async function addFriend(userId, friendId, res) {
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

// Function to generate a link to add a friend using UUID and save it to user.friendshipLink
async function generateAddFriendLink(userId, linkPassword) {
  const linkId = uuid.v4();

  try {
    const user = await User.findOne({ userId: userId });

    if (!user) {
      console.log("User not found");
      return null;
    }

    console.log(linkPassword);

    // Save the linkId to user.friendshipLink
    user.friendshipLink = {
      linkId: linkId,
      password: linkPassword,
    };

    await user.save();

    // Return the generated link
    return `add-friends/${userId}/${linkId}`;
  } catch (error) {
    console.error("Error generating addFriend link:", error);
    return null;
  }
}

// Function to accept the link and add a friend (person ưhwo is adding) if the authentication password is correct
async function linkAddFriend(userId, linkPassword, friendId, linkId) {
  const user = await User.findOne({ userId: userId });

  if (!user) {
    console.log("User not found");
    return;
  }

  // Check if the linkId matches the one generated for the user
  if (user.friendshipLink.linkId !== linkId) {
    console.log("Invalid link");
    return;
  }

  // Check if the authentication password is correct
  console.log(linkPassword, user.friendshipLink.password);
  const isPasswordValid = linkPassword === user.friendshipLink.password;

  if (isPasswordValid) {
    // Add friend if the authentication password is correct
    await addFriend(userId, friendId);
    console.log("Friend added successfully");
  } else {
    console.log("Incorrect authentication password");
  }
}

module.exports = {
  signIn,
  changePassword,
  addFriend,
  removeFriend,
  linkAddFriend,
  generateAddFriendLink,
};
