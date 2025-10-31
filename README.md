# Nexora--assignment
# Makeup Cart App

A simple full-stack web application built using **React**, **Node.js**, **Express**, and **MongoDB**.  
This app allows users to browse makeup products, add them to a cart, remove items, and complete checkout to generate a mock receipt.

---

## Features

- View a list of beauty and makeup products  
- Add products to the shopping cart  
- Remove products from the cart  
- View total cart value dynamically  
- Checkout and get a receipt with total amount and timestamp  

---

## Tech Stack

**Frontend:** React, Axios  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (local setup)  

---
## Project Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/Indira_Mirji/nexora-assignemnt.git
cd assignemnt


cd backend
npm install

cd frontend
npm install
npm run dev


## db.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/cart");

mongoose.connection.on("connected",() => {
    console.log("Connected To DB");
})

mongoose.connection.on("error", (err)=> {
    console.log("Connection Error", error);
})

module.exports = mongoose;
