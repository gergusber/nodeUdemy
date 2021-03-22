const getdb = require("../util/database").getDb;
const mongodb = require("mongodb");
class User {
  constructor(user, email, cart, id) {
    this.user = user;
    this.email = email;
    this.cart = cart; //{items:[]}
    this._id = id;
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

  addToCart(product) {
    // const cartProduct = this.cart.items.finIndex((cp) => {
    //   return cp._id === product._id;
    // });
    // if(cartProduct)

    const updatedCart = {
      items: [{ productId: new mongodb.ObjectId(product._id), quantity: 1 }],
    };
    const db = getdb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
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
