import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../../Store/User";

const Modal = ({ setShowLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    // Handle login logic here
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all required fields");
      return;
    }
    try {
      const response = await axios.post(
        "https://sinaih-health.vercel.app/api/users/log-in",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        const {
          profile,
          _id,
          myOrders,
          myAddresses,
          myPayments,
          myCart,
          wishlistedItems,
        } = response.data?.user;

        // Dispatch the user data to Redux
        dispatch(
          addUser({
            _id,
            profile,
            myOrders,
            myAddresses,
            myPayments,
            myCart,
            wishlistedItems,
          })
        );

        localStorage.setItem("authToken", response?.data?.token);

        setShowLoginModal(false);

        console.log("Successfully logged in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="flex justify-center items-center h-60 bg-gray-200">
      <div className="bg-white w-96 p-6 rounded-md shadow-lg">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <button
            onClick={handleCloseModal}
            className=" text-gray-500 hover:text-black cursor-pointer"
          >
            ✖
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
