//it handles all authorization and authentication
//credentials are compared with what was captured T the database
//signup routes
const express = require("express");
const router = express.Router();
const passport = require("passport");

//import models
const Signup = require("../models/SignUp");

router.get("/signingup", (req, res) => {
  res.render("Signup"); //name of the pug file
});
router.post("/signingup", async (req, res) => {
  // console.log(req.body); // prints whatever input we put in our forms

  try {
    const user = new Signup(req.body);
    let existingUser = await Signup.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return res.status(400).send("Not registered, email already taken");
    } else {
      await Signup.register(user, req.body.password, (error) => {
        if (error) {
          throw error;
        }
        res.redirect("/Signin");
      });
    }

    console.log(user);
  } catch (error) {
    res.status(400).render("Signup");
    console.log(error);
  }
});

//login routes

router.get("/login", (req, res) => {
  res.render("Login");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    console.log(req.body);
    req.session.user = req.user;

    if (req.user.role === "manager") {
      res.redirect("/managerDash");
    } else if (req.user.role === "salesagent") {
      res.redirect("/salesAgentDash");
    } else if (req.user.role === "director") {
      res.redirect("/directorDash");
    } else {
      res.send("You dont have any role in the system");
    }
  }
);

//logout route
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).send(error, "Error logging out");
      }
      res.redirect("/login");
    });
  }
});
module.exports = router;
