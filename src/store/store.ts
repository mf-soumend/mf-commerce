import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "slices/userSlice";
import ordersReducer from "slices/orderSlice";
import categorySlice from "slices/categorySlice";
import cartReducer from "slices/cartSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blackList: ["categories"],
};
const rootReducer = combineReducers({
  user: userReducer,
  categories: categorySlice,
  cart: cartReducer,
  orders: ordersReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks to use typed dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
