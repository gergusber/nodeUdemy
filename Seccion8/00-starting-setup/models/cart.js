const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "Cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    //fetch a previus file
    fs.readFile(p, (err, filecontent) => {
      let cart = { products: [], totalprice: 0 };
      if (!err) {
        cart = JSON.parse(filecontent);
      }
      // analize the cart
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      var updatedProduct = null;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalprice = cart.totalprice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
