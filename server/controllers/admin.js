const adminFunctions = require("../functions/admin");

exports.assignModerator = (req, res) => {
    const userId = req.body.userId;
    adminFunctions.assignModerator(userId);
};