const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsSchema = new Schema({
    nombre: { type: String, required: true },
    provedor: { type: String, required: true },
    cantidad: { type: String, required: true },
    precio: { type: String, required: true }
});

module.exports = mongoose.model('Product', ProductsSchema);