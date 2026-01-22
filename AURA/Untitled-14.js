const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Get all products
router.get("/", async (req,res)=>{
    try{
        const products = await Product.find();
        res.json(products);
    }catch(err){ res.status(500).json({ msg: err.message }); }
});

// Get single product
router.get("/:id", async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({ msg:"Product not found" });
        res.json(product);
    }catch(err){ res.status(500).json({ msg: err.message }); }
});

// Admin: Create product
router.post("/", auth, admin, async (req,res)=>{
    try{
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.json(newProduct);
    }catch(err){ res.status(500).json({ msg: err.message }); }
});

// Admin: Update product
router.put("/:id", auth, admin, async (req,res)=>{
    try{
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new:true });
        res.json(updated);
    }catch(err){ res.status(500).json({ msg: err.message }); }
});

// Admin: Delete product
router.delete("/:id", auth, admin, async (req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg:"Product deleted" });
    }catch(err){ res.status(500).json({ msg: err.message }); }
});

module.exports = router;
