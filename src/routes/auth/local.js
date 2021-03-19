const router = require("express").Router();
const passport = require("passport");

const LocalStrategy = require("passport-local");
const User = require("../../models/user");

//session
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((user, done) => {
  User.findById(user.id).then((user) => {
    done(null, user);
  });
});

//passport.authenticate config for local strategy

const localAuthOptions = { usernameField: "email", passwordField: "password" };

const localAuthCallBack = async function (username, password, done) {
  try {
    const user = await User.findOne({ email: username, password });
    if (!user) {
      return done(null, false);
    }
    if (password !== user.password) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    // console.log(error);
    return done(error);
  }
};

//set local strategy on passport

passport.use(new LocalStrategy(localAuthOptions, localAuthCallBack));

//route
router.route("/").post(
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login"
  })
);
//there is no redirect route for provider=>app
// since this not 3rd party auth

module.exports = router;
