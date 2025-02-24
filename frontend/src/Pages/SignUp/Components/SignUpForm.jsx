import React, { useState } from "react";
import { CountryList } from "./CountryList";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    DOB: "",
    gender: "",
    contactNumber: "",
    country: "",
  });

  const [notification, setNotification] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    let missingFields = [];

    // Check which fields are missing
    if (!formData.email) missingFields.push("Email");
    if (!formData.password) missingFields.push("Password");
    if (!formData.firstName) missingFields.push("First Name");
    if (!formData.lastName) missingFields.push("Last Name");
    if (!formData.contactNumber) missingFields.push("Contact Number");
    if (!formData.DOB) missingFields.push("Date of Birth");

    // If there are missing fields, set the notification
    if (missingFields.length > 0) {
      setNotification(
        `Please fill in the following fields: ${missingFields.join(", ")}`
      );
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setNotification("Please Enter a valid Email address");
      setTimeout(() => setNotification(""), 3000);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/users/sign-up",
        {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          DOB: formData.DOB,
          gender: formData.gender,
          contactNumber: formData.contactNumber,
          country: formData.country,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          DOB: "",
          gender: "",
          contactNumber: "",
          country: "",
        });

        console.log("Account created Successfully");
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
      setNotification("There was an error creating your account.");
    }

    // Reset notification if form is successfully submitted
    setNotification("");
  };

  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Date of Birth</label>
        <input
          type="date"
          name="DOB"
          value={formData.DOB}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Contact Number</label>
        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Country</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full p-3 border rounded-md flex"
        >
          {CountryList.map((country) => (
            <option
              key={country.code}
              value={country.name}
              className="flex items-center"
            >
              {country.name} {country.flag}
            </option>
          ))}
        </select>
      </div>
      <div className="lg:col-span-2">
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
        >
          Sign Up
        </button>
      </div>

      {/* Display the notification if any */}
      {notification && (
        <div className="mt-4 text-red-600 font-semibold">{notification}</div>
      )}
    </form>
  );
};

export default SignUpForm;
