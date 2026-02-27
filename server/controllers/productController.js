const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

exports.getAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.filename : null;
    const product = await Product.create({ name, description, price, image });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    
    const { name, description, price } = req.body;
    
    if (req.file && product.image) {
      const oldPath = path.join(__dirname, '../uploads', product.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    
    const image = req.file ? req.file.filename : product.image;
    await product.update({ name, description, price, image });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const product = await Product.findPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    
    if (product.image) {
      const imgPath = path.join(__dirname, '../uploads', product.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    
    await product.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};