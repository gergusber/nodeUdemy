const getdb = require("../util/database").getDb;
const mongodb = require("mongodb");
class User {
  constructor(user, email) {
    this.user = user;
    this.email = email;
  }

  save() {
    const db = getdb();
    let dbOp;
    // if (this._id) {
    //   dbOp = db
    //     .collection("products")
    //     .updateOne({ _id: this._id }, { $set: this });
    // } else {
    dbOp = db.collection("users").insertOne(this);
    // }
    return dbOp
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findById(usrId) {
    const db = getdb();
    return (
      db
        .collection("users")
        .findOne({ _id: new mongodb.ObjectId(usrId) })
        // .next()
        .then((user) => {
          console.log(user);
          return user;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }
}

module.exports = User;
