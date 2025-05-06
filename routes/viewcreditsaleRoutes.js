const express = require('express')
const router = express.Router();

const Sale = require("../models/Sale")


router.get("/viewcreditsale", async (req, res) => {

  if (!req.user || !req.user.branch) {
    return res.status(401).send("Unauthorized: User not logged in or missing branch info");
  }
  req.session.user = req.user;//declares user per session
  try {
    const item = await Sale.find({branch:req.user.branch})
    .sort({ date: -1 })
    .populate("sellername")
    .populate("prodname"); // Adjust sorting if needed
    res.render("viewcreditproduce", { 
      Sales: item
          
     }); // 'viewstock' should match your Pug file name
  } catch (error) {
    console.error("Error fetching sale:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.post('/deletecreditsale/:id', async (req, res) => {
    try {
      await Sale.findByIdAndDelete(req.params.id);
      res.redirect('/viewcrediproduce');
    } catch (error) {
      console.error('Error deleting sale:', error);
      res.status(500).send('Server Error');
    }
  });
module.exports = router;