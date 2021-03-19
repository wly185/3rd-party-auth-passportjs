const User = require("../../models/user");

const router = require("express").Router();

//controller

const signUpPage = (req, res) => {
  res.render("signup");
};

const signUpUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log("req", req.body);

  try {
    const user = await User.findOne({ email });
    // console.log("user", user);
    if (!user) {
      new User({
        email,
        password,
        name: email.split("@")[0]
      }).save();
      //hash the password on the model
      res.redirect("/profile");
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    // console.log(error);
    res.redirect("/");
  }
};

//route
router.route("/").get(signUpPage).post(signUpUser);

module.exports = router;
