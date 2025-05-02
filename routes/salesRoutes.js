const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

const Sale = require("../models/Sale");
const Produce = require("../models/Produce");

// Routes for making a sale
router.get(
"/addSale/:id",
connectEnsureLogin.ensureLoggedIn(),
async (req, res) => {
if (
req.session.user.role == "salesagent" ||
req.session.user.role == "manager"
) {
try {
const produce = await Produce.findOne({ _id: req.params.id });
console.log("my produce...........................", produce);
res.render("add_sale", {
produce: produce,
currentUser: req.session.user,
});
} catch (error) {
console.error("Error rendering add_sale page:", error);
res.status(400).send("Unable to find item in the database");
}
} else {
res.send("You are not allowed to access this page");
}
}
);

// POST route to handle selling a sale`
router.post(
"/addSale/:id",
connectEnsureLogin.ensureLoggedIn(),
async (req, res) => {
if (
req.session.user.role == "salesagent" ||
req.session.user.role == "manager"
) {
try {
const { saletonnage } = req.body;
const produce = await Produce.findById({ _id: req.params.id });

if (!produce) {
return res.status(404).send("Produce not found");
}

if (produce.tonnage < saletonnage) {
return res
.status(400)
.send(
`Not enough tonnage in stock,there are ${produce.tonnage}kg in stock`
);
}

if (produce && produce.tonnage > 0) {
const saleMade = new Sale({
prodname: req.body.prodname,
saletonnage: req.body.saletonnage,
unitsellingprice: req.body.unitsellingprice,
amountpaid: req.body.amountpaid,
buyername: req.body.buyername,
sellername: req.body.sellername,
date: req.body.date,
time: req.body.time,
});

await saleMade.save();

// Decrease the tonnage of produce in the database by the number kgs of produce sold
// The new produce tonnage after sale
produce.tonnage -= saletonnage;
console.log("new tonnage after sale", produce.tonnage);
await produce.save();

res.redirect("/salesList");
} else {
return res
.status(404)
.json({ error: "Produce not found or sold out" });
}
} catch (error) {
console.error("Error selling produce:", error.message);
res.status(500).send("Internal Server Error");
}
} else {
res.send("You are not allowed to access this page");
}
}
);

// Get all sales
router.get(
"/salesList",
connectEnsureLogin.ensureLoggedIn(),
async (req, res) => {
try {
let items = await Sale.find()
.sort({ $natural: -1 })
.populate("prodname") // Populate the 'prodname' field with the corresponding Produce document/ all details of produce are extracted
.populate("sellername");
// .populate("sellername", "firstname lastname")
const maganjoSales = items.filter(
(sale) => sale.prodname?.stockbranch === "Maganjo"
);
console.log("items in sales for maganjo", maganjoSales);
res.render("sales_list", {
title: "Sales list",
sales: items,
});
} catch (err) {
res.status(400).send("Unable to find items in the database");
}
}
);

module.exports = router