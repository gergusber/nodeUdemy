const getdb = require("../util/database").getDb;
const mongodb = require("mongodb");
class User {
  constructor(user, email) {
    this.user = user;
    this.email = email;
  }

  save() {
    const db = getdb();

    return db
      .collection("users")
      .insertOne(this)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findById(usrId) {
    const db = getdb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(usrId) })
      .then((user) => {
        console.log("USER:", user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
