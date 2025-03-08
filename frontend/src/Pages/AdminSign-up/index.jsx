import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./Components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Admin Account
        </h2>
        <SignUpForm />
        <p className="">Already Have an account ??</p>
        <Link className="" to="/admin/sign-in">
          <button className="text-green-700 hover:underline">Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
