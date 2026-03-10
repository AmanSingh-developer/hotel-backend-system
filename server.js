const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("welcome to my Hotel");
});

// import the router file

const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const menuItem = require("./models/menuItem");
 

// use the router
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);



app.listen(3000, () => {
  console.log("server is started");
});


//comment added