import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    productImage: {
      type: String,
      // default: "https://placehold.co/600x400?text=No+Image+Available",
      default: "https://placehold.co/600x400?text=No%20Image%20Available",  
    },
  },
  { timestamps: true }
);

export default mongoose.model("Wishlist", wishlistSchema);
