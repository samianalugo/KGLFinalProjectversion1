const express = require('express')
const router = express.Router();

const Sale = require("../models/Sale");

router.get("/directordash", async (req, res)=>{
    try {
        let totalRevenue = await Sale.aggregate([
            {$group:{_id:null,
                totalQuantitySold:{$sum:"$saletonnage"},
                totalsale:{$sum:{$multiply:["$unitsellingprice", "$saletonnage"]}}
            }}
        ]);
        totalRevenue=totalRevenue[0] ?? {totalQuantitySold:0, totalsale:0};
        res.render("directordashboard", {
            totalRevenue
        });
    } catch (error) {
        res.status(400).send("Unable to find item from the db")
        console.error("aggregation error:",error.message)
        
    }
   
});

module.exports = router;