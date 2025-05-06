import wishlist from "../models/wishlist.js";

export const CreateWishlist = async (req, res) => {
  const { productName, productImage, productPrice, createdBy, updatedBy } =
    req.body;
  try {
    const CreateNewWishlist = await wishlist.create({
      productName,
      productImage,
      productPrice,
      createdBy,
      updatedBy,
    });
    if (!CreateNewWishlist) {
      return res.status(400).json({
        success: false,
        message: "Failed to create wishlist",
      });
    }
    res.status(201).json({
      success: true,
      result: CreateNewWishlist,
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

export const getWishlist = async (req, res) => {
  const { userId } = req.params;
  try {
    const Wishlist = await wishlist
      .find({ createdBy: userId })
      .populate("createdBy", ["firstName", "lastName", "email", "profileImage"])
      .populate("updatedBy", ["firstName", "lastName", "email", "profileImage"])
      .sort({ createdAt: -1 });
    if (!Wishlist || Wishlist.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No wishlist found",
      });
    }
    res.status(200).json({
      success: true,
      result: Wishlist,
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

export const updateWishlist = async (req, res) => {
  const { id } = req.params;
  const { productName, productImage, productPrice, updatedBy } = req.body;
  try {
    const updatedWishlist = await wishlist.findByIdAndUpdate(
      id,
      { productName, productImage, productPrice, updatedBy },
      { new: true }
    );
    if (!updatedWishlist) {
      return res.status(404).json({
        success: false,
        message: "Failed to update wishlist",
      });
    }
    res.status(200).json({
      success: true,
      result: updatedWishlist,
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

export const deleteWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedWishlist = await wishlist.findByIdAndDelete(id);
    if (!deletedWishlist) {
      return res.status(404).json({
        success: false,
        message: "Failed to delete wishlist",
      });
    }
    res.status(200).json({
      success: true,
      result: deletedWishlist,
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
