const express = require("express");
const router = express.Router();
const passport = require("passport");

const Signup = require("../models/SignUp");

// Signup
router.get("/signingup", (req, res) => res.render("Signup"));

router.post("/signingup", async (req, res) => {
  try {
    const {email, role, branch} = req.body;
    //const user = new Signup(req.body);
    const existingUser = await Signup.findOne({ email: req.body.email });

    if (existingUser) return res.status(400).send("Email already taken");
    
    const user = new Signup({ email, role, branch}); 

    await Signup.register(user, req.body.password, (error) => {
      if (error) throw error;
      res.redirect("/login");
    });
  } catch (error) {
    console.log(error);
    res.status(400).render("Login");
  }
});

// Login
// router.get("/login", (req, res) => res.render("Login"));

// router.post(
//   "/login",
//   passport.authenticate("local", { failureRedirect: "/login" }),
//   (req, res) => {
//     req.session.user = req.user;

  
// });
router.get("/login", (req, res) => res.render("Login"));

router.post(
     "/login",
     passport.authenticate("local", { failureRedirect: "/login" }),
    (req, res) => {
      console.log(req.body);
       req.session.user = req.user;
        
        
       const {role, branch} =req.user;

       if (role === "director") {
        return res.redirect("/directordash");}

      else if (role === "salesagent" && branch === "Maganjo") {
        return res.redirect("/maganjo/salesagentdash");
      }
       else if (role === "manager" && branch === "Maganjo") {
        return res.redirect("/maganjo/managerdash");
      }
    
    // Role-based redirect
    // switch (req.user.role) {
    //   case "manager":
    //     return res.redirect("/managerdash");
    //   case "salesagent":
    //     return res.redirect("/salesagentdash");
    //   case "director":
    //     return res.redirect("/directordash");
    //   default:
    //     return res.send("You don't have any role in the system");

    });
   

// Logout
router.get("/logout", (req, res) => {
  req.session?.destroy((error) => {
    if (error) return res.status(500).send("Error logging out");
    res.redirect("/login");
  });
});

module.exports = router;


// //it handles all authorization and authentication
// //credentials are compared with what was captured T the database
// //signup routes
// const express = require("express");
// const router = express.Router();
// const passport = require("passport");

// //import models
// const Signup = require("../models/SignUp");

// router.get("/signingup", (req, res) => {
//   res.render("Signup"); //name of the pug file
// });
// router.post("/signingup", async (req, res) => {
//   // console.log(req.body); // prints whatever input we put in our forms

//   try {
//     const user = new Signup(req.body);
//     let existingUser = await Signup.findOne({
//       email: req.body.email,
//     });
//     if (existingUser) {
//       return res.status(400).send("Not registered, email already taken");
//     } else {
//       await Signup.register(user, req.body.password, (error) => {
//         if (error) {
//           throw error;
//         }
//         res.redirect("/login");
//       });
//     }

//     console.log(user);
//   } catch (error) {
//     console.log(error);
//     res.status(400).render("/login");
    
//   }
// });

// //login routes

// router.get("/login", (req, res) => {
//   res.render("Login");
// });

// router.post(
//   "/login",
//   passport.authenticate("local", { failureRedirect: "/login" }),
//   (req, res) => {
//     console.log(req.body);
//     req.session.user = req.user;

//     if (req.user.role === "manager") {
//       res.redirect("/managerdash");
//     } else if (req.user.role === "salesagent") {
//       res.redirect("/salesagentdash");
//     } else if (req.user.role === "director") {
//       res.redirect("/directordash");
//     } else {
//       res.send("You dont have any role in the system");
//     }
//   }
// ); 

// //logout route
// router.get("/logout", (req, res) => {
//   if (req.session) {
//     req.session.destroy((error) => {
//       if (error) {
//         return res.status(500).send(error, "Error logging out");
//       }
//       res.redirect("/login");
//     });
//   }
// });
// module.exports = router;
