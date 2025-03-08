import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    adminCode: "",
  });
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.adminCode) {
      alert("Please fill all required fields");
      return;
    }
    try {
      const response = await axios.post(
        "https://sinaih-health.vercel.app/api/admin/sign-up",
        {
          username: formData.username,
          password: formData.password,
          adminCode: formData.adminCode,
        }
      );
      console.log(response);
      if (response.status === 201) {
        setNotification("Admin created successfully!");
        setTimeout(() => {
          setNotification("");
          navigate("/admin/sign-in");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setNotification(error.response?.data?.message || "An error occurred");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <div>
      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full sm:w-auto sm:max-w-lg p-4 bg-green-500 text-white rounded-md shadow-md z-50 flex justify-between items-center transition-all duration-300 ease-in-out">
          <span>{notification}</span>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Username</label>
          <div className="relative">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Enter username"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Enter password"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Admin Code</label>
          <div className="relative">
            <input
              type="text"
              name="adminCode"
              value={formData.adminCode}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Enter admin code"
              required
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
          >
            Create Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
