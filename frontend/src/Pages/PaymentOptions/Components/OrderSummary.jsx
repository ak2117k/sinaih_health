import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const user = useSelector((state) => state.user.user);

  // Access the cart items
  const cartItems = user.myCart.length > 0 ? user.myCart[0].items : [];

  let totalPrice = 0;
  let totalOriginalPrice = 0;
  let totalSavings = 0;

  return (
    <div className="p-4 rounded-md w-full sm:w-120 h-auto sm:h-120">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

      {cartItems.map((item) => {
        const { productId, quantity } = item;
        const { name, images, price, oprice, brand } = productId;

        // Calculate total price and total original price for savings calculation
        const itemTotalPrice = price * quantity;
        const itemTotalOriginalPrice = oprice * quantity;
        const itemSavedAmount = itemTotalOriginalPrice - itemTotalPrice;

        totalPrice += itemTotalPrice;
        totalOriginalPrice += itemTotalOriginalPrice;
        totalSavings += itemSavedAmount;

        return (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row items-center mb-4 gap-4"
          >
            <img
              src={images[0]}
              alt={name}
              className="mr-4 w-20 h-20 object-cover"
            />
            <div>
              <h3>{name}</h3>
              {/* Use brand as SKU */}
              <p>SKU: {brand}</p>
              <p>
                Qty: {quantity} x${price}
              </p>
              <p className="font-bold">Total:${itemTotalPrice}</p>
              {itemSavedAmount > 0 && (
                <p className="text-red-600">You Saved${itemSavedAmount}</p>
              )}
            </div>
          </div>
        );
      })}

      {/* Total Value and Savings */}
      <div className="flex justify-end items-center mt-6 gap-4 flex-col sm:flex-row">
        <div className="mr-10 flex gap-2">
          <div className="font-bold">Total Value</div>
          <div className="font-bold text-lg mr-6">₹{totalPrice}</div>
        </div>
      </div>
      {totalSavings > 0 && (
        <div className="flex justify-between items-center mt-2">
          <div className="text-red-600">You Saved</div>
          <div className="text-red-600 font-bold">₹{totalSavings}</div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
