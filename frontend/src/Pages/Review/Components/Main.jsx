import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Main = () => {
  const user = useSelector((state) => state.user.user);
  const checkOutDetails = useSelector((state) => state.checkout);

  const cartItems = user.myCart.length > 0 ? user.myCart[0].items : [];

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.productId.oprice * item.quantity,
    0
  );
  const shipping = 70;
  const total = subTotal + shipping;

  const handlePlaceOrder = async () => {
    if (!checkOutDetails.selectedAddress) {
      return alert("Please select an address for shipping.");
    }

    if (!checkOutDetails.PaymentType) {
      return alert("Please select a payment method.");
    }

    if (checkOutDetails.PaymentType === "cod") {
      const orderDetails = {
        shippingAddress: checkOutDetails.selectedAddress,
        bookingAddress: checkOutDetails.selectedAddress,
        products: cartItems.map((item) => {
          const { productId, quantity } = item;
          return {
            productId: productId._id,
            quantity: quantity,
            price: productId.oprice,
            total_price: productId.oprice * quantity,
          };
        }),
        payment_info: {
          method: "COD",
          status: "Pending",
        },
        shipping_info: {
          shippingCost: shipping,
          shippingMethod: checkOutDetails.shippingOption,
        },
        OrderSummary: {
          Total: total,
          taxes: shipping,
        },
        userId: user._id,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/users/createBooking",
          orderDetails,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.booking) {
          alert("Order placed successfully!");
        } else {
          alert("Error placing order. Please try again.");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while placing the order. Please try again.");
      }
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
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
                  <td className="py-2">₹{item?.productId.oprice}</td>
                  <td className="py-2">
                    ₹{item?.productId?.oprice * item?.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-4 text-right">
        <p className="font-medium">Sub Total: ₹{subTotal}</p>
        <p className="font-medium">Shipping: ₹{shipping}</p>
        <h3 className="text-xl font-bold mt-2">Total: ₹{total}</h3>
      </div>

      {/* Place Order Button */}
      <div className="mt-4">
        <button
          className="w-full py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Main;
