const express = require("express");

const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("shop", {
    pageTitle: "Shop",
    products: adminData.products,
    path: "/",
    hasProducts: adminData.products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;
