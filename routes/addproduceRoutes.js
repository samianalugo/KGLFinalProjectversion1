const express = require('express')
const router = express.Router();

const Produce = require("../models/Produce")

router.get("/addproduce", (req, res)=>{
    res.render("Produce")
})


router.post("/addproduce", async (req, res) => {
    const newProduce = new Produce(req.body);
    await newProduce.save();
    res.redirect("/viewingstock");
  });
  

// View all stock
router.get('/viewingstock', async (req, res) => {
    try {
      const stockItems = await Produce.find(); // fetch data from DB
      res.render('viewstock', { 
        Produces: stockItems }); // pass it to Pug
    } catch (error) {
      console.error('Error fetching stock:', error);
      res.status(500).send('Server Error');
    }
  });

// Show edit form
router.get("/editproduce/:id", async (req, res) => {
    const item = await Produce.findById(req.params.id);
    res.render("editproduce", { item });
  });
  
  // Handle deletion
  router.post("/deleteproduce/:id", async (req, res) => {
    try {
      await Produce.findByIdAndDelete(req.params.id);
      res.redirect("/viewingstock");
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).send("Error deleting produce.");
    }
  });

  // Handle POST update
router.post("/editproduce/:id", async (req, res) => {
    try {
      await Produce.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/viewingstock");
    } catch (error) {
      console.error("Edit error:", error);
      res.status(500).send("Error updating produce.");
    }
  });
  
  
module.exports = router;