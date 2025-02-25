import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./Components/Layout.jsx";
import HomePage from "./Pages/HomePage/index.jsx";
import SignUp from "./Pages/SignUp/index.jsx";
import SignIn from "./Pages/Sign-In/index.jsx";
import Product from "./Pages/Products/index.jsx";
import Wishlist from "./Pages/Wishlist/index.jsx";
import Cart from "./Pages/Cart/index.jsx";
import Address from "./Pages/Address/index.jsx";
import Account from "./Pages/MyAccount/index.jsx";
import Checkout from "./Pages/CheckOut/index.jsx";
import Payment from "./Pages/PaymentOptions/index.jsx";
import Review from "./Pages/Review/index.jsx";
import AboutUs from "./Pages/AboutUs/index.jsx";
import SingleProduct from "./Pages/SingleProduct/index.jsx";
import { PersistGate } from "redux-persist/integration/react"; // PersistGate for loading state
import { store, persistor } from "./Store/Store"; // Import the store and persistor
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />} index />
      <Route path="/medicines" element={<Product />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/myaccount/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/myaccount" element={<Account />} />
      <Route path="/myaccount/addresses" element={<Address />} />
      <Route path="/orders/checkout" element={<Checkout />} />
      <Route path="/orders/payments" element={<Payment />} />
      <Route path="/orders/review" element={<Review />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/products/:productName" element={<SingleProduct />} />
      <Route path="/medicines/:brand" element={<Product />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => {
          console.log("Rehydrated state:", store.getState());
        }}
      >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
