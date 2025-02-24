import React from "react";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import SignInForm from "./Components/SignInForm";

const index = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <LockClosedIcon className="h-16 w-16 text-green-500" />
          <h1 className="text-3xl font-bold text-green-900 mt-4">
            Welcome Back!
          </h1>
          <p className="text-gray-600 text-center">
            Sign in to access your account and continue your wellness journey.
          </p>
        </div>
        <SignInForm />
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link to="/sign-up" className="text-green-700 hover:underline">
              Sign Up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default index;
