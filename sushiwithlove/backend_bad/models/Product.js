import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, required: true },
    sale: { type: Boolean, default: false },
    weight: { type: Number, required: true },
    price: { type: Number, required: true },
    old_price: { type: Number },
    // views: { type: Number, required: true },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", ProductsSchema);
