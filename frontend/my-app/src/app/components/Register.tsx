import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { registerAsync, selectPassword, selectUsername, selectAddress, selectPhone, setAddress, setPassword, setPhone, setUsername } from '../slicers/registrSlicer';
import {  Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';

const Register = () => {
    const dispatch = useAppDispatch();
    const [username, setUsernameLocal] = useState('');
    const [password, setPasswordLocal] = useState('');
    const [address, setAddressLocal] = useState('');
    const [phone, setPhoneLocal] = useState('');
    const navigate = useNavigate();

    const status = useAppSelector(state => state.register.status);
    const error = useAppSelector(state => state.register.error);

    const handleRegister = () => {
        dispatch(registerAsync( {username, password, address, phone} ))
        .unwrap()
        .then(()=>{
            navigate('/login')
    });
    };
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="my-4">Register</h2>

                    {/* Username Input */}
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsernameLocal(e.target.value)}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPasswordLocal(e.target.value)}
                        />
                    </div>

                    {/* Address Input */}
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            id="address"
                            className="form-control"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddressLocal(e.target.value)}
                        />
                    </div>

                    {/* Phone Input */}
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            className="form-control"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) => setPhoneLocal(e.target.value)}
                        />
                    </div>

                    <div className='text-center'>
                        <button className="btn btn-primary" onClick={handleRegister} disabled={status === 'loading'}>
                            {status === 'loading' ? 'Creating user...' : 'Create user'}
                        </button>
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
