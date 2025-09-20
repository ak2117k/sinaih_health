import { useState } from "react";
import axiosInstance from "../../../axios";

const BuyNowBookings = () => {
  const [showBuyNowBookingToggle, setShowBuyNowBookingToggle] = useState(false);
  const [buyNowBookings, setBuyNowBookings] = useState([]);

  const fetchBuyNowBookings = async () => {
    try {
      const response = await axiosInstance.get("/admin/getBuyNowBookings");
      setBuyNowBookings(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowBuyNowBookingsToggle = () => {
    if (showBuyNowBookingToggle) {
      setShowBuyNowBookingToggle(!showBuyNowBookingToggle);
      return;
    }
    fetchBuyNowBookings();
    setShowBuyNowBookingToggle(!showBuyNowBookingToggle);
  };

  return (
    <div className="p-6 bg-gray-100">
      <button
        className="px-6 py-2 text-xl font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none mb-6"
        onClick={handleShowBuyNowBookingsToggle}
      >
        {showBuyNowBookingToggle
          ? "Hide BuyNow Bookings"
          : "Show All BuyNow Bookings"}
      </button>

      {showBuyNowBookingToggle && (
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {buyNowBookings.length === 0 ? (
            <p>No BuyNow bookings available</p>
          ) : (
            buyNowBookings.map((booking, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all"
              >
                <h3 className="text-2xl font-semibold text-center">
                  Booking ID: {booking._id}
                </h3>

                {booking.bookings.map((order, idx) => (
                  <div key={idx} className="mt-4">
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold">Order Status</h4>
                      <p className="text-gray-700">{order.OrderStatus}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-lg font-semibold">Order Summary</h4>
                      <p className="text-gray-700">
                        Total: {order.OrderSummary.Total}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-lg font-semibold">
                        Shipping Address
                      </h4>
                      <p className="text-gray-700">
                        {order.shippingAddress.name}
                      </p>
                      <p className="text-gray-700">
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}
                      </p>
                      <p className="text-gray-700">
                        {order.shippingAddress.postalCode}
                      </p>
                      <p className="text-gray-700">
                        Contact: {order.shippingAddress.contactNumber}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-lg font-semibold">Booking Address</h4>
                      <p className="text-gray-700">
                        {order.bookingAddress.name}
                      </p>
                      <p className="text-gray-700">
                        {order.bookingAddress.city},{" "}
                        {order.bookingAddress.state}
                      </p>
                      <p className="text-gray-700">
                        {order.bookingAddress.postalCode}
                      </p>
                      <p className="text-gray-700">
                        Contact: {order.bookingAddress.contactNumber}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-lg font-semibold">Payment Info</h4>
                      <p className="text-gray-700">
                        Transaction ID: {order.payment.transactionId}
                      </p>
                      <p className="text-gray-700">
                        Amount Paid: {order.payment.amount}
                      </p>
                      <p className="text-gray-700">
                        Currency: {order.payment.currency}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-lg font-semibold">Products</h4>
                      {order.products.map((product, idx) => (
                        <div key={idx} className="mb-2">
                          <p className="text-gray-700">
                            Product: {product.name}
                          </p>
                          <p className="text-gray-700">
                            Quantity: {product.quantity}
                          </p>
                          <p className="text-gray-700">
                            Price: {product.price}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4">
                      <h4 className="text-lg font-semibold">Shipping Cost</h4>
                      <p className="text-gray-700">
                        Cost: {order.shipping_Cost}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BuyNowBookings;
