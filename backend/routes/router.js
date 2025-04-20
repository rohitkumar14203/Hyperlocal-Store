import express from "express";
import { getAllStores } from "../controllers/storeController.js";
import { getProductsByStore } from "../controllers/productController.js";
import { placeOrder } from "../controllers/orderController.js";

const router = express.Router();

router.get("/stores", getAllStores);
router.get("/store/:storeName/products", getProductsByStore);
router.post("/orders", placeOrder);

export default router;
