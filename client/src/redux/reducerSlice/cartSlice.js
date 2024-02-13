import { createSlice } from '@reduxjs/toolkit';
const initialState ={
  products:{},
  
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
     const {productDetails}= action.payload
     const productId = productDetails._id
        state.products = {
        ...state.products,
        [productId]: productDetails
      }
     
    },
    removeFromCart:(state,action)=>{
      const id= action.payload
      delete state.products[id]
    }
  }});

// this is for dispatch
export const {addToCart ,removeFromCart} = cartSlice.actions;

// this is for configureStore
export default cartSlice.reducer;