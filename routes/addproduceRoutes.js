const express = require('express')
const router = express.Router();

const Produce = require("../models/Produce")

router.get("/addproduce", (req, res)=>{
    res.render("Produce")
})
router.post("/addproduce",async(req, res)=>{
    try {
        const produce = new Produce(req.body);
        await produce.save();
        console.log(produce)
        res.redirect("/addproduce")

    }catch (error) {
        res.status(400).render("/addproduce")
        console.log(error);
    }
});
module.exports = router;