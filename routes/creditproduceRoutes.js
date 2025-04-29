const express = require('express')
const router = express.Router();

const CreditProduce = require("../models/creditproduce")

router.get("/addCreditProduce", (req, res)=>{
    res.render("CreditProduce")
})
router.post("/addCreditProduce",async(req, res)=>{
    try {
        const creditproduce = new CreditProduce(req.body);
        await creditproduce.save();
        console.log(creditproduce)
        res.redirect("CreditProduce/addCreditProduce")

    }catch{
        res.status(400).render("CreditProduce")
        console.log(error);
    }
});
module.exports = router;