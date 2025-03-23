const Product = require("../models/product");

exports.getIndex = (req, res) => {
  Product.fetchAll((products) =>
    res.render("shop/index", {
      pageTitle: "Shop",
      products,
      path: "/",
    }),
  );
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) =>
    res.render("shop/product-list", {
      pageTitle: "Shop",
      products,
      path: "/products",
    }),
  );
};

exports.getCart = (req, res) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    path: "orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
