const express = require('express')
const router = express.Router();

const Sale = require("../models/Sale")


router.get("/viewingsale", async (req, res) => {
  try {
    const stockItems = await Sale.find().sort({ date: -1 }); // Adjust sorting if needed
    res.render("viewsales", { 
      Sales: stockItems
          
     }); // 'viewstock' should match your Pug file name
  } catch (error) {
    console.error("Error fetching stock:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.post('/deletesale/:id', async (req, res) => {
    try {
      await Sale.findByIdAndDelete(req.params.id);
      res.redirect('/viewsales');
    } catch (error) {
      console.error('Error deleting produce:', error);
      res.status(500).send('Server Error');
    }
  });
module.exports = router;