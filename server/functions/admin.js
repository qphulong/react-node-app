const { currentUser } = require("../app");
const Post = require("../models/post");
const bcrypt = require("bcrypt");

async function assignModerator(userId) {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        if (!currentUser.isAdmin) {
            throw new Error("Unauthorized: Only admins can assign moderator roles");
        }

        user.isModerator = true;

        await user.save();

        return { success: true, message: "User assigned as a moderator successfully" };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message || "Error assigning moderator role" };
    }
}

module.exports = {
    assignToModerator,
};