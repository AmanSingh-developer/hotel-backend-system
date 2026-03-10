const express = require("express");
const app = express();
require("dotenv").config();

const db = require("./db");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const bodyParser = require("body-parser");
const Person = require("./models/person");

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;


// ------------------ Logging Middleware ------------------

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
};

app.use(logRequest);


// ------------------ Passport Local Strategy ------------------

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("Received Credentials:", username, password);

      const user = await Person.findOne({ username: username });

      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }

      const isPasswordMatched = user.password === password;

      if (isPasswordMatched) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

app.use(passport.initialize());


// ------------------ LOGIN ROUTE ------------------

app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    res.send({
      message: "Login Successful",
      user: req.user,
    });
  }
);


// ------------------ PUBLIC ROUTE ------------------

app.get("/", (req, res) => {
  res.send("Welcome to my Hotel Backend Server");
});


// ------------------ PROTECTED ROUTES ------------------

const localAuthMiddleware = passport.authenticate("local", { session: false });

const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

app.use("/person", localAuthMiddleware, personRoutes);
app.use("/menu", localAuthMiddleware, menuItemRoutes);


// ------------------ SERVER ------------------

app.listen(PORT, () => {
  console.log("Server is started");
});