import express from "express";
import {
  CreateMyWishlist,
  deleteMyWishList,
  getMyWishList,
  updateMyWishList,
} from "../controller/myWishListController.js";

const router = express.Router();

router.post("/new-mywishlist", CreateMyWishlist);
router.get("/get-mywishlist/:userId", getMyWishList);
router.patch("/update-mywishlist/:id", updateMyWishList);
router.delete("/delete-mywishlist/:id", deleteMyWishList);

export default router;
