import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CartItem, Product } from '../models';


const load_local_cart = ()=>{
  const local_cart = localStorage.getItem('cart')
  return local_cart ? JSON.parse(local_cart) : []
}

export interface CartSlicer {
  cart: CartItem[]
  total:number
}
// Define the initial state
const initialState: CartSlicer = {
  cart: load_local_cart(),
  total: 0,
};

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clear_cart:(state)=>{
      state.cart = []
      localStorage.removeItem('cart')
      state.total=0
    },
    addToCart(state, action: PayloadAction<{ product: Product, quantity: number }>) {
      const  product = action.payload.product;
      const quantity = action.payload.quantity;
      
      const pro_price = product.price
      // Find if the item already exists in the cart
      const existingItem = state.cart.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity 
        state.total += pro_price * quantity
        console.log(state.total)
        
        if (existingItem.quantity <= 0) {
          state.cart = state.cart.filter(item => item.product.id !== product.id);
        }
      } else {
        // Add the new item to the cart
        state.cart.push({ product, quantity });
        state.total += pro_price * quantity
        
        
      }
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    },
  },
);

export const { addToCart,clear_cart } = cart.actions;
// Selectors
export const selectCartItems = (state: RootState) => state.cart.cart;
export const selectTotal = (state: RootState) => state.cart.total;
export default cart.reducer;
