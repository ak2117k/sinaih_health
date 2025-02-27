import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Using the WhatsApp icon from react-icons

const WhatsAppButton = () => {
  // Replace with the contact's phone number (including country code, no '+' sign)
  const phoneNumber = "+14378753944"; // Example phone number
  const message = "Hello, I need assistance."; // Custom message to send

  // Generate the WhatsApp URL to open the chat
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      <button style={buttonStyle}>
        <FaWhatsapp />
      </button>
    </a>
  );
};

const buttonStyle = {
  backgroundColor: "#25D366", // WhatsApp color
  color: "#fff",
  border: "none",
  padding: "14px",
  borderRadius: "20px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};

export default WhatsAppButton;
