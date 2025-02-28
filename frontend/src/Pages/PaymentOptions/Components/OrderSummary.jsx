import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const user = useSelector((state) => state.user.user);
  const buyNowProduct = useSelector((state) => state.buynowprod.product);
  const productQuantity = useSelector((state) => state.buynowprod.quantity);

  // Access the cart items
  const cartItems =
    user?.myCart?.length > 0
      ? user.myCart[0].items
      : buyNowProduct
      ? [buyNowProduct]
      : [];

  let totalPrice = 0;
  let totalOriginalPrice = 0;
  let totalSavings = 0;

  return (
    <div className="p-4 rounded-md w-full sm:w-120 h-auto sm:h-120">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

      {cartItems.map((item) => {
        let name, images, price, oprice, brand, quantity;
        if (user) {
          let { productId, quantity } = item;
          name = productId.name;
          images = productId.images;
          price = productId.price;
          oprice = productId.oprice;
          brand = productId.brand;
          quantity = quantity;
        } else {
          name = item.name;
          images = item.images;
          price = item.price;
          oprice = item.oprice;
          brand = item.brand;
          quantity = productQuantity;
        }

        // Calculate total price and total original price for savings calculation
        const itemTotalPrice = oprice * quantity;
        const itemTotalOriginalPrice = price * quantity;
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
                Qty: {quantity} xCA${price}
              </p>
              <p className="font-bold">Total:CA${itemTotalPrice}</p>
              {itemSavedAmount > 0 && (
                <p className="text-red-600">You Saved CA${itemSavedAmount}</p>
              )}
            </div>
          </div>
        );
      })}

      {/* Total Value and Savings */}
      <div className="flex justify-end items-center mt-6 gap-4 flex-col sm:flex-row">
        <div className="mr-10 flex gap-2">
          <div className="font-bold">Total Value</div>
          <div className="font-bold text-lg mr-6">CA${totalPrice}</div>
        </div>
      </div>
      {totalSavings > 0 && (
        <div className="flex justify-between items-center mt-2">
          <div className="text-red-600">You Saved</div>
          <div className="text-red-600 font-bold">CA${totalSavings}</div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
