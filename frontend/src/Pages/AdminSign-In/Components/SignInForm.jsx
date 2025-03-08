import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    username: "",
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
    if (!formData.username || !formData.password) {
      alert("Please fill all required fields");
      return;
    }
    try {
      const response = await axios.post(
        "https://sinaih-health.vercel.app/api/admin/log-in",
        {
          username: formData.username,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        navigate("/admin/dasboard");
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
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full sm:w-auto sm:max-w-lg p-4 bg-red-500 text-white rounded-md shadow-md z-50 flex justify-between items-center transition-all duration-300 ease-in-out">
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
              className="w-full p-3 pl-10 border rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your username"
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
            Sign In as Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
