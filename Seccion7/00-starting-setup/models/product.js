// const products = [];
const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "products.json"
  );
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, filecontent) => {
    if (err) {
      return cb([]);
    }
    else{
        cb(JSON.parse(filecontent));
    }
  });
};

module.exports = class Product {
  constructor(tit) {
    this.title = tit;
  }
  save() {
    getProductsFromFile((products)=>{
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
    });   
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
