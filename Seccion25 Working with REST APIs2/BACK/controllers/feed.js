const { validationResult } = require("express-validator");
const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  const posts = Post.find()
    .then((result) => {
      res.status(200).json({
        posts: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const errors = validationResult(req);
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/38a4b7f301d8ad3435be8bb3d23e4c11.jpg",
    creator: {
      name: "German",
    },
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully!",
        post: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "validation Failed, enter data is incorrect",
      errors: errors.array(),
    });
  }
};
