import Product from "../models/product.js";

export const getProductsByStore = async (req, res) => {
  try {
    const storeName = req.params.storeName;
    const products = await Product.find({ storeName });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
