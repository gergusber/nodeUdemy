const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://gerbertea:2cGqcNg6aLYUBaNG@cluster0.yiltf.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("CONECTED TO MONGODB");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No db Found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://<username>:<password>@cluster0.yiltf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
