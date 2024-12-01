
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectPassword, selectUsername, setPassword,  setUsername,loginAsync, selectStatus } from '../slicers/loginSlice';

function Login() {

const dispatch = useAppDispatch();
const username = useAppSelector(selectUsername)
const password = useAppSelector(selectPassword)
const status = useAppSelector(selectStatus)

const handleLogin=()=>{
    dispatch(loginAsync({username,password}))  
}


return (
<div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="my-4">Login</h2>
          
          {/* Error message (display if needed) */}
          {status === 'failed' && (
            <div className="alert alert-danger" role="alert">
              Invalid credentials
            </div>
          )}
          {/* Loading message (display while logging in) */}
                {status === 'loading' && (
            <div className="alert alert-info" role="alert">
              Logging in...
            </div>
          )}

          
          {/* Username Input */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control input-sm"
              placeholder="Enter username"
              onChange={(e)=> dispatch(setUsername(e.target.value))}
            />
          </div>
          
          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="pass" className="form-label">Password</label>
            <input
              type="text"
             
              className="form-control input-sm"
              placeholder="Password"
              onChange={(e)=> dispatch(setPassword((e.target.value)))}
            />
          </div>
          
          {/* Login Button */}
          <button type="button" className="btn btn-primary" onClick={()=> handleLogin()}>Login</button>
          
        </div>
      </div>
    </div>
  );
};

export default Login;