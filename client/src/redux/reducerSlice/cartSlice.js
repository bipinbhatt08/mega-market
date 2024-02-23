import { createSlice } from '@reduxjs/toolkit';
const initialState ={
  products:{},
  checkoutProductDetails:{}
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
    },
    addToCheckoutProductDetails:(state,action)=>{
      const { products,grandTotal } = action.payload
      state.checkoutProductDetails = {products,grandTotal}
    },
    clearCartState:(state,action)=>{
      state.products=initialState.products
      state.checkoutProductDetails =initialState.checkoutProductDetails 
    }

  }});

// this is for dispatch
export const {addToCart ,removeFromCart,addToCheckoutProductDetails,clearCartState} = cartSlice.actions;

// this is for configureStore
export default cartSlice.reducer;