const express = require('express')
const router = express.Router();

const Supplier = require("../models/Supplier")

router.get("/addSupplier", (req, res)=>{
    res.render("Supplier")
})
router.post("/addSupplier",async(req, res)=>{
    try {
        const supplier = new Supplier(req.body);
        await supplier.save();
        console.log(supplier)
        res.redirect("Supplier/addSupplier")

    }catch{
        res.status(400).render("Supplier")
        console.log(error);
    }
});
module.exports = router;