import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import UserSlice from "./UserSlice";
import CompanySlice from "./CompanySlice";
import { persistReducer, persistStore } from 'redux-persist';
import { configureStore } from "@reduxjs/toolkit";

const persistConfig={
    key:"root",
    storage,
    whitelist:['user','company']

}
const rootReducer =combineReducers({
    user:UserSlice,
    company:CompanySlice
})

const persistedReducer =persistReducer(persistConfig,rootReducer)
const store = configureStore({
    reducer: persistedReducer,
  });
  
  export const persistor = persistStore(store);
  
  export type RootState = ReturnType<typeof store.getState>;
  export default store;