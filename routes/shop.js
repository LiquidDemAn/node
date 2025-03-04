const express = require("express");

const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("shop", {
    pageTitle: "Shop",
    products: adminData.products,
    path: "/admin/shop",
  });
});

module.exports = router;
