const express = require('express')
const router = express.Router();

//const Sale = require("../models/Sale")

router.get("/salesagentdash", (req, res)=>{
    res.render("salesdashboard")
})

module.exports = router;