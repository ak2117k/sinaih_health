import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import User from "./User";
import Checkout from "./Checkout";
import Brands from "./Brands";

// Separate persist configuration for each slice
const persistConfig = {
  key: "root", // The key in the storage
  storage, // The storage to use (localStorage by default)
  whitelist: ["user", "checkout"], // The slices you want to persist
};

const checkoutPersistConfig = {
  key: "checkout",
  storage,
  whitelist: [
    "selectedAddress",
    "totalAmount",
    "PaymentType",
    "shippingOption",
  ],
};

// Persist each reducer separately
const persistedUserReducer = persistReducer(persistConfig, User);
const persistedCheckoutReducer = persistReducer(
  checkoutPersistConfig,
  Checkout
);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    checkout: persistedCheckoutReducer,
    brands: Brands,
  },
});

const persistor = persistStore(store);

export { store, persistor };
