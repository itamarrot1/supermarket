import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { selectLoggedUser, selectSuperuser, setLogOut } from '../slicers/loginSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { clear_cart } from '../slicers/cartSlicer';


const Navbar: React.FC = () => {
const loggedUser = useAppSelector(selectLoggedUser)
const admin = useAppSelector(selectSuperuser)
const [showmodal, setShowModal] = useState(false)
const dispatch = useAppDispatch();


const log_out = ()=>{
  setShowModal(true)
}

const handleConfirmLogout = ()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('cart')
  dispatch(clear_cart())
  dispatch(setLogOut())
  setShowModal(false)
}
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Logo</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              <span className="glyphicon glyphicon-user"></span> Log-in
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              <span className="glyphicon glyphicon-user"></span> Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              <span className="glyphicon glyphicon-shopping-cart"></span> Cart
            </Link>
            </li>
          {loggedUser && (
            <>
                <li className='nav-item'>
                    <Link className='nav-link' to='/account'>
                    <span className="glyphicon glyphicon-my-account"></span>my account</Link>
                  </li>
                  <li className='nav-item'>
                <Link className='nav-link' to="#" onClick={log_out}>
                  Log Out
                </Link>
              </li>
                  </>
            ) }
            {admin && (
              <li>
                <Link className='nav-link'to='/addProduct'>
                <span className='glyphicon glyphicon-addProduct'></span>Add product
                </Link>
              </li>
            )}
      
        
        </ul>
        {showmodal && (
          <div className='modal show'  style={{ display: 'block' }} role="dialog">
             <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleConfirmLogout}>Log Out</button>
          </div>
          </div>
          </div>
          </div>


        )}
      </div>
    </nav>
  );
}

export default Navbar;
