const authMiddleware = require("../middleware/is-auth");
const chai = require("chai");
var expect = chai.expect;

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
