
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store'; // Adjust the import path according to your project structure
import { Product } from '../models';
import { FetchProducts } from '../APIS/containerAPI';

// Define the shape of the state
export interface ContainerSlice {
  products: Product[]; 
  status: 'idle' | 'loading' | 'failed';
  error?: string;
}

// Define the initial state
const initialState: ContainerSlice = {
  products: [],
  status: 'idle',
  error: undefined,
};

// Define an async thunk for fetching data
export const get_products = createAsyncThunk(
  'containerAPI/FetchProducts',
  async () => {
    const response = await FetchProducts();
    return response.data;
  }
);

// Create a slice
const container = createSlice({
  name: 'container',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_products.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(get_products.fulfilled, (state, action: PayloadAction<any[]>) => { // Replace 'any[]' with the appropriate type
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(get_products.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { } = container.actions;

// Export selector
export const selectProducts = (state: RootState) => state.container.products;
export const selectStatus = (state: RootState) => state.container.status;
export const selectError = (state: RootState) => state.container.error;

// Export reducer
export default container.reducer;
