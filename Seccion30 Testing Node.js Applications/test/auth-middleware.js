const authMiddleware = require("../middleware/is-auth");
const chai = require("chai");
var expect = chai.expect;
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

describe("Auth middleware", function () {
  it("Should throw an error if no authorization headder is present", function () {
    const req = {
      get: function () {
        return null;
      },
    };
    const error = new Error("Not authenticated");
    error.statusCode = 401;

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated"
    );
  });

  it("Should throw an error if the authorization headdder is only one string", function () {
    const req = {
      get: function () {
        return "xyz";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("Should throw an error if the token cannot be verified", function () {
    const req = {
      get: function () {
        return "Bearer xyz";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("Should yield a userId after decoding the token", function () {
    const req = {
      get: function () {
        return "Bearer asdasdasd";
      },
    };

    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "abc" });
    authMiddleware(req, {}, () => {});
    // expect(req).not.to.throw("Not authenticated ");
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc");
    expect(jwt.verify.called).to.be.true;

    jwt.verify.restore();
  });
});
