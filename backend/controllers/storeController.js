import Store from "../models/store.js";

export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stores" });
  }
};
