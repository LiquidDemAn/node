const express = require("express");

const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("shop", { docTitle: "Shop", products: adminData.products });
});

module.exports = router;
