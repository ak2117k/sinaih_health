import { useState } from "react";
import axiosInstance from "../../../axios";

const User = () => {
  const [showUsersToogle, setShowUsersToogle] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/admin/getUsers");
      setUsers(response.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserToogle = () => {
    if (showUsersToogle) {
      setShowUsersToogle(!showUsersToogle);
      return;
    }
    fetchUsers();
    setShowUsersToogle(true);
  };

  const handleStatusChange = async (userId, orderId, newStatus) => {
    try {
      const response = await axiosInstance.patch(
        "/admin/updateuserOrderStatus",
        {
          userId: userId,
          orderId: orderId,
          newStatus: newStatus,
        }
      );

      if (response.status === 200) {
        console.log("Order status updated successfully");
        fetchUsers(); // Re-fetch users to reflect the updated status
      }
    } catch (error) {
      console.log("Error updating order status:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="text-center mb-6">
        <button
          className="px-6 py-2 text-xl font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
          onClick={handleUserToogle}
        >
          {showUsersToogle ? "Hide Users" : "Show Users"}
        </button>
      </div>

      {showUsersToogle && (
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {users.length === 0 ? (
            <p>No users available</p>
          ) : (
            users.map((user) => (
              <div
                className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all"
                key={user._id}
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold">{`${user.profile.firstName} ${user.profile.lastName}`}</h3>
                  <p className="text-sm text-gray-600">
                    Email: {user.profile.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    Contact: {user.profile.contactNumber}
                  </p>
                </div>

                <div>
                  {user.myOrders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm"
                    >
                      <h4 className="font-semibold text-lg">
                        Order ID: {order._id}
                      </h4>
                      <p className="text-gray-700">
                        Status: {order.bookings[0].OrderStatus}
                      </p>
                      <p className="text-gray-700">
                        Total: {order.bookings[0].OrderSummary.Total}
                      </p>
                      <div className="text-gray-700">
                        <h5 className="font-semibold">Shipping Address:</h5>
                        <p>{order.bookings[0].shippingAddress.name}</p>
                        <p>
                          {order.bookings[0].shippingAddress.city},{" "}
                          {order.bookings[0].shippingAddress.state}
                        </p>
                        <p>{order.bookings[0].shippingAddress.postalCode}</p>
                        <p>{order.bookings[0].shippingAddress.contactNumber}</p>
                      </div>

                      <div className="text-gray-700 mt-4">
                        <h5 className="font-semibold">Booking Address:</h5>
                        <p>{order.bookings[0].bookingAddress.name}</p>
                        <p>
                          {order.bookings[0].bookingAddress.city},{" "}
                          {order.bookings[0].bookingAddress.state}
                        </p>
                        <p>{order.bookings[0].bookingAddress.postalCode}</p>
                        <p>{order.bookings[0].bookingAddress.contactNumber}</p>
                      </div>

                      <div className="mt-4 flex items-center gap-4">
                        <select
                          value={order.bookings[0].OrderStatus}
                          onChange={(e) =>
                            handleStatusChange(
                              user._id,
                              order._id,
                              e.target.value
                            )
                          }
                          className="px-4 py-2 border rounded-md focus:outline-none"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="In-transit">In-transit</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <button
                          className="px-6 py-2 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
                          onClick={() =>
                            handleStatusChange(
                              user._id,
                              order._id,
                              order.bookings[0].OrderStatus
                            )
                          }
                        >
                          Update Status
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default User;
