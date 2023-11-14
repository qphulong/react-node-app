const adminFunctions = require("../functions/admin");

exports.assignModerator = (req, res) => {
    const userId = req.body.userId;
    adminFunctions.assignModerator(userId);
};

exports.unassignModerator = (req, res) => {
    const userId = req.body.userId;
    adminFunctions.unassignModerator(userId);
};