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
    <div className="p-4 sm:p-6 lg:p-8 rounded-md w-full max-w-2xl mx-auto">
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
          <div key={item._id} className="flex items-center mb-4">
            <img
              src={images[0]}
              alt={name}
              className="mr-4 w-20 h-20 object-cover"
            />
            <div>
              <h3 className="text-sm sm:text-base">{name}</h3>
              {/* Use brand as SKU */}
              <p className="text-xs sm:text-sm">SKU: {brand}</p>
              <p className="text-sm sm:text-base">
                Qty: {quantity} x ₹{price}
              </p>
              <p className="font-bold text-sm sm:text-base">
                Total: ₹{itemTotalPrice}
              </p>
              {itemSavedAmount > 0 && (
                <p className="text-red-600 text-xs sm:text-sm">
                  You Saved ₹{itemSavedAmount}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* Total Value and Savings */}
      <div className="flex justify-between items-center mt-6 gap-4">
        <div className="mr-10 flex gap-2">
          <div className="font-bold text-sm sm:text-base">Total Value</div>
          <div className="font-bold text-lg text-sm sm:text-base">
            ₹{totalPrice}
          </div>
        </div>
      </div>
      {totalSavings > 0 && (
        <div className="flex justify-between items-center mt-2">
          <div className="text-red-600 text-sm sm:text-base">You Saved</div>
          <div className="text-red-600 font-bold text-sm sm:text-base">
            ₹{totalSavings}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
