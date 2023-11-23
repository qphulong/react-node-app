const User = require("../models/user");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

async function signIn(currentUser, userId, inputPassword) {
    const user = await User.findOne({ userId: userId }); //find user

    const isPasswordValid = await bcrypt.compare(inputPassword, user.password); //check password

    if (isPasswordValid) {
        //check if the existing password is the same as the input password
        console.log("Login successfully!");

        currentUser.set(user.userId, user.isContentModerator); //set currentUser to this id
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
        user.friends.pull(friend._id);
        friend.friends.pull(user._id);

        user
            .save()
            .then((user) => {
                friend
                    .save()
                    .then((user) => {
                        console.log("Friend removed successfully");
                    })
                    .catch((error) => {
                        console.error("Error saving user:", error);
                    });
            })
            .catch((error) => {
                console.error("Error saving user:", error);
            });
    } else {
        console.log("Friend does not exists");
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

// Function to generate a link to add a friend using UUID and save it to user.friendshipLink
async function generateAddFriendLink(userId, linkPassword) {
    const linkId = uuid.v4();

    try {
        const user = await User.findOne({ userId: userId });

        if (!user) {
            console.log("User not found");
            return null;
        }

        // Save the linkId to user.friendshipLink
        user.friendshipLink = {
            linkId: linkId,
            password: linkPassword,
        };

        await user.save();

        // Return the generated link
        return `/addFriend/${userId}/${linkId}`;
    } catch (error) {
        console.error("Error generating addFriend link:", error);
        return null;
    }
}

// Function to accept the link and add a friend if the authentication password is correct
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
    const isPasswordValid = await bcrypt.compare(linkPassword, user.friendshipLink.password);
    //above could be user.friendshipLink.password or friend.friendshipLink.password

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