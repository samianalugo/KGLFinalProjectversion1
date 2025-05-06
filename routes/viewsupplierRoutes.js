const express = require("express");
const router = express.Router();
const Supplier = require("../models/Supplier"); // Make sure this path is correct
//View all stock
router.get("/viewsupply", async (req, res) => {
  try {
    const supplys = await Supplier.find().sort({ date: -1 }); // Adjust sorting if needed
      res.render("viewsupplier", { 
      Suppliers: supplys,
           
     }); // 'viewstock' should match your Pug file name
  } catch (error) {
    console.error("Error fetching supplier:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/deletesupplier/:id', async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect('/viewsupply');
  } catch (error) {
    console.error('Error deleting supplier:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
