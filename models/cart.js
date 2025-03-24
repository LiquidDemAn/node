const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json",
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, data) => {
      let cart = {
        products: [],
        totalPrice: 0,
      };

      if (!err) {
        cart = JSON.parse(data);
      }
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id,
      );

      const existingProduct =
        existingProductIndex !== -1
          ? cart.products[existingProductIndex]
          : null;

      let updatedProduct;

      if (existingProduct) {
        updatedProduct = {
          ...existingProduct,
          qty: (existingProduct?.qty || 0) + 1,
        };

        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {
          id,
          qty: 1,
        };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice += parseInt(productPrice);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
