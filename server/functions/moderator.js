const Moderator = require("../models/moderator");
const Post = require("../models/post");
const bcrypt = require("bcrypt");

async function signIn(moderatorId, inputPassword) {
    try {
        const moderator = await Moderator.findOne({ moderatorId: moderatorId });

        if (!moderator) {
            throw new Error("Moderator not found");
        }

        const isPasswordValid = await bcrypt.compare(
            inputPassword,
            moderator.password
        );

        if (isPasswordValid) {
            console.log("Login successfully!");
        } else {
            throw new Error("Password doesn't match");
        }
    } catch (error) {
        console.error("Error signing in:", error.message);
    }
}

async function changePassword(moderatorId, newPassword, confirmPassword) {
    try {
        const moderator = await Moderator.findOne({ moderatorId: moderatorId });

        if (!moderator) {
            throw new Error("Moderator not found");
        }

        const isPasswordValid = await bcrypt.compare(
            confirmPassword,
            moderator.password
        );

        if (isPasswordValid) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            await Moderator.updateOne({ moderatorId: moderatorId }, { password: hashedPassword });
            console.log("Password updated successfully!");
        } else {
            throw new Error("Password doesn't match");
        }
    } catch (error) {
        console.error("Error changing password:", error.message);
    }
}

async function removePost(postId) {
    try {
        const post = await Post.findById(postId);
        if (post) {
            await post.deletePost();
        } else {
            console.error(`Post with ID ${postId} not found`);
        }

        console.log(`Post with ID ${postId} removed successfully.`);
    } catch (error) {
        console.error("Error removing post:", error.message);
    }
}

module.exports = {
    signIn,
    changePassword,
    removePost
};