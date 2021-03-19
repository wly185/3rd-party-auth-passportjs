const router = require("express").Router();
const passport = require("passport");
const facebookStrategy = require("passport-facebook");
const User = require("../../models/user");

//session
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  User.findById(user.id).then((user) => {
    done(null, user);
  });
});

//passport.authenticate config for strategy

const fbAuthOptions = {
  callbackURL: `${process.env.THIS_APP_URL}/auth/facebook/redirect`,
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  profileFields: ["id", "name", "email"]
};

//passport.authenticate config for strategy

const fbAuthCallback = async function (
  accessToken,
  refreshToken,
  profile,
  done
) {
  try {
    // console.log(profile);
    //provider=>provider
    //map profile fields to your model
    const user = await User.findOne({ email: profile._json.email });
    if (!user) {
      new User({
        email: profile._json.email,
        name: profile._json.email.split("@")[0]
      }).save();
      // console.log("user created");
    }
    done(null, user);
  } catch (error) {
    // console.log(error);
    return done(error);
  }
};

//passport.authenticate set facebook strategy
passport.use(new facebookStrategy(fbAuthOptions, fbAuthCallback));

// routes

//app=>facebook
router.get("/", passport.authenticate("facebook", { scope: ["email"] }));

//facebook=>app
router.get(
  "/redirect",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/login"
  })
);

module.exports = router;
