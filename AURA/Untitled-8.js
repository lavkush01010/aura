const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type:mongoose.Schema.Types.ObjectId, ref:"User" },
    products: [{
        productId: { type:mongoose.Schema.Types.ObjectId, ref:"Product" },
        qty: Number
    }],
    amount: Number,
    paymentStatus: { type:String, default:"Pending" },
    orderStatus: { type:String, default:"Processing" },
    address: String,
    createdAt: { type:Date, default:Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
