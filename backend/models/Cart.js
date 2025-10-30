const mongoose = require("mongoose");
// const Product = require("./models/Product");

const cartSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    qty: {
        type:Number,
        min:1,
        required:true,
    },
});

module.exports = mongoose.model("cart", cartSchema);