import React from 'react';
import './App.css';
import Navbar from './app/components/Navbar';
import Header from './app/components/Header';
import Container from './app/components/Container';
import Footer from './app/components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './app/components/Login';
import Register from './app/components/Register';
import Cart from './app/components/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from './app/components/Order';
import { AddProduct } from './app/components/AddProduct';


const App: React.FC = () => {
  return (
    <>
<BrowserRouter>
<ToastContainer/>
<Header/>
<Navbar/>
<div className="content">
  <Routes>
<Route path='/' element={<Container/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/cart' element={<Cart/>}></Route>
<Route path='/order' element={<Order/>}></Route>
<Route path='/addProduct' element={<AddProduct/>}></Route>
</Routes>
</div>
<Footer/>
</BrowserRouter>
    </>
  );
}

export default App;
