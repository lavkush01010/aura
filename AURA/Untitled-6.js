const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    stock: Number,
    images: [String],
    createdAt: { type:Date, default:Date.now }
});

module.exports = mongoose.model("Product", productSchema);
