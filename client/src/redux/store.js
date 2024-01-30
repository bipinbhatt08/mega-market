import { configureStore,combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducerSlice/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist'

import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  user: userReducer
})
const persistedReducer = persistReducer(persistConfig, reducers)

export const store =  configureStore({
  reducer: persistedReducer,
  middleware:()=>[logger]
});
export const persistor = persistStore(store)