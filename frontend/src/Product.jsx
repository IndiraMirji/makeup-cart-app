import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Product = () => {
    const [products, setproducts] = useState([]);
    useEffect(() =>{
        axios.get("http://localhost:8080/api/products")
        .then(res => setproducts(res.data))
        .catch(err =>console.log(err));
    },[])

    const handleAddToCart = async (productId) =>{
      try{
        await axios.post("http://localhost:8080/api/cart",{
          productId,
          qty:1,
        });
        alert("Added to cart");
      } catch(error){
        console.log(error);
        alert("Failed to add to cart");
      }
    }
  return (
    <div>
        {products.map(p =>
            <div key={p._id}>
                <p>{p.name}</p>
                <p>{p.price}</p>
                <button onClick={() => handleAddToCart(p._id)}>Add to cart</button>
                </div>
        )}
      
    </div>
  )
}

export default Product
