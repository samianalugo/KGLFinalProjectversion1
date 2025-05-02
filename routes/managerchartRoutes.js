const express = require('express');
const router = express.Router();
const CreditEntry = require('../models/CreditEntry'); // Adjust path if needed
const User = require('../models/User');               // Adjust path if needed

router.get('/api/chart-data', async (req, res) => {
  try {
    // Sales: Group total amountdue by month
    const sales = await CreditEntry.aggregate([
      {
        $group: {
          _id: { $month: '$dispatchdate' },
          total: { $sum: '$amountdue' }
        }
      },
      { $sort: { _id: 1 } } // Sort by month
    ]);

    // Employees: Group by role
    const employees = await User.aggregate([
      {
        $group: {
          _id: { $toLower: '$role' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ sales, employees });
  } catch (err) {
    console.error('Chart data error:', err);
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
});

module.exports = router;
