const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render("shop/index", {
        pageTitle: "Shop",
        prods: products,
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render("shop/product-list", {
        pageTitle: "Shop",
        prods: products,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then(([product]) => {
      res.render("shop/product-detail", {
        product: product[0],
        path: "/products",
        pageTitle: product[0]?.title,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];

      for (product of products) {
        const cartProduct = cart.products.find((p) => p?.id === product?.id);

        if (cartProduct) {
          cartProducts.push({ productData: product, qty: cartProduct?.qty });
        }
      }

      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
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

exports.postDeleteCartProduct = (req, res) => {
  const productId = req.body.productId;

  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
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
