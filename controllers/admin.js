const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    editing: false,
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, description, price } = req.body || {};
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const productId = req.params.productId;

  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      product,
      editing: editMode,
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
    });
  });
};

exports.postEditProduct = (req, res) => {
  const { productId, title, imageUrl, description, price } = req.body || {};

  const updatedProduct = new Product(
    productId,
    title,
    imageUrl,
    description,
    price,
  );

  updatedProduct.save();

  res.redirect("/admin/products");
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) =>
    res.render("admin/products", {
      pageTitle: "Admin Products",
      prods: products,
      path: "admin/products",
    }),
  );
};
