import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import Container from './components/Container';
import containerSlice from './slicers/containerSlice';
import loginSlice from './slicers/loginSlice';
import registrSlicer from './slicers/registrSlicer';
import cartSlicer from './slicers/cartSlicer';
import orderSlicer from './slicers/orderSlicer';
import { AddProduct } from './components/AddProduct';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    container: containerSlice,
    login: loginSlice,
    register: registrSlicer,
    cart : cartSlicer,
    order :orderSlicer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
