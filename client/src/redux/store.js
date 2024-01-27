import { configureStore } from '@reduxjs/toolkit';
import countSlice from './reducerSlice/countSlice';
import userSlice from './reducerSlice/userSlice';
import logger from 'redux-logger';
export default configureStore({
  reducer: {
    count: countSlice,
    user: userSlice
  },
  middleware:()=>[logger]
});