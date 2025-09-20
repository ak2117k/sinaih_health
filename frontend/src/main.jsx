import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react"; // PersistGate for loading state
import App from "./App.jsx";
import "./index.css";
import AboutUs from "./Pages/AboutUs/index.jsx";
import Address from "./Pages/Address/index.jsx";
import AdminDDashBoard from "./Pages/Admin/index.jsx";
import AdminSignIn from "./Pages/AdminSign-In/index.jsx";
import AdminSignup from "./Pages/AdminSign-up/index.jsx";
import Cart from "./Pages/Cart/index.jsx";
import Checkout from "./Pages/CheckOut/index.jsx";
import HomePage from "./Pages/HomePage/index.jsx";
import Account from "./Pages/MyAccount/index.jsx";
import Payment from "./Pages/PaymentOptions/index.jsx";
import Product from "./Pages/Products/index.jsx";
import Review from "./Pages/Review/index.jsx";
import SignIn from "./Pages/Sign-In/index.jsx";
import SignUp from "./Pages/SignUp/index.jsx";
import SingleProduct from "./Pages/SingleProduct/index.jsx";
import Wishlist from "./Pages/Wishlist/index.jsx";
import { persistor, store } from "./Store/Store"; // Import the store and persistor

const initialOptions = {
  "client-id":
    "Afq4VoZx-lQOAwI5EOf_DE5athgiE-mgHasPPyrNP1xIvHVwmBv_SH9EQgU2uO4wliAWcBf9oOzrojzz",
  // "enable-funding": "venmo",
  // "buyer-country": "CA",
  currency: "CAD",
  "data-page-type": "product-details",
  components: "buttons",
  "data-sdk-integration-source": "developer-studio",
  // intent: "CAPTURE",
  environment: "production",
};
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
      <Route path="/admin/dasboard" element={<AdminDDashBoard />} />
      <Route path="/admin/sign-in" element={<AdminSignIn />} />
      <Route path="/admin/sign-up" element={<AdminSignup />} />
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
        <PayPalScriptProvider options={initialOptions}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
