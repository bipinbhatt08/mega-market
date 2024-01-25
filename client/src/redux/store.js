import { configureStore } from '@reduxjs/toolkit';
import countSlice from './reducerSlice/countSlice';
import userSlice from './reducerSlice/userSlice';
export default configureStore({
  reducer: {
    count: countSlice,
    user: userSlice
  },
});