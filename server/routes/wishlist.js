import express from "express";
import {
  CreateWishlist,
  deleteWishlist,
  getWishlist,
  updateWishlist,
} from "../controller/wishlistController.js";

const router = express.Router();

router.post("/new-wishlist", CreateWishlist);
router.get("/get-wishlist/:userId", getWishlist);
router.patch("/update-wishlist/:id", updateWishlist);
router.delete("/delete-wishlist/:id", deleteWishlist);

export default router;
