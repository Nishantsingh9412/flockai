import mongoose from "mongoose";

const MyWishlistSchema = new mongoose.Schema(
  {
    wishListName: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wishlist",
        required: true,
      },
    ],
    members: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("MyWishlist", MyWishlistSchema);
