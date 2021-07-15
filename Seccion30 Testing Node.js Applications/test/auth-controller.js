const authController = require("../controllers/auth");
const chai = require("chai");
var expect = chai.expect;
const sinon = require("sinon");
const User = require("../models/user");

describe("Auth controller - Login", function (done) {
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

    User.findOne.restore();
  });
});
