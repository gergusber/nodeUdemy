const authMiddleware = require("../middleware/is-auth");
const chai = require("chai");
var expect = chai.expect;

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
});
