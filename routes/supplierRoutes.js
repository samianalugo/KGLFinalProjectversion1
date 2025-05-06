const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// Route: GET - show form to add supplier
router.get('/addSupplier', (req, res) => {
  res.render('Supplier');
});

// Route: POST - add a new supplier
router.post('/addSupplier', async (req, res) => {
  try {
    const { company, phoneNumber, location } = req.body;

    // Validation
    if (isNaN(phoneNumber)) {
      return res.status(400).send('Phone number must be numeric.');
    }

    const supplier = new Supplier({
      company,
      phoneNumber: Number(phoneNumber),
      location
    });

    await supplier.save();
    res.redirect('/viewsupply');
  } catch (error) {
    console.error('Add error:', error);
    res.status(400).render('Supplier');
  }
});

// Route: GET - view all suppliers
router.get('/viewsupply', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render('viewsupplier', { Suppliers: suppliers });
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).send('Server Error');
  }
});

// Route: GET - show form to edit a supplier
router.get('/editsupplier/:id', async (req, res) => {
  try {
    const item = await Supplier.findById(req.params.id);
    res.render('editsupply', { item });
  } catch (error) {
    console.error('Edit form error:', error);
    res.status(500).send('Error loading form');
  }
});

// Route: POST - update a supplier
router.post('/editsupplier/:id', async (req, res) => {
  try {
    const { company, phoneNumber, location } = req.body;

    if (isNaN(phoneNumber)) {
      return res.status(400).send('Phone number must be numeric.');
    }

    await Supplier.findByIdAndUpdate(req.params.id, {
      company,
      phoneNumber: Number(phoneNumber),
      location
    });

    res.redirect('/viewsupply');
  } catch (error) {
    console.error('Edit error:', error);
    res.status(500).send('Error updating supplier.');
  }
});

// Route: POST - delete a supplier
router.post('/deletesupplier/:id', async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect('/viewsupply');
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).send('Error deleting supplier.');
  }
});

module.exports = router;
