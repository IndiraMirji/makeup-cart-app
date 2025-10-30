const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const Product = require("./models/Product");
const Cart = require("./models/Cart");

const app = express();

app.use(bodyParser.json());

app.use(cors());

const port = 8080;

//adding products
app.get("/api/products/init", async(req,res) =>{
    try {
    let sampleProducts = await Product.insertMany([
        {name:"Nars Lipstick",price:1200},
        {name:"Foundation",price:1500},
        {name:"Makeup Brush",price:599},
        {name:"Concealer",price:500},
        {name:"Mascara",price:120},
        {name:"Bronzer",price:799},
        {name:"Lip tint",price:399},
        {name:"EyeLiner",price:200},
        {name:"Eyeshadow",price:150},
        {name:"Eye Lashes",price:359},
    ]);
    res.send("Products added successfully");
    console.log("Products added successfully", sampleProducts);
} catch(error){
    res.status(500).send("Error adding products",error.message);
}
});

//fetch product details
app.get("/api/products",async(req,res) =>{
    try{
        let Products = await Product.find();
        res.json(Products);
    } catch(error){
        console.log(error);
        res.status(500).json("Error fetching products",error.message)
    }
    
});

//cart items
// app.get("/api/cart", async(req,res) => {
//     try{
//     const { productId, qty} = req.body;
//     const cartItem = new Cart({productId, qty});
//     await cartItem.save();
//     res.status(200).send("Added to cart");
//     } catch(error){
//         res.status(201).send("Error adding to cart:",+error.message);
//     }
// });

app.get("/api/cart", async(req,res) =>{
    try{
        const cartItems = await Cart.find().populate("productId");
        const total = cartItems.reduce(
            (sum, item) => sum + item.productId.price * item.qty,
            0
        );
        res.json({cart:cartItems,total});
    }catch(error){
        res.status(500).json("Error fetching cart items",error.message);

    }
})

app.post("/api/cart", async(req,res) => {
    try{
    const { productId, qty} = req.body;
    const existing = await Cart.findOne({ productId });
    if(existing){
        existing.qty += qty;
        await existing.save();
    } else {
        await Cart.create({productId, qty});
    }
    const updatedCart = await Cart.find().populate("productId"); 
    res.json(updatedCart);
} catch(error){
    res.status(500).json("Error",error.message);
}
});

app.delete("/api/cart/:id",async(req,res) => {
    try{
        const {id} = req.params;
        await Cart.findByIdAndDelete(id);
        res.status(200).send("Item removed from cart");
    } catch(error){
        res.status(500).send("Error removing item:",error.message);
        console.log(error);
    }
});

//receipt
app.post("/api/checkout", async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total from productId.price
    const total = cartItems.reduce((sum, item) => {
      const price = item.productId?.price || 0; // Safe access
      const qty = item.qty || 1;
      return sum + price * qty;
    }, 0);

    const receipt = {
      total,
      itemCount: cartItems.length,
      timestamp: new Date().toLocaleString(),
      message: "Checkout successful",
    };

    res.json(receipt);
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Error during checkout", error: error.message });
  }
});

app.listen(port, () => {
    console.log("Server is running on port 8080");
})
