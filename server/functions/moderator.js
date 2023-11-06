const Moderator = require("../models/moderator");
const bcrypt = require("bcrypt");

async function signIn(moderatorId, inputPassword) {
    try {
        const moderator = await Moderator.findOne({ moderatorId: moderatorId });

        if (!moderator) {
            throw new Error("Moderator not found");
        }

        const isPasswordValid = await bcrypt.compare(inputPassword, moderator.password);

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

        const isPasswordValid = await bcrypt.compare(confirmPassword, moderator.password);

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

module.exports = {
    signIn,
    changePassword,
};