const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res) => {
  Product.fetchAll((products) =>
    res.render("shop/index", {
      pageTitle: "Shop",
      prods: products,
      path: "/",
    }),
  );
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) =>
    res.render("shop/product-list", {
      pageTitle: "Shop",
      prods: products,
      path: "/products",
    }),
  );
};

exports.getProduct = (req, res) => {
  const productId = req.params.productId;

  Product.findById(productId, (product) => {
    res.render("shop/product-detail", {
      product,
      path: "/products",
      pageTitle: product.title,
    });
  });
};

exports.getCart = (req, res) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.postCart = (req, res) => {
  const productId = req.body.productId;

  Product.findById(productId, (product) => {
    if (product) {
      Cart.addProduct(product.id, product.price);
    }
  });

  res.redirect("/cart");
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
