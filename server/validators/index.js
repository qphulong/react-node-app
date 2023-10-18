exports.createPostValidator = (req, res, next) => {
  req.check("content", "Write content").notEmpty(); //check content is not empty

  req.check("postId", "Id of person posted").notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }

  next();
};
