exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "0303456",
        title: "First Post",
        content: "This is the first post!",
        imageUrl: "images/38a4b7f301d8ad3435be8bb3d23e4c11.jpg",
        creator: {
          name: "German",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // Create post in db
  res.status(201).json({
    message: "Post created successfully!",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
