const express = require("express");
const router = express.Router();
const Produce = require("../models/Produce");

router.get("/viewingstocking", async (req, res) => {
  try {
    const stockItems = await Produce.find(); // fetch all documents
    res.render("viewstocking", {
         Produces: stockItems }); // ✅ Use the key `Produces`
  } catch (err) {
    console.error("Error fetching produce:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
