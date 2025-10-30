const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/cart");

mongoose.connection.on("connected",() => {
    console.log("Connected To DB");
})

mongoose.connection.on("error", (err)=> {
    console.log("Connection Error", error);
})

module.exports = mongoose;