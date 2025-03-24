const fs = require("fs");
const path = require("path");

const productsPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json",
);

const getProductsFromFile = (cb) => {
  fs.readFile(productsPath, (err, data) => {
    if (err) {
      return cb([]);
    }

    cb(JSON.parse(data));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const productIndex = products.findIndex((p) => p.id === this.id);

        if (productIndex !== -1) {
          products[productIndex] = this;
        }
      } else {
        this.id = Math.random().toString();
        products.push(this);
      }

      fs.writeFile(productsPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) =>
      cb(products.find((product) => product.id === id) || null),
    );
  }
};
