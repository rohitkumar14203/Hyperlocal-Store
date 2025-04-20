import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const username = state?.username || "Customer";
  const orderId = state?.orderId || "N/A";

  const handleBackToStore = () => {
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h2>
      <p className="text-lg mb-2">
        Thank you, <span className="font-semibold">{username}</span>!
      </p>
      <p className="mb-6">
        Your Order ID is <span className="font-mono">{orderId}</span>.
      </p>
      <button
        onClick={handleBackToStore}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Back to Store
      </button>
    </div>
  );
};

export default OrderConfirmation;
