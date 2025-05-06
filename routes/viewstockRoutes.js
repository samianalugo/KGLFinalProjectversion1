const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");
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


router.get("/viewingstock", async (req, res) => {
  try {
    // 1. Get all produce items
    const produces = await Produce.find().lean();

    // 2. Aggregate sales grouped by produce ID
    const salesAgg = await Sale.aggregate([
      {
        $group: {
          _id: "$prodname", // Group by produce ID
          totalSold: { $sum: "$saletonnage" }
        }
      }
    ]);

    // 3. Convert to a map for easy lookup
    const salesMap = {};
    salesAgg.forEach(sale => {
      salesMap[sale._id.toString()] = sale.totalSold;
    });

    // 4. Attach remaining quantity to each produce
    const updatedProduces = produces.map(prod => {
      const sold = salesMap[prod._id.toString()] || 0;
      const remaining = (prod.quantity || 0) - sold;
      return {
        ...prod,
        sold,
        remaining
      };
    });

    res.render("viewstock", { Produces: updatedProduces });
  } catch (error) {
    console.error("Error viewing stock:", error);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
