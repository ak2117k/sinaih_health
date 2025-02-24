import axios from "axios";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ setShowReviewForm, productId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleRatingChange = (index) => {
    setRating(index + 1); // Set rating based on clicked star
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(rating, name, email, review);
    try {
      const result = await axios.post(
        "https://sinaih-health.vercel.app/product/addReview",
        {
          rating: rating,
          name: name,
          email: email,
          comments: review,
          productId: productId,
        }
      );
      if (result.status === 200) {
        setRating(0);
        setReview("");
        setName("");
        setEmail("");
        setShowReviewForm(false);
        console.log("Comment added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-120 border-1 border-gray-500 rounded-xl bg-gray-100 z-60 bg-opacity-80">
      <div className="flex justify-end">
        <button
          className="text-gray-600 cursor-pointer font-bold text-lg"
          onClick={() => setShowReviewForm(false)}
        >
          X
        </button>
      </div>
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Share Your Review
      </h1>

      {/* Rating Section */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2 className="text-xl">
            Rate Your experience <span className="text-red-500">*</span>
          </h2>
          <div className="flex gap-2 mt-2">
            {[...new Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`cursor-pointer ${
                  index < rating ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => handleRatingChange(index)}
              />
            ))}
          </div>
        </div>

        {/* Review Input Section */}
        <div className="mb-4">
          <label className="block text-lg mb-2">
            Write a review <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Name Input Section */}
        <div className="mb-4">
          <label className="block text-lg mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email Input Section */}
        <div className="mb-4">
          <label className="block text-lg mb-2">
            Your Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[rgb(75,75,72)] text-white p-2 rounded-md w-40"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
