import { createSlice } from '@reduxjs/toolkit';
const initialState ={
  token: "",
  userDetails:{},
  isLoggedIn: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserDetail: (state, action) => {
     const {token,userDetails}= action.payload
     return {
      userDetails,
      token,
      isLoggedIn:true
  }
  },

}});

// this is for dispatch
export const {addUserDetail } = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;