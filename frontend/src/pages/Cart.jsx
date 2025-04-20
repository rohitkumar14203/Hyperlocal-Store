import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const savedCart = localStorage.getItem("cart");
  const cart = savedCart ? JSON.parse(savedCart) : {};

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const totalAmount = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handlePlaceOrder = async () => {
    if (!username) return alert("Please enter your name");

    setLoading(true);
    try {
      const res = await fetch(
        "https://hyperlocal-store-29h4.onrender.com/api/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, cart }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem("cart");
        navigate("/order", {
          state: { username, orderId: data.orderId },
        });
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {Object.keys(cart).length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul className="mb-4">
            {Object.values(cart).map((item) => (
              <li
                key={item.name}
                className="flex justify-between py-2 border-b"
              >
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </li>
            ))}
          </ul>

          <p className="font-semibold mb-2">Total: ₹{totalAmount}</p>

          <input
            type="text"
            className="w-full p-2 border rounded mb-3"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button
            onClick={handlePlaceOrder}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
