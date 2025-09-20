import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PayPalPayment from "../../../Components/PayPalPayment";
import { addUser } from "../../../Store/User";
import axiosInstance from "../../../axios";

const Main = () => {
  const user = useSelector((state) => state.user.user);
  const buNowUserEmail = useSelector((state) => state.buynowprod.email);
  const checkOutDetails = useSelector((state) => state.checkout);
  const buyNowProduct = useSelector((state) => state.buynowprod.product);
  const productQuantity = useSelector((state) => state.buynowprod.quantity);
  const buyNowAddress = useSelector((state) => state.buynowprod.address);
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState(""); // 'success' or 'error'
  const [showsucessModal, setShowSucessModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(user);
  console.log(checkOutDetails);

  // Handle cartItems based on whether user exists or not
  const cartItems =
    user?.myCart?.length > 0
      ? user.myCart[0].items
      : buyNowProduct
      ? [{ productId: buyNowProduct, quantity: productQuantity }]
      : [];

  let subTotal = 0;
  if (user) {
    subTotal = cartItems.reduce(
      (acc, item) => acc + item.productId.oprice * item.quantity,
      0
    );
  } else {
    // When user is not defined, calculate the subtotal based on buyNowProduct and quantity
    subTotal = productQuantity * buyNowProduct?.oprice;
  }

  const shipping = 50; // Fixed shipping cost
  const total = subTotal + shipping;

  const orderDetails = {
    products: user
      ? cartItems.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.productId.oprice,
          total_price: item.productId.oprice * item.quantity,
        }))
      : [
          {
            productId: buyNowProduct._id,
            productName: buyNowProduct.name,
            quantity: productQuantity,
            price: buyNowProduct.oprice,
            total_price: buyNowProduct.oprice * productQuantity,
          },
        ],
    total: total,
    shippingAddress: checkOutDetails.selectedAddress,
  };

  const handleRedirect = () => {
    setTimeout(() => {
      setNotification(""); // Clear notification
      navigate("/"); // Redirect to home page
    }, 6000);
  };

  const handleTransactionComplete = async (transaction) => {
    try {
      let orderDetails;
      let endpoint;

      if (user) {
        // Case 1: Registered User
        orderDetails = {
          userId: user._id,
          shippingAddress: checkOutDetails.selectedAddress,
          bookingAddress: checkOutDetails.selectedAddress,
          products: user.myCart[0].items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.oprice,
            total_price: item.productId.oprice * item.quantity,
          })),
          payment_info: {
            transactionId: transaction.id,
            amount: transaction.amount.value,
            currency: transaction.amount.currency_code,
          },
          shipping_info: {
            shipping_date: new Date(),
            shipping_Cost: 50,
          },
          OrderSummary: {
            Total: transaction.amount.value,
          },
        };
        endpoint = "/users/createBooking";
      } else {
        // Case 2: Guest User
        orderDetails = {
          email: buNowUserEmail,
          shippingAddress: buyNowAddress,
          bookingAddress: buyNowAddress,
          payment: {
            transactionId: transaction.id,
            amount: transaction.amount.value,
            currency: transaction.amount.currency_code,
          },
          products: [
            {
              productId: buyNowProduct._id,
              productName: buyNowProduct.name,
              quantity: productQuantity,
              price: buyNowProduct.oprice,
              total_price: buyNowProduct.oprice * productQuantity,
            },
          ],
          shipping_info: 50,
          OrderSummary: {
            Total: transaction.amount.value,
          },
        };
        endpoint = "/buynow/createBuyNowBooking";
      }

      // Send API request
      const response = await axiosInstance.post(endpoint, orderDetails);
      console.log(response);

      if (
        response.data.message.includes("Booking added successfully") ||
        response.data.message.includes(
          "User and booking created successfully."
        ) ||
        response.data.message.includes("Booking created successfully")
      ) {
        setShowSucessModal(true);
        setNotification(
          `Congratulations! Your order has been placed successfully. Your order ID is ${
            response.data.updatedUser?.myOrders?.slice(-1)[0] ||
            response.data.response?._id
          }. Contact +14378753944 for queries.`
        );
        setNotificationType("success");
        const user = response?.data?.updatedUser;
        if (user) dispatch(addUser(user));
      } else {
        setNotification("Error placing order. Please try again.");
        setNotificationType("error");
      }
    } catch (error) {
      console.error("Error in transaction completion:", error);
      setNotification("An error occurred while processing the transaction.");
      setNotificationType("error");
    }
  };

  // const handleTransactionComplete = async (transaction, orderData) => {
  //   try {
  //     const transactionId = transaction.id;
  //     const transactionAmount = transaction.amount.value;
  //     const transactionCurrency = transaction.amount.currency_code;

  //     const products = orderData.products.map((product) => ({
  //       productId: product.productId,
  //       name: product.productName,
  //       quantity: product.quantity,
  //       price: product.price,
  //     }));

  //     const shippingAddress = orderData.shippingAddress || buyNowAddress;

  //     const orderDetails = {
  //       email: buNowUserEmail,
  //       shippingAddress: shippingAddress,
  //       bookingAddress: shippingAddress,
  //       payment: {
  //         transactionId: transactionId,
  //         amount: transactionAmount,
  //         currency: transactionCurrency,
  //       },
  //       products: products,
  //       shipping_info: 50,
  //       OrderSummary: {
  //         Total: transactionAmount,
  //       },
  //     };

  //     const response = await axios.post(
  //       "https://sinaih-health.vercel.app/api/buynow/createBuyNowBooking",
  //       orderDetails
  //     );

  //     if (response.data.message === "Booking added successfully.") {
  //       setOrderId(response?.data?.response._id);
  //       setShowSucessModal(true);
  //       setNotification(
  //         `Congratulations! You have successfully placed the order. Your order is ${response.data.response._id}. Kindly WhatsApp or call on +14378753944 for further updates or any queries.`
  //       );
  //       setNotificationType("success");
  //     } else {
  //       setNotification("Error placing order. Please try again.");
  //       setNotificationType("error"); // Set notification type to error
  //     }
  //   } catch (error) {
  //     console.error("Error in transaction completion:", error);
  //     setNotification("An error occurred while processing the transaction.");
  //     setNotificationType("error");
  //   }
  //   // cgvv
  // };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {notificationType === "success" && showsucessModal && (
        <div className="fixed top-60 left-0 w-full h-20 bg-green-100 text-white p-4 shadow-md z-50 flex flex-col sm:flex-row justify-between items-center sm:items-center sm:w-auto sm:mx-auto sm:px-6 sm:py-3">
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-sm text-green-600 sm:text-base">
              {notification}
            </p>
          </div>
          <Link to="/medicines">
            <button className="bg-green-400 text-white px-4 py-2 rounded-lg mt-4 sm:mt-0 cursor-pointer sm:ml-4 w-full sm:w-auto">
              Click here to buy more products
            </button>
          </Link>
        </div>
      )}
      {!showsucessModal && (
        <>
          <h1 className="font-bold text-[16px] text-center sm:text-left">
            Review Your Order
          </h1>

          <div className="border p-4 rounded-lg shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2">Product Details</th>
                    <th className="pb-2">Quantity</th>
                    <th className="pb-2">Price</th>
                    <th className="pb-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item?.productId?._id} className="border-t">
                      <td className="py-2 flex items-center sm:flex-row flex-col">
                        <img
                          src={item?.productId.images[0]}
                          alt={item?.productId.name}
                          width={50}
                          height={50}
                          className="mr-2 mb-2 sm:mb-0"
                        />
                        <span className="text-sm sm:text-base">
                          {item.productId.name}
                        </span>
                      </td>
                      <td className="py-2">{item?.quantity}</td>
                      <td className="py-2">CA${item?.productId.oprice}</td>
                      <td className="py-2">
                        CA${item?.productId?.oprice * item?.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-4 text-right">
            <p className="font-medium">Sub Total: CA${subTotal}</p>
            <p className="font-medium">Shipping: CA${shipping}</p>
            <h3 className="text-xl font-bold mt-2">Total: CA${total}</h3>
          </div>

          <div className="mt-4">
            <PayPalPayment
              orderDetails={orderDetails}
              onTransactionComplete={handleTransactionComplete}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
