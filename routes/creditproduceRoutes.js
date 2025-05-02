const express = require('express')
const router = express.Router();

const CreditProduce = require("../models/creditproduce")

router.get("/addCreditProduce", async (req, res)=>{
    try{
       const creditData = await CreditProduce.find();
       res.render("CreditProduce", {creditData});
         }catch (err) {
            console.error(err);
            res.status(400).send("Server Error");

         }
    
});
router.post("/addCreditProduce",async(req, res)=>{
    try {
        const creditproduce = new CreditProduce(req.body);
        await creditproduce.save();
        console.log(creditproduce)
        res.redirect("/addCreditProduce")

    }catch (error){
        res.status(400).render("/addCreditProduce")
        console.log(error);
    }
});
 
router.get("/delete/:id", async (req, res)=>{
    try{
        await CreditProduce.findByIdAndDelete(req.params.id);
        res.redirect("/addCreditProduce");

    }catch (error) {
        console.error(error);
        res.status(400).send("Error deleting entry");
    }
});

router.get("/edit/:id", async (req, res)=>{
    try{
        const credit = await CreditProduce.findById(req.params.id);
        res.render("editCreditProduce", { credit });

    }catch (error) {
        console.error(error);
        res.status(400).send("Error fetching entry");
    }
});
 
router.post("/edit/:id", async (req, res) =>{
    try {
        await CreditProduce.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/addCreditProduce");
    }catch (error) {
        console.error(error);
        res.status(400).send("Error updating entry");
    }
});
module.exports = router;