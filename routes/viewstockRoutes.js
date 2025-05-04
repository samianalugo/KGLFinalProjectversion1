const express = require("express");
const router = express.Router();
const Produce = require("../models/Produce"); // Make sure this path is correct
//View all stock
router.get("/viewingstock", async (req, res) => {
  try {
    const stockItems = await Produce.find().sort({ date: -1 }); // Adjust sorting if needed
      res.render("viewstock", { 
      Produces: stockItems,
           
     }); // 'viewstock' should match your Pug file name
  } catch (error) {
    console.error("Error fetching stock:", error);
    res.status(500).send("Internal Server Error");
  }
});
//View all stock
// router.get('/viewingstock', async (req, res) => {
//     try {
//       const stockItems = await Produce.find(); // fetch data from DB
//       res.render('viewstock', { 
//        Produce: stockItems }); // pass it to Pug
//     } catch (error) {
//       console.error('Error fetching stock:', error);
//       res.status(500).send('Server Error');
//     }
//   });
router.post('/deleteproduce/:id', async (req, res) => {
  try {
    await Produce.findByIdAndDelete(req.params.id);
    res.redirect('/viewingstock');
  } catch (error) {
    console.error('Error deleting produce:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
