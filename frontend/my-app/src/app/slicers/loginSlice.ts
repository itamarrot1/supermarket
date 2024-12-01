import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { login } from '../APIS/loginAPI';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { stat } from 'fs';

interface MyJwtPayload {
  username: string;
  is_superuser : boolean;
  address : string;
  number : string
}

const log=()=>{
    const is_log = localStorage.getItem('username')
    return is_log ? JSON.parse(is_log) : ''
}

interface LoginSlice {
    username : string ;
    password: string;
    status: 'idle' | 'loading' | 'failed';
    error?: string;
    token?: string;
    loggedUser : string;
    superuser : boolean;
    address : string
    number : string
}

const initialState: LoginSlice = {
    username : '',
    password : '',
    status: 'idle',
    error: undefined,
    token : undefined,
    loggedUser : log(),
    superuser : false,
    address : '',
    number : ''
};

export const loginAsync = createAsyncThunk(
    'loginAPI/login',
    async (user:{username:string,password:string}) => {
      const response = await login(user.username, user.password);
      return response.data;
    }
  );


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },
        setPassword(state,action :PayloadAction<string>){
            state.password = action.payload
        },
        setLogOut(state){
          state.loggedUser=log()
          state.superuser=false
        }
    },
        extraReducers: (builder) => {
            builder
              .addCase(loginAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                localStorage.setItem('token', action.payload.access)
                state.token = jwtDecode(action.payload.access)
                const decodedToken = jwtDecode<MyJwtPayload>(action.payload.access);
                state.loggedUser=decodedToken.username;
                localStorage.setItem('username',JSON.stringify( state.loggedUser))
                state.superuser=decodedToken.is_superuser;
                state.address=decodedToken.address;
                state.number=decodedToken.number;
                
                
                
                
                
                
                })
              .addCase(loginAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Login failed';
                console.log(state.error);
                
              });
    },
});

export const selectUsername = (state : RootState) => state.login.username;
export const selectPassword = (state : RootState) => state.login.password;
export const selectLoggedUser = (state : RootState) => state.login.loggedUser;
export const selectStatus = (state : RootState) => state.login.status;
export const selectSuperuser = (state : RootState) => state.login.superuser;
export const selectAddress = (state : RootState) => state.login.address;
export const selectPhone = (state : RootState) => state.login.number;
export const { setUsername,setPassword,setLogOut } = loginSlice.actions;
export default loginSlice.reducer;

