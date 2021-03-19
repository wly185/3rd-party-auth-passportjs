const router = require("express").Router();
const isAuth = require("../middleware/isAuth");
router.get("/", isAuth, (req, res) => {
  // console.log(req.user);
  res.render("profile", {
    email: req.user.email,
    name: req.user.name
    // user: JSON.stringify(req.user)
  });
});

module.exports = router;
