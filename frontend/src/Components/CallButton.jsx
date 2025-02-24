import React from "react";
import { FaPhone } from "react-icons/fa6";

const CallButton = () => {
  const phoneNumber = "917317887499"; // Replace with your phone number

  return (
    <a href={`tel:${phoneNumber}`}>
      <button style={buttonStyle}>
        <FaPhone />
      </button>
    </a>
  );
};

const buttonStyle = {
  backgroundColor: "black", // Green color (customize as needed)
  color: "#fff",
  border: "none",
  padding: "14px",
  borderRadius: "20px",
  cursor: "pointer",
};

export default CallButton;
