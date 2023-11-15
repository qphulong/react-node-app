const moderatorFunctions = require("../functions/moderator");

const Moderator = require("../models/moderator");
const { ModeratedPostRepository } = require("../repositories/moderator");

let moderatorRepo = new ModeratedPostRepository(); //use this repository

exports.deletePost = (req, res) => {
  const postId = req.body.postId;
  moderatorFunctions.removePost(postId);
};

exports.working = (req, res) => {
  moderatorRepo.consider(); //let content moderator consider posts
  res.status(300).send("Moderator is considering");
};
