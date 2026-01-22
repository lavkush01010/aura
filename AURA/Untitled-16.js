const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Get all active coupons
router.get("/", async (req,res)=>{
    try{
        const coupons = await Coupon.find({ active:true, expiry:{ $gt: new Date() }});
        res.json(coupons);
    }catch(err){ res.status(500).json({ msg: err.message }); }
});

// Admin: Create coupon
router.post("/", auth, admin, async (req,res)=>{
    try{
        const newCoupon = new Coupon(req.body);
        await newCoupon.save();
        res.json(newCoupon);
    }catch(err){ res.status(500).json({ msg: err.message }); }
});

// Admin: Update coupon
router.put("/:id", auth, admin, async (req,res)=>{
    try{
        const updated = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new:true });
        res.json(updated);
    }catch(err){ res.status(500).json({ msg: err.message }); }
});

// Admin: Delete coupon
router.delete("/:id", auth, admin, async (req,res)=>{
    try{
        await Coupon.findByIdAndDelete(req.params.id);
        res.json({ msg:"Coupon deleted" });
    }catch(err){ res.status(500).json({ msg: err.message }); }
});

module.exports = router;
