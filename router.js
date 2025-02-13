const express = require('express');
const MenuItem = require('./schema');


const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name and Price are required',
      });
    }

    const newMenuItem = await MenuItem.create({ name, description, price });
    res.status(201).json({
      success: true,
      message: 'New menu item created successfully',
      data: newMenuItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating menu item',
      error: error.message,
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json({ success: true, data: menuItems });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching menu items',
      error: error.message,
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (name === '' || price === '') {
      return res.status(400).json({
        success: false,
        message: 'Name and Price cannot be empty',
      });
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true, runValidators: true }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      data: updatedMenuItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating menu item', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedMenuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.status(200).json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting menu item', error: error.message });
  }
});

module.exports = router;         