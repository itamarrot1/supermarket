import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addToCart, selectCartItems, selectTotal } from '../slicers/cartSlicer';
import { Product } from '../models';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { selectLoggedUser } from '../slicers/loginSlice';
import { toast } from 'react-toastify';

const Cart = () => {
  const cart = useAppSelector(selectCartItems);
  const isLogged = useAppSelector(selectLoggedUser)
  const total = useAppSelector(selectTotal)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const handlequantity=(product : Product , quantity : number)=>{
    dispatch(addToCart({ product, quantity :quantity}))
  }
  const toOrder =()=>{
    if (isLogged) {
      navigate('/order',{state:cart})
    } else{
      toast.error("Please log-in to continue")
    }
  }

  return (
    <div>
      <div className='card-container' style={{display:'flex' }}>
      {cart.map(item => (
        <div key={item.product.id} className="card" style={{ width: '10rem', margin: '1rem' }}>
          <img 
            src={`http://127.0.0.1:8000/${item.product.image}`} 
            className="card-img-top" 
            alt={item.product.name} 
          />
          <div className="card-body">
            <h5 className="card-title">{item.product.name}</h5>
            <p className="card-text">Price: ${item.product.price}</p>
            <p className='card-text'>Quantity: {item.quantity}</p>
            <button onClick={()=>handlequantity(item.product , 1)}>+</button>
            <button onClick={()=>handlequantity(item.product , -1)}>-</button>
          </div>
        </div>
      ))}
      </div>
      <div style={{textAlign:'center'}}>
    Total price:   {total} $
    <br></br>
    {total > 0 && (
      <button onClick={toOrder}>place order</button>
    )}
    </div>
    </div>
  );
};

export default Cart;