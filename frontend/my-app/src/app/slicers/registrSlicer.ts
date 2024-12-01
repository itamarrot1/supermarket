import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { register } from '../APIS/registerAPI';



interface registerSlice {
    status: 'idle' | 'loading' | 'failed';
    error? : string,
    username: string,
    password:string,
    address:string,
    phone:string
}

const initialState: registerSlice = {
    status : 'idle',
    username:'',
    password:'',
    address:'',
    phone:'',
    error:undefined
};

export const registerAsync = createAsyncThunk(
    'registerAPI/register',
    async ( regdata:{username: string; password: string; address: string; phone: string} ) => {
        console.log()
        
      const response = await register(regdata.username,regdata.password,regdata.address,regdata.phone);
      return response.data;
    }
  );


const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload;
            console.log(state.username);
            
        },
        setPassword(state,action :PayloadAction<string>){
            state.password = action.payload
            console.log(state.password);
        },
        setAddress(state,action : PayloadAction<string>){
            state.address=action.payload
        },
        setPhone(state,action : PayloadAction<string>){
            state.phone=action.payload
        },
    },
        extraReducers: (builder) => {
            builder
              .addCase(registerAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(registerAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                console.log(action.payload);
               })
              .addCase(registerAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'register failed';
                console.log(state.error);
                
              });
    },
});

export const selectUsername = (state : RootState) => state.register.username;
export const selectPassword = (state : RootState) => state.register.password;
export const selectAddress = (state : RootState) => state.register.address;
export const selectPhone = (state : RootState) => state.register.phone;
export const { setAddress,setPassword,setPhone,setUsername} = registerSlice.actions;
export default registerSlice.reducer;

