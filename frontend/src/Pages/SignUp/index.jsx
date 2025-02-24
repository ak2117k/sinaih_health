import React from "react";
import SignUpForm from "./Components/SignUpForm";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-green-50 p-8">
      <div className="bg-white rounded-2xl shadow-lg p-12 lg:w-3/4 w-full">
        <h1 className="text-4xl font-bold text-center mb-10 text-green-900">
          Welcome to Ayurveda Sign Up
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Sign up to explore our holistic and natural products.
        </p>
        <SignUpForm />
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-green-700 hover:underline">
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default index;
