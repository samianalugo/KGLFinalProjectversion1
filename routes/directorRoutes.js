const express = require('express')
const router = express.Router();

//const Sale = require("../models/Sale")

router.get("/directordash", (req, res)=>{
    res.render("directordashboard")
});

module.exports = router;