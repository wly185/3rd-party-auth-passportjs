const router = require("express").Router();
const passport = require("passport");
const googleStrategy = require("passport-google-oauth20");
const User = require("../../models/user");

//session

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

//passport.authenticate
const googleAuthOptions = {
  callbackURL: `${process.env.THIS_APP_URL}/auth/google/redirect`,
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
};

const googleAuthCallBack = async function (
  accessToken,
  refreshToken,
  profile,
  done
) {
  try {
    // console.log("profile", profile);
    const user = await User.findOne({
      email: profile._json.email
    });
    if (!user) {
      await User.create({
        email: profile._json.email,
        name: profile._json.email.split("@")[0]
      });

      // console.log("user created", user);
    } 
    return done(null, user);
  } catch (error) {
    // console.log(error);
    return done(error);
  }
};

passport.use(new googleStrategy(googleAuthOptions, googleAuthCallBack));

//routes
//app=>provider
router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);
//provider=>app
router.get(
  "/redirect",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/login"
  })
);

module.exports = router;
