const express = require('express')
const router = express.Router();

const Payments = require("../models/Payment")

router.get("/addPayment", (req, res)=>{
    res.render("Payments")
})
router.post("/addPayment",async(req, res)=>{
    try {
        const payment = new Payments(req.body);
        await payment.save();
        console.log(payment)
        res.redirect("/addPayment")

    }catch (error){
        res.status(400).render("/addPayment")
        console.log(error);
    }
});
module.exports = router;