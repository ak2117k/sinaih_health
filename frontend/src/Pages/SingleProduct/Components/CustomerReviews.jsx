import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import ReviewForm from "./ReviewForm";

const CustomerReviews = ({ singleProduct }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Extract reviews from singleProduct object
  const reviews = singleProduct?.reviews || [];

  // If no reviews, you can initialize a "Not Rated" message or set default data
  if (reviews.length === 0) {
    console.log("No reviews yet for this product.");
  }

  // Example: Calculate the distribution of ratings (1-5 stars) for the review data
  const reviewData = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((review) => {
    const rating = review.ratings;
    if (rating >= 1 && rating <= 5) {
      reviewData[rating]++;
    }
  });

  // Calculate the total number of ratings
  const totalRatings = Object.values(reviewData).reduce(
    (acc, count) => acc + count,
    0
  );
  let overallRatings = 0;
  for (let key in reviewData) {
    overallRatings += key * reviewData[key];
  }
  overallRatings /= 5;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Customer Reviews</h1>

      {/* Star Distribution Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="mt-6 w-full sm:w-2/3">
          {Object.keys(reviewData).map((rating) => {
            const percentage = (reviewData[rating] / totalRatings) * 100;

            return (
              <div key={rating} className="flex items-center mb-2">
                {/* Display Rating Number with Star Icon */}
                <div className="flex gap-2 w-16">
                  <span className="mr-1">{rating}</span>
                  <FaStar className="text-yellow-400 mt-1" />
                </div>
                {/* Rating Bar */}
                <div className="flex-1 h-2 bg-gray-200 rounded-lg">
                  <div
                    className="h-full bg-yellow-400 rounded-lg"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                {/* Display the number of users who rated */}
                <span className="ml-2">{reviewData[rating]} users</span>
              </div>
            );
          })}
        </div>
        <div className="flex-1 sm:ml-12 mt-8 sm:mt-0 flex flex-col items-center sm:items-start">
          <div className="flex gap-4">
            <p className="text-[rgb(46,79,124)] text-3xl sm:text-4xl font-semibold">
              {overallRatings}
            </p>
            <div className="">
              <div className="flex gap-2">
                {[...new Array(5)].map((_, index) => (
                  <div key={index}>
                    <FaStar
                      className=""
                      style={{
                        color:
                          index + 1 <= overallRatings
                            ? "rgb(253,199,0)"
                            : "gray",
                      }}
                      size={24}
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm mt-1 text-center sm:text-left">
                Based on {reviews.length} reviews
              </p>
            </div>
          </div>
          <button
            className="bg-[rgb(46,79,124)] p-2 rounded-xl cursor-pointer shadow-xl text-white h-10 mt-6 sm:mt-8"
            onClick={() => setShowReviewForm(true)}
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* If no reviews yet */}
      {totalRatings === 0 && (
        <p className="mt-4 text-gray-500 text-center sm:text-left">
          No reviews yet. Be the first to review!
        </p>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <>
          {/* Dark Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-80 z-50"
            onClick={() => setShowReviewForm(false)} // Close form when clicking the backdrop
          ></div>

          <ReviewForm
            setShowReviewForm={setShowReviewForm}
            productId={singleProduct._id}
          />
        </>
      )}
    </div>
  );
};

export default CustomerReviews;
