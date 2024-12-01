import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { placeOrder } from '../APIS/orderAPI';
import { CartItem, Product } from '../models';
import { RootState } from '../store';

const initialState = {
    order: null,
    status: 'idle' || 'loading' || 'failed',
    error: null
}


export const orderAsync = createAsyncThunk(
    'orderAPI/placeOrder',
    async(orderData: { products: { product_id: number, amount: number }[] })=>{
        const response = await placeOrder(orderData)
        return response.data
    }
);

const orderSlicer = createSlice({
    name: 'order',
    initialState ,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(orderAsync.pending, (state) => {
            state.status = 'loading';
            state.error = null;
          })
          .addCase(orderAsync.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.order = action.payload;
          })
          .addCase(orderAsync.rejected, (state, action) => {
            state.status = 'failed';
          });
}
})
export const selectStatus = (state : RootState) => state.order.status;
export default orderSlicer.reducer;