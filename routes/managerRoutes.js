const express = require('express')
const router = express.Router();

const Sale = require('../models/Sale');
const User = require('../models/SignUp');
const Produce = require('../models/Produce');

 router.get("/managerdash", async (req, res) => {
  const produce = await Produce.findById(req.params.id);
   res.render("managerdashboard");
 });

 // GET chart data for manager dashboard
router.get('/api/chart-data', async (req, res) => {
  try {
    // Group sales by month (last 12 months)
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amountpaid" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Get employee count by role
    const employees = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ sales, employees });
  } catch (err) {
    console.error("Error loading chart data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const connectEnsureLogin = require("connect-ensure-login");

router.get(
  "/api/chart-data",
  connectEnsureLogin.ensureLoggedIn(),
  
  async (req, res) => {

    if (req.user.role !== "manager") {
      
      return res.status(403).json({ error: "Access denied" });
    }
    // ... your logic
  }
);

module.exports = router;

