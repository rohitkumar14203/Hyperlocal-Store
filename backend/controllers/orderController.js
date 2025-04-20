export const placeOrder = async (req, res) => {
  try {
    const orderId = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    res.status(201).json({
      message: "Order placed successfully",
      orderId: orderId,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to place order" });
  }
};
