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
      ...state,
      userDetails,
      token,
      isLoggedIn:true
      }
    },
    logout:(state,action)=>{
      return {
       ...initialState
      }
    }
  }});

// this is for dispatch
export const {addUserDetail ,logout} = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;