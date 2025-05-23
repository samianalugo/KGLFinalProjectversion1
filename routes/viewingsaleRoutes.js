const express = require('express')
const router = express.Router();

const Sale = require("../models/Sale")

// router.get("/viewingsale", async (req, res) => {
//   try {
//     const items = await Sale.find(); // fetch all documents
//     res.render("viewsales", {
//          Sales: items }); // ✅ Use the key `Produces`
//   } catch (err) {
//     console.error("Error fetching produce:", err);
//     res.status(500).send("Server Error");
//   }
// });


router.get("/viewingsale", async (req, res) => {

  if (!req.user || !req.user.branch) {
    return res.status(401).send("Unauthorized: User not logged in or missing branch info");
  }
  req.session.user = req.user;//declares user per session
  try {
    const stockItems = await Sale.find({branch:req.user.branch})
    .sort({ date: -1 })
    .populate("sellername")
    .populate("prodname"); // Adjust sorting if needed
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