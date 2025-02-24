import React from "react";
import { useLocation, Link } from "react-router-dom";

const PaymentStatus = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Steps definition
  const steps = [
    { name: "Billing & Shipping", path: "/orders/checkout" },
    { name: "Payment Options", path: "/orders/payments" },
    { name: "Review & Confirm", path: "/orders/review" },
  ];

  // Determine the index of the current step
  const currentStepIndex = steps.findIndex((step) =>
    currentPath.includes(step.path)
  );

  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:flex justify-center items-center my-4 mr-60">
        {steps.map((step, index) => {
          const isCurrentStep = index === currentStepIndex;
          const isPreviousStep = index < currentStepIndex;
          const isNextStep = index > currentStepIndex;

          return (
            <div key={index} className="flex items-center">
              {/* Step Circle */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-light ${
                  isCurrentStep
                    ? "bg-[rgb(32,123,180)]"
                    : isPreviousStep
                    ? "bg-green-600"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>

              {/* Step Name */}
              <div
                className={`ml-2 mr-4 text-sm font-light ${
                  isCurrentStep
                    ? "text-[rgb(32,123,180)]"
                    : isPreviousStep
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {/* If it's a previous step (green), make it a Link */}
                {isPreviousStep ? (
                  <Link to={step.path} className="hover:underline">
                    {step.name}
                  </Link>
                ) : (
                  step.name
                )}
              </div>

              {/* Step Connector */}
              {index < steps.length - 1 && (
                <div className="w-8 border-t-2 border-gray-300" />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex justify-center items-center my-4 sm:px-4">
        <div className="flex flex-col items-center sm:space-y-4 space-x-8">
          {steps.map((step, index) => {
            const isCurrentStep = index === currentStepIndex;
            const isPreviousStep = index < currentStepIndex;
            const isNextStep = index > currentStepIndex;

            return (
              <div
                key={index}
                className="flex flex-col items-center sm:items-center"
              >
                {/* Step Circle */}
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-light ${
                    isCurrentStep
                      ? "bg-[rgb(32,123,180)]"
                      : isPreviousStep
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </div>

                {/* Step Name */}
                <div
                  className={`mt-2 text-sm font-light sm:ml-0 hover:underline cursor-pointer ${
                    isCurrentStep
                      ? "text-[rgb(32,123,180)]"
                      : isPreviousStep
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {/* If it's a previous step (green), make it a Link */}
                  {isPreviousStep ? (
                    <Link to={step.path} className="hover:underline">
                      {step.name}
                    </Link>
                  ) : (
                    step.name
                  )}
                </div>

                {/* Step Connector */}
                {index < steps.length - 1 && (
                  <div className="w-16 h-1 border-t-2 border-gray-300 sm:w-0 sm:h-0 sm:border-l-2 sm:border-gray-300" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PaymentStatus;
