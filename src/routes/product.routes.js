const express = require('express');
const router = express.Router();

const product = require('../models/product');

router.get('/', async(req, res) => {
    const products = await product.find();
    res.json(products);
});

router.get('/:id', async(req, res) => {
    const prod = await product.findById(req.params.id);
    res.json(prod)
});

router.post('/', async(req, res) => {
    const { nombre, provedor, cantidad, precio } = req.body;
    const prod = new product({
        nombre,
        provedor,
        cantidad,
        precio
    });
    await prod.save();
    res.json({ status: 'Producto guardado' });
});

router.put('/:id', async(req, res) => {
    const { nombre, provedor, cantidad, precio } = req.body;
    const newProduct = { nombre, provedor, cantidad, precio };
    await product.findByIdAndUpdate(req.params.id, newProduct);
    console.log(req.params.id);
    res.json({ status: 'Producto Actualizado' });
});

router.delete('/:id', async(req, res) => {
    await product.findByIdAndRemove(req.params.id);
    res.json({ status: 'Producto Eliminado' });
});

module.exports = router;