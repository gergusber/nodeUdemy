const authController = require("../controllers/auth");
const chai = require("chai");
var expect = chai.expect;
const sinon = require("sinon");
const User = require("../models/user");
const mongoose = require("mongoose");
describe("Auth controller ", function (done) {
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

  it("Should throw an error with code 500if accesing the database fails", function () {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "test@test.com",
        password: "123456",
      },
    };
    authController
      .login(req, {}, () => {})
      .then((res) => {
        expect(res).to.be.an("error");
        expect(res).to.have.property("statusCode", 500);
        done();
      });
  });

  it("Should send a response with valid status for an existing user", function () {
    const req = { userId: "5c0f66b979af55031b34728a" };
    res = {
      statusCode: 500,
      userStatus: null,
      status: function () {
        this.statusCode = code;
        return true;
      },
      json: function (data) {
        this.userStatus = data.status;
      },
    };

    authController
      .getUserStatus(req, res, () => {})
      .then(() => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.userStatus).to.be.equal("I am new!");
        done();
      });
  });
});
