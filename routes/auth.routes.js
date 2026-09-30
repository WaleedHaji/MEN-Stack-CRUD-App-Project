const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const dogOwner = require("../models/dogOwner.js");
const dogWalker = require('../models/dogWalker.js');


// Sign up routes
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (userInDatabase) {
    return res.send("Username already taken.");
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  // validation logic

  const user = await User.create(req.body);

  if(user.userRole === 'dog'){
    const dogProfile = await dogOwner.create({
        breed: req.body.breed,
        age: req.body.age,
        personality: req.body.personality,
        size: req.body.size,
        descriptionOwner: req.body.descriptionOwner,
        owner: user._id
    })
  }

  else {
    const walkerProfile = await dogWalker.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      walkerLicenseNo: req.body.walkerLicenseNo,
      description: req.body.description,
      owner: user._id,
      cprNumber: req.body.cprNumber,
      idVerification: req.body.idVerification
    })
  }
  res.redirect("/auth/sign-in");
});



// Sign in routes
router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});



router.post("/sign-in", async (req, res) => {
  // First, get the user from the database
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (!userInDatabase) {
    return res.send("Login failed. Please try again.");
  }

  // There is a user! Time to test their password with bcrypt
  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  );
  if (!validPassword) {
    return res.send("Login failed. Please try again.");
  }

  // There is a user AND they had the correct password. Time to make a session!
  // Avoid storing the password, even in hashed format, in the session
  // If there is other data you want to save to `req.session.user`, do so here!
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
    userRole: userInDatabase.userRole
  };

  res.redirect("/");
});


router.get("/sign-out", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});





module.exports = router;
