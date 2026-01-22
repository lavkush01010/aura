const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: { type:String, required:true, unique:true },
    discountPercent: Number,
    expiry: Date,
    active: { type:Boolean, default:true }
});

module.exports = mongoose.model("Coupon", couponSchema);
