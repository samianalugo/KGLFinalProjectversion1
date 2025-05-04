const express = require('express');
const router = express.Router();
const CreditEntry = require('../models/CreditEntry');

//const query = req.user.role === 'manager' ? {} : { createdBy: req.user._id };
//const entries = await CreditEntry.find(query).sort({ dispatchdate: -1 });


// Render edit form
router.get('/edit/:id', async (req, res) => {
    try {
      const credit = await CreditEntry.findById(req.params.id);
      if (!credit) return res.status(404).send('Credit entry not found');
  
      res.render('editCredit', { credit }); // Adjust 'editCredit' to match your view filename
    } catch (err) {
      console.error('Error loading credit entry:', err);
      res.status(500).send('Server Error');
    }
  });

// Create new credit entry
router.post('/add', async (req, res) => {
 
 
    try {
    const newEntry = new CreditEntry({
      buyername: req.body.buyername,
      nationalid: req.body.nationalid,
      location: req.body.location,
      quantity: req.body.quantity,
      amountdue: req.body.amountdue,
      salesagentname: req.body.salesagentname,
      duedate: req.body.duedate,
      dispatchdate: req.body.dispatchdate,
      phonenumber: req.body.phonenumber,
      typeproduce: req.body.typeproduce,
      produce: req.body.produce,
      createdBy: req.user._id
    });

    await newEntry.save();
    res.redirect('/dashboard'); // or wherever you want to redirect after submission
  } catch (err) {
    console.error('Error saving credit entry:', err);
    res.status(500).send('Server Error');
  }
});

// Update an existing credit entry
router.post('/edit/:id', async (req, res) => {
    try {
      const entry = await CreditEntry.findById(req.params.id);
      if (!entry) return res.status(404).send('Entry not found');
  
      entry.buyername = req.body.buyername;
      entry.nationalid = req.body.nationalid;
      entry.location = req.body.location;
      entry.quantity = req.body.quantity;
      entry.amountdue = req.body.amountdue;
      entry.salesagentname = req.body.salesagentname;
      entry.duedate = req.body.duedate;
      entry.dispatchdate = req.body.dispatchdate;
      entry.phonenumber = req.body.phonenumber;
      entry.typeproduce = req.body.typeproduce;
      entry.produce = req.body.produce;
  
      await entry.save();
      res.redirect('/dashboard'); // or wherever appropriate
    } catch (err) {
      console.error('Error updating credit entry:', err);
      res.status(500).send('Server Error');
    }
  });
  
  router.post('/delete/:id', async (req, res) => {
    try {
      await CreditEntry.findByIdAndDelete(req.params.id);
      res.redirect('/dashboard'); // Or wherever you list the entries
    } catch (err) {
      console.error('Error deleting credit entry:', err);
      res.status(500).send('Server Error');
    }
  });

  router.get('/dashboard', async (req, res) => {
    try {
      const entries = await CreditEntry.find({ createdBy: req.user._id }).sort({ dispatchdate: -1 });
      res.render('dashboard', { entries });
    } catch (err) {
      console.error('Error loading dashboard:', err);
      res.status(500).send('Server Error');
    }
  });
  module.exports = router;
  