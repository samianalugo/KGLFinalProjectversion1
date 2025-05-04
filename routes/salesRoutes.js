
const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

const Sale = require("../models/Sale");
const Signup = require("../models/SignUp");
const Produce = require("../models/Produce");

router.get("/addSale", async (req, res)=>{
  try {
    const users = await Signup.find({ role: "salesagent" });
    const produces = await Produce.find();
    res.render("add_sale", { users, produces });
  } catch (error) {
    console.error("Error loading form:", error);
    res.status(500).send("Error loading form");
  }
});


  

// Handle form submission
router.post("/addSale", async (req, res) => {
  try {
    const {
      saletonnage,
      unitsellingprice,
      amountpaid,
      buyername,
      sellername,
      prodname,
      date,
      time,
    } = req.body;

    // Ensure sellername and prodname are valid ObjectIds
    if (!sellername.match(/^[0-9a-fA-F]{24}$/) || !prodname.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Invalid selection for sales agent or produce.");
    }

    const newSale = new Sale({
      saletonnage,
      unitsellingprice,
      amountpaid,
      buyername,
      sellername,
      prodname,
      date,
      time,
    });

    await newSale.save();
    res.redirect("/salesagentdash"); // Adjust as needed
  } catch (error) {
    console.error("Error recording sale:", error);
    res.status(500).send("Failed to record sale.");
  }
});


router.post("/addSale", async (req, res) => {
    const newSale = new Sale(req.body);
    await newSale.save();
    res.redirect("/viewingsale");
  });

  
// Routes for making a sale
router.get(
  "/addSale/:id",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    if (
      req.session.user.role == "salesagent" ||
      req.session.user.role == "manager"
    ) {
      try {
        const produce = await Produce.findOne({ _id: req.params.id });
        console.log("my produce...........................", produce);
        res.render("add_sale", {
          produce: produce,
          currentUser: req.session.user,
        });
      } catch (error) {
        console.error("Error rendering add_sale page:", error);
        res.status(400).send("Unable to find item in the database");
      }
    } else {
      res.send("You are not allowed to access this page");
    }
  }
);

// POST route to handle selling a sale`
router.post(
  "/addSale/:id",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    if (
      req.session.user.role == "salesagent" ||
      req.session.user.role == "manager"
    ) {
      try {
        const { saletonnage } = req.body;
        const produce = await Produce.findById({ _id: req.params.id });

        if (!produce) {
          return res.status(404).send("Produce not found");
        }

        if (produce.tonnage < saletonnage) {
          return res
            .status(400)
            .send(
              `Not enough tonnage in stock,there are ${produce.tonnage}kg in stock`
            );
        }

        if (produce && produce.tonnage > 0) {
          const saleMade = new Sale({
            prodname: req.body.prodname,
            saletonnage: req.body.saletonnage,
            unitsellingprice: req.body.unitsellingprice,
            amountpaid: req.body.amountpaid,
            buyername: req.body.buyername,
            sellername: req.body.sellername,
            date: req.body.date,
            time: req.body.time,
          });

          await saleMade.save();

          // Decrease the tonnage of produce in the database by the number kgs of produce sold
          // The new produce tonnage after sale
          produce.tonnage -= saletonnage;
          console.log("new tonnage after sale", produce.tonnage);
          await produce.save();

          res.redirect("/salesList");
        } else {
          return res
            .status(404)
            .json({ error: "Produce not found or sold out" });
        }
      } catch (error) {
        console.error("Error selling produce:", error.message);
        res.status(500).send("Internal Server Error");
      }
    } else {
      res.send("You are not allowed to access this page");
    }
  }
);
// View all sales
router.get('/viewingsale', async (req, res) => {
  try {
    const stockItems = await Sale.find(); // fetch data from DB
    res.render('viewsales', { stockItems }); // pass it to Pug
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).send('Server Error');
  }
});

// Get all sales
router.get(
  "/salesList",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      let items = await Sale.find()
        .sort({ $natural: -1 })
        .populate("prodname") // Populate the 'prodname' field with the corresponding Produce document/ all details of produce are extracted
        .populate("sellername");
      // .populate("sellername", "firstname lastname")
      const maganjoSales = items.filter(
        (sale) => sale.prodname?.stockbranch === "Maganjo"
      );
      console.log("items in sales for maganjo", maganjoSales);
      res.render("list_sales", {
        title: "Sales list",
        sales: items,
      });
    } catch (err) {
      res.status(400).send("Unable to find items in the database");
    }
  }
);

//show edit form
router.get("/editsale/:id", async (req, res) => {
    const item = await Sale.findById(req.params.id);
    res.render("editsale", { item });
  });
  
  // Handle deletion
  router.post("/deletesale/:id", async (req, res) => {
    try {
      await Sale.findByIdAndDelete(req.params.id);
      res.redirect("/viewingsale");
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).send("Error deleting produce.");
    }
  });

  // Handle POST update
router.post("/editsale/:id", async (req, res) => {
    try {
      await Sale.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/viewingsale");
    } catch (error) {
      console.error("Edit error:", error);
      res.status(500).send("Error updating produce.");
    }
  });
module.exports = router;