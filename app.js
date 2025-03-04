const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

// ROUTES
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// CONNECT HANDLEBARS, PUG
app.engine("hbs", expressHbs());
// app.set("view engine", "pug");
app.set("view engine", "hbs");
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

app.listen(3000);
