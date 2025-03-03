const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// ROUTES
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// CONNECT PUG
app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));

// CONNECT CSS
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
