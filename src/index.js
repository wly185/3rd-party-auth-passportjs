const express = require("express");
const connectDB = require("./config/db.js");
const cookieSession = require("cookie-session");
const passport = require("passport");
const handlebars = require("express-handlebars");
const path = require("path");
// const dotenv = require("dotenv");

//secret keys
// dotenv.config();

//mongodb
connectDB();

//express - standard config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

//views
app.set("views", __dirname + "/views");
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

//user session
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.sessionSecret]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
//passport routes
app.use("/auth/google", require("./routes/auth/google"));
app.use("/auth/facebook", require("./routes/auth/facebook"));
app.use("/auth/local", require("./routes/auth/local"));
//
app.use("/signup", require("./routes/auth/signup"));
app.use("/profile", require("./routes/profile"));

//routes
app.get("/", (req, res) => {
  //views
  res.render("home");
});
app.get("/login", (req, res) => {
  //views
  res.render("login");
});
app.get("/logout", (req, res) => {
  //passport.req.logout
  req.logout();
  res.redirect("/");
});

//listen//port
app.listen(8080 || process.env.PORT, () => {
  console.log("server started");
});
