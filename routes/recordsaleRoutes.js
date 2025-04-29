const express = require('express')
const router = express.Router();

const Sale = require("../models/Sale")

router.get("/addSale", (req, res)=>{
    res.render("RecordSale")
});
router.post("/addSale",async (req, res)=>{
    try {
        const sale = new Sale(req.body);
        await sale.save();
        console.log(sale)
        res.redirect("RecordSale/addSale")

    }catch{
        res.status(400).render("RecordSale")
        console.log(error);
    }
});
module.exports = router;