exports.getIncomingProfile = (req, res) => {
  res.json({
    userId: req.body.userId,
  });
};
