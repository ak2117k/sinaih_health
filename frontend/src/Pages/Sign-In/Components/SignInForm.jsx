import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addUser } from "../../../Store/User";

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill all required fields");
      return;
    }
    try {
      const response = await axios.post(
        "https://sinaih-health.vercel.app/users/log-in",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true, // Ensure this is included to send cookies
        }
      );
      console.log(response);
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

        console.log("Successfully logged in");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setNotification(error.response?.data?.message || "An error occurred");
      setTimeout(() => setNotification(""), 3000); // Hide the notification after 3 seconds
    }
  };

  return (
    <div>
      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full sm:w-auto sm:max-w-lg p-4 bg-red-500 text-white rounded-md shadow-md z-50 flex justify-between items-center transition-all duration-300 ease-in-out">
          <span>{notification}</span>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
