const express = require('express')
const router = express.Router();

const Client = require("../models/Client")

router.get("/addClient", (req, res)=>{
    res.render("Client")
})
router.post('/addClient',async(req, res)=>{
    try {
        const client = new Client(req.body);
        await client.save();
        console.log(client)
        res.redirect("Client/addClient")

    }catch{
        res.status(400).render("Client")
        console.log(error);
    }
});
module.exports = router;