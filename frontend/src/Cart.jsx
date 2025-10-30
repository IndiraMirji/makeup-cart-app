import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';

const Cart = () => {
  const [cart,setCart] = useState([]);
  const [total,setTotal] = useState(0);

  const fetchCart = async () =>{
    try{
      const res = await axios.get("http://localhost:8080/api/cart");
      setCart(res.data.cart);
      setTotal(res.data.total);
    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  },[]);

  const handleRemove = async(id)=>{
    try{
      await axios.delete(`http://localhost:8080/api/cart/${id}`);
      fetchCart();
    } catch(error){
      console.error(error);
    }
  }

  const handleCheckout = async() =>{
    try{
      const res = await axios.post("http://localhost:8080/api/checkout",
        {cartItems:cart});
        alert(`Checout successful\n Total:${res.data.total}\n Time:${res.data.timestamp}`);
    } catch(error){
      console.error(error);
      alert("checkout failed");
    }
  }
  return (
    <div>
      <h1>Cart</h1>
      {cart.length === 0 && <p>Your cart is empty</p>}
      {cart.map(item => (
        <div key={item.id}> 
        <p>{item.productId.name}-{item.productId.price}*{item.qty}</p>
        <button onClick={() => handleRemove(item._id)}>Remove</button>
        
        </div>
      
      ))}
      {cart.length > 0&& (
        <>
        <h3>Total:{total}</h3>
      <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
      
    </div>
  )
}

export default Cart
