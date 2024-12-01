import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectAddress, selectPhone, selectUsername } from '../slicers/loginSlice';
import { selectCartItems, selectTotal, clear_cart } from '../slicers/cartSlicer';
import { orderAsync } from '../slicers/orderSlicer';
import { toast } from 'react-toastify';

const Order = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useAppSelector(selectUsername);
  const address = useAppSelector(selectAddress);
  const phone = useAppSelector(selectPhone);
  const cart = useAppSelector(selectCartItems);
  const total = useAppSelector(selectTotal);
  const dispatch = useAppDispatch();

  const handlePlaceOrder = () => {
    const orderData = {
      products: cart.map(item => ({
        product_id: item.product.id,
        amount: item.quantity,
      })),
    };
    dispatch(orderAsync(orderData));
  };

  const confirmCancelOrder = () => {
    dispatch(clear_cart());
    toast.success('Your order has been canceled!', { position: 'top-center' });
    setShowModal(false);
  };

  return (
    <div>
      <h3>Customer Details:</h3>
      <p><strong>Username:</strong> {user}</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p>Your bill is ${total}</p>

      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <div className='card-container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {cart.map(item => (
            <div key={item.product.id} className="card" style={{ width: '8rem', margin: '0.5rem' }}>
              <img src={`http://127.0.0.1:8000/${item.product.image}`} className="card-img-top" alt={item.product.name} />
              <div className="card-body">
                <h5 className="card-title">{item.product.name}</h5>
                <p className="card-text">Price: ${item.product.price}</p>
                <p className='card-text'>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <div style={{ textAlign: 'center' }}>
        {cart.length > 0 && (
          <>
            <button className='btn btn-success' onClick={handlePlaceOrder}>Pay Now</button>
            <button className='btn btn-danger' onClick={() => setShowModal(true)}>Cancel Order</button>
          </>
        )}
      </div>

      {/* Bootstrap Modal */}
      <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Cancellation</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <p>Cancel the order?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>No</button>
              <button className="btn btn-danger" onClick={confirmCancelOrder}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
