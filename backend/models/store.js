import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: String,
  location: String,
});

const Store = mongoose.model("Store", storeSchema);

export default Store;
