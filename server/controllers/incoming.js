exports.getIncomingProfile = (req, res) => {
  res.json({
    username: req.body.username,
  });
};
