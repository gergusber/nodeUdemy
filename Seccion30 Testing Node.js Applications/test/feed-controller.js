const feedController = require("../controllers/feed");
const chai = require("chai");
var expect = chai.expect;
const sinon = require("sinon");
const User = require("../models/user");
const Post = require("../models/post");
const mongoose = require("mongoose");

describe("Feed controller ", function (done) {
  before(function (done) {
    mongoose
      .connect(
        "mongodb+srv://gerbertea:dc7XmyotG9NErgef@cluster0.xm92h.mongodb.net/test-messages?retryWrites=true&w=majority",
        { useNewUrlParser: true }
      )
      .then((res) => {
        const user = new User({
          email: "gerbertea@gmail.com",
          password: "123456",
          name: "german",
          posts: [],
          _id: "5c0f66b979af55031b34728a",
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });
  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });

  it("Should add created post to the post of the creator", function () {
    // const req = { userId: "5c0f66b979af55031b34728a" };
    const req = {
      body: {
        title: "Test Post",
        content: "a Test Post",
      },
      file: {
        path: "something",
      },
      userId: "5c0f66b979af55031b34728a",
    };

    const res = {
      status: () => {
        return this;
      },
      json: function () {},
    };

    feedController
      .createPost(req, res, () => {})
      .then((savedUser) => {
        expect(savedUser).to.have.property("posts");
        expect(savedUser.posts).to.have.length(1);
        done();
      });
  });
});
