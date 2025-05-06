import myWishlist from "../models/myWishlist.js";
import Auth from "../models/auth.js";

export const CreateMyWishlist = async (req, res) => {
  const { wishListName, userId } = req.body;
  try {
    const newWishList = await myWishlist.create({
      wishListName,
      userId,
    });
    if (!newWishList) {
      return res.status(400).json({
        success: false,
        message: "Failed to create wishlist",
      });
    }
    res.status(201).json({
      success: true,
      result: newWishList,
      message: "Wishlist created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getMyWishList = async (req, res) => {
  const { userId } = req.params;
  try {
    const currentUserEmail = await Auth.findById(userId).select("email");
    // const filter = {
    //   userId,
    //   members: {
    //     $elemMatch: { $eq: currentUserEmail.email },
    //   },
    // };
    const myWishList = await myWishlist
      .find({
        $or: [{ userId }, { members: currentUserEmail.email }], 
      })
      .populate("items", [
        "productName",
        "productImage",
        "productPrice",
        "createdBy",
        "updatedBy",
      ])
      .populate({
        path: "items",
        populate: {
          path: "createdBy updatedBy",
          model: "Auth",
        },
      });

    if (!myWishList || myWishList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No wishlist found",
      });
    }
    res.status(200).json({
      success: true,
      result: myWishList,
      message: "Wishlist fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateMyWishList = async (req, res) => {
  const { id } = req.params;
  const { wishListName, items, members } = req.body;
  try {
    const updatedWishList = await myWishlist
      .findByIdAndUpdate(id, { wishListName, items, members }, { new: true })
      .populate("items", [
        "productName",
        "productImage",
        "productPrice",
        "createdBy",
        "updatedBy",
      ])
      .populate({
        path: "items",
        populate: {
          path: "createdBy updatedBy",
          model: "Auth",
        },
      });
    if (!updatedWishList) {
      return res.status(404).json({
        success: false,
        message: "No wishlist found",
      });
    }
    res.status(200).json({
      success: true,
      result: updatedWishList,
      message: "Wishlist updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteMyWishList = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedWishList = await myWishlist.findByIdAndDelete(id);
    if (!deletedWishList) {
      return res.status(404).json({
        success: false,
        message: "No wishlist found",
      });
    }
    res.status(200).json({
      success: true,
      result: deletedWishList,
      message: "Wishlist deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
