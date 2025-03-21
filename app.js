const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// ROUTES
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));

// CONNECT CSS
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res) => {
  res.render("404", { pageTitle: "Not Found" });
});

app.listen(4000);
