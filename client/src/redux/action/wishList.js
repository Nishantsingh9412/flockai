import * as api from "../../api/index.js";

export const createWishListAction = (newWishList) => async (dispatch) => {
  try {
    const { data } = await api.CreateWishlistAPI(newWishList);
    dispatch({ type: "CREATE_WISH_LIST", data: data?.result });
    return {
      success: true,
      message: "Wish List created successfully",
      data: data?.result,
    };
  } catch (error) {
    console.error("Error creating wish list:", error);
    return { success: false, message: error?.response?.data?.message };
  }
};

export const getWishListAction = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getWishlistAPI(userId);
    dispatch({ type: "GET_WISH_LIST", data: data?.result });
    return { success: true, message: "Wish List fetched successfully" };
  } catch (error) {
    console.error("Error fetching wish list:", error);
    return { success: false, message: error?.response?.data?.message };
  }
};

export const updateWishListAction =
  (id, updatedWishList) => async (dispatch) => {
    try {
      const { data } = await api.updateWishlistAPI(id, updatedWishList);
      // dispatch({ type: "UPDATE_WISH_LIST", data: data?.result });
      return { success: true, message: "Wish List updated successfully" };
    } catch (error) {
      console.error("Error updating wish list:", error);
      return { success: false, message: error?.response?.data?.message };
    }
  };

export const deleteWishListAction = (id) => async (dispatch) => {
  try {
    await api.deleteWishlistAPI(id);
    dispatch({ type: "DELETE_WISH_LIST", data: id });
    return { success: true, message: "Wish List deleted successfully" };
  } catch (error) {
    console.error("Error deleting wish list:", error);
    return { success: false, message: error?.response?.data?.message };
  }
};
