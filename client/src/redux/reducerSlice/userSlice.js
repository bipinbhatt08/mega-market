import { createSlice } from '@reduxjs/toolkit';

const initialState ={
  token: 0,
  userDetails:{},
  isLoggedIn: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserDetail: (state, action) => {
     
  },
}});

// this is for dispatch
export const { addUserDetail } = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;