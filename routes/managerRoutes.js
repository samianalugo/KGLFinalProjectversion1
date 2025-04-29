const express = require('express')
const router = express.Router();

//const Sale = require("../models/Sale")



router.get("/managerdash", (req, res) => {
  res.render("managerdashboard");
});
module.exports = router;

