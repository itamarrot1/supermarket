import React, { useEffect, useState } from 'react';
import { CartItem, Product } from '../models';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectSuperuser } from '../slicers/loginSlice';
import { toast } from 'react-toastify';
import { addToCart,  selectCartItems } from '../slicers/cartSlicer';
import { increment } from '../../features/counter/counterSlice';

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const cart = useAppSelector(selectCartItems);
  const admin = useAppSelector(selectSuperuser);
  const dispatch = useAppDispatch();
  const isProductInCart = cart.some(item => item.product.id === product.id);
  

  const handleAddToCart = (quantityCng : number) => {
    if (isProductInCart == false) {
      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
  };
  dispatch(addToCart({ product, quantity: quantityCng}));
  };



 return (
    <div className="card" style={{ width: '18rem', margin: '1rem' }}>
      <img
        src={`http://127.0.0.1:8000/${product.image}`}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Price: ${product.price}</p>
        {admin && (
        <p className="card-text">Stock: {product.stock}</p>
        )}
        {isProductInCart ? (
          <div className="quantity-controls">
            <button className="btn btn-success" onClick={()=>handleAddToCart(1)}>+</button>
            <span>{cart.find(item => item.product.id == product.id)?.quantity}</span>
            <button className="btn btn-danger" onClick={()=>handleAddToCart(-1)}>-</button>
          </div>
        ) : (
          <button className='btn btn-primary' onClick={()=>handleAddToCart(1)}>
          Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
