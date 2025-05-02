const express = require('express')
const router = express.Router();

//const Sale = require("../models/Sale")

router.get("/", (req, res)=>{
    res.render("index")
});

module.exports = router;